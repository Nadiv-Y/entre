import React, { useState } from "react";
import "./App.css";
import ProductForm from "./Component/ProductForm";
import { Product } from "./Types/Products";

function App() {
  const [product, setProdect] = useState<Product[]>([]);
  const onAddProduct = (product: Product) => {
    setProdect((prev) => [...prev, product]);
  };

  return (
    <div className="App">
      <h2>Hi There, Please Add Prodect</h2>
      <ProductForm onAddProduct={onAddProduct} />
    </div>
  );
}

export default App;
