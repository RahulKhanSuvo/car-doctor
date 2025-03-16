"use client";

import { useRouter } from "next/navigation";
import React from "react";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handelDelete = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/service/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    router.refresh();
  };
  return (
    <div>
      <button onClick={() => handelDelete(id)}>Delete</button>
    </div>
  );
};

export default DeleteButton;
