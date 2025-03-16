"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Checkout() {
  const { data, status } = useSession();
  console.log(data);
  const [service, setService] = useState<{ _id?: string } | null>(null);

  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
    message: "",
  });
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/service/${id}`);
        const serviceData = await response.json();
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);
  useEffect(() => {
    if (data?.user?.name) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: data?.user?.name ?? "",
        email: data?.user?.email ?? "",
      }));
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const serviceCopy = { ...(service || {}) };
  delete serviceCopy._id;
  const postData = { ...formData, ...serviceCopy };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(postData);
    const res = await fetch(`http://localhost:3000/api/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const pR = await res.json();
    console.log("resposnse", pR);
  };
  if (status === "loading") return <p>Loading...</p>;
  return (
    <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prevent SSR hydration issue by ensuring consistent rendering */}
          <input
            type="text"
            readOnly
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
          Order Confirm
        </button>
      </form>
    </div>
  );
}
