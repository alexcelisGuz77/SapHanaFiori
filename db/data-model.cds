namespace my.products;


type Audit {
      fechaAlta    : DateTime default $now;
      fechaEdita   : DateTime;
      usuarioAlta  : String(50) default 'userDefauld';
      usuarioEdita : String(50) default 'userDefauld';
}


entity Products {
      key ID       : UUID;
          name     : String(100);
          category : String(50);
          price    : Decimal(10, 2);
          stock    : Integer;
          audit    : Audit;
}


entity Negocio {
      key ID                 : UUID;
          nombre             : String(90);
          direccion          : String(150);
          celular            : String(10);
          tipoNegocio        : Integer;
          estado             : Integer;
          razonSocial        : String(120);
          rfc                : String(13);
          correo             : String(100);
          ciudad             : String(100);
          estadoMX           : String(100);
          codigoPostal       : String(10);
          paginaWeb          : String(100);
          facebook           : String(100);
          instagram          : String(100);
          regimenFiscal      : String(100);
          usoCFDI            : String(5);
          serieFactura       : String(10);
          folioActual        : Integer default 1;
          facturaElectronica : Integer;
          moneda             : String(10) default 'MXN';
          zonaHoraria        : String(50) default 'America/Mexico_City';
          audit              : Audit;
}

entity Empleado {
      key ID                : UUID;
          nombre            : String(90);
          apellidoPaterno   : String(90);
          apellidoMaterno   : String(90);
          curp              : String(18);
          rfc               : String(13);
          fechaNacimiento   : Timestamp;
          sexo              : Integer;
          correoElectronico : String(110);
          usuario           : String(90);
          puesto            : Integer;
          celular           : String(10);
          negocio           : Association to Negocio; // FN_NEGOCIO como foreign key

          estado            : Integer;
          audit             : Audit;


}

entity Inventario {
      key ID        : UUID;
          negocio   : Association to Negocio;
          nombre    : String(90);
          nota      : String(190);
          direccion : String(190);
          estado    : Integer;
          audit     : Audit;
}


entity InventarioProducto {
      key ID          : UUID;
          producto    : Association to Products;
          inventario  : Association to Inventario;
          cantidad    : Integer;
          cantidadMin : Integer;
          cantidadMax : Integer;
          ubicacion   : String(120);
          precioVenta : Decimal(10, 2);
          audit       : Audit;
}

entity Cliente {
      key ID                : UUID;
          nombre            : String(120);
          telefono          : Integer;
          celular           : Integer;
          correoElectronico : String(220);
          negocio           : Association to Negocio;
          estado            : Integer;
          audit             : Audit;
}

entity Pedido {
      key ID       : UUID;
          cliente  : Association to Cliente;
          no       : Integer;
          empleado : Association to Empleado;
          negocio  : Association to Negocio;
          estado   : Integer;
          audit    : Audit;
}

entity detalle_pedido {
      key ID             : UUID;
          pedido         : Association to Pedido;
          producto       : Association to Products;
          cantidad       : Integer;
          precioUnitario : Decimal(10, 2);
          estado         : Integer;
          audit          : Audit;
}
