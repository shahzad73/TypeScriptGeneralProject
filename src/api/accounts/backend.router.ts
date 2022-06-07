import express, { Request, Response } from "express";
import { getConnection, getManager } from "typeorm"; 
import {validate} from "class-validator";
import {users} from "../../entity/users";
import {contacts_types} from "../../entity/contact_types";
import {user_contacts} from "../../entity/user_contacts";
import {user_addresses} from "../../entity/user_addresses";
import { findMany } from "../../core/mysql";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';


const uploadFile = require("../../common/fileupload");


export const bckendDataRouter = express.Router();

bckendDataRouter.get("/test", async (req: Request, res: Response) => {

})

bckendDataRouter.get("/getProfile", async (req: Request, res: Response) => {
    const usr = await getUserProfile(req.userid);
    res.json(  usr  );
});

bckendDataRouter.post("/setProfile", async (req: Request, res: Response) => {

    const manager = getManager();
    const newUpdates = manager.create(users, req.body);    
    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({id: -1, error: errors});
    } else {
        await getConnection()
        .createQueryBuilder()
        .update(users)
        .set(req.body)
        .where("id = :id", { id: req.userid })
        .execute();

        const usr = await getUserProfile(req.userid)    
        res.json(  usr  );
    }

});

bckendDataRouter.post("/addContact", async (req: Request, res: Response) => {
    req.body.userid = req.userid;

    console.log( req.body.userid )

    const manager = getManager();
    const newUpdates = manager.create(user_contacts, req.body);    

    const errors = await validate(newUpdates);

    if (errors.length > 0) {
        res.json({id: -1, error: errors});
    } else {
        const data = await user_contacts.insert ( newUpdates );
        const usr = await getUserProfile(req.userid);
        res.json(  usr  ); 
    }
})

bckendDataRouter.post("/deleteContact", async (req: Request, res: Response) => {
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(user_contacts)
    .where("id = :id and userid = :userid", { id: req.body.id, userid: req.userid })
    .execute();

    const usr = await getUserProfile(req.userid);
    res.json(  usr  );
});

bckendDataRouter.post("/addAddress", async (req: Request, res: Response) => {
    req.body.userid = req.userid;

    const manager = getManager();
    const newUpdates = manager.create(user_addresses, req.body);    

    const errors = await validate(newUpdates);

    if (errors.length > 0) {
        res.json({id: -1, error: errors});
    } else {
        const data = await user_addresses.insert ( newUpdates );
        const usr = await getUserProfile(req.userid);
        res.json(  usr  ); 
    }
});

bckendDataRouter.post("/deleteAddress", async (req: Request, res: Response) => {
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(user_addresses)
    .where("id = :id and userid = :userid", { id: req.body.id, userid: req.userid })
    .execute();

    const usr = await getUserProfile(req.userid);
    res.json(  usr  );
});

bckendDataRouter.post("/uploadfile", async (req: Request, res: Response) => {

    try {

        await uploadFile(req, res);

        if (req.file == undefined) 
            return res.status(400).send({ message: "Please upload a file!" });

        const filname = uuidv4() + path.extname( req.file.originalname );

        fs.rename(__dirname + "/../../uploads/" + req.file.originalname, __dirname + "/../../uploads/" + filname, function(err) {
            res.status(200).send({   fileName: filname   });
        });

    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
});


async function getUserProfile(userid: number) {
    var data = {}

    const usr = await getConnection()
    .createQueryBuilder()
    .select([
        "ID",
        "firstname", 
        "lastname", 
        "email", 
        "PassportNumber", 
        "NationalID", 
        "MaritalStatus", 
        "Occupation",
        "DATE_FORMAT(DOB, '%M %d %Y') as DOB"
    ])
    .from(users,"users")
    .where("id = :id", { id: userid })
    .execute();
    data.user = usr[0];


    const usrContacts = await findMany(`select u.id, u.contact, c.title 
        from contacts_types c, user_contacts u 
        where u.contactTypeID = c.id and u.userid = ?`, [userid])
    data.userContacts = usrContacts;


    const typ1 = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(contacts_types, "contacts_types")
    .where("type = :id", { id: 1 })
    .execute();
    data.mobileTypes = typ1;


    const typ2 = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(contacts_types, "contacts_types")
    .where("type = :id", { id: 2 })
    .execute();
    data.addressTypes = typ2;


    const usrAddresses = await findMany(`select u.id, c.title, u.contact, u.zip, u.state, u.country 
        from contacts_types c, user_addresses u 
        where u.contactTypeID = c.id and u.userid = ?`, [userid])
    data.usrAddresses = usrAddresses;

    
    return data;

}
