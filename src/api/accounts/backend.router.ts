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
import { s3UploadFile } from '../../common/s3';
import { Exception } from "handlebars";
import { Web3Storage, getFilesFromPath } from 'web3.storage'
 
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

// ............... Files management 
bckendDataRouter.post("/uploadfile", async (req: Request, res: Response) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) 
            return res.status(400).send({ message: "Please upload a file!" });

        const filname = uuidv4() + path.extname( req.file.originalname );

        fs.rename(__dirname + "/../../uploads/" + req.file.originalname, __dirname + "/../../uploads/" + filname, async function(err) {

            if(req.query.destination == "1") {
                console.log("here.....")
                fs.rename(__dirname + "/../../uploads/" + filname, __dirname + "/../../../public/files/" + filname, function(err) {
                    console.log("file in internal puvlic");
                    res.send({'status': 1, fileName: filname});
                });
            }  

            if(req.query.destination == "2" || req.query.destination == "3") {
                // var newPath:String = await uploadFile(req.body.fileName, __dirname + "/../../uploads");
                try {
                    var bucket = "";
                    if(req.query.destination == "2")
                        bucket = "inftmaker";
                    if(req.query.destination == "3")                    
                        bucket = "inftmakerprivate"

                    const newPath = await s3UploadFile(filname, __dirname + "/../../uploads", bucket);

                    fs.unlink(__dirname + "/../../uploads/" + filname, async function() {
                        res.send({'status': 1, fileName: filname});
                    })    
                } catch (e:any) {
                    console.log("failed to upload files to s3")
                    res.send({'status': 0});
                }
            }
        
            if(req.query.destination == "4") {
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2QjdjRDgxNTRlNkI2REI1ZDZFMjQ4N2EwNGZGNzM3NTNiYUE1MjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU0NDY5NzIxNDksIm5hbWUiOiJJTkZUTWFrZXIifQ.4nvG3j2ebgjpJkMe_23j1nebw0oElxF2ajFxQo418uE";
                const client = new Web3Storage({ token })
                
                const files = await getFilesFromPath(__dirname + "/../../uploads/" + filname)
                const cid = await client.put(files)
                console.log(cid);

                fs.unlink(__dirname + "/../../uploads/" + filname, async function() {
                    res.send({'status': 1, fileName: filname});
                })
            }

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

// bckendDataRouter.post("/transferUploadedFile", async (req: Request, res: Response) => {

//     if(req.body.fileDestination == "1") {
//         //  move file to public files directory
//         fs.rename(__dirname + "/../../uploads/" + req.body.fileName, __dirname + "/../../../public/files/" + req.body.fileName, function(err) {
//             console.log("file in internal puvlic");
//             res.send({'status': 1});
//         });
//     }  
    
//     if(req.body.fileDestination == "2") {
//         // var newPath:String = await uploadFile(req.body.fileName, __dirname + "/../../uploads");
//         try {
//             const newPath = await s3UploadFile(req.body.fileName, __dirname + "/../../uploads");
//             res.send({'status': 1});
//         } catch (e:any) {
//             console.log("failed to upload files to s3")
//             res.send({'status': 0});
//         }
//     }

//     if(req.body.fileDestination == "3") {
//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2QjdjRDgxNTRlNkI2REI1ZDZFMjQ4N2EwNGZGNzM3NTNiYUE1MjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU0NDY5NzIxNDksIm5hbWUiOiJJTkZUTWFrZXIifQ.4nvG3j2ebgjpJkMe_23j1nebw0oElxF2ajFxQo418uE";
//         const client = new Web3Storage({ token })
        
//         console.log("cloud storage is going to happen");
//         const files = await getFilesFromPath(__dirname + "/../../uploads/" + req.body.fileName)
//         const cid = await client.put(files)
//         console.log(cid);
//         res.send({'status': 1});
//     }

// });
// //...................




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
