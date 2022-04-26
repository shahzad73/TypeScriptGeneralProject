import express, { Request, Response } from "express";
import { getConnection, getManager } from "typeorm"; 
import {validate} from "class-validator";
import {users} from "../../entity/users";


export const bckendDataRouter = express.Router();

bckendDataRouter.get("/test", async (req: Request, res: Response) => {
    res.json ( {"data": "1", "uuu": "2"} )  
});


bckendDataRouter.get("/getProfile", async (req: Request, res: Response) => {
    const usr = await users.find({
        where: {  ID: req.body.userid  }
    });

    res.json(  usr  );
});

