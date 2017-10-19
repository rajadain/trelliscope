package in.rajada.trelliscope

import geotrellis.spark.io.s3.{S3CollectionLayerReader => gtS3CollectionLayerReader,
                               S3AttributeStore => gtS3AttributeStore}

class S3CollectionLayerReader(val awsAccessKeyId: String, val awsSecretAccessKey: String,
                              store: gtS3AttributeStore)
  extends gtS3CollectionLayerReader(store) {

  override def collectionReader = S3CollectionReader(awsAccessKeyId, awsSecretAccessKey)
}

object S3CollectionLayerReader {
  def apply(awsAccessKeyId: String, awsSecretAccessKey: String, store: gtS3AttributeStore) =
    new S3CollectionLayerReader(awsAccessKeyId, awsSecretAccessKey, store)
}
