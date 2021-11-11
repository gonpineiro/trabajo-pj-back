const express = require('express');

const DependenciasService = require('../services/dependencia.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createDependenciaSchema,
  updateDependenciaSchema,
  getDependenciaSchema,
} = require('../schemas/dependencia.chema');

const router = express.Router();
const service = new DependenciasService();

router.get('/', async (req, res) => {
  const dependencias = await service.find();

  res.json(dependencias);
});

router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getDependenciaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const dependencia = await service.findOne(id);
      res.json(dependencia);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createDependenciaSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newDependencia = await service.create(body);
    res.status(201).json(newDependencia);
  }
);

router.patch(
  '/:id',
  validatorHandler(getDependenciaSchema, 'params'),
  validatorHandler(updateDependenciaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const dependencia = await service.update(id, body);
      res.json(dependencia);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/setEdificio/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const dependencia = await service.setEdificio(id, body);
    res.json(dependencia);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  validatorHandler(getDependenciaSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  }
);

module.exports = router;
