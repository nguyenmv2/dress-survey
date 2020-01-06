// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
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
    secretAccessKey: S3_AWS_SECRET_ACCESS_KEY
  });
  const params = JSON.parse(event.body);
  try {
    await s3
      .deleteObject({
        Bucket: "blue-tag-bridal-assets",
        Key: decodeURIComponent(params.name)
      })
      .promise();
    return {
      statusCode: 204,
      body: ""
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(err.stack)
    };
  }
};
