function autoHide(id,time=5000){//redMsgNotify
	setTimeout(function(){
		$(id).html("");
		$(id).text("");
		$(id).hide(1000);
	},time);
}

function timer(){
	setInterval(function (){
		$("#jsTimer").text(timer_increment());
	},1000);
}

function timer_increment() {
	var endTime = new Date();
	var timeDiff = endTime - startTime;
	timeDiff /= 1000;
	var seconds = Math.round(timeDiff % 60);
	timeDiff = Math.floor(timeDiff / 60);
	var minutes = Math.round(timeDiff % 60);
	timeDiff = Math.floor(timeDiff / 60);
	var hours = Math.round(timeDiff % 24);
	timeDiff = Math.floor(timeDiff / 24);
	var days = timeDiff;
	return (days + ":" + hours + ":" + minutes + ":" + seconds);
}

function floatVal(string, decimal=2, abs=true){
	var f 	= string.toString();
	
	f 		= (f.replace(",","."));
	f 		= parseFloat(f).toFixed(2);
	if(abs){
		return Math.abs(f);
	}else{
		return f;
	}
}

function stopAPI(intervalID){
	clearInterval(intervalID);
}

function writeProcess(text,id="#runningProcesses"){
	$(id).append(text+"<br/>").animate({
		scrollTop: $(id).get(0).scrollHeight
	}, 1);
}

function updateText(selector, html){
	$(selector).html(html);
}

function xmlData(xmlFile, xmlReader){
	var resp = "";
	$.ajax({
		method: "POST",
		type:	"POST",
		data: 	{	
					XMLFILE:xmlFile
				},
		url:	xmlReader,
		async:	false,
		cache:	false,
		success:function(e){
			resp = JSON.parse(e);
		}
	});
	return resp;
	
	
}

function tagToEntity(data){
	 return data.replace(/[&<>"']/g, function($0) {
        return "&" + {"&":"amp", "<":"lt", ">":"gt", '"':"quot", "'":"#39"}[$0] + ";";
    });
}

function getScrapeConfiguration(phpFile){
	var info = [];
	$.ajax({
		method:	"POST",
		type:	"POST",
		url:	phpFile,
		async:	false,
		cache:	false,
		success:function(e){
			info = JSON.parse(e);
			//info = Object.keys(info).map(function (key) { return info[key]; });
		}
	});
	return info;
}

function getProductConfiguration(phpFile){
	var info = [];
	$.ajax({
		method:	"POST",
		type:	"POST",
		url:	phpFile,
		async:	false,
		cache:	false,
		success:function(e){
			info = JSON.parse(e);
			//info = Object.keys(info).map(function (key) { return info[key]; });
		}
	});
	return info;
}



//scrape functions 

function output_data_Writer(header,var_data,COUNTER,php_file,output_File){
	var info = [];
	$.ajax({
		method:	"POST",
		type:	"POST",
		data: 	{
					header:header,
					var_data:var_data,
					COUNTER:COUNTER,
					excel_File_name:output_File
				},
		url:	php_file,
		async:	false,
		cache:	false,
		success:function(e){
			info = JSON.parse(e);
		}
	});
	return info[0];
}

function writeToExcel(header,var_data,counter,php_file,output_File){
	var info = [];
	$.ajax({
		method:	"POST",
		type:	"POST",
		data: 	{
					headers:header,
					data:var_data,
					counter:counter,
					excel_File_name:output_File
				},
		url:	php_file,
		async:	false,
		cache:	false,
		success:function(e){
			info = JSON.parse(e);
		}
	});
	return info[0];
}

function excelWriter(EAN,ASIN,PROD_ID,OUR_PRICE,FULL_PRICE,NET_PRICE,SHIPPING_PRICE,COMMISION_FEE,COUNTER, php_file, output_File){
	var info;
	$.ajax({
		method:"POST",
		type:"POST",
		async:false,
		cache:false,
		data: {
				EAN:EAN,
				ASIN:ASIN,
				PROD_ID:PROD_ID,
				OUR_PRICE:OUR_PRICE,
				FULL_PRICE:FULL_PRICE,
				NET_PRICE:NET_PRICE,
				SHIPPING_PRICE:SHIPPING_PRICE,
				COMMISION_FEE :COMMISION_FEE,
				excel_File_name :output_File,
				COUNTER:COUNTER
				},
		url:php_file,
		success:function(e){
			info = (JSON.parse(e));
			info = $.map(info, function(value, index) {return [value];});
		}
	});
	return info;
}

function getProductInfo(ASIN,php_file){
	var ProductInfo = [];
	$.ajax({
		method:	"POST",
		type:	"POST",
		data: 	{
					ASIN:ASIN
				},
		url:	php_file,
		async:	false,
		cache:	false,
		success:function(e){
			ProductInfo = JSON.parse(e);
			ProductInfo = $.map(ProductInfo, function(value, index) {return [value];});
		}
	});
	return ProductInfo;
}	

function getProductName(IDTYPE, IDVALUE, MRKT_PLC_ID,php_file){
	var ProductInfo = [];
	$.ajax({
		method:	"POST",
		type:	"POST",
		data: 	{
					IDTYPE:IDTYPE,
					IDVALUE:IDVALUE,
					MRKT_PLC_ID:MRKT_PLC_ID
				},
		url:	php_file,
		async:	false,
		cache:	false,
		success:function(e){
			ProductInfo = JSON.parse(e);
			ProductInfo = $.map(ProductInfo, function(value, index) {return [value];});
		}
	});
	return ProductInfo;
}

function getMyPriceForInventory(IDVALUE, MRKT_PLC_ID,php_file){
	var ProductInfo = [];
	$.ajax({
		method:	"POST",
		type:	"POST",
		data: 	{
					IDVALUE:IDVALUE,
					MRKT_PLC_ID:MRKT_PLC_ID
				},
		url:	php_file,
		async:	false,
		cache:	false,
		success:function(e){
			ProductInfo = JSON.parse(e);
			ProductInfo = $.map(ProductInfo, function(value, index) {return [value];});
		}
	});
	return ProductInfo;
}	

function getFeeEstimate(ID_TYPE, ID_VALUE, MRKT_PLC_ID, IDENTIFIER, Is_Fulfil, price_CurncyCode, price_Amount, ship_CurncyCode, ship_Amount, php_file){
	var feesInfo = [];
	$.ajax({
		method:	"POST",
		type:	"POST",
		data: 	{
				ID_TYPE		:ID_TYPE,
				ID_VALUE	:ID_VALUE,
				MRKT_PLC_ID	:MRKT_PLC_ID,
				IDENTIFIER	:IDENTIFIER,
				Is_Fulfil	:Is_Fulfil,
				price_CurncyCode:price_CurncyCode,
				price_Amount:price_Amount,
				ship_CurncyCode:ship_CurncyCode,
				ship_Amount	:ship_Amount
				},
		url:	php_file,
		async:	false,
		cache:	false,
		success:function(e){
			feesInfo = JSON.parse(e);
			//console.log(feesInfo);
			//feesInfo = $.map(feesInfo, function(value, index) {return [value];});
		}
	});
	return feesInfo;
}

function getASIN(EAN,php_file){
	var ASIN = "";
	
	$.ajax({
		method: "POST",
		type:	"POST",
		data: 	{EAN:EAN},
		url:	php_file,
		async:	false,
		cache:	false,
		success:function(e){
			ASIN = JSON.parse(e);
			ASIN = $.map(ASIN, function(value, index) {return [value];});
		}
	});
	return ASIN;
}

function autoHide(id,time=5000){//redMsgNotify
	setTimeout(function(){
		$("#"+id).html("");
		$("#"+id).text("");
		$("#"+id).hide();
	},time)
}

function timer(){
	setInterval(function (){
		$("#jsTimer").text(timer_increment());
	},1000);
}

function timer_increment() {
	var endTime = new Date();
	var timeDiff = endTime - startTime;
	timeDiff /= 1000;
	var seconds = Math.round(timeDiff % 60);
	timeDiff = Math.floor(timeDiff / 60);
	var minutes = Math.round(timeDiff % 60);
	timeDiff = Math.floor(timeDiff / 60);
	var hours = Math.round(timeDiff % 24);
	timeDiff = Math.floor(timeDiff / 24);
	var days = timeDiff;
	return (days + ":" + hours + ":" + minutes + ":" + seconds);
}

function floatVal(string, decimal=2, abs=true){
	var f 	= string.toString();
	
	//f = (string.replace()).toFixed(decimal);
	f 		= (f.replace(",","."));
	f 		= parseFloat(f).toFixed(2);
	if(abs){
		return Math.abs(f);
	}else{
		return f;
	}
}

function removeDelimeters(string){
	if(string!==""){
		string= string.replace(/;/gim, "");
		string= string.replace(/,/gim, "");
		string= string.replace(/|/gim, "");
		string= string.replace(/^/gim, "");
		string= string.replace(/~/gim, "");
		return string;
	}else{
		return string;
	}
}


function sendDataToUpdateInventory(SKU,ASIN, PRICE, Quantity, on_Amazon, php_file){

	$.ajax({
		method: "POST",
		type:	"POST",
		data: 	{
				SKU:SKU,
				ASIN:ASIN,
				Price:PRICE,
				Quantity:Quantity,
				on_Amazon:on_Amazon
				
				},
		url:	php_file,
		async:	false,
		cache:	false,
		success:function(e){
		}
	});
}

if (typeof String.prototype.has === 'undefined') { 
	String.prototype.has = function(it) {
		return this.indexOf(it) >= 0; 
	}
}