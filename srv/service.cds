using my.products from '../db/data-model';

service ProductService {
  entity Products as projection on products.Products;
}

