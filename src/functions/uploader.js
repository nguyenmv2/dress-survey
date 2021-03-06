// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import path from "path";
import AWS from "aws-sdk";
exports.handler = async (event, context) => {
  const { user } = context.clientContext;
  if (!user || (user && user.roles && !user.roles.includes("Admin"))) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }
  const { S3_AWS_ACCESS_KEY_ID, S3_AWS_SECRET_ACCESS_KEY } = process.env;
  const s3 = new AWS.S3({
    accessKeyId: S3_AWS_ACCESS_KEY_ID,
    secretAccessKey: S3_AWS_SECRET_ACCESS_KEY,
    region: "us-east-2"
  });
  const params = JSON.parse(event.body);

  const s3Params = {
    Bucket: "blue-tag-bridal-assets",
    Key: path.join("public/surveys", params.name),
    ContentType: params.type,
    ACL: "public-read"
  };

  var uploadURL = s3.getSignedUrl("putObject", s3Params);

  return {
    statusCode: 200,
    body: JSON.stringify({ uploadURL: uploadURL })
  };
};
