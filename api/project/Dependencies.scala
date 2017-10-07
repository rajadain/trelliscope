import sbt._

object Dependencies {
    val akka            = "com.typesafe.akka"           %% "akka-actor"           % Version.akka
    val akkaHttp        = "com.typesafe.akka"           %% "akka-http"            % Version.akkaHttp
    val akkaHttpCors    = "ch.megard"                   %% "akka-http-cors"       % Version.akkaHttpCors
    val akkaSprayJson   = "com.typesafe.akka"           %% "akka-http-spray-json" % Version.akkaHttp
    val akkaStream      = "com.typesafe.akka"           %% "akka-stream"          % Version.akka
    val geotrellisSpark = "org.locationtech.geotrellis" %% "geotrellis-spark"     % Version.geotrellis
    val geotrellisS3    = "org.locationtech.geotrellis" %% "geotrellis-s3"        % Version.geotrellis
    val scalaLogging    = "com.typesafe.scala-logging"  %% "scala-logging"        % Version.scalaLogging
    val spark           = "org.apache.spark"            %% "spark-core"           % Version.spark
}
