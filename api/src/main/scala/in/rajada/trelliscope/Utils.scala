package in.rajada.trelliscope

import geotrellis.vector.{MultiPolygon, Polygon}
import geotrellis.vector.io._

import spray.json.JsValue

trait Utils {
  def toMultiPolygon(json: JsValue): MultiPolygon = GeometryFormat.read(json) match {
    case mp: MultiPolygon => mp
    case p: Polygon => MultiPolygon(Seq(p))
    case _ => ???
  }

  def toBucketPrefix(s3Path: String): (String, String) = {
    val split = s3Path.split('/')
    split.length match {
      case 1 => (s3Path, "")
      case _ => (split.head, s3Path.substring(split.head.length + 1))
    }
  }
}
