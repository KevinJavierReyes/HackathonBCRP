


module.exports = class build{

	static text(id,message){
		return {
                recipient: {
                	id: id
                },
                message: {
                	text: message
                }
            };
	}

    static card(id,messages)  {

        var Cards =[];

        for(let i = 0 ; i < messages.length ; i++){
            let buttons = [] ;
            messages[i].buttons.forEach((button)=>{
                buttons.push(buildButton(button.type,button.title,button.content));
            }); 
            Cards.push({
                title: messages[i].title,
                "image_url": messages[i]["url_image"],
                subtitle: messages[i].subtitle || "",
                buttons: buttons   
            });
        };
      
        return {
            recipient:{id:id},
            message:{
                attachment:{
                    type:"template",
                    payload:{
                        "template_type":"generic",
                        elements: Cards
                    }
                }
            }
        };
    }

    static cardVertical(id,messages)  {

        var Cards =[];

        for(let i = 0 ; i < messages.length ; i++){
            let buttons = [] ;
            messages[i].buttons.forEach((button)=>{
                buttons.push(buildButton(button.type,button.title,button.content));
            }); 

            Cards.push({
                recipient:{id:id},
                message:{
                    attachment:{
                        type:"template",
                        payload:{
                            "template_type":"generic",
                            elements: [{
                                title: messages[i].title,
                                "image_url": messages[i]["url_image"],
                                subtitle: messages[i].subtitle || "",
                                buttons: buttons   
                            }]
                        }
                    }
                }
            });
        };
      
        return Cards;
    }


}


function buildButton(type,title,content){

    switch(type){
        case 1 : return {"type":"web_url","url":content,"title":title,"webview_height_ratio": "tall"};break;
        case 2 : return {"type":"postback","title":title,"payload":content};break;
        case 3 : return {"type":"phone_number","title":title, "payload":content};break;
        case 4 : return {"type":"element_share"};break;
        default: throw new Error("Type button not valid"); 
    }
};

