import "reflect-metadata"; 
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { createConnection, Connection } from "typeorm"; 
import { findMany } from './core/mysql';
import AWS from 'aws-sdk';

import {updates} from "./entity/updates"; 

const flash = require('connect-flash');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const hpp = require('hpp');

dotenv.config();

if (!process.env.PORT) {
   process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(flash());
app.use(compression());

app.use(helmet.hidePoweredBy()); // change value of X-Powered-By header to given value
//app.use(helmet.noCache()); // set Cache-Control header
app.use(helmet.noSniff()); // set X-Content-Type-Options header
app.use(helmet.frameguard()); // set X-Frame-Options header
app.use(helmet.xssFilter()); // set X-XSS-Protection header

// This must be before passport initializing
app.use(express.static(`${__dirname}/public`));

app.use(cors());
app.use(express.json());

const cookieVar = {
	secure: process.env.isHTTPSessionSecure, // if site is https then must be true otherwise must be false
	maxAge: 60000 * 60, /* Session expires in 1 hour */
	httpOnly: true, // Mitigate XSS, cookies are not accessible from javascript
	path : '/',
	//domain: 'testingserver.com',
}


const redis   = require("redis");
const redisStore = require('connect-redis')(session);
var redisClient = redis.createClient({ url: process.env.REDIS_URL });
app.use(session({
	name: 'Digishares-387674',
	secret: "aaawfwefwefwefwefwefwefweff",
	store: new redisStore({client: redisClient, ttl : 260}),
	resave: false,
	saveUninitialized: false,
	rolling: true,
	cookie: cookieVar
}));
//global["redisClient"] = redisClient;

app.use(hpp());


app.use(bodyParser.json({limit: "2mb"}));
app.use(bodyParser.urlencoded({limit: "2mb", extended: false}));

require('./core/routes')(app);

//Custom error handling
app.use(errorHandler);
app.use(notFoundHandler);


(async () => {

	const connection = await createConnection();

	/*
		import {updates} from "./entity/updates"; 	
		const upd = new updates(); 
		upd.TITLE = "first orm";
		upd.details = "detaile of orm"
		upd.stoid = 1;
		await connection.manager.save(upd); 
		console.log("Saved a new user with id: " + upd.ID);
 
		findMany("select * from updates", []).then(data=>{
			//console.log(data);
		})
	*/		

	app.listen(PORT, () => {

		const SESConfig = {
			/*apiVersion: "latest",
			accessKeyId: process.env.AWS_ACCESS_KEY,
			accessSecretKey: process.env.AWS_SECRET_KEY,*/
			region: "US-East-1"
		}
		AWS.config.update(SESConfig);

		console.log(`Listening on port ${PORT}`);
	});

})();



 

/**
  Routes are available as followings
  
  curl http://localhost:7000/api/menu/items -i
  curl http://localhost:7000/api/menu/items/2 -i
 
  add a new item 
	curl -X POST -H 'Content-Type: application/json' -d '{
	  "name": "Salad",
	  "price": 499,
	  "description": "Fresh",
	  "image": "https://images.ctfassets.net/23aumh6u8s0i/5pnNAeu0kev0P5Neh9W0jj/5b62440be149d0c1a9cb84a255662205/whatabyte_salad-sm.png"
	}' http://localhost:7000/api/menu/items -i
	

  update an item
	curl -X PUT -H 'Content-Type: application/json' -d '{
	  "name": "Spicy Pizza",
	  "price": 599,
	  "description": "Blazing Good",
	  "image": "https://images.ctfassets.net/23aumh6u8s0i/2x1D2KeepKoZlsUq0SEsOu/bee61947ed648848e99c71ce22563849/whatabyte_pizza-sm.png"
	}' http://localhost:7000/api/menu/items/2 -i	


	curl -X DELETE http://localhost:7000/api/menu/items/2 -i
*/



