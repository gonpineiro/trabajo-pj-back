const faker = require('faker');
const boom = require('@hapi/boom');

class DependenciaService {
  constructor() {
    this.dependencias = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.dependencias.push({
        id: faker.datatype.uuid(),
        nombre: faker.company.companyName(),
        domicilio:
          faker.address.ordinalDirection() + ' ' + faker.datatype.number(5000),
      });
    }
  }

  async create(data) {
    const newDependencia = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.dependencias.push(newDependencia);
    return newDependencia;
  }

  async find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.dependencias);
      }, 500);
    });
  }

  async findOne(id) {
    const dependencia = this.dependencias.find((item) => item.id === id);
    if (!dependencia) {
      throw boom.notFound('dependencia not found');
    }
    if (dependencia.isBlock) {
      throw boom.conflict('dependencia is block');
    }
    return dependencia;
  }

  async update(id, changes) {
    const index = this.dependencias.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('dependencia not found');
    }
    const dependencia = this.dependencias[index];
    this.dependencias[index] = {
      ...dependencia,
      ...changes,
    };
    return this.dependencias[index];
  }

  async setEdificio(id, edificio) {
    const index = this.dependencias.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('dependencia not found');
    }
    const dependencia = this.dependencias[index];
    this.dependencias[index] = {
      ...dependencia,
      edificio,
    };
    return this.dependencias[index];
  }

  async delete(id) {
    const index = this.dependencias.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('dependencia not found');
    }
    this.dependencias.splice(index, 1);
    return { id };
  }
}

module.exports = DependenciaService;
