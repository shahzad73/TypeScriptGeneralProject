import fs from "fs";
import { s3DeleteFile } from "../common/s3";

async function deleteFileFromuploadedLocation(file:string, destination:number): Promise<void> {

    if(destination == 1) {
        fs.unlink(__dirname + "/../../public/files/" + file, async function() {
            return;
        })
    } else if(destination == 2) {
        await s3DeleteFile(file, "inftmaker");
        return;
    } else if(destination == 3) {
        await s3DeleteFile(file, "inftmaker");
        return;
    } else
        return;

}


export {
    deleteFileFromuploadedLocation
}