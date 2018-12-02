var request = require('request');
const TOKEN = "EAAL3vfqtkZBIBAMGYqZCrzZBZAcnmsicsIhOebkU083Fj8goebJq2pXRawgvPun8W7EdJ8ti2HZAwfJpZAsw1hAW2BTuNgzkrXrUdT9aNzKxmppblEZA5GOXknnqEl3nhdlNsbOlelo4H174gkknFR050GTEbJ7TkKOLCs3CuwBBAZDZD";
var usuarios = {};

function send(id,array){
    
  if (!usuarios[id]) {
    usuarios[id] = 0;
  } 
	
  request({
    url:'https://graph.facebook.com/v2.6/me/messages',
    method:'POST',
    qs:{"access_token":TOKEN},
    json:array[usuarios[id]]
	},function (err,res,data) {

    if(res.statusCode == 200){
      
      usuarios[id] += 1;
      if(array.length == usuarios[id]){
        delete usuarios[id];         
    	}
    	else{
        send(id,array);
    	}
    		     	
    }
  });
}

module.exports = send;

