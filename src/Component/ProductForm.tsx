import { useState } from "react";
import { Product } from "../Types/Products";
import React from "react";

type Props = {
  onAddProduct: (prodect: Product) => void;
};

const ProductForm = ({ onAddProduct }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const hendleSumbit = () => {
    onAddProduct({ name, price, category, image });
    setName("");
    setPrice(0);
    setCategory("");
    setImage("");
  };

  return <div>
<input
placeholder="Prodect Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Price"
value={price}
onChange={(e)=>setPrice(+e.target.value)}
/>

<select value={category} onChange={(e)=>setCategory(e.target.value)} >
  <option>Drinks</option>
  <option>Meat</option>
  <option>Dairy</option>
  <option>Snackes</option>
  <option>Basic</option>
</select>

<input
placeholder="Image URL"
value={image}
onChange={(e)=>setImage(e.target.value)}
/>

<button onClick={hendleSumbit}>
  Add Prodect
</button>

  </div>;
};

export default ProductForm;
