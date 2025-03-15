"use client";
import { registerUser } from "@/app/actions/auth/registerUser";
import React, { FormEvent } from "react";

export default function RegisterForm() {
  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const formData = {
      name,
      email,
      password,
    };
    const data = await registerUser(formData);
    console.log(data);
  };

  return (
    <div className="max-w-lg border p-14">
      <form onSubmit={handelSubmit} className="space-y-4 w-full">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-orange-500 outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-orange-500 outline-none"
            placeholder="Your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            name="password"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-orange-500 outline-none"
            placeholder="Your password"
          />
        </div>
        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
          Sign Up
        </button>
      </form>
    </div>
  );
}
