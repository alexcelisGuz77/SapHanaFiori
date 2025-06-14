namespace my.products;

entity Products {
   @cds.autoIncrement
  key ID       : Integer;
      name     : String(100);
      category : String(50);
      price    : Decimal(10,2);
      stock    : Integer;
}


entity Negocio {
   @cds.autoIncrement
  key ID                 : Integer;                  // PN_ID
      nombre             : String(90);               // S_NOMBRE
      direccion          : String(150);              // S_DIRECCION
      celular            : String(10);               // S_CELULAR
      tipoNegocio        : Integer;                  // N_TIPO_NEGOCIO
      estado             : Integer;                  // N_ESTADO
      fechaAlta          : Timestamp;                // T_FECHA_ALTA
      fechaEdita         : Timestamp;                // T_FECHA_EDITA
      usuarioAlta        : String(50);               // S_USUARIO_ALTA
      usuarioEdita       : String(50);               // S_USUARIO_EDITA

      razonSocial        : String(120);              // S_RAZON_SOCIAL
      rfc                : String(13);               // S_RFC
      correo             : String(100);              // S_CORREO
      ciudad             : String(100);              // S_CIUDAD
      estadoMX           : String(100);              // S_ESTADO
      codigoPostal       : String(10);               // S_CODIGO_POSTAL
      paginaWeb          : String(100);              // S_PAGINA_WEB
      facebook           : String(100);              // S_FACEBOOK
      instagram          : String(100);              // S_INSTAGRAM
      regimenFiscal      : String(100);              // S_REGIMEN_FISCAL
      usoCFDI            : String(5);                // S_USO_CFDI
      serieFactura       : String(10);               // S_SERIE_FACTURA
      folioActual        : Integer default 1;        // N_FOLIO_ACTUAL
      facturaElectronica : Integer;                 // N_FACTURA_ELECTRONICA
      moneda             : String(10) default 'MXN'; // S_MONEDA
      zonaHoraria        : String(50) default 'America/Mexico_City'; // S_ZONA_HORARIA
}
