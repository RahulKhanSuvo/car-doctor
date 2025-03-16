import Image from "next/image";
import DeleteButton from "./components/DeleteButton";
import { headers } from "next/headers";

export default async function MyBooking() {
  let data = [];

  try {
    const res = await fetch("http://localhost:3000/api/service", {
      headers: await headers(),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    data = await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // Ensure data is an array
  const bookings = Array.isArray(data) ? data : data.bookings || [];

  return (
    <div className="container mx-auto">
      <h1>Cart</h1>
      <div className="space-y-5">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((item: { _id: string; img: string; price: string }) => (
            <div
              className="flex justify-between items-center border p-1"
              key={item._id}
            >
              <Image
                alt="Booking Image"
                width={100}
                height={100}
                src={item.img}
              />
              <div>
                <h3>{item.price}</h3>
              </div>
              <div className="space-x-4">
                <button>Edit</button>
                <DeleteButton id={item._id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
