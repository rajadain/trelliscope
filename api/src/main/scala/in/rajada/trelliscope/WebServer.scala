package in.rajada.trelliscope

import akka.http.scaladsl.server.{ HttpApp, Route }
import akka.http.scaladsl.unmarshalling.Unmarshaller._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
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

  def routes: Route =
    path("ping") {
      get {
        complete("pong")
      }
    } ~
    path("/layers") {
      pathEndOrSingleSlash {
        post {
          entity(as[ListLayersRequest]) { req =>
            val store = S3AttributeStore(req.awsAccessKeyId, req.awsSecretAccessKey, req.bucket)
            val layers = store.layerIds.map { x => x.name }

            complete(layers)
          }
        }
      }
    }

  val config = ConfigFactory.load()
  val port = config.getInt("trelliscope.port")
  val host = config.getString("trelliscope.host")

  startServer(host, port)
}
