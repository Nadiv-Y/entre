import React, { useState } from "react";
import "./App.css";
import ProductForm from "./Component/ProductForm";
import { Product } from "./Types/Products";
import ProductTable from "./Component/ProductTable";

function App() {
  const [product, setProdect] = useState<Product[]>([]);
  const onAddProduct = (product: Product) => {
    setProdect((prev) => [...prev, product]);
  };
  

  return (
    <div className="App">
      <h2>Hi There, Please Add Prodect</h2>
      <ProductForm onAddProduct={onAddProduct} />
      <ProductTable products={product}/>
    </div>
  );
}

export default App;
