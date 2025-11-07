import React from "react";
import { Product } from "../Types/Products";
import ProductForm from "./ProductForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormCss.css";

type ProductTableProps = {
  products: Product[];
  onDelete:(index: number)=>void
};

const ProductTable = ({ products, onDelete }: ProductTableProps) => {
 
  return (
    <div className="main-table">
      <div className="header-table">
        <h2>My Cart</h2>
      </div>
      <table className="table">
        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <td>#</td>
              <td>Product: {p.name}</td>
              <td>Price: {p.price}</td>
              <td>Category: {p.category}</td>
              <td>
                {" "}
                <img src={p.image} alt={p.name} width={80} />
              </td>
              <td>
                <button
                  type="button"
                  className="deleteButton"
                  onClick={() => onDelete(index)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
