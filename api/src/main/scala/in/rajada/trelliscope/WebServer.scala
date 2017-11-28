package in.rajada.trelliscope

import akka.http.scaladsl.model.{ HttpEntity, HttpResponse, MediaTypes }
import akka.http.scaladsl.server.{ HttpApp, Route }
import akka.http.scaladsl.unmarshalling.Unmarshaller._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._

import ch.megard.akka.http.cors.scaladsl.CorsDirectives._

import geotrellis.proj4.{ LatLng, ConusAlbers }
import geotrellis.spark.{ LayerId, SpatialKey, TileLayerMetadata }
import geotrellis.spark.io._
import geotrellis.spark.io.s3.{ S3LayerHeader, S3ValueReader }
import geotrellis.raster.Tile
import geotrellis.raster.io.geotiff.SinglebandGeoTiff
import geotrellis.vector.PolygonFeature
import geotrellis.vector.io.json.JsonFeatureCollection

import spray.json._

import com.typesafe.config.ConfigFactory

case class ListLayersRequest (
  s3Path: String,
  awsAccessKeyId: String,
  awsSecretAccessKey: String
)

case class GetLayerRequest (
  shape: String, // GeoJSON
  layer: String, // LayerId Name
  s3Path: String,
  awsAccessKeyId: String,
  awsSecretAccessKey: String
)

case class TileFeatureData (
  col: Int,
  row: Int,
  layer: String,
  s3Path: String
)

object PostRequestProtocol extends DefaultJsonProtocol {
  implicit val listLayersFormat = jsonFormat3(ListLayersRequest)
  implicit val getLayersFormat = jsonFormat5(GetLayerRequest)
  implicit val tileFeatureDataFormat = jsonFormat4(TileFeatureData)
}

object WebServer extends HttpApp with App with Utils {
  import PostRequestProtocol._

  def routes: Route = cors() {
    path("ping") {
      get {
        complete("pong")
      }
    } ~
    path("layers") {
      pathEndOrSingleSlash {
        post {
          entity(as[ListLayersRequest]) { req =>
            val (bucket, prefix) = toBucketPrefix(req.s3Path)
            val store = S3AttributeStore(req.awsAccessKeyId, req.awsSecretAccessKey, bucket, prefix)
            val layers = store.layerIds
                              .filter { _.zoom == 0 }
                              .map { _.name }

            complete(layers)
          }
        }
      }
    } ~
    path("query") {
      pathEndOrSingleSlash {
        post {
          entity(as[GetLayerRequest]) { req =>
            val (bucket, prefix) = toBucketPrefix(req.s3Path)
            val store = S3AttributeStore(req.awsAccessKeyId, req.awsSecretAccessKey, bucket, prefix)
            val layerId = LayerId(req.layer, 0)
            val reader = S3CollectionLayerReader(req.awsAccessKeyId, req.awsSecretAccessKey, store)
            val shape = toMultiPolygon(req.shape.parseJson)
                          .reproject(LatLng, ConusAlbers)
                          .buffer(0)
                          .asMultiPolygon
                          .get

            val layer = reader.query[SpatialKey, Tile, TileLayerMetadata[SpatialKey]](layerId)
                              .where(Intersects(shape))
                              .result

            val keys = layer.map(_._1)
            val meta = layer.metadata
            val density = meta.mapTransform.apply(keys.head).width / 10

            val tiles = keys.map(key => {
              val data = TileFeatureData(key.col, key.row,
                                         req.layer, req.s3Path)
              val extent = meta.mapTransform.apply(key)
              val polygon = extent.toPolygon
                                  .densify(density)
                                  .reproject(meta.crs, LatLng)

              PolygonFeature[TileFeatureData](polygon, data)
            })

            val result = JsonFeatureCollection(tiles).toJson

            complete(result)
          }
        }
      }
    } ~
    pathPrefix("geotiff" / Segment / Segment / IntNumber / IntNumber) { (s3Path, layer, col, row) =>
      get {
        val (bucket, prefix) = toBucketPrefix(s3Path)
        val store = S3AttributeStore("", "", bucket, prefix)
        val layerId = LayerId(layer, 0)
        val reader = S3ValueReader[SpatialKey, Tile](store, layerId)
        val LayerAttributes(_, metadata, _, _) =
          store.readLayerAttributes[S3LayerHeader, TileLayerMetadata[SpatialKey], SpatialKey](layerId)
        val key = SpatialKey(col, row)
        val extent = metadata.mapTransform.apply(key)
        val tile = reader.read(key)
        val crs = metadata.crs

        val geotiff = SinglebandGeoTiff(tile, extent, crs)

        complete(HttpResponse(entity = HttpEntity(MediaTypes.`image/tiff`, geotiff.toByteArray)))
      }
    }
  }

  val config = ConfigFactory.load()
  val port = config.getInt("trelliscope.port")
  val host = config.getString("trelliscope.host")

  startServer(host, port)
}
