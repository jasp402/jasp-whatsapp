let models = require('../../db/models');
let {smart_reply_groups} = models;

const _commands = async (cmd, metadata) => {
    let result = {success:false, error:'', responseType:'send', message:''}
    if (cmd.indexOf('Create:replyGroup') > -1) {
        console.log('-- create new register --');
        cmd = cmd.replace('Create:replyGroup\n', '');
        cmd = cmd.split('|');
        await smart_reply_groups.create({
            requestType : ['chat', 'sticker', 'image', 'video'].includes(cmd[0]) ? cmd[0] : 'chat',
            responseType: ['send', 'reply'].includes(cmd[1]) ? cmd[1] : 'send',
            contains    : cmd[2],
            exact       : cmd[3],
            response    : cmd[4],
            files       : cmd[5] || null,
            groupIds    : metadata.user //Las respuesta solo funcionan segun el grupo donde se ha creado
        });
        result.success      = true;
        result.message      = '*🤖 ꜱᴇ ʜᴀ ᴄʀᴇᴀᴅᴏ ᴜɴ ʀᴇɢɪꜱᴛʀᴏ!*';
        result.responseType = 'reply';
        return result;
    }
    if (cmd.indexOf('List:replyGroup') > -1){
        let dbData        = await smart_reply_groups.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}});
        let data          = dbData.map(item => item.dataValues);
        result.success= true;
        result.message= '*🤖ᴇꜱᴛᴏꜱ ꜱᴏɴ ʟᴏꜱ ʀᴇꜱᴜʟᴛᴀᴅᴏꜱ ᴏʙᴛᴇɴɪᴅᴏꜱ:* \n ```'+JSON.stringify(data,null,2)+'```';
        result.responseType= 'reply';
        return result;
    }
    if (!!cmd.match(/Search:replyGroup\(([0-9]).*[?)]/g)){
        let extractId = cmd.match(/\(.*\)/g)[0];
        extractId = extractId.replace(/\)|\(/g, '');
        let dbData        = await smart_reply_groups.findAll({where:{id:extractId}, attributes: {exclude: ['createdAt', 'updatedAt']}});
        let data          = dbData.map(item => item.dataValues);
        result.success= true;
        result.message= '*🤖ᴇꜱᴛᴏꜱ ꜱᴏɴ ʟᴏꜱ ʀᴇꜱᴜʟᴛᴀᴅᴏꜱ ᴏʙᴛᴇɴɪᴅᴏꜱ:* \n ```'+JSON.stringify(data,null,2)+'```';
        result.responseType= 'reply';
        return result;
    }
    if (!!cmd.match(/Delete:replyGroup\(([0-9]).*[?)]/g)){
        let extractId = cmd.match(/\(.*\)/g)[0];
        extractId = extractId.replace(/\)|\(/g, '');
        let dbData        = await smart_reply_groups.findAll({where:{id:extractId}, attributes: {exclude: ['createdAt', 'updatedAt']}});
        let data          = dbData.map(item => item.dataValues);
        await smart_reply_groups.destroy({where:{id:extractId}});
        result.success= true;
        result.responseType= 'reply';
        if(data.length > 0){
            result.message= '*🤖 ᴇʟ ʀᴇɢɪꜱᴛʀᴏ ꜱᴇ ʜᴀ ᴇʟɪᴍɪɴᴀᴅᴏ ᴄᴏɴ ᴇxɪᴛᴏ!* \n ```'+JSON.stringify(data,null,2)+'```';
        }else{
            result.message= '*🤖 ɴᴏ ꜱᴇ ᴇɴᴄᴏɴᴛʀᴏ ᴇʟ ʀᴇꜱɢɪᴛʀᴏ Qᴜᴇ ɪɴᴛᴇɴᴛᴀ ᴇʟɪᴍɪɴᴀʀ!* \n Prueba listando todos los registros. Usa ```List:replyGroup```';
        }
        return result;
    }
    else {
        result.success      = false;
        return result;
    }
}

const _getUserName = metadata =>  metadata.original.sender.name ? metadata.original.sender.name.replace(/ /g, '_').toLowerCase() : metadata.user;

const processMessage = (dataSet, text, metadata) => {
    console.log(`RequestType:${metadata.type} | processMessage - SEARCH: ${text}`);
    let result         = false;
    text               = text.toLowerCase();
    if(metadata.type === 'chat'){
        const brainExact   = sentence => dataSet.find(obj => obj.exact.toLowerCase() === sentence) || null;
        const brainPartial = sentence => dataSet.find(obj => sentence.indexOf(obj.contains.toLowerCase()) > -1 && obj.contains) || null;
        if (brainPartial(text) || brainExact(text)) {
            result = brainPartial(text) || brainExact(text);
        } else {
            console.log(`'ERROR: SEARCH "${text}" not found'`);
        }
    }
    return result;
}

const processMsgGroup = async (req, res) => {
    const {text} = req.body;
    let username = _getUserName(req.body);
    console.log(`${username} = message =>${text}`);

    let registerCommands = await _commands(text, req.body);
    const {success, error, responseType, message} = registerCommands
    if (success) {
        res.status(200).json({responseType, message});
    } else {
        let dbData        = await smart_reply_groups.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}});
        let data          = dbData.map(item => item.dataValues);
        let resultMessage = processMessage(data, text, req.body);
        console.log(`message: ${resultMessage.response}`);
        if (resultMessage) {
            let sendResult = {responseType: resultMessage.responseType, message: `🤖 ${resultMessage.response}`};
            res.status(200).json(sendResult);
        } else {
            res.end();
        }
    }
};

const processMsgGroupSticker = async(req, res) => {
    const {type, user} = req.body;
    let username = _getUserName(req.body);
    console.log(`${username} = type =>${type}`);

    let dbData        = await smart_reply_groups.findAll({where:{requestType:'sticker'},attributes: {exclude: ['createdAt', 'updatedAt']}});
    let data          = dbData.map(item => item.dataValues);
    let resultMessage = data.find(obj => obj.groupIds === user);
    console.log(`message: ${resultMessage.response}`);
    if (resultMessage) {
        let sendResult = {responseType: resultMessage.responseType, message: `🤖 ${resultMessage.response}`};
        res.status(200).json(sendResult);
    } else {
        res.end();
    }

}

const processMessageByContact = (req, res) => {

};

module.exports = {processMsgGroup, processMsgGroupSticker};