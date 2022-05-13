import express, { Request, Response } from "express";
import { getConnection, getManager } from "typeorm"; 
import {validate} from "class-validator";
import {users} from "../../entity/users";
import {company} from "../../entity/company";
import { findMany } from "../../core/mysql";


export const companyDataRouter = express.Router();

companyDataRouter.get("/companies", async (req: Request, res: Response) => {

    const typ2 = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(company, "company")
    .where("userid = :id", { id: req.userid })
    .execute();
    res.json( typ2 );

})