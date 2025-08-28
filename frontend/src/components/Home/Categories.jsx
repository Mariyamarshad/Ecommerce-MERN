import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Monitor,
  Smartphone,
  Headphones,
  Watch,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Shirt,
  Home,
  Dumbbell,
  Sofa,
  ShoppingBag,
  Book,
} from "lucide-react";

const categories = [
  { id: 1, name: "Phones", icon: Smartphone },
  { id: 2, name: "Computers", icon: Monitor },
  { id: 3, name: "SmartWatch", icon: Watch },
  { id: 4, name: "Camera", icon: Camera },
  { id: 5, name: "Headphones", icon: Headphones },
  { id: 6, name: "Gaming", icon: Gamepad2 },
  { id: 7, name: "Shopping", icon: Shirt },
  { id: 8, name: "Home Appliances", icon: Home },
  { id: 9, name: "Fitness", icon: Dumbbell },
  { id: 10, name: "Furniture", icon: Sofa },
  { id: 11, name: "Groceries", icon: ShoppingBag },
  { id: 12, name: "Books", icon: Book },
];

const Categories = () => {
  const [active, setActive] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleCategoryClick = (cat) => {
    setActive(cat.id);
    navigate(`/category/${cat.name.toLowerCase()}`);
  };

  return (
    <section className="w-full max-w-screen-xl mx-auto my-16 px-4 ">
      {/* Section Header */}
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h3 className="text-red-600 font-semibold">Categories</h3>
          <h2 className="text-2xl md:text-3xl font-bold">Browse By Category</h2>
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full border border-gray-400 hover:bg-red-600 hover:text-white transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full border border-gray-400 hover:bg-red-600 hover:text-white transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {/* Scrollable Categories */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className={`group flex-shrink-0 w-40 h-32 flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300 cursor-pointer bg-white 
                ${
                  isActive
                    ? "bg-red-600 text-white border-red-600 shadow-lg scale-105"
                    : "border-gray-200 hover:border-red-600 hover:bg-red-600"
                }`}
            >
              <Icon
                size={30}
                className={`mb-2 transition-colors duration-300
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-900 group-hover:text-white"
                  }`}
              />
              <p
                className={`font-medium transition-colors duration-300
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-800 group-hover:text-white"
                  }`}
              >
                {cat.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
