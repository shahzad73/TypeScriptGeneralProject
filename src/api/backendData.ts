import express, { Request, Response } from "express";
import {updates} from "../entity/updates";
import { createConnection, Connection, getConnection } from "typeorm"; 
import { update } from "src/core/mysql";

export const bckendDataRouter = express.Router();

bckendDataRouter.get("/getAllUpdates", async (req: Request, res: Response) => {
    res.send ( await updates.find() );
});

bckendDataRouter.get("/getUpdate", async (req: Request, res: Response) => {
    res.send( await updates.find({
        where: {  ID: req.query.id  }
    }) );
});

bckendDataRouter.post("/addNewUpdates", async (req: Request, res: Response) => {
    const data = await updates.insert ( req.body );
    res.json({id: data.raw.insertId});
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

    await getConnection()
    .createQueryBuilder()
    .update(updates)
    .set(req.body)
    .where("id = :id", { id: tid })
    .execute();

    res.send("done")
});
