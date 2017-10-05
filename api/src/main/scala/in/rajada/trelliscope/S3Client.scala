package in.rajada.trelliscope

import com.amazonaws.auth.BasicAWSCredentials
import geotrellis.spark.io.s3.{ AmazonS3Client, S3Client => gtS3Client }

object S3Client {
  def basic(awsAccessKeyId: String, awsSecretAccessKey: String) =
    AmazonS3Client(new BasicAWSCredentials(awsAccessKeyId, awsSecretAccessKey),
                   gtS3Client.defaultConfiguration)
}
