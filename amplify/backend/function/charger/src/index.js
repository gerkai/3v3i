const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const handlebars = require('handlebars');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
module.exports.handler = async (event) => {
    try {
        const cognitoIdentity = 'us-east-1:0b952b94-1dbd-40dc-8f9c-870498736f00';
        //const cognitoIdentity = event.requestContext.identity.cognitoIdentityId;
        const photos = await getPhotosFromS3(cognitoIdentity);
        const formData = await getFormData(cognitoIdentity);
        const style = await getStyle();
        const logo = await getLogo();
        console.log(logo)
        const templateObject = await getTemplateObject();

        // Compile the HTML template using Handlebars
        handlebars.registerHelper("inc", function (value, options) {
            return parseInt(value) + 1;
        });
        handlebars.registerHelper('ifCond', function (v1, v2, options) {
            if (v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
        const template = handlebars.compile(templateObject.Body.toString());
        const html = template({ photos, formData, style, logo });

        // Upload the generated HTML docum ent to S3
        const htmlKey = `private/${cognitoIdentity}/documents/${Date.now()}.html`;
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

const getStyle = async () => {
    const s3 = new AWS.S3();
    const myBucket = 'documentdata132943-dev';

    const myKey = 'assets/css/style.css';
    const signingParams = {
        Bucket: myBucket,
        Key: myKey,
        Expires: 31536000 // one year in seconds
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', signingParams, (err, url) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(url);
            }
        });
    });
}

const getLogo = async () => {
    const s3 = new AWS.S3();
    const myBucket = 'documentdata132943-dev';

    const myKey = 'assets/images/1.png';
    const signingParams = {
        Bucket: myBucket,
        Key: myKey,
        Expires: 31536000 // one year in seconds
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', signingParams, (err, url) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(url);
            }
        });
    });
}

const getPhotosFromS3 = async (identityId) => {
    const s3 = new AWS.S3();
    const bucketName = 'documentdata132943-dev';
    const s3Objects = await s3.listObjectsV2({
        Bucket: bucketName,
        Prefix: `private/${identityId}/photos`
    }).promise();

    const photos = {};
    photos["TypeDDispensers"] = [];
    photos["Type1DDispensers"] = [];
    photos["Constants"] = [];
    photos["PowerCabinets"] = [];

    for (let obj of s3Objects.Contents) {
        const fileName = obj.Key.split('/').pop().split('.')[0];
        const headObjectResult = await s3.headObject({
            Bucket: bucketName,
            Key: obj.Key
        }).promise();
        const metadata = headObjectResult.Metadata;
        const dispenserNumber = metadata.dispensernumber;
        const overallDispenserNumber = metadata.overalldispensernumber;
        const dispenser = metadata.dispenser;
        const type = metadata.type;
        const constant = metadata.constant;
        const powercabinet = metadata.powercabinet;
        const cabinetNumber = metadata.cabinetnumber;
        const promptKey = metadata.promptkey;

        if (type === "D") {
            let dispenserIndex = photos["TypeDDispensers"].findIndex(dispenser => dispenser.DispenserNumber == dispenserNumber);
            if (dispenserIndex === -1) {
                dispenserIndex = photos["TypeDDispensers"].length;
                photos["TypeDDispensers"][dispenserIndex] = {};
                photos["TypeDDispensers"][dispenserIndex]["DispenserNumber"] = dispenserNumber;
                photos["TypeDDispensers"][dispenserIndex]["OverallDispenserNumber"] = overallDispenserNumber;
                photos["TypeDDispensers"][dispenserIndex]["Photos"] = {};
            }

            photos["TypeDDispensers"][dispenserIndex]["Photos"][promptKey] =
                s3.getSignedUrl('getObject', {
                    Bucket: bucketName,
                    Key: obj.Key,
                    Expires: 31536000 // one year in seconds
                })

        } else if (type === "1D") {
            let dispenserIndex = photos["Type1DDispensers"].findIndex(dispenser => dispenser.DispenserNumber == dispenserNumber);
            if (dispenserIndex === -1) {
                dispenserIndex = photos["Type1DDispensers"].length;
                photos["Type1DDispensers"][dispenserIndex] = {};
                photos["Type1DDispensers"][dispenserIndex]["DispenserNumber"] = dispenserNumber;
                photos["Type1DDispensers"][dispenserIndex]["OverallDispenserNumber"] = overallDispenserNumber;
                photos["Type1DDispensers"][dispenserIndex]["Photos"] = {};
            }

            photos["Type1DDispensers"][dispenserIndex]["Photos"][promptKey] =
                s3.getSignedUrl('getObject', {
                    Bucket: bucketName,
                    Key: obj.Key,
                    Expires: 31536000 // one year in seconds
                })
        } else if (!!constant) {
            photos["Constants"][promptKey] =
                s3.getSignedUrl('getObject', {
                    Bucket: bucketName,
                    Key: obj.Key,
                    Expires: 31536000 // one year in seconds
                })
        } else if (!!powercabinet) {
            let powerCabinetIndex = photos["PowerCabinets"].findIndex(cabinet => cabinet.CabinetNumber == cabinetNumber);
            if (powerCabinetIndex === -1) {
                powerCabinetIndex = photos["PowerCabinets"].length;
                photos["PowerCabinets"][powerCabinetIndex] = {};
                photos["PowerCabinets"][powerCabinetIndex]["CabinetNumber"] = cabinetNumber;
                photos["PowerCabinets"][powerCabinetIndex]["Photos"] = {};
            }

            photos["PowerCabinets"][powerCabinetIndex]["Photos"][promptKey] =
                s3.getSignedUrl('getObject', {
                    Bucket: bucketName,
                    Key: obj.Key,
                    Expires: 31536000 // one year in seconds
                })
        }
        else {
            console.log(metadata)
        }
    }

    return photos;
};

const getFormData = async (identityId) => {
    const s3 = new AWS.S3();
    const bucketName = 'documentdata132943-dev';
    const jsonFile = await s3.getObject({
        Bucket: bucketName,
        Key: `private/${identityId}/forminputs.json`
    }).promise();
    return JSON.parse(jsonFile.Body.toString());
}

const getTemplateObject = async () => {
    return await s3.getObject({
        Bucket: 'documentdata132943-dev',
        Key: 'template.html'
    }).promise();
}