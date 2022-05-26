const { Client } = require('pg');
const config = require('../configs/db.json');
const fs = require('fs');
const path = require('path');

const currentFileName = path.basename(__filename);

const env = process.env.NODE_ENV || 'development'; //NODE_ENV = "developmnent" || "test" || "production"
const dbConfig = config[env];

const client = new Client(dbConfig);

client.connect();

const db = {
  client
};

fs.readdirSync(__dirname)
  .filter(fileName => /.js$/.test(fileName) && fileName !== currentFileName)
  .forEach(fileName => {
    const absPathToFile = path.resolve(__dirname, fileName);
    const Model = require(absPathToFile);
    Model._client = client;
    db[Model.name] = Model;
  });

process.on('beforeExit', () => {
  client.end();
});

module.exports = db;
