import { bckendDataRouter } from "../api/platform/backend.router";

const jwt = require('express-jwt');

module.exports = function(app: any){
    //JWT security 
    app.use(jwt({ secret: process.env.JWT_PLATFORM_SECRET, algorithms: ['HS256'] }));

    app.use("/platform/backend", bckendDataRouter);    
}
