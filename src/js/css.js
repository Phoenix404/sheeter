/*!
 * Sheets JavaScript Library v3.1.1
 * Sheets
 *
 * Includes jquery.js
 * https://jquery.com/
 *
 * Copyright VisiFan Foundation and other contributors
 * Released under the MIT license
 * website isn't avialble Due to be poor
 *
 * Date: new date()
 */

 
/*
  create  doms (container, popup)
  
*/
var Body 					= document.getElementsByTagName("body");
var Mcontainer 				= document.getElementById("Mcontainer");
var MenuBar 				= document.getElementById("MenuBar");
var sheetsContainer 		= document.getElementById("sheetsContainer");
var sheets					= "";
var modal 					= new S_popBox();
var errorCss				= "font-size:30px;font-weight:bold;color:#f44336;text-align:center;margin:5px;"
var msgCss					= "font-size:20px;font-weight:bold;color:#000;text-align:center;"
var showWarningMsg			= true;
var sheeter = function (body, mainContainer, menuBar, sheetsContainer){
	
	
	//main Container style
	Mcontainer.style.cssText 		= "width:100%;height:100%;box-sizing:border-box;margin:0px;padding:0px;border:5px solid #ff4500;";

	//MenuBar Container style
	MenuBar.style.cssText 			= "width:100%;height:5%;min-height:40px;max-height:150px;box-sizing:border-box;margin:0px;padding:0px;border:3px solid green;";


	//SHEET CONTAINER SETTING
	sheetsContainerHeight				= (Mcontainer.clientHeight - MenuBar.offsetHeight);
	sheetsContainer.style.cssText		= "width:100%;height:"+sheetsContainerHeight+";boxSizing:border-box;margin:0px;padding:0px;border:5px solid violet;";
	
	sheets 								= sheetsContainer.children;
	if(sheets.length <= 0 && showWarningMsg){
		S_error("<span style='display:block;"+errorCss+"'>Error</span><span><span style="+msgCss+">Sheet doesn't found!</span>");
		return;
	}
}
window.onload 	= function (){sheeter(Body, Mcontainer, MenuBar, sheetsContainer);};
window.onresize = function (){sheeter(Body, Mcontainer, MenuBar, sheetsContainer);};

function S_error(content){
	if(document.getElementById("S_modalDiv") === null)
		modal.popOut(content,"40%","40%");
	else
		document.getElementById("s_modalCloseBtn").style.marginLeft = parseInt(document.getElementById("S_modalBox").clientWidth) - 25 +"px";	
	
}

function S_popBox() {
	this.S_modalBox = null;
	this.modalDiv = null;
	this.popOut = function(content, modalwidth="40%", modalHeight="40%") {
		
		this.modalDiv = document.createElement("div");
		this.modalDiv.id = "S_modalDiv";
		this.modalDiv.style.cssText = "marign:0px;padding:0px;z-index:1;display:block;width:100%;height:100%;background:rgba(19, 24, 24, 0.6);background-color: rgba(19, 24, 24, 0.6);position:absolute;left:0px;top:0px;";
		document.body.appendChild(this.modalDiv);

		this.S_modalBox = document.createElement("div");
		this.S_modalBox.style.cssText = "text-align:center;z-index:1;margin:0;padding:0px;margin-right:-50%;z-index:2;width:"+modalwidth+";height:"+modalHeight+"; transform:translate(-50%, -50%);left:50%;position:relative; display:inline-block;position:absolute;top: 50%;background:#fff;";
		this.S_modalBox.id = "S_modalBox";
		this.modalDiv.appendChild(this.S_modalBox);
		this.S_modalBox.Code = this;
		
		var closebtn 			= document.createElement("div");
		closebtn.id 		= "s_modalCloseBtn";
		closebtn.innerHTML 		= "&times;"; 
		closebtn.style.cssText 	= "cursor:pointer;font-size:30px;font-weight:bold;position:static;margin-left:"+ (this.S_modalBox.clientWidth - 25) + "px;";
		this.S_modalBox.prepend(closebtn);
		clsBtnStyle		= closebtn.currentStyle || window.getComputedStyle(closebtn);
		
		
		var contentBox 	= document.createElement("div");
		contentBox.style.cssText = "margin:0 10px;margin-top:"+parseInt(clsBtnStyle.marginTop)+25 +"px;";
		contentBox.innerHTML = content;		
		this.S_modalBox.appendChild(contentBox);
		
		closebtn.onclick = function() {
			this.parentNode.Code.popIn();
		}
		
	}
	this.popIn = function() {
		if (this.modalDiv != null) {
			document.body.removeChild(this.modalDiv);
			this.modalDiv = null;
		}
	}
}

