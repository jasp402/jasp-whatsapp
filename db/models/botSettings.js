'use strict';
module.exports    = (sequelize, DataTypes) => {
    const BotSettings     = sequelize.define('bot_settings', {
        saveALlMessages          : DataTypes.BOOLEAN,
        registerLastLogin        : DataTypes.BOOLEAN,
        saveAllImages            : DataTypes.BOOLEAN,
        saveStatus               : DataTypes.BOOLEAN,
        userBlockedDefaultMessage: DataTypes.STRING,
    }, {});
    BotSettings.associate = function (models) {
        // associations can be defined here
    };
    return BotSettings;
};