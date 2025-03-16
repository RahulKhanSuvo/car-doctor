"use client";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  const handleSocialLogin = async (providerName: string) => {
    console.log(providerName);
    const result = await signIn(providerName, { callbackUrl: "/" }); // Redirects after login
    console.log(result);
  };

  return (
    <div className="space-y-3">
      {/* GitHub Button (Corrected Icon) */}
      <button
        onClick={() => handleSocialLogin("github")}
        className="flex items-center justify-center w-full px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
      >
        <FaGithub className="mr-2" size={20} />
        Continue with GitHub
      </button>

      {/* Google Button (Corrected Icon) */}
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex items-center justify-center w-full px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
      >
        <FaGoogle className="mr-2" size={20} />
        Continue with Google
      </button>
    </div>
  );
}
