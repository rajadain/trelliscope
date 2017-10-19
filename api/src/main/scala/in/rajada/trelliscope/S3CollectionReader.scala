package in.rajada.trelliscope

import geotrellis.spark.io.s3.{ S3CollectionReader => gtS3CollectionReader,
                                S3Client => gtS3Client }

class S3CollectionReader(val s3Client: gtS3Client) extends gtS3CollectionReader {
  override def getS3Client: () => gtS3Client = () => s3Client
}

object S3CollectionReader {
  def apply(awsAccessKeyId: String, awsSecretAccessKey: String): S3CollectionReader =
    new S3CollectionReader(S3Client.basic(awsAccessKeyId, awsSecretAccessKey))
}
