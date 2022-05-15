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


companyDataRouter.post("/createcompany", async (req: Request, res: Response) => {
    req.body.userid = req.userid;

    const manager = getManager();
    const newUpdates = manager.create(company, req.body);    

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({id: -1, error: errors});
    } else {
        const data = await company.insert ( newUpdates );
        res.json( {"id": 1} );
    }
})



companyDataRouter.get("/getdetails", async (req: Request, res: Response) => {
    const data = await getCompanyProfile( req.query.id );
    console.log(data);
    res.json( data );
})



async function getCompanyProfile(companyid: number) {
    var data = {}

    const cmp = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(company, "company")
    .where("id = :id", { id: companyid })
    .execute();    

    data.company = cmp[0];

    return data;
}