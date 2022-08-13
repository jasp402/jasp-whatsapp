'use strict';
module.exports    = (sequelize, DataTypes) => {
    const SmartBlocked     = sequelize.define('smart_blocked', {
        number       : DataTypes.STRING,
        blocked      : DataTypes.BOOLEAN,
        customMessage: DataTypes.STRING,
    }, {});
    SmartBlocked.associate = function (models) {
        // associations can be defined here
    };
    return SmartBlocked;
};