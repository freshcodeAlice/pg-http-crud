const express = require('express');
const ThingController = require('./controllers/Thing.controller');

const app = express();
const bodyParser = express.json(); //dataStream -> json -> js-obj

app.use(bodyParser);

app.post('/thing', ThingController.createThing);
app.get('/thing', ThingController.getAllThing);

app
  .route('/thing/:id')
  .get(ThingController.getOneThing)
  .patch(ThingController.updateOneThing)
  .delete(ThingController.deleteOneThing);

module.exports = app;
