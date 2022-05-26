const { Client } = require('pg');
const config = require('../configs/db.json');
const Thing = require('./Thing');
const fs = require('fs');
const path = require('path');

const currentFileName = path.basename(__filename);

const env = process.env.NODE_ENV || 'development'; //NODE_ENV = "developmnent" || "test" || "production"
const dbConfig = config[env];

const client = new Client(dbConfig);

client.connect();
Thing._client = client;

const db = {
  client,
  Thing
};

fs.readdirSync(__dirname)
  .filter(fileName => /.js$/.test(fileName) && fileName !== currentFileName)
  .forEach(fileName => {
    const absPathToFile = path.resolve(__dirname, fileName);
    const Model = require(absPathToFile);
  });

process.on('beforeExit', () => {
  client.end();
});

module.exports = db;
