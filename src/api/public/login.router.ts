import express, { Request, Response } from "express";
import { createConnection, Connection } from "typeorm"; 
import { getConnection, getManager } from "typeorm"; 
import {users} from "../../entity/users"; 	
import {platformusers} from "../../entity/platformusers"; 	
import {register} from "../../entity/register"; 	
var jsonwebtoken = require('jsonwebtoken');
import {validate} from "class-validator";
import { v4 as uuidv4 } from 'uuid';
var SHA256 = require("crypto-js/sha256");


export const loginRouter = express.Router();


loginRouter.get("/test" , async (req: Request, res: Response) => { 
    res.send("ddddddddd")
})


loginRouter.post("/login", async (req: Request, res: Response) => {

    const usr = await users.find({
        where: {  email: req.body.email,   password: req.body.password  }
    });

    if(usr == null || usr.length == 0) {
        res.json({
            status:0
        });
    } else {
        const data = { id: usr[0].ID,  role:"account",  name: usr[0].firstname + " " + usr[0].lastname };

        res.json({
            status:1, 
            token: jsonwebtoken.sign(data, process.env.JWT_SECRET)
        });
    }
});


loginRouter.post("/loginplatform", async (req: Request, res: Response) => {

    const usr = await platformusers.find({
        where: {  username: req.body.email,   password: req.body.password  }
    });

    console.log(  usr  );

    if(usr == null || usr.length == 0) {
        res.json({
            status:0
        });
    } else {
        const data = { id: usr[0].ID, role:"platform",  name: usr[0].firstname + " " + usr[0].lastname };

        res.json({
            status:1, 
            token: jsonwebtoken.sign(data, process.env.JWT_SECRET)
        });
    }
});


loginRouter.post("/register", async (req: Request, res: Response) => {

    const manager = getManager();
    const newRegister = manager.create(register, req.body);    
    newRegister.secret = uuidv4();
    const errors = await validate(newRegister);

    if (errors.length > 0) {
        res.json({id: -1, error: errors});
    } else {
        let data = null;

        newRegister.password = SHA256(newRegister.secret + newRegister.password).toString();

        data = await users.findOne({ email: req.body.email })
        if( data == null ) {
            data = await register.findOne({ email: req.body.email })
            if(data == null) {
                data = await register.insert ( newRegister );
                res.json({id: 1});
            } else {
                res.json({id: -2, error: [{constraints: {"record found": "User is already registered. Please select another user name"}}]});
            }
        } else {
            res.json({id: -2, error: [{constraints: {"record found": "User is already registered. Please select another user name"}}]});
        }

    }

});
