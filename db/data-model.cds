namespace my.products;

entity Products {
  key ID       : Integer;
      name     : String(100);
      category : String(50);
      price    : Decimal(10,2);
      stock    : Integer;
}
