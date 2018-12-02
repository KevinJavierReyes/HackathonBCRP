
var watson = require('watson-developer-cloud');


const config = require("./config.js");
const buildMessages = require("./sendMessage/buildMessage.js");
const sendMessages = require("./sendMessage/sendMessages.js");
const db = require("./bd/bd.js");
const useful = require("./useful/functionUsefuls.js");

var assistant = new watson.AssistantV1(config.watson);

var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
  version: '2018-10-15',
  iam_apikey: '',
  url: ""
});


module.exports = tryMessages;


function tryMessages(message,id){
	GettingUserSession(id,(context)=>{
		if(context != null){
			assistant.message({
				workspace_id: "",
				input: {'text': message},
				context:context
			},function(err, response) {
				if (err){
					console.log(err);
				}
				else{
					var ctx = JSON.parse(JSON.stringify(response["context"]));

			  		db.update_watson_context([JSON.stringify(response["context"]),id],(err)=>{
			  			if(!err){
				  			let arrayMessages = [];
							response["output"]["text"].forEach((item)=>{
								arrayMessages.push(buildMessages.text(id,item));
							});
							if(JsonEvent[response["context"]["phase"]])
								sendMessages(id,JsonEvent[response["context"]["phase"]](id,ctx,message,arrayMessages));
							else
								sendMessages(id,arrayMessages);
			  			}
			  		});
			  	}
			});
		}
		else{
			console.log("Error consultado usuario y creando contexto");
		}
	});
}

function GettingUserSession(id,callback){
	db.select_user([id],(err,res)=>{
		if(!err){
			if(res.length > 0){
				let user = res[0];
				if(user['watson'] != null && user['watson'] != ""){
					let context = JSON.parse(user['watson']);
					callback(context);
				}
				else{
					callback({
						"producto":null,
						"idfacebook":id,
						"precio" : null});
				}
			}
			else{
				db.insert_user(['{}',id],(err2)=>{
					if(!err2){
						callback({
						"producto":null,
						"idfacebook":id,
						"precio" : null});
					}
					else{
						callback(null);
					}
				});
			}
		}
		else{
			callback(null);
		}
	});
}

var JsonEvent = {

	"anything":function(id,context,message,arrayResponse){
		console.log("Discovery");
		discovery.query({ environment_id: 'b2fadd25-969b-4c45-b41b-709ec680aeba', collection_id: 'df7ad895-277d-410c-b1fa-8b502affdaaf', natural_language_query: message }, function(error, data) {
		  var rs = data["results"];
		  if(rs.length > 0){
		  	console.log("Discovery entendio");
		  	sendMessages(id,[buildMessages.text(id,rs[0]["response"])]);
		  }
		  else{
		  	console.log("Discovery no entendio");
		  	sendMessages(id,[buildMessages.text(id,"No pude entenderte :C")]);
		  }
		});
		return [];
	},
	"":function(id,context,message,arrayResponse){
		arrayResponse.push({
		  "recipient":{
		    "id":id
		  },
		  "message":{
		    "attachment":{
		      "type":"image", 
		      "payload":{
		        "url":"http://www.messenger-rocks.com/image.jpg", 
		        "is_reusable":true
		      }
		    }
		  }
		});
		return arrayResponse;
	}

}