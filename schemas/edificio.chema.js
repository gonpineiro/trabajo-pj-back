const Joi = require('joi');

const id = Joi.string().uuid();
const nombre = Joi.string().min(3).max(20);
const domicilio = Joi.string().min(3).max(100);

const createEdificioSchema = Joi.object({
  nombre: nombre.required(),
  domicilio: domicilio.required(),
});

const updateEdificioSchema = Joi.object({
  nombre: nombre,
  domicilio: domicilio,
});

const getEdificioSchema = Joi.object({
  id: id.required(),
});

module.exports = { createEdificioSchema, updateEdificioSchema, getEdificioSchema };
