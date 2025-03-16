"use client";
import SocialLogin from "@/components/SocialLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Updated import
import React, { FormEvent, useState, useEffect } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [callbackUrl, setCallbackUrl] = useState<string>("/");
  const router = useRouter();

  useEffect(() => {
    // Safely access window location on the client-side
    const searchParams = new URLSearchParams(window.location.search);
    const url = searchParams.get("callbackUrl");
    if (url) {
      setCallbackUrl(url); // Set callback URL if exists
    }
  }, []); // Run this once on component mount

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl, // Pass dynamic callbackUrl
    });

    if (result?.error) {
      setError("Invalid email or password!");
    } else {
      router.push(callbackUrl); // Redirect to the intended page
    }
  };

  return (
    <div className="max-w-lg border p-14">
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-orange-500 outline-none"
            placeholder="Your email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-orange-500 outline-none"
            placeholder="Your password"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Sign In
        </button>
      </form>
      <SocialLogin />
    </div>
  );
}
