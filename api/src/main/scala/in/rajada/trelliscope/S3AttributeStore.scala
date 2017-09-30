package in.rajada.trelliscope

import com.amazonaws.auth.BasicAWSCredentials
import geotrellis.spark.io.s3.{ S3AttributeStore => AttributeStore, S3Client, AmazonS3Client}

class S3AttributeStore(val awsAccessKeyId: String, val awsSecretAccessKey: String,
                       override val bucket: String, override val prefix: String)
  extends AttributeStore(bucket, prefix) {

  override val s3Client: S3Client =
    AmazonS3Client(new BasicAWSCredentials(awsAccessKeyId, awsSecretAccessKey),
                   S3Client.defaultConfiguration)
}

object S3AttributeStore {
  def apply(awsAccessKeyId: String, awsSecretAccessKey: String, bucket: String): S3AttributeStore =
    new S3AttributeStore(awsAccessKeyId, awsSecretAccessKey, bucket, "")
}