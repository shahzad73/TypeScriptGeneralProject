import AWS from 'aws-sdk';
import { bool } from 'aws-sdk/clients/signer';
import fs from 'fs';


async function getBucketsList(): Promise<any> {

    let promise = new Promise<any>((resolve, reject) => {
        const s3 = new AWS.S3({apiVersion: '2006-03-01'});

        s3.listBuckets((err: any, data: any) => {            
            if (err) {
                reject ("Error occurred in s3 getBucketsList - " + err.toString())
            } else
                resolve ( data.Buckets )
        })
    });

    return await promise;
}

async function uploadFile(fileName: string, filePath: string): Promise<string> {

    let promise = new Promise<any>((resolve, reject) => {

        const s3 = new AWS.S3({apiVersion: '2006-03-01'});
        const fileContent = fs.readFileSync(filePath)

        const params = {
            Bucket: "inftmaker",
            Key: `${fileName}`,
            Body: fileContent
        }


        s3.upload(params, (err: any, data: any ) => {
            if (err) {
                reject(err)
            }

            resolve( data.Location );
        })

    });

    return await promise;       

}

async function deleteFile(fileName: string): Promise<bool> {

    let promise = new Promise<any>((resolve, reject) => {

        const s3 = new AWS.S3({apiVersion: '2006-03-01'});

        const params = {
            Bucket: "inftmaker",
            Key: `${fileName}`,
        }


        s3.deleteObject(params, (err: any, data: any ) => {
            if (err) {
                reject(err)
            }
            resolve( true );
        })

    });

    return await promise;       

}

async function uploadFileFileBase(fileName: string, filePath: string): Promise<string> {
    let promise = new Promise<any>(async (resolve, reject) => {

        const myPictureFile = fs.readFileSync("/home/shahzad/background.jpeg")
        
        const AWS = require('aws-sdk');

        const s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            accessKeyId: '62D38ABC331888B0EF8F',
            secretAccessKey: '9Jd0aqwzymUMlwycoBuqrRE6u8xr3dSSoeOfWWVx',
            endpoint: 'https://s3.filebase.com',
            region: 'us-east-1',
            s3ForcePathStyle: true
        });

        const params = {
            Bucket: 'inftmaker',
            Key: 'testfile2.png',
            ContentType: 'image/png',
            Body: myPictureFile,
            ACL: 'public-read',
        };

        console.log("obj created")
        const request = s3.putObject(params);
        await request.send();
        console.log("file send")

        return "success";
        
    });

}


export {
    getBucketsList,
    uploadFile,
    deleteFile,
    uploadFileFileBase
}