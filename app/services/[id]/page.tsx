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

  return (
    <>
      <section>
        <figure className="flex justify-center">
          <Image
            width={1137}
            height={300}
            src={"/assets/images/checkout/checkout.png"}
            alt="banner"
          />
          <div className=""></div>
        </figure>
      </section>
    </>
  );
}
