import dbConnect, { collectionNameMongo } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import React from "react";

export default async function ServicesDetails({ params }) {
  const p = await params;
  const servicesCollection = await dbConnect(
    collectionNameMongo.servicesCollection
  ).findOne({ _id: new ObjectId(p.id) });
  return (
    <div>
      <p>{servicesCollection.title}</p>
      <p>{servicesCollection.description}</p>
    </div>
  );
}
