import { bckendDataRouter } from "../api/accounts/backend.router";

const jwt = require('express-jwt');

module.exports = function(app: any){
    //JWT security
    app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }));

    app.use("/accounts/backend", bckendDataRouter);    
}
