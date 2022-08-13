'use strict';
module.exports    = (sequelize, DataTypes) => {
    const SmartScheduler     = sequelize.define('smart_scheduler', {
        date         : DataTypes.STRING,
        timer        : DataTypes.STRING,
        contactIds   : DataTypes.STRING,
        response     : DataTypes.STRING,
        files        : DataTypes.STRING,
        scriptActions: DataTypes.STRING
    }, {});
    SmartScheduler.associate = function (models) {
        // associations can be defined here
    };
    return SmartScheduler;
};