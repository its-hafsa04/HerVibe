"use client";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendEmail(formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("Failed to send the message. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#ffe5ec] to-[#ffd6e0] flex flex-col items-center">
      <div className="flex flex-col w-[80%] items-center py-10 px-6 bg-gradient-to-b from-[#ffe5ec] to-[#ffd6e0] rounded-lg shadow-lg max-w-md mx-auto m-20">
        <h2 className="text-3xl font-bold text-[#5e1a6b] mb-6">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              className="block text-[#5e1a6b] font-semibold mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border-[#f1a7d0] focus:outline-none focus:border-pink-400"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-[#5e1a6b] font-semibold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border-[#f1a7d0] focus:outline-none focus:border-pink-400"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-[#5e1a6b] font-semibold mb-1"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border-[#f1a7d0] focus:outline-none focus:border-pink-400 h-32 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#fbc9d1] to-[#f7a8d3] text-[#5e1a6b] font-semibold py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-[#5e1a6b]">{status}</p>}
      </div>
    </main>
  );
}

async function sendEmail(formData) {
  const { email, name, message } = formData;
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

  if (!serviceId || !templateId || !userId) {
    throw new Error("EmailJS configuration missing.");
  }

  await emailjs.send(serviceId, templateId, { name, email, message }, userId);
}
