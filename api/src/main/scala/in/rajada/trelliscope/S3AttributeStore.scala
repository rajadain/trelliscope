package in.rajada.trelliscope

import geotrellis.spark.io.s3.{ S3AttributeStore => gtS3AttributeStore, S3Client }

class S3AttributeStore(val awsAccessKeyId: String, val awsSecretAccessKey: String,
                       override val bucket: String, override val prefix: String)
  extends gtS3AttributeStore(bucket, prefix) {

  override val s3Client: S3Client =
    S3Client.basic(awsAccessKeyId, awsSecretAccessKey)
}

object S3AttributeStore {
  def apply(awsAccessKeyId: String, awsSecretAccessKey: String, bucket: String): gtS3AttributeStore =
    if (awsAccessKeyId != "" && awsSecretAccessKey != "") {
      new S3AttributeStore(awsAccessKeyId, awsSecretAccessKey, bucket, "")
    } else {
      new gtS3AttributeStore(bucket, "")
    }
}
