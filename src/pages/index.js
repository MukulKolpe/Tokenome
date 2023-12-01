"use client";
import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { ethers, utils } from "ethers";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tokens, setTokens] = useState([]);
  const [address, setAddress] = useState("");

  const fetchTokens = async () => {
    if (!utils.isAddress(address)) {
      alert("Please enter a valid ethereum address");
    }
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_QUICKNODE_RPC
    );
    const tokens = await provider.send("qn_getWalletTokenBalance", [
      {
        wallet: address,
        contracts: [
          "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //WETH
          "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
          "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", // MATIC
          "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
          "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
          "0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11", // CODE
          "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72", // ENS
          "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", // BNB
          "0x4Fabb145d64652a948d72533023f6E7A623C7C53", // BUSD
          "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", // stETH
          "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", // SHIB
          "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // UNI
          "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39", // HEX
          "0x514910771AF9Ca656af840dff83E8264EcF986CA", // LINK
          "0x4d224452801ACEd8B2F0aebE155379bb5D594381", // APE
          "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32", // LDO
          "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", // AAVE
          "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2", // MKR
        ],
      },
    ]);
    console.log(tokens);
    return tokens;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddress(address);
    fetchTokens()
      .then((data) => {
        setTokens(data.assets);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Head>
        <title>Tokenome</title>
        <meta
          name="description"
          content="Analyse the tokens in an ethereum wallet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Tokenome
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
                <div class="col-span-full">
                  <label
                    for="wallet-address"
                    class="block text-l font-medium leading-6 text-gray-900"
                  >
                    Enter your address here 🎯
                  </label>
                  <div class="mt-2">
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      id="wallet-address"
                      size="50"
                      maxLength="50"
                      className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-l leading-6 p-3 mb-2"
                    />
                    <button
                      type="submit"
                      className="rounded-lg top-1 right-1 bottom-1 border w-48 text-sm justify-center bg-blue-400 text-white p-3 font-bold"
                    >
                      Show me the tokens!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
