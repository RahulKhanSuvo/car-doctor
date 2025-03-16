import Link from "next/link";
import React from "react";

export default function Cheackout({ data }: CheackoutProps) {
  return (
    <div className="w-1/4">
      <h3>Price {data?.price ?? "N/A"}</h3>
      <Link href={`/checkout/${data?._id}`}>
        <button>Checkout</button>
      </Link>
    </div>
  );
}
