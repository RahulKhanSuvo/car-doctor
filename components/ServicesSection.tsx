import dbConnect from "@/lib/dbConnect";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
async function ServicesSection() {
  const data = await dbConnect("carCollection").find().toArray();
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id.toString()}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-600 mt-2">Price: ${item.price}</p>
                <button>
                  <FaArrowRightLong className="text-[#FF3811]" size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesSection;
