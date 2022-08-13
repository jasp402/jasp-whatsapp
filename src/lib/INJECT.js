let settings      = intents;
const {scheduler} = settings;


function greetings() {
    let date = new Date();
    hour     = date.getHours();

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

function intervalScheduler(interV) {
    const alarmBel = window.setInterval(function () {
        const date = new Date();
        if (scheduler.length) {
            scheduler.forEach(alarm => {
                let [hour, min] = alarm.timer.split(':');
                if (date.getHours() === Number(hour) && date.getMinutes() === Number(min)) {
                    // Get Biblical Picture once
                    let result = (alarm.script === 'getBiblicalPicture') ? window.getBiblicalPicture() : null;

                    alarm.sender.forEach(user => {
                        let number = user.indexOf('-') > -1 ? `${user}@g.us` : `${user}@c.us`;
                        WAPI.sendMessage2(number, alarm.response);

                        //acciones especiales
                        if (alarm.script === 'getBiblicalPicture') {
                            result.then(res => {
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
        var t    = typeof arguments[0];
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
        let message   = data[i];
        let body      = {};
        body.text     = message.body;
        body.type     = message.type;
        body.user     = message.chatId._serialized;
        body.caption  = message.caption;
        body.original = message;


        //Evitar procesar los mensajes de Boit
        if (typeof message.body === 'string' && message.body.indexOf('🤖') > -1) return;

        //** GROUPS  **/
        if (message.isGroupMsg && message.type === 'chat') {
            WAPI.sendSeen(body.user);
            processWebhooks(`${webhooks}/chat/groups`, body).then(bot => {
                if (bot.responseType === 'send') {
                    WAPI.sendMessage2(body.user, bot.message);
                }
                if (bot.responseType === 'reply') {
                    WAPI.ReplyMessageWithQuote(message.id, bot.message, message.id);
                }
            });
        }

        if (message.isGroupMsg && message.type === 'sticker') {
            processWebhooks(`${webhooks}/chat/groups/sticker`, body).then(bot=>{
                if (bot.responseType === 'send') {
                    WAPI.sendMessage2(body.user, bot.message);
                }
                if (bot.responseType === 'reply') {
                    WAPI.ReplyMessageWithQuote(message.id, bot.message, message.id);
                }
            });
        }

        /*
                if(message.isGroupMsg && (message.type === 'image' || message.type === 'video')){
                    processWebhooks(`${webhooks}/chat/groups/media`, body);
                }


                if(!message.isGroupMsg && message.type === 'chat' ) {
                    processWebhooks(`${webhooks}/chat/contacts`, body);
                }

                if(!message.isGroupMsg && message.type === 'sticker'){
                    processWebhooks(`${webhooks}/chat/contacts/sticker`, body);
                }

                if(!message.isGroupMsg && (message.type === 'image' || message.type === 'video')) {
                    processWebhooks(`${webhooks}/chat/contacts/media`, body);
                }


                //Reacciona ante stickers en grupos
                if(message.isGroupMsg === true && message.type === 'sticker'){
                    if(groupAllowReply.includes(groupId)) {
                        let bot = groupReply[groupId].find(bot => bot.requestType === message.type);
                        WAPI.sendSeen(body.user);
                        WAPI.sendMessage2(body.user, bot.response);
                        return;
                    }
                }

                //Reacciona ante mis mensajes en grupos
                if(message.isGroupMsg === true && message.type === 'chat'){
                    if (body.user in groupReply) {
                        fetch(`${webhooks}/chat-groups`, {
                            method : "POST",
                            body   : JSON.stringify(body),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then((resp) => resp.json())
                            .then(function (response) {
                                console.log(response);
                            });
                    }
                }

                //Reacciona ante mensajes normales
                if (message.isGroupMsg === false && message.type === "chat") {
                    fetch(`${webhooks}/bot`, {
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
                        fetch(`${webhooks}/save-image/${source}`, {
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
                */
    }
});

WAPI.addOptions = async () => {
    await processWebhooks(`${webhooks}/shortcuts`)
        .then(data => {
            window.smartShortcuts.buttonsSmartShortcut(data, document);
        });
};

WAPI.modalSettings = function () {
// Get the modal
    var modal = document.getElementById("myModal");

// Get the button that opens the modal
    var btn = document.getElementsByClassName('add-smart-replay')[0];

// Get the <span> element that closes the modal
    var span = document.getElementById("close");

// When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

intervalScheduler(60000);

if (typeof elem == "undefined") {
    //use elem() https://github.com/akinuri/element.js
    var elem    = function (tagName, attributes, children, isHTML) {

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
                    } else if (typeof callback == "function") {
                        let eventMatch = attribute.match(/^on([a-zA-Z]+)/);
                        if (eventMatch) {
                            let event = eventMatch[1];
                            // TODO: make sure it's a valid event?
                            parent.addEventListener(event, callback);
                            parent.eventListeners        = parent.eventListeners || {};
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
            } else if (children instanceof Array) {
                children.forEach(function (child) {
                    elem.append(parent, child);
                });
            } else if (typeof children == "function") {
                elem.append(parent, children());
            }
        } else {
            if (children instanceof HTMLElement || children instanceof Text) {
                parent.appendChild(children);
            } else if (typeof children == "string" || typeof children == "number") {
                if (isHTML) {
                    parent.innerHTML += children;
                } else {
                    parent.appendChild(document.createTextNode(children));
                }
            } else if (children instanceof Array) {
                children.forEach(function (child) {
                    elem.append(parent, child);
                });
            } else if (typeof children == "function") {
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
