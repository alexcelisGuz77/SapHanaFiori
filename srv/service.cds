using my.products from '../db/data-model';

service ProductService {
  entity Products as projection on products.Products;
  entity Negocio as projection on products.Negocio;
  entity Empleado as projection on products.Empleado;
  entity Inventario as projection on products.Inventario;
  entity InventarioProducto as projection on products.InventarioProducto;
}

