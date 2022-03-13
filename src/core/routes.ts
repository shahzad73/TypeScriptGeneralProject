import { itemsRouter } from "../api/items/items.router";
import { bckendDataRouter } from "../api/backendData";
import { loginRouter } from "../api/login.router";
const jwt = require('express-jwt');

module.exports = function(app: any){

    app.use("/api", loginRouter);

    //Under JWT security 
    app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }));
    app.use("/api/backend", bckendDataRouter);    

}

