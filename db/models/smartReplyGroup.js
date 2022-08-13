'use strict';
const {DataTypes} = require("sequelize");
module.exports    = (sequelize, DataTypes) => {
    const SmartReplyGroup     = sequelize.define('smart_reply_groups', {
        requestType : DataTypes.STRING,
        responseType: DataTypes.STRING,
        contains    : DataTypes.STRING,
        exact       : DataTypes.STRING,
        response    : DataTypes.STRING,
        files       : DataTypes.STRING,
        groupIds    : DataTypes.STRING
    }, {
        freezeTableName: true,
        tableName      : 'smart_reply_groups'
    });
    SmartReplyGroup.associate = function (models) {
        // associations can be defined here
    };
    return SmartReplyGroup;
};