import dbConnect, { collectionNameMongo } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Services() {
  const data = await dbConnect(collectionNameMongo.servicesCollection)
    .find()
    .toArray();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {data.map((service) => (
        <div
          className="border rounded-xl overflow-hidden max-w-xs mx-auto"
          key={service._id}
        >
          <div className="relative w-full h-60">
            <Image
              alt={service.title}
              src={service.img}
              fill
              className="object-cover"
            />
          </div>
          <p className="p-2 text-center">{service.title}</p>
          <Link href={`services/${service._id}`}>
            <button className="border rounded-md px-4 py-2 bg-yellow-300">
              Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
