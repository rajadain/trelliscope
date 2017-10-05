package in.rajada.trelliscope

import geotrellis.vector.{MultiPolygon, Polygon}
import geotrellis.vector.io._

import spray.json.{JsObject, JsString, JsValue}

trait Utils {
  def toMultiPolygon(json: JsValue): MultiPolygon = GeometryFormat.read(json) match {
    case mp: MultiPolygon => mp
    case p: Polygon => MultiPolygon(Seq(p))
    case _ => ???
  }
}
