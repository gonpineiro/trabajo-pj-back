const Joi = require('joi');

const id = Joi.string().uuid();
const nombre = Joi.string().min(3).max(100);
const domicilio = Joi.string().min(3).max(100);

const createDependenciaSchema = Joi.object({
  nombre: nombre.required(),
  domicilio: domicilio.required(),
});

const updateDependenciaSchema = Joi.object({
  nombre: nombre,
  domicilio: domicilio,
  edificio: {
    id: id.required(),
    nombre: nombre.required(),
    domicilio: domicilio.required(),
  },
});

const getDependenciaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createDependenciaSchema,
  updateDependenciaSchema,
  getDependenciaSchema,
};
