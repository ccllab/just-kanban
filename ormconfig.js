const env = process.env;
const {AutoEncryptSubscriber} = require('typeorm-encrypted');

module.exports = {
    "name": "default",
    "type": env.DB_TYPE,
    "host": env.DB_HOST,
    "port": env.DB_PORT,
    "database": env.DB_DATABASE,
    "logging": false,
    "logger": "file",
    "entities": [
        "build/src/server/repository/entity/*.entity.js"
    ],
    "migrations": [],
    "subscribers": [
        AutoEncryptSubscriber
    ],
    // mark cause this will recreate table
    // only work with this at first time to synchrony table
    "synchronize": true
};
