const AWS = require('aws-sdk');
const s3 = new AWS.S3();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    try {
        const photos = event.body.photos

        // Loop through photos and upload them to S3
        for (const photo of photos) {
            // Create S3 params
            const params = {
                Bucket: 'documentdata132943-dev',
                Key: `photos/${photo.name}`,
                Body: Buffer.from(photo.base64, 'base64'),
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg'
            };

            // Upload photo to S3
            await s3.upload(params).promise();
        }

        // Send an email with a link to the photos
        // Code here

        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            //  headers: {
            //      "Access-Control-Allow-Origin": "*",
            //      "Access-Control-Allow-Headers": "*"
            //  }, 
            body: JSON.stringify({ message: 'Photos uploaded' }),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An error occurred' }),
        };
    }
};
