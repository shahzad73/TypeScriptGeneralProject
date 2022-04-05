import express, { Request, Response } from "express";
import {updates} from "../../entity/updates";
import { getConnection, getManager } from "typeorm"; 
import {validate} from "class-validator";

export const bckendDataRouter = express.Router();

bckendDataRouter.get("/test", async (req: Request, res: Response) => {
    res.json ( {"data": "1", "uuu": "2"} )  
});

