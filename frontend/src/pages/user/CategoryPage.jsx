import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../../components/Home/ProductsList";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/category/${categoryName.toLowerCase()}`
        );
        console.log("Fetched products:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 mt-40">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {categoryName} Products
      </h1>
      <ProductList products={products} />
    </div>
  );
};

export default CategoryPage;
