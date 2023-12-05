const express = require("express");
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 3000;
const dbConnection = require("./database/connection")
const myroutes = require("./routes/userRoutes")
require("./model/association");



// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());



// routes 
app.use("/api",myroutes);


// server
app.listen(PORT, ()=>{
    console.log(`server running at localhost:/${PORT}`)
})
