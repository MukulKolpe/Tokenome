"use client";
import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tokens, setTokens] = useState([]);
  const [address, setAddress] = useState("");
  return <div>Hello</div>;
}
