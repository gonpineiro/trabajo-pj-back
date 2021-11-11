const faker = require('faker');
const boom = require('@hapi/boom');

class EdificioService {
  constructor() {
    this.edificios = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.edificios.push({
        id: faker.datatype.uuid(),
        nombre: faker.company.companyName(),
        domicilio:
          faker.address.ordinalDirection() + ' ' + faker.datatype.number(5000),
      });
    }
  }

  async create(data) {
    const newEdificio = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.edificios.push(newEdificio);
    return newEdificio;
  }

  async find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.edificios);
      }, 500);
    });
  }

  async findOne(id) {
    const edificio = this.edificios.find((item) => item.id === id);
    if (!edificio) {
      throw boom.notFound('edificio not found');
    }
    if (edificio.isBlock) {
      throw boom.conflict('edificio is block');
    }
    return edificio;
  }

  async update(id, changes) {
    const index = this.edificios.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('edificio not found');
    }
    const edificio = this.edificios[index];
    this.edificios[index] = {
      ...edificio,
      ...changes,
    };
    return this.edificios[index];
  }

  async delete(id) {
    const index = this.edificios.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('edificio not found');
    }
    this.edificios.splice(index, 1);
    return { id };
  }
}

module.exports = EdificioService;
