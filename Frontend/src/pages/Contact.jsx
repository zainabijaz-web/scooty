import React from "react";

const Contact = () => {
  return (
    <section className="px-10 py-20 bg-[#F9FAFB] text-center">
      <h2 className="text-4xl font-bold text-[#1E40AF] mb-8">Get in Touch</h2>
      <form className="max-w-md mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 rounded-lg border border-gray-300 focus:outline-[#1E40AF]"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 rounded-lg border border-gray-300 focus:outline-[#1E40AF]"
        />
        <textarea
          rows="4"
          placeholder="Message"
          className="p-3 rounded-lg border border-gray-300 focus:outline-[#1E40AF]"
        />
        <button className="bg-[#FF5A5F] hover:bg-[#e14b50] text-white px-6 py-3 rounded-lg font-semibold transition">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;