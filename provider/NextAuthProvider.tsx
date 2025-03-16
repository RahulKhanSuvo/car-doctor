"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
interface NextAuthProviderProps {
  children: ReactNode;
  session?: Session | null;
}
export default function NextAuthProvider({ children }: NextAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
