import React, { useState } from "react";
import { toast} from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent!"); 
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="mt-24 p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Contact Us
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Your Email"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Your Message"
            rows={5}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-all w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
