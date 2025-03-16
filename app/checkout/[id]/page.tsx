import React from "react";

export default async function Checkout({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await fetch(`http://localhost:3000/api/service/${id}`);
  return <div>Checkout</div>;
}
