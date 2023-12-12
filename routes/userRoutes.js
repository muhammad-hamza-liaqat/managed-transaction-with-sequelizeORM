const express = require("express");
const transection = require("../controller/userController");
const app = express();
const myroutes = express.Router();

myroutes.route('/send')
.get((req,res)=>{
    res.end("hello from routes")
})
.post(transection);

module.exports = myroutes
