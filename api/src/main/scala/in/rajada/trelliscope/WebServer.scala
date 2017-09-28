package in.rajada.trelliscope

import akka.http.scaladsl.server.{ HttpApp, Route }

import com.typesafe.config.ConfigFactory

object WebServer extends HttpApp with App {
    def routes: Route =
        get {
            path("ping") {
                complete("pong")
            }
        }

    val config = ConfigFactory.load()
    val port = config.getInt("trelliscope.port")
    val host = config.getString("trelliscope.host")

    startServer(host, port)
}
