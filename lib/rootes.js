const db = require("./bd/bd.js");
const sendMessages = require("./sendMessage/sendMessages.js");
const buildMessages = require("./sendMessage/buildMessage.js");
const tryMessages = require("./tryMessages");
const useful = require("./useful/functionUsefuls.js");
const visual = require("./visual");

module.exports = class bot {

    static validatingFacebook(req, res) {
        let VERIFY_TOKEN = "Javier";
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                res.status(200).send(challenge);
            } else {
                res.sendStatus(403);
            }
        } else res.send("No deberias estar aquí !!!!");
    }

    static responsingFacebook(req, res) {
        let data = req.body;
        if (data.object = "page")
            data.entry.forEach(function(entry) {
                if (entry.messaging)
                    entry.messaging.forEach(function(messaging) {
                        if (messaging.postback) {
                            let msg = messaging.postback;
                            if (msg.payload) {
                                tryMessages(msg.payload, messaging.sender.id);
                            }
                        }
                        if (messaging.message) {
                            let msg = messaging.message;
                            if (msg.text) {
                                tryMessages(msg.text, messaging.sender.id);
                            }
                            // if(msg.attachments){
                            //     msg.attachments.forEach((val)=>{
                            //         visual(val,(er,rs)=>{
                                        
                            //         });
                            //     });
                            // }
                        }
                    });
            })
        res.send("");
    }

}