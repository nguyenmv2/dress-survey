// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import AWS from "aws-sdk";

exports.handler = async () => {
  const s3 = new AWS.S3();
  try {
    let data = await s3
      .listObjectsV2({
        Bucket: "blue-tag-bridal-assets",
        Prefix: "public/surveys"
      })
      .promise();
    const files = data.Contents.filter(file => file.Size > 0).map(file => {
      const url = new URL("https://assets.bluetagbridal.com/");
      url.pathname = file.Key.replace("public/", "");
      return url.toString();
    });
    return {
      statusCode: 200,
      body: JSON.stringify(files)
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
