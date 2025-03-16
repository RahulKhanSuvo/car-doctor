"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function MyBooking() {
  interface Booking {
    _id: string;
    name: string;
    img: string;
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
      <div>
        {data.map((item) => {
          return (
            <div key={item._id}>
              <Image alt="naf" width={100} height={100} src={item.img} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
