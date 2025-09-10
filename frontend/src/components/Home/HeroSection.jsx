import React from "react";

const Hero = () => {
  
const handleScrollToCategories = () => {
  const section = document.getElementById("categories");
  if (section) {
    section.scrollIntoView({ behavior: "smooth"})
  }
}

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-32 py-20 bg-gradient-to-r from-gray-100 to-white">
      {/* Left Content */}
      <div className="max-w-lg text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Discover the Best Products <br /> for Your Lifestyle
        </h1>
        <p className="mt-4 text-gray-600 text-lg ">
          Shop from thousands of top brands with unbeatable prices and fast delivery.
        </p>
        <div className="mt-6 flex flex-col md:flex-row gap-4 md:gap-6 justify-center md:justify-start">
          <button onClick={handleScrollToCategories} className="px-6 py-3 rounded-2xl bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition">
            Shop Now
          </button>
          <button className="px-6 py-3 rounded-2xl border border-gray-400 text-gray-700 hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="mt-10 md:mt-0">
        <img
          src="/Hero.jpg"
          alt="shopping"
          className="w-full max-w-md md:max-w-lg rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
