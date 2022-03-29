
module.exports = function(app: any){

    //app.use("/public", publicRouter);
    //app.use("/backend/accounts", accountsRouter);    
    //app.use("/backend/platform", platformRouter);        

    require('./routes.public')(app);
    require('./routes.platform')(app);
    require('./route.accounts')(app);
 
}

