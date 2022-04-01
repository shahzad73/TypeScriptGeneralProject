import express, { Request, Response } from "express";
import {updates} from "../../entity/updates";
import { getConnection, getManager } from "typeorm"; 
import {validate} from "class-validator";
import moment from "moment";

export const bckendDataRouter = express.Router();

bckendDataRouter.get("/getAllUpdates", async (req: Request, res: Response) => {
    res.send ( await updates.find({  
            skip: 0,    // page
            take: 100 })  // number of items
    );
});

bckendDataRouter.get("/getUpdate", async (req: Request, res: Response) => {

    /*var dat = await updates.find({        
        where: {  ID: req.query.id  }
    });*/

    var dat = await getConnection()
    .createQueryBuilder()
    .select([
        'ID',
        'TITLE',
        'details',
        'UpdateDate'
    ])
    .from(updates)
    .where("id = :id", { id: req.query.id })
    .execute();

    var dateFormat = 'MMMM DD, YYYY';
    if (moment(moment( dat[0].UpdateDate ).format(dateFormat),dateFormat,true).isValid()) {
        dat[0].UpdateDate = moment(dat[0].UpdateDate).format(dateFormat) 
    } else
        dat[0].UpdateDate = "January 01, 2000"

    res.send( dat );
});

bckendDataRouter.post("/addNewUpdates", async (req: Request, res: Response) => {

    const manager = getManager();
    const newUpdates = manager.create(updates, req.body);    
    newUpdates.stoid = 0;

    const errors = await validate(newUpdates);

    if (errors.length > 0) {
        res.json({id: -1, error: errors});
    } else {
        const data = await updates.insert ( newUpdates );
        res.json({id: data.raw.insertId});
    }
});

bckendDataRouter.get("/deleteUpdates", async (req: Request, res: Response) => {

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(updates)
    .where("id = :id", { id: req.query.id })
    .execute();

    res.send ( await updates.find() );
});

bckendDataRouter.post("/updateUpdates", async (req: Request, res: Response) => {
    const tid = req.body.ID
    delete req.body.ID;
    
    const manager = getManager();
    const newUpdates = manager.create(updates, req.body);    
    const errors = await validate(newUpdates);

    if (errors.length > 0) {
        res.json({id: -1, error: errors});
    } else {
        await getConnection()
        .createQueryBuilder()
        .update(updates)
        .set(req.body)
        .where("id = :id", { id: tid })
        .execute();
    
        res.send("done");
    }

});
