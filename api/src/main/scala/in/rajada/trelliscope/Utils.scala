package in.rajada.trelliscope

import geotrellis.vector.MultiPolygon
import geotrellis.vector.io._
import geotrellis.vector.io.json._

import spray.json.{JsString, JsValue}

trait Utils {
  def toMultiPolygon(json: JsValue): MultiPolygon = {
    json.asJsObject.fields("type") match {
      case JsString("MultiPolygon") => MultiPolygonFormat.read(json)
      case JsString("Polygon") => MultiPolygon(Seq(PolygonFormat.read(json)))
      case JsString("FeatureCollection") => {
        val collection = json.toString.parseGeoJson[JsonFeatureCollection]
        val mps = collection.getAllMultiPolygons.unionGeometries.asMultiPolygon
        val ps = collection.getAllPolygons.unionGeometries.asMultiPolygon

        (mps, ps) match {
          case (Some(mp1), Some(mp2)) => (mp1 union mp2).asMultiPolygon.get
          case (Some(mp1), _) => mp1
          case (_, Some(mp2)) => mp2
          case _ => MultiPolygon()
        }
      }
    }
  }

  def toBucketPrefix(s3Path: String): (String, String) = {
    val split = s3Path.split('/')
    split.length match {
      case 1 => (s3Path, "")
      case _ => (split.head, s3Path.substring(split.head.length + 1))
    }
  }
}
