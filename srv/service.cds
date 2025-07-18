using my.products from '../db/data-model';

service ProductService {
  entity Products           as projection on products.Products;
  entity Negocio            as projection on products.Negocio;

  entity Empleado           as
    projection on products.Empleado {
      *,
      negocio : redirected to Negocio
    };

  entity Inventario         as
    projection on products.Inventario {
      *,
      negocio : redirected to Negocio
    };


  entity InventarioProducto as
    projection on products.InventarioProducto {
      *,
      producto   : redirected to Products,
      inventario : redirected to Inventario
    };

  entity Cliente            as projection on products.Cliente{
    *,
    negocio: redirected to Negocio
  };

  entity Pedido             as projection on products.Pedido{
    *,
    cliente : redirected to Cliente,
    empleado: redirected to Empleado,
    negocio: redirected to Negocio
  };

  entity Detalle_pedido     as projection on products.detalle_pedido{
    *,
    pedido : redirected to Pedido,
    producto: redirected to Products
  };

}
