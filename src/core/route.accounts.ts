import { bckendDataRouter } from "../api/accounts/backend.router";
var jwt = require('jsonwebtoken');


module.exports = function(app: any){

    app.use("/accounts/backend", securityAccount,  bckendDataRouter);    
}


const securityAccount = function (req: any, res: any, next: any) {
    const tok = req.headers.authorization.split(' ')[1];

    jwt.verify(tok, process.env.JWT_SECRET, function(err: any, decoded: any) {
            if (err) {
                console.log("error ....  " + err)
            } else { 
                if(decoded.role == "account") {
                    req.body.userid = decoded.id;
                    next();
                } else 
                    console.log("not correct tole")
            }
      });

}