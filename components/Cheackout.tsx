import React from "react";

export default function Cheackout({ data }: CheackoutProps) {
  return (
    <div className="w-1/4">
      <h3>Price {data?.price ?? "N/A"}</h3>
      <button>Checkout</button>
    </div>
  );
}
