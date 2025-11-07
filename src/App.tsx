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

  const hendleDelete = (index: number)=>{
    setProdect(product.filter((_,i)=>i!==index))
  }
  

  return (
    <div className="App">
      <h2>Hi There, Please Add Prodect</h2>
      <ProductForm onAddProduct={onAddProduct} />
      <ProductTable products={product} onDelete={hendleDelete}/>
    </div>
  );
}

export default App;
