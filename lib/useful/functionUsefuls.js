

module.exports = class {
	static getCurretDateYYYYMMDD(){
		var today = new Date();
	    today.setUTCHours(today.getUTCHours() - 5);
	    var dd = today.getUTCDate();
	    var mm = today.getUTCMonth() + 1;
	    var yyyy = today.getUTCFullYear();
	    var hour = today.getUTCHours();
	    var minute = today.getUTCMinutes();
	    var second = today.getUTCSeconds();
	    var millisecond = today.getUTCMilliseconds();
	    if (dd < 10) {
	        dd = '0' + dd;
	    }
	    if (mm < 10) {
	        mm = '0' + mm;
	    }
	    return `${yyyy}-${mm}-${dd}`;
	}

	static getToDayFirstYYYYMMDD() {
	    var today = new Date();
	    today.setUTCHours(today.getUTCHours() - 5);
	    var dd = today.getUTCDate();
	    var mm = today.getUTCMonth() + 1;
	    var yyyy = today.getUTCFullYear();
	    var hour = today.getUTCHours();
	    var minute = today.getUTCMinutes();
	    var second = today.getUTCSeconds();
	    var millisecond = today.getUTCMilliseconds()
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    return `${yyyy}-${mm}-01`;
	}

	static rowsToJson(rows){
		let baseArray = [];
		let id  = null;
		let baseJson = {};
		let index = 0;
		rows.forEach((item,idx)=>{
			if(id == item["cod_carta"]){
				baseJson.buttons.push({
					title:item["titulo_boton"],
					content:item["contenido_boton"],
					type:item["cod_tipoboton"]
				});
			}
			else{
				if(id != null){
					baseArray.push(baseJson);
					index++;
				}
				id = item["cod_carta"];
				baseJson = {
					index:index,
					categoria:item["cod_categoria"],
					title:item["titulo_carta"],
					subtitle:item["titulo_carta"] != null? item["titulo_carta"] : "",
					"url_image":item["url_carta"],
					buttons:[{
						title:item["titulo_boton"],
						content:item["contenido_boton"],
						type:item["cod_tipoboton"]
					}]
				}
				if(idx == rows.length - 1){
					baseArray.push(baseJson);
				}
			}
		});
		return baseArray;
	}

}