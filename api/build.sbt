name := "trelliscope"

lazy val settings = Seq(
    organization := "in.rajada",
    version := Version.trelliscope,
    scalaVersion := Version.scala,
    scalacOptions := Seq(
        "-deprecation",
        "-unchecked",
        "-feature",
        "-language:implicitConversions",
        "-language:reflectiveCalls",
        "-language:higherKinds",
        "-language:postfixOps",
        "-language:existentials",
        "-language:experimental.macros",
        "-feature",
        "-Ypartial-unification",
        "-Ypatmat-exhaust-depth", "100"
    ),
    resolvers ++= Seq(
        Resolver.sonatypeRepo("snapshots"),
        Resolver.bintrayRepo("lonelyplanet", "maven"),
        "Open Source Geospatial Foundation Repo" at "http://download.osgeo.org/webdav/geotools/",
        "LocationTech GeoTrellis Releases" at "https://repo.locationtech.org/content/repositories/geotrellis-releases"
    ),
    fork in run := true,
    connectInput in run := true,
    cancelable in Global := true,
    assemblyJarName in assembly := "trelliscope-api.jar"
)

lazy val dependencies = Seq(
    Dependencies.akka,
    Dependencies.akkaHttp,
    Dependencies.akkaSprayJson,
    Dependencies.akkaStream,
    Dependencies.geotrellisSpark,
    Dependencies.geotrellisS3,
    Dependencies.scalaLogging,
    Dependencies.spark
)

lazy val root =
    Project("root", file("."))
        .settings(settings:_*)
        .settings({ libraryDependencies ++= dependencies })
