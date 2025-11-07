import { useState } from "react";
import { Product } from "../Types/Products";
import React from "react";
import ProductTable from "./ProductTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormCss.css";

type Props = {
  onAddProduct: (product: Product) => void;
};

const ProductForm = ({ onAddProduct }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const hendleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({ name, price, category, image });
    setName("");
    setPrice(0);
    setCategory("");
    setImage("");
  };

  return (
    <div className="main-form">
      <form onSubmit={hendleSumbit}>
        <div className="input-group mb-3 m-3 form">
          <input
            type="text"
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            placeholder="Prodect Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span className="input-group-text">$</span>
          <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            required
          />

          <select
          className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Please Choose Option</option>
            <option>Drinks</option>
            <option>Meat</option>
            <option>Dairy</option>
            <option>Snackes</option>
            <option>Basic</option>
          </select>

          <input
            type="text"
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />

          <button className="btn btn-primary" type="submit">Add Prodect</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
