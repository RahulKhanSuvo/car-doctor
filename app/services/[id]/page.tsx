import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import React from "react";
type Params = {
  params: {
    id: string;
  };
};
export default async function ServicesDetailsPage({ params }: Params) {
  const { id } = await Promise.resolve(params);
  const serverCollection = dbConnect("carCollection");
  const data = await serverCollection.findOne({ _id: new ObjectId(id) });
  console.log(data);
  return (
    <div className="container mx-auto">
      <section className="flex justify-center w-full h-full">
        <figure className="flex justify-center rounded-2xl w-full h-[300px] relative">
          <Image
            fill
            src={"/assets/images/checkout/checkout.png"}
            alt="banner"
            priority
          />
          <div className="absolute transparent-layer inset-0 ">
            <div>
              <div className="flex items-center h-full ps-8">
                <h3 className="text-white">Service Details</h3>
              </div>
            </div>
          </div>
        </figure>
      </section>
      <section className="flex mt-3.5">
        <div className="w-3/4 ">
          <div className="">
            {data && (
              <Image
                src={data.img}
                width={752}
                height={400}
                className="rounded-lg h-[300px] w-full object-cover"
                alt="service"
              />
            )}
          </div>
        </div>
        <div className="w-1/4">
          <h3>Price {data?.price ?? "N/A"}</h3>
          <button>Checkout</button>
        </div>
      </section>
    </div>
  );
}
