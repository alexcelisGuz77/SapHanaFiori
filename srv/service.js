const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
  const { Products } = this.entities;
  const { Negocio } = this.entities;
  const { Empleado } = this.entities;

  this.before('CREATE', Products, (req) => {
    if (!req.data.ID) {
      // Genera un ID secuencial simple o un random, según necesidad
      req.data.ID = Math.floor(Math.random() * 1000000);
    }
  });

  this.before('CREATE', Negocio, (req) => {
    if (!req.data.ID) {
      req.data.ID = Math.floor(Math.random() * 1000000);
    }
  });

  this.before('CREATE', Empleado, (req) => {
    if (!req.data.ID) {
      req.data.ID = Math.floor(Math.random() * 100000);
    }
  });

});
