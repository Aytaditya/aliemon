/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import framer-motion
import { useActiveWallet } from "thirdweb/react";
import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { useActiveAccount } from "thirdweb/react";
import { defineChain, getContract, sendTransaction } from "thirdweb";
import { client } from "../client";
import { MARKET_CONTRACT_ADDRESS } from "../const/addresses";

import { buyFromListing } from "thirdweb/extensions/marketplace";

export default function Shop() {

  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const walletInfo= useActiveWallet();
  const account= useActiveAccount();
  const chain=defineChain(walletInfo?.getChain()?.id ?? 1155111) //setting up a default value for chain id

  const market=getContract({
    address: MARKET_CONTRACT_ADDRESS,
    chain,
    client
  })

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const list=await getAllValidListings({
        contract: market,
        start: 0,
        count:BigInt(10)
      });

      setListings(list);

      } catch (error) {
        console.log(error);
        
      }finally{
        setLoading(false);
      }}


      fetchListings();

    fetch
  }, []);

  const formatIpfsUrl = (url: string) => {
    return url.replace(
      "ipfs://",
      "https://349727a4ec341e84982e34ffb54950c3.ipfscdn.io/ipfs/"
    );
  };

  return <div className="container mx-auto px-4 py-8 min-h-screen">
    <button onClick={()=>{console.log(listings)}}>Get Listings</button>
  </div>;
}
