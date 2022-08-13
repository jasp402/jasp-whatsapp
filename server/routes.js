const express         = require("express");
const api             = express.Router();
const controllers     = require("./controllers");

// const {decryptMedia}  = require("../src/lib/DECRYPT");
// const mime            = require("mime-types");
// const fs              = require("fs");
// const {default: wiki} = require("wikijs");
// const path            = require("path");
// const settings        = require('../src/config');


api.post('/chat/groups', (req, res) => {
    controllers.chat.processMsgGroup(req, res);
});

api.post('/chat/groups/sticker', (req, res) => {
    controllers.chat.processMsgGroupSticker(req, res);
});

api.post('/chat/contacts', (req, res) => {
    controllers.chat.processMessageByContact(req, res);
});

api.post('/shortcuts',  (req, res) => {
    controllers.shortcuts.getShortcuts(req, res);
});


/*
api.post('/save-image/:source', async (req, res) => {
    const {source}     = req.params;
    const {original}   = req.body;
    const message      = original;
    const mediaData    = await decryptMedia(message);
    const filename     = `${message.t}.${mime.extension(message.mimetype)}`;
    const folderNumber = message.sender.id.split('@')[0];
    const folderName   = ('name' in message.sender) ? message.sender.name.replace(/ /g, '_').toLowerCase() : 'unknown';
    const folder       = `${folderName}-${folderNumber}`;

    createFolders(`./downloads/${source}/${folder}`);
    fs.writeFile(`./downloads/${source}/${folder}/${filename}`, mediaData, function(err) {
        if (err) {
            // res.send(err);
            return console.log(err);
        }
        console.log(`The file was saved! - ${folder}/${filename}`);
        res.send(`The file was saved! - ${filename}`);
    });
});

api.post('/bot', (req, res) => {
    const {text, user, original} = req.body;
    let userID      = original.sender.name ? original.sender.name.replace(/ /g, '_').toLowerCase() : user;
    let textLowerCase = text.toLowerCase();
    const exact   = brainExact(text);
    const partial = brainPartial(text);
    console.log(`${userID} = message =>${text}`);
    if(textLowerCase.search('wiki') === 0){
        let content = textLowerCase.replace(/wiki\:|quien|que| es |cual|como|[?=]|[¿=]/g, '');
        console.log('wiki-content: ', content)
        wiki({
            apiUrl: 'https://es.wikipedia.org/w/api.php',
            format:'jsonfm'
        })
            .page(content)
            .then(page => page.summary())
            .then(response => {
                // console.log('wiki response:', response);
                if(!response) res.json([{text: '🧞‍♂ No lo se todo... pero intenta hacer mas simple la pregunta'}])

                let result =`🧞‍♂ Has preguntado por: *${content.trim()}* \n`;
                result += "```"+response+"```";
                res.json([{text:result, type: 'message', spintax:false}])
            })
            .catch(e =>{
                res.json([{text: `🔮 Up's algo no anda bien... \n *${e}*`, type: 'message', spintax:false}]);
            });
    }
    else if(exact){
        let send = {
            text: exact.response,
            files: exact.file,
            type: 'message',
            spintax:true
        }
        res.json([send]);
    }
    else if(partial){
        let send = {
            text: partial.response,
            files: partial.file,
            type: 'message',
            spintax:true
        }
        res.json([send]);
    }
    else{
        res.send('');
    }
});


api.get('/calendar', (req, res) => {
    res.sendFile(path.join(__dirname, 'plugins/google/google.calendar.html'));
});
*/
module.exports = api;