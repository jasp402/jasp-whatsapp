let root       = require('app-root-path');
const path     = require('path');
module.exports = {
    "development": {
        "username": "root",
        "password": null,
        "database": "db.settings",
        "host"    : "127.0.0.1",
        "dialect" : "sqlite",
        "storage" : path.resolve(root.path, 'db', 'db.settings.sqlite'),
        "logging" : false
    }
};
