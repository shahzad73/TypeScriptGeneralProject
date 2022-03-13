import express, { Request, Response } from "express";
import { createConnection, Connection } from "typeorm"; 
import {getConnection} from "typeorm";
import {updates} from "../entity/updates"; 	
var jsonwebtoken = require('jsonwebtoken');


export const loginRouter = express.Router();

loginRouter.get("/login", async (req: Request, res: Response) => {

    /*const connection = getConnection();
	const rec = await connection
    .getRepository(updates)
    .createQueryBuilder("updates")
    .where("updates.id = :id", { id: 103 })
    .getOne();

     connection
    .createQueryBuilder()
    .update("updates")
    .set({ 
        TITLE: "111....updated .....", 
        details: "22222........ iiiii",
    })
    .where("id = :id", { id: 100 })
    .execute();

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from("updates")
    //.where("id = :id", { id: 100 })
    .execute();
    */


    res.json({
        token: jsonwebtoken.sign({ user: 'johndoe' }, process.env.JWT_SECRET)
    });

});

