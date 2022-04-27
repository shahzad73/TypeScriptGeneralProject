import express, { Request, Response } from "express";
import { sendEmail } from '../../common/mailer';
import { inbox } from "../../entity/inbox";
import { getConnection, getManager } from "typeorm"; 


export const bckOtherRouters = express.Router();

bckOtherRouters.post("/sendEmail", async (req: Request, res: Response) => {

    try {
        await sendEmail("Shah Aslam", "sender@hot.com", req.body.email, req.body.TITLE, req.body.details,  )

        res.json({
            "status": 1
        })
    } catch (err: any) {
        res.json({
            "status": 0, message: err.toString() + "  Error occurred in sending email "
        })
    }

});

bckOtherRouters.get("/getAllInbox", async (req: Request, res: Response) => {
    res.send ( await inbox.find({  
            skip: 0,    // page
            take: 100 })  // number of items
    );
});

bckOtherRouters.get("/deleteInbox", async (req: Request, res: Response) => {

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(inbox)
    .where("id = :id", { id: req.query.id })
    .execute();

    res.send ( await inbox.find() );
});

bckOtherRouters.get("/getInboxDetails", async (req: Request, res: Response) => {

    var dat = await getConnection()
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
    .where("id = :id", { id: req.query.id })
    .execute();

    res.send( dat );
});

bckOtherRouters.post("/respondEmail", async (req: Request, res: Response) => {

    console.log(req.body);

    try {
        await sendEmail("Shah Aslam", "sender@hot.com", req.body.email, req.body.TITLE, req.body.details,  )

        res.json({
            "status": 1
        })
    } catch (err: any) {
        res.json({
            "status": 0, message: err.toString() + "  Error occurred in sending email "
        })
    }

});
