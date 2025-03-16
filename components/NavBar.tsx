"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();

  const navMenu = () => (
    <>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <Link href={"/about"}>About</Link>
      </li>
      <li>
        <Link href={"/services"}>Services</Link>
      </li>
      <li>
        <Link href={"/about"}>Blog</Link>
      </li>
      <li>
        <Link href={"/contact"}>Contact</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navMenu()}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navMenu()}</ul>
      </div>
      <div className="navbar-end">
        {status === "authenticated" ? (
          <div className="flex items-center space-x-4">
            {/* Display profile photo */}
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full border"
                width={32} // Ensure you specify width and height for Image
                height={32}
              />
            )}
            <button onClick={() => signOut()}>Logout</button>
          </div>
        ) : (
          <div>
            <Link href={"/register"}>Register</Link>
            <Link href={"/login"}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
