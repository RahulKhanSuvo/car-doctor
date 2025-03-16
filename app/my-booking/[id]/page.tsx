import { Params } from "@/types/types";
import Image from "next/image";
import React from "react";
import UpdateForm from "../components/Form/UpdateForm";

export default async function UpdateBooking({ params }: { params: Params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/my-booking/${id}`);
  const data = await res.json();
  return (
    <div className="container mx-auto">
      <UpdateForm data={data} />
    </div>
  );
}
