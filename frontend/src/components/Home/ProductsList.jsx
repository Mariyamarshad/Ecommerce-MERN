import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
   if (!Array.isArray(products)) {
    return <p>No products available.</p>;
  }
  return (
    <div className="w-screen grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-gray-100 to-white">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
