import express, { Request, Response } from "express";
import { getConnection, getManager } from "typeorm"; 
import {validate} from "class-validator";
import {users} from "../../entity/users";
import {getBucketsList} from "../../common/s3";
import {uploadFile} from "../../common/s3";
import {deleteFile} from "../../common/s3";
import {uploadFileFileBase} from "../../common/s3";


export const bckendDataRouter = express.Router();

bckendDataRouter.get("/test", async (req: Request, res: Response) => {

    console.log("sending")
    uploadFileFileBase("", "").then(data => {
      console.log( data )
      res.json ( {"data": "1", "uuu": "2"} )    
    })


})


bckendDataRouter.get("/getProfile", async (req: Request, res: Response) => {
    const usr = await users.find({
        where: {  ID: req.body.userid  }
    });

    res.json(  usr  );
});

