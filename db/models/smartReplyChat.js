'use strict';
module.exports    = (sequelize, DataTypes) => {
    const SmartReplyChat     = sequelize.define('smart_reply_chat', {
        requestType: DataTypes.STRING,
        contains   : DataTypes.STRING,
        exact      : DataTypes.STRING,
        response   : DataTypes.STRING,
        files      : DataTypes.STRING,
        contactIds : DataTypes.STRING,
    }, {});
    SmartReplyChat.associate = function (models) {
        // associations can be defined here
    };
    return SmartReplyChat;
};