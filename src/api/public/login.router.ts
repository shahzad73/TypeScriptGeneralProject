import express, { Request, Response } from "express";
import { createConnection, Connection } from "typeorm"; 
import {getConnection} from "typeorm";
import {users} from "../../entity/users"; 	
var jsonwebtoken = require('jsonwebtoken');


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
            status:1, token: jsonwebtoken.sign(data, process.env.JWT_SECRET),
        });
    }
});


loginRouter.post("/loginplatform", async (req: Request, res: Response) => {

    const usr = await users.find({
        where: {  email: req.body.email,   password: req.body.password  }
    });

    if(usr == null || usr.length == 0) {
        res.json({
            status:0
        });
    } else {
        const data = { id: usr[0].ID, role:"platform",  name: usr[0].firstname + " " + usr[0].lastname };

        res.json({
            status:1, token: jsonwebtoken.sign(data, process.env.JWT_SECRET)
        });
    }
});
