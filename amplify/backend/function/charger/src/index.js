const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const handlebars = require('handlebars');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    try {

        //const cognitoIdentity = event.requestContext.identity.cognitoIdentityId;
        const cognitoIdentity = '3495fd52-a20f-4fd6-b89c-16690078480a'
        const photos = await getPhotosFromS3(cognitoIdentity);
        const templateObject = await getTemplateObject();

        // Compile the HTML template using Handlebars
        const template = handlebars.compile(templateObject.Body.toString());
        const html = template({ photos });

        // Upload the generated HTML docum ent to S3
        const htmlKey = `documents/${cognitoIdentity}-${Date.now()}.html`;
        await s3.putObject({
            Bucket: 'documentdata132943-dev',
            Key: htmlKey,
            Body: html,
            ContentType: 'text/html'
        }).promise();

        // Return a presigned URL for the HTML document
        const url = s3.getSignedUrl('getObject', {
            Bucket: 'documentdata132943-dev',
            Key: htmlKey,
            Expires: 31536000 // one year in seconds
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: url }),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error }),
        };
    }
};

const getPhotosFromS3 = async (identityId) => {
    const s3 = new AWS.S3();
    const bucketName = 'documentdata132943-dev';
    const s3Objects = await s3.listObjectsV2({
        Bucket: bucketName,
        Prefix: `private/us-east-1:0b952b94-1dbd-40dc-8f9c-870498736f00/`
    }).promise();

    return s3Objects.Contents.map(obj => {
        const fileName = obj.Key.split('/').pop().split('.')[0];
        return {
            Key: obj.Key,
            fileName: fileName,
            url: s3.getSignedUrl('getObject', {
                Bucket: bucketName,
                Key: obj.Key,
                Expires: 31536000 // one year in seconds
            })
        }
    });
}

const getTemplateObject = async () => {
    return await s3.getObject({
        Bucket: 'documentdata132943-dev',
        Key: 'template.html'
    }).promise();
}