const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
  const { Products } = this.entities;

  this.before('CREATE', Products, (req) => {
    if (!req.data.ID) {
      // Genera un ID secuencial simple o un random, según necesidad
      req.data.ID = Math.floor(Math.random() * 1000000);
    }
  });
});
