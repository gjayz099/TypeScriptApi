import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { ruruHTML  } from "ruru/server"; 
import { connectDb,  } from './src/db/dbConnect';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
// import file
import rootUser from './src/graphqlRoute/User';
import schemaUser from './src/graphqlSchemma/User';

import rootFlight from "./src/graphqlRoute/Flight";
import schemaFlight from "./src/graphqlSchemma/Flight";

import rootPassenger from "./src/graphqlRoute/Passenger";
import schemaPassenger from "./src/graphqlSchemma/Passenger";

import rootBooking from "./src/graphqlRoute/Booking";
import schemaBooking from "./src/graphqlSchemma/Booking";

import rootCheckin from "./src/graphqlRoute/Checkin";
import schemaCheckin from "./src/graphqlSchemma/Checkin";

import rootBaggage from "./src/graphqlRoute/Baggage";
import schemaBaggage from "./src/graphqlSchemma/Baggage";

import rootPayment from "./src/graphqlRoute/Payment";
import schemaPayment from "./src/graphqlSchemma/Payment";

import cors from 'cors'



dotenv.config();


// Establish Cors 


const app = express();
const PORT =  !process.env.DBNAME || 3000;

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



var schema = buildSchema(`
  type Query {
    hello: String
  }
`)
 
var root = {
  hello() {
    return "Hello world!"
  },
}
 
 
app.all("/graphql", createHandler({
    schema: schema,
    rootValue: root,
  })
)



app.all('/User', createHandler({
  schema: schemaUser,
  rootValue: rootUser,
}));

app.all('/Flight', createHandler({
  schema: schemaFlight,
  rootValue: rootFlight,
}));
  

app.all('/Passenger', createHandler({
  schema: schemaPassenger,
  rootValue: rootPassenger,
}));
  


app.all('/Booking', createHandler({
  schema: schemaBooking,
  rootValue: rootBooking,
}));
  

app.all('/Checkin', createHandler({
  schema: schemaCheckin,
  rootValue: rootCheckin,
}));
  

app.all('/Baggage', createHandler({
  schema: schemaBaggage,
  rootValue: rootBaggage,
}));

app.all('/Payment', createHandler({
  schema: schemaPayment,
  rootValue: rootPayment,
}));

  
  
  

// Serve GraphiQL IDE using `ruruHTML`
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});
app.get('/airline-user/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/User' })); 
});


app.get('/airline-flight/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/Flight' })); 
});

app.get('/airline-passenger/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/Passenger' })); 
});


app.get('/airline-booking/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/Booking' })); 
});

app.get('/airline-checkin/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/Checkin' })); 
});


app.get('/airline-baggage/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/Baggage' })); 
});


app.get('/airline-payment/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/Payment' })); ``
});




// Start the Express server
app.listen(PORT, () => {
    connectDb()
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/airline-user`);
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/airline-flight`);
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/airline-passenger`);
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/airline-booking`);
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/airline-checkin`);
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/airline-baggage`);
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/airline-payment`);
  console.log(`Server running at http://localhost:${PORT}/`);
});
