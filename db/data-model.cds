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
  key ID                 : Integer;    
      nombre             : String(90); 
      direccion          : String(150);
      celular            : String(10); 
      tipoNegocio        : Integer;    
      estado             : Integer;    
      fechaAlta          : Timestamp;  
      fechaEdita         : Timestamp;  
      usuarioAlta        : String(50); 
      usuarioEdita       : String(50); 

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
}

entity Empleado{
  @cds.autoIncrement
  key ID                 : Integer;   
      nombre             : String(90);
      apellidoPaterno    : String(90);
      apellidoMaterno    : String(90);
      curp               : String(18);
      rfc                : String(13);
      fechaNacimiento    : Timestamp; 
      sexo               : Integer;    
      correoElectronico  : String(110);
      usuario            : String(90); 
      puesto             : Integer;    
      celular            : String(10); 

      negocio            : Association to Negocio;  // FN_NEGOCIO como foreign key

      estado             : Integer;   
      fechaAlta          : Timestamp; 
      fechaEdita         : Timestamp; 
      usuarioAlta        : String(50);
      usuarioEdita       : String(50);

}
