const express = require('express');

const EdificiosService = require('../services/edificio.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createEdificioSchema,
  updateEdificioSchema,
  getEdificioSchema,
} = require('../schemas/edificio.chema');

const router = express.Router();
const service = new EdificiosService();

router.get('/', async (req, res) => {
  const edificios = await service.find();

  res.json(edificios);
});

router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getEdificioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const edificio = await service.findOne(id);
      res.json(edificio);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createEdificioSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newEdificio = await service.create(body);
    res.status(201).json(newEdificio);
  }
);

router.patch(
  '/:id',
  validatorHandler(getEdificioSchema, 'params'),
  validatorHandler(updateEdificioSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const edificio = await service.update(id, body);
      res.json(edificio);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getEdificioSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  }
);

module.exports = router;
