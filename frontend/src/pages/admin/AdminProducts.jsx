import React from "react";

const Products = () => {
  const dummyProducts = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
  ];

  return (
    <div className="flex mt-30">
      <div className="flex-1">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <table className="w-full border-collapse border text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {dummyProducts.map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.id}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">Rs. {product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
