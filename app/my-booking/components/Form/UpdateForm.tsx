"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface FormData {
  firstName: string;
  phone: string;
  email: string;
  message: string;
}

interface UpdateFormProps {
  data: FormData;
}

function UpdateForm({ data }: UpdateFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
    message: "",
  });
  const { id } = useParams();
  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName || "",
        phone: data.phone || "",
        email: data.email || "",
        message: data.message || "",
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/my-booking/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Message Field */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateForm;
