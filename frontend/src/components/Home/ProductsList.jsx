import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const ProductList = ({ products }) => {
   if (!Array.isArray(products)) {
    return <p>No products available.</p>;
  }

  const { filteredItems } = useSelector((state) => state.products);
  return (
    <div className="w-screen grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-gray-100 to-white">
      {filteredItems.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
