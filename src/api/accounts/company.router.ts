import express, { Request, Response } from "express";
import { getConnection, getManager } from "typeorm"; 
import { validate } from "class-validator";
import { users } from "../../entity/users";
import { company } from "../../entity/company";
import {contacts_types} from "../../entity/contact_types";
import { findMany } from "../../core/mysql";
import { company_paragraphs } from "../../entity/company_paragraphs";
import { company_contacts } from "../../entity/company_contacts";
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
    res.json( data );
});

companyDataRouter.get("/getcompanydetails", async (req: Request, res: Response) => {
    const cmp = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(company, "company")
    .where("id = :id", { id: req.query.id })
    .execute();    

    res.json( cmp[0] );
});

companyDataRouter.get("/getcompanyparagraphs", async (req: Request, res: Response) => {
    const para = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(company_paragraphs, "company_paragraphs")
    .where("companyID = :id", { id: req.query.id })
    .execute();    
    
    res.json( para );
});


companyDataRouter.post("/addParamgraph", async (req: Request, res: Response) => {
    req.body.userid = req.userid;

    const manager = getManager();
    const newUpdates = manager.create(company_paragraphs, req.body);    

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({id: -1, error: errors});
    } else {
        await company_paragraphs.insert ( newUpdates );

        const para = await getConnection()
        .createQueryBuilder()
        .select(["*"])
        .from(company_paragraphs, "company_paragraphs")
        .where("companyID = :id", { id: newUpdates.companyID })
        .execute();    
        
        res.json( para );

    }
});

companyDataRouter.get("/deleteParagraph", async (req: Request, res: Response) => {

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(company_paragraphs)
    .where("id = :id and companyID = :companyID", { id: req.query.id, companyID: req.query.companyID })
    .execute();

    const para = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(company_paragraphs, "company_paragraphs")
    .where("companyID = :id", { id: req.query.companyID })
    .execute();    
    
    res.json( para );

});

companyDataRouter.post("/deleteContact", async (req: Request, res: Response) => {
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(company_contacts)
    .where("id = :id and companyID = :companyID", { id: req.body.id, companyID: req.body.companyID })
    .execute();

    res.json(   await getCompanyProfile(req.body.companyID)  );
});


companyDataRouter.post("/addContact", async (req: Request, res: Response) => {

    const manager = getManager();
    const newUpdates = manager.create(company_contacts, req.body);    

    const errors = await validate(newUpdates);

    if (errors.length > 0) {
        res.json({id: -1, error: errors});
    } else {
        const data = await company_contacts.insert ( newUpdates );
        res.json(   await getCompanyProfile(req.body.companyID)  );
    }
});



async function getCompanyProfile(companyid: number) {
    var data = {}

    const typ1 = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(contacts_types, "contacts_types")
    .where("type = :id", { id: 1 })
    .execute();
    data.mobileTypes = typ1;


    const usrContacts = await findMany(`select u.id, u.contact, u.nameOfPerson, c.title 
        from contacts_types c, company_contacts u 
        where u.contactTypeID = c.id and u.companyID = ?`, [companyid])
    data.userContacts = usrContacts;


    return data;
}