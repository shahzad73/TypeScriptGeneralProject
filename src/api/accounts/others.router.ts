import express, { Request, Response } from "express";
import { createConnection, Connection } from "typeorm"; 
import { getConnection, getManager } from "typeorm"; 
import {users} from "../../entity/users"; 	
import {inbox} from "../../entity/inbox"; 	
import {platformusers} from "../../entity/platformusers"; 	
import {register} from "../../entity/register"; 	
var jsonwebtoken = require('jsonwebtoken');
import {validate} from "class-validator";
var SHA256 = require("crypto-js/sha256");


export const othersDataRouter = express.Router();

othersDataRouter.get("/inbox", async (req: Request, res: Response) => {

    console.log( req.body )

    var email = await getConnection()
    .createQueryBuilder()
    .select([
        'ID',
        'Title',
        'Details',
        'DateEmail',
        'isResponded',
        'Response',  
        'ResponseDate'
    ])
    .from(inbox)
    .where("userID = :id", { id: req.body.userid })
    .execute();

    res.json( email );

});

othersDataRouter.post("/sendEmail", async (req: Request, res: Response) => {

    

});