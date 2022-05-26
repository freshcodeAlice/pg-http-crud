const { Thing } = require('../models');

module.exports.createThing = async (req, res, next) => {
  try {
    const { body } = req;
    const [newThing] = await Thing.create(body);
    if (newThing) {
      return res.status(201).send({ data: newThing });
    }
    return res.status(400).send(); //bad practice
  } catch (err) {
    next(err);
  }
};

module.exports.getAllThing = async (req, res, next) => {
  try {
    const arrayOfThings = await Thing.findAll();
    if (arrayOfThings.length) {
      return res.status(200).send({ data: arrayOfThings });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports.getOneThing = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;
    const oneThing = await Thing.findByPK(id);
    if (oneThing) {
      return res.status(200).send({ data: oneThing });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports.deleteOneThing = async (req, res, next) => {};

module.exports.updateOneThing = async (req, res, next) => {};
