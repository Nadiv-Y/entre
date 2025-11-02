import React from "react";
import { Product } from "../Types/Products";
import ProductForm from "./ProductForm";

type ProductTableProps = {
  products: Product[];
};

const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <div>
      <table>
        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>{p.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
