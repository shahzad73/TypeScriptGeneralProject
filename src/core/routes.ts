
module.exports = function(app: any) {

    require('./routes.public')(app);
    require('./routes.platform')(app);
    require('./route.accounts')(app);
 
}

