import express, { Request, Response } from "express";
import { createConnection, Connection } from "typeorm"; 
import {getConnection} from "typeorm";
import {users} from "../entity/users"; 	
var jsonwebtoken = require('jsonwebtoken');


export const loginRouter = express.Router();

loginRouter.post("/login", async (req: Request, res: Response) => {
         
    console.log(req.body)

    const usr = await users.find({
        where: {  email: req.body.email,   password: req.body.password  }
    });



    if(usr == null || usr.length == 0) {
        res.json({
            status:0
        });
    } else {
        const data = { id: usr[0].ID, name: usr[0].firstname + " " + usr[0].lastname };
        console.log(data);
        res.json({
            status:1, token: jsonwebtoken.sign(data, process.env.JWT_SECRET)
        });
    }
});

