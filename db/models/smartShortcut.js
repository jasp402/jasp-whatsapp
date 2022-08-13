'use strict';
module.exports = (sequelize, DataTypes) => {
    const SmartShortcut     = sequelize.define('smart_shortcuts', {
        icons         : DataTypes.STRING,
        content       : DataTypes.STRING,
        script_actions: DataTypes.STRING
    }, {
        freezeTableName: true,
        tableName      : 'smart_shortcuts'
    });
    SmartShortcut.associate = function (models) {
        // associations can be defined here
    };
    return SmartShortcut;
};