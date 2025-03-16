"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function MyBooking() {
  interface Booking {
    _id: string;
    name: string;
    img: string;
    price: string;
  }
  const [data, setData] = useState<Booking[]>([]);
  useEffect(() => {
    const myBookingData = async () => {
      const res = await fetch("http://localhost:3000/api/service");
      const d = await res.json();
      setData(d);
    };
    myBookingData();
  }, []);
  console.log(data);
  return (
    <div className="container mx-auto">
      <h1>Cart </h1>
      <div className="space-y-5">
        {data.map((item) => {
          return (
            <div
              className="flex justify-between items-center border p-1"
              key={item._id}
            >
              <Image alt="naf" width={100} height={100} src={item.img} />
              <div>
                <h3>{item.price}</h3>
              </div>
              <div className="space-x-4">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
