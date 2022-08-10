let settings = intents;
const {smartReply, smartReplyV2, scheduler, groupAllowReply, groupReply} = settings;


const icons = {
	'edit'    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path></svg>`,
	'add'     : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.75 4.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"></path></svg>`,
	'settings': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M7.429 1.525a6.593 6.593 0 011.142 0c.036.003.108.036.137.146l.289 1.105c.147.56.55.967.997 1.189.174.086.341.183.501.29.417.278.97.423 1.53.27l1.102-.303c.11-.03.175.016.195.046.219.31.41.641.573.989.014.031.022.11-.059.19l-.815.806c-.411.406-.562.957-.53 1.456a4.588 4.588 0 010 .582c-.032.499.119 1.05.53 1.456l.815.806c.08.08.073.159.059.19a6.494 6.494 0 01-.573.99c-.02.029-.086.074-.195.045l-1.103-.303c-.559-.153-1.112-.008-1.529.27-.16.107-.327.204-.5.29-.449.222-.851.628-.998 1.189l-.289 1.105c-.029.11-.101.143-.137.146a6.613 6.613 0 01-1.142 0c-.036-.003-.108-.037-.137-.146l-.289-1.105c-.147-.56-.55-.967-.997-1.189a4.502 4.502 0 01-.501-.29c-.417-.278-.97-.423-1.53-.27l-1.102.303c-.11.03-.175-.016-.195-.046a6.492 6.492 0 01-.573-.989c-.014-.031-.022-.11.059-.19l.815-.806c.411-.406.562-.957.53-1.456a4.587 4.587 0 010-.582c.032-.499-.119-1.05-.53-1.456l-.815-.806c-.08-.08-.073-.159-.059-.19a6.44 6.44 0 01.573-.99c.02-.029.086-.075.195-.045l1.103.303c.559.153 1.112.008 1.529-.27.16-.107.327-.204.5-.29.449-.222.851-.628.998-1.189l.289-1.105c.029-.11.101-.143.137-.146zM8 0c-.236 0-.47.01-.701.03-.743.065-1.29.615-1.458 1.261l-.29 1.106c-.017.066-.078.158-.211.224a5.994 5.994 0 00-.668.386c-.123.082-.233.09-.3.071L3.27 2.776c-.644-.177-1.392.02-1.82.63a7.977 7.977 0 00-.704 1.217c-.315.675-.111 1.422.363 1.891l.815.806c.05.048.098.147.088.294a6.084 6.084 0 000 .772c.01.147-.038.246-.088.294l-.815.806c-.474.469-.678 1.216-.363 1.891.2.428.436.835.704 1.218.428.609 1.176.806 1.82.63l1.103-.303c.066-.019.176-.011.299.071.213.143.436.272.668.386.133.066.194.158.212.224l.289 1.106c.169.646.715 1.196 1.458 1.26a8.094 8.094 0 001.402 0c.743-.064 1.29-.614 1.458-1.26l.29-1.106c.017-.066.078-.158.211-.224a5.98 5.98 0 00.668-.386c.123-.082.233-.09.3-.071l1.102.302c.644.177 1.392-.02 1.82-.63.268-.382.505-.789.704-1.217.315-.675.111-1.422-.364-1.891l-.814-.806c-.05-.048-.098-.147-.088-.294a6.1 6.1 0 000-.772c-.01-.147.039-.246.088-.294l.814-.806c.475-.469.679-1.216.364-1.891a7.992 7.992 0 00-.704-1.218c-.428-.609-1.176-.806-1.82-.63l-1.103.303c-.066.019-.176.011-.299-.071a5.991 5.991 0 00-.668-.386c-.133-.066-.194-.158-.212-.224L10.16 1.29C9.99.645 9.444.095 8.701.031A8.094 8.094 0 008 0zm1.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM11 8a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
}

function greetings() {
	let date = new Date();
	hour = date.getHours();
	
	if (hour >= 0 && hour < 12) {
		return "Good Morning";
	}
	
	if (hour >= 12 && hour < 18) {
		return "Good evening";
	}
	
	if (hour >= 18 && hour < 24) {
		return "Good night";
	}
}
function intervalScheduler(interV){
	const alarmBel = window.setInterval(function(){
		const date = new Date();
		if(scheduler.length){
			scheduler.forEach(alarm => {
				let [hour, min] = alarm.timer.split(':');
				if(date.getHours() === Number(hour) && date.getMinutes() === Number(min)){
					// Get Biblical Picture once
					 let result = (alarm.script === 'getBiblicalPicture') ? window.getBiblicalPicture() : null;
					
					alarm.sender.forEach(user => {
						let number = user.indexOf('-') > -1 ? `${user}@g.us` : `${user}@c.us`;
						WAPI.sendMessage2(number, alarm.response);
						
						//acciones especiales
						if(alarm.script === 'getBiblicalPicture'){
							result.then(res=>{
								console.log(res);
								window.getFile(res).then((base64Data) => {
									WAPI.sendImage(base64Data, number, res);
								}).catch((error) => {
									window.log("Error in sending file\n" + error);
								})
							})
						}
						
					});
				}
			});
			window.clearInterval(alarmBel);
			intervalScheduler(60000);
		}
	}, interV)
}

//Updating string prototype to support variables
String.prototype.fillVariables = String.prototype.fillVariables || function () {
		"use strict";
		var str = this.toString();
		if (arguments.length) {
			var t = typeof arguments[0];
			var key;
			var args = ("string" === t || "number" === t) ?
				Array.prototype.slice.call(arguments)
				: arguments[0];
			
			for (key in args) {
				str = str.replace(new RegExp("\\[#" + key + "\\]", "gi"), args[key]);
			}
		}
		
		return str;
	};


WAPI.waitNewMessages(false, async (data) => {
	if (!data) return;
	for (let i = 0; i < data.length; i++) {
		//fetch API to send and receive response from server
		let message   = data[i];
		let body      = {};
		body.text     = message.body;
		body.type     = 'message';
		body.user     = message.chatId._serialized;
		body.caption  = message.caption;
		body.original = message;
		let groupId   = body.user;

		//Reacciona ante stickers en grupos
		if(message.type === 'sticker' && message.isGroupMsg === true){
			if(groupAllowReply.includes(groupId)) {
				let bot = groupReply[groupId].find(bot => bot.requestType === message.type);
				WAPI.sendSeen(body.user);
				WAPI.sendMessage2(body.user, bot.response);
				return;
			}
		}
		
		//Reacciona ante mensajes en grupos
		if(message.type === 'chat' && message.isGroupMsg === true){
			if (body.user in groupReply) {
				window.log("Message received in group and group reply is off. so will not take any actions.");
				window.log(message.from)
				return;
			}
		}
		
		//Reacciona ante mensajes normales
		if (message.type === "chat" && message.isGroupMsg === false) {
			fetch('http://localhost:5001/bot', {
				method : "POST",
				body   : JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((resp) => resp.json())
				.then(function (response) {
					//response received from server
					WAPI.sendSeen(message.from._serialized);
					
					//replying to the user based on response
					if (response && response.length > 0) {
						response.forEach(async itemResponse => {
							const {files, text, spintax} = itemResponse;
							
							// sending files if there is any
							if (files !== undefined) {
								window.getFile(files).then((base64Data) => {
									WAPI.sendImage(base64Data, message.chatId._serialized, files, text);
								}).catch((error) => {
									window.log("Error in sending file\n" + error);
								})
							}
							else{
								if(spintax){
									let response = resolveSpintax(`{${itemResponse.text}}`);
									response.then(text => {
										// text = text.fillVariables({
										// 	name       : message.sender.pushname,
										// 	phoneNumber: message.sender.id.user,
										// 	greetings  : greetings()
										// });
										WAPI.sendMessage2(message.from._serialized, text);
									});
								}
								else{
									WAPI.sendMessage2(message.from._serialized, text);
								}
								
							}
						});
					}
				})
				.catch(function (error) {
					window.log(error);
				});
			
		}
		
		//Reaciona ante imagenes y videos (chat y estados)
		if(message.type === 'image' || message.type === 'video'){
			window.log(`chatId:${message.chatId}`);
			if (message.isGroupMsg === false) {
				let source = (message.chatId === 'status@broadcast') ? 'estado' : 'chat';
				fetch(`http://localhost:5001/save-image/${source}`, {
					method : "POST",
					body   : JSON.stringify(body),
					headers: {
						'Content-Type': 'application/json'
					}
				})
					.then((resp) => resp.json())
					.then(function (response) {
						//response received from server
						window.log(response);
					})
					.catch(function (error) {
						console.log(error);
					});
			}
			
		}
		
		//Reacciona ante numeros en Lista Nega
		if (settings.blocked.indexOf(message.chatId.user) >= 0) {
			console.log("number is blocked by BOT. no reply");
			return;
		}
	}
});

WAPI.addOptions = function () {
	//Generate buttons
	let buttons = Object.keys(smartReplyV2).map((item) => elem('button', {'class': 'reply-options', 'id':smartReplyV2[item], title:smartReplyV2[item]}, item));
		// buttons.unshift(elem('button', {'class': 'add-smart-replay'}, icons.settings, true))
	let html    = elem('div', {'class': 'grGJn smart-replay'}, buttons);
	let footer  = document.querySelector('footer');

	//add html on footer
	footer.insertBefore(html, footer.firstChild);
	
	//Adjustment scroll with new buttons
	document.querySelector('#main > div > div > div').scrollTop +=1000

	//Assign event to each button
	buttons.forEach(el => el.addEventListener('click', ev => {
		if(!ev.target.textContent) return
		window.sendMessage(ev.target.id).then(text => console.log(text));
	}));
};
WAPI.modalSettings = function () {
// Get the modal
	var modal = document.getElementById("myModal");

// Get the button that opens the modal
	var btn = document.getElementsByClassName('add-smart-replay')[0];

// Get the <span> element that closes the modal
	var span = document.getElementById("close");

// When the user clicks the button, open the modal
	btn.onclick = function() {
		modal.style.display = "block";
	}

// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}
intervalScheduler(60000);

if (typeof elem == "undefined") {
	//use elem() https://github.com/akinuri/element.js
	var elem = function (tagName, attributes, children, isHTML) {
		
		let parent;
		
		if (typeof tagName == "string") {
			parent = document.createElement(tagName);
		} else if (tagName instanceof HTMLElement) {
			parent = tagName;
		}
		
		if (attributes) {
			for (let attribute in attributes) {
				if (attribute.startsWith("on")) {
					let callback = attributes[attribute];
					if (typeof callback == "string") {
						parent.setAttribute(attribute, callback);
					}
					else if (typeof callback == "function") {
						let eventMatch = attribute.match(/^on([a-zA-Z]+)/);
						if (eventMatch) {
							let event = eventMatch[1];
							// TODO: make sure it's a valid event?
							parent.addEventListener(event, callback);
							parent.eventListeners = parent.eventListeners || {};
							parent.eventListeners[event] = parent.eventListeners[event] || [];
							parent.eventListeners[event].push(callback);
						}
					}
				} else {
					parent.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		var isHTML = isHTML || null;
		if (children || children == 0) {
			elem.append(parent, children, isHTML);
		}
		return parent;
	};
	elem.append = function (parent, children, isHTML) {
		if (parent instanceof HTMLTextAreaElement || parent instanceof HTMLInputElement) {
			if (children instanceof Text || typeof children == "string" || typeof children == "number") {
				parent.value = children;
			}
			else if (children instanceof Array) {
				children.forEach(function (child) {
					elem.append(parent, child);
				});
			}
			else if (typeof children == "function") {
				elem.append(parent, children());
			}
		} else {
			if (children instanceof HTMLElement || children instanceof Text) {
				parent.appendChild(children);
			}
			else if (typeof children == "string" || typeof children == "number") {
				if (isHTML) {
					parent.innerHTML += children;
				} else {
					parent.appendChild(document.createTextNode(children));
				}
			}
			else if (children instanceof Array) {
				children.forEach(function (child) {
					elem.append(parent, child);
				});
			}
			else if (typeof children == "function") {
				elem.append(parent, children());
			}
		}
	};
} else {
	if (typeof elem == "function" && typeof elem.hasOwnProperty("append")) {
		console.warn("elem() is already initialized.");
	} else {
		console.warn("elem name is already in use by some other script.");
	}
}
