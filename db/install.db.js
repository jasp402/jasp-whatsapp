const {Sequelize, Model, DataTypes} = require('sequelize');
const config                        = require('./config/config.sequelize.js')['development'];
const sequelize                     = new Sequelize(config);

//** Interfaces **/
class BotSettings extends Model {
}

class SmartBlocked extends Model {
}

class SmartReplyChat extends Model {
}

class SmartReplyGroup extends Model {
}

class SmartScheduler extends Model {
}

class SmartShortCut extends Model {
}

SmartReplyGroup.init({
    requestType : DataTypes.STRING,
    responseType: DataTypes.STRING,
    contains    : DataTypes.STRING,
    exact       : DataTypes.STRING,
    response    : DataTypes.STRING,
    files       : DataTypes.STRING,
    groupIds    : DataTypes.STRING,
}, {sequelize, modelName: 'smart_reply_group'});

BotSettings.init({
    saveALlMessages          : DataTypes.BOOLEAN,
    registerLastLogin        : DataTypes.BOOLEAN,
    saveAllImages            : DataTypes.BOOLEAN,
    saveStatus               : DataTypes.BOOLEAN,
    userBlockedDefaultMessage: DataTypes.STRING,
}, {sequelize, modelName: 'bot_settings'});

SmartBlocked.init({
    number       : DataTypes.STRING,
    blocked      : DataTypes.BOOLEAN,
    customMessage: DataTypes.STRING,
}, {sequelize, modelName: 'smart_blocked'});

SmartReplyChat.init({
    requestType: DataTypes.STRING,
    contains   : DataTypes.STRING,
    exact      : DataTypes.STRING,
    response   : DataTypes.STRING,
    files      : DataTypes.STRING,
    contactIds : DataTypes.STRING,
}, {sequelize, modelName: 'smart_reply_chat'});

SmartScheduler.init({
    date         : DataTypes.STRING,
    timer        : DataTypes.STRING,
    contactIds   : DataTypes.STRING,
    response     : DataTypes.STRING,
    files        : DataTypes.STRING,
    scriptActions: DataTypes.STRING
}, {sequelize, modelName: 'smart_scheduler'});

SmartShortCut.init({
    icons         : DataTypes.STRING,
    content       : DataTypes.STRING,
    script_actions: DataTypes.STRING
}, {sequelize, modelName: 'smart_shortcuts'});

sequelize.sync().then(response => {
    console.log(response.models);

    // Sequelize insert dataSet //
    BotSettings.create({
        saveALlMessages          : false,
        registerLastLogin        : false,
        saveAllImages            : true,
        saveStatus               : true,
        userBlockedDefaultMessage: 'Usted ha sido bloqueado!',

    }).then(response => {
        console.log(JSON.stringify(response))
    });
}).catch((err) => {
    throw new Error(err);
});



