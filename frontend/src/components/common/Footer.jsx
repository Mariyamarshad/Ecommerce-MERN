import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full">
      <div
        className="
          max-w-screen-xl 
          mx-auto 
          px-2 sm:px-6 lg:px-12 
          md:py-5 lg:py-5 
          grid grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-4 
          gap-8 
          text-center md:text-left bg-black
        "
      >
        {/* Exclusive */}
        <div>
          <h4 className=" text-lg mb-4">Exclusive</h4>
          <p className="text-gray-400">
            Exclusive is your one-stop shop for quality products at affordable
            prices. We believe in customer satisfaction and fast delivery.
          </p>
        </div>

        {/* Account */}
        <div>
          <h4 className=" text-lg mb-4">Account</h4>
          <ul className="space-y-2 text-gray-400">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className=" text-lg mb-4">Quick Link</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className=" text-lg mb-4">Support</h4>
          <p className="text-gray-400">C2 Johar Town, Lahore Pakistan</p>
          <p className="text-gray-400 mt-2">maryamarshad0077@gmail.com</p>
          <p className="text-gray-400 mt-2">+92 335 0647252</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © Copyright Rimel 2025. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
