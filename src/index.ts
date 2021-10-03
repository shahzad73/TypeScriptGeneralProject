/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";


// Import all routes here  and then 
import { itemsRouter } from "./items/items.router";


dotenv.config();

if (!process.env.PORT) {
   process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();


/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());



// Routes settings with URL
app.use("/api/menu/items", itemsRouter);




//Custom error handling
app.use(errorHandler);
app.use(notFoundHandler);




/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});













 

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



