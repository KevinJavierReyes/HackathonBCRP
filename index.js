const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const rooter = require("./lib/rootes.js");
const sendMessages = require("./lib/sendMessage/sendMessages.js");
const buildMessages = require("./lib/sendMessage/buildMessage.js");

app.use(bodyParser.json());

app.get("/",rooter.validatingFacebook);

app.post("/",rooter.responsingFacebook);

// app.post("/enviarAlerta",(req,res)=>{
// 	sendMessages('2140524799331285',[buildMessages.text('2140524799331285','Encontramos a menor precio el producto que tanto querias :3')]);
// 	res.send("");
// });

app.listen(3000);

