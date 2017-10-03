package in.rajada.trelliscope

import akka.http.scaladsl.server.{ HttpApp, Route }
import akka.http.scaladsl.unmarshalling.Unmarshaller._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._

import ch.megard.akka.http.cors.scaladsl.CorsDirectives._

import geotrellis.proj4.{ LatLng, ConusAlbers }
import geotrellis.spark.{ LayerId, SpatialKey, TileLayerMetadata }
import geotrellis.spark.io._
import geotrellis.spark.io.s3.S3CollectionLayerReader
import geotrellis.raster.Tile
import geotrellis.vector.{ GeometryCollection, MultiPolygon }
import geotrellis.vector.io._

import spray.json._

import com.typesafe.config.ConfigFactory

case class ListLayersRequest (
  bucket: String,
  awsAccessKeyId: String,
  awsSecretAccessKey: String
)

case class GetLayerRequest (
  shape: String, // GeoJSON
  layer: String, // LayerId Name
  bucket: String,
  awsAccessKeyId: String,
  awsSecretAccessKey: String
)

object PostRequestProtocol extends DefaultJsonProtocol {
  implicit val listLayersFormat = jsonFormat3(ListLayersRequest)
  implicit val getLayersFormat = jsonFormat5(GetLayerRequest)
}

object WebServer extends HttpApp with App {
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
            val store = S3AttributeStore(req.awsAccessKeyId, req.awsSecretAccessKey, req.bucket)
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
            val store = S3AttributeStore(req.awsAccessKeyId, req.awsSecretAccessKey, req.bucket)
            val layerId = LayerId(req.layer, 0)
            val reader = S3CollectionLayerReader(store)
            val shape = req.shape.parseJson.convertTo[MultiPolygon]
                                           .reproject(LatLng, ConusAlbers)
                                           .buffer(0)
                                           .asMultiPolygon
                                           .get

            val layer = reader.query[SpatialKey, Tile, TileLayerMetadata[SpatialKey]](layerId)
                              .where(Intersects(shape))
                              .result

            val keys = layer.map(_._1)
            val meta = layer.metadata
            val density = meta.mapTransform.apply(keys.head).width / 100

            val tiles = keys.map(meta.mapTransform.apply)
                            .map(_.toPolygon.densify(density)
                                            .reproject(meta.crs, LatLng))

            val result = GeometryCollection(tiles).toGeoJson

            complete(result)
          }
        }
      }
    }
  }

  val config = ConfigFactory.load()
  val port = config.getInt("trelliscope.port")
  val host = config.getString("trelliscope.host")

  startServer(host, port)
}
