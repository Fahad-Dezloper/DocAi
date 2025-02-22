"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = ({user}) => {
  console.log("user galt", user);
  const [doc, setDoc] = useState([]);
  async function getDoc(){
    const res = await axios.get("/api/user/getAllDoc");
    console.log("reached here", res);
    setDoc(res.data.data);
  }

  const data = [{
    name: "Subhash", //Dr.
    email: "subhash@gmail.com",
    degree: ["MBBS", "MS", "PHD"],
    walletPubAdd: "516516165116651616",
    Address: "Chandigarh",
    plan: "PREMIUM",
    image: "",
    money: "₹500"
  }]

  useEffect(() => {
    getDoc();
  }, [])
  return (
    <div className='w-full h-full px-4 py-6'>
      {data.map((item, i) => (
        <div key={i} className='w-[20vw] rounded-2xl overflow-hidden flex flex-col gap-11 h-[35vh] bg-white shadow-lg'>
          <div className='w-full h-1/2 bg-blue-400 relative'>
              <div className='w-32 h-32 border-[4px] absolute left-[28%] top-[24%] border-blue-500 rounded-full bg-white'>
              </div>
          </div>
          <div className='w-full h-full flex flex-col items-center justify-center text-black'>
            <h1>{item.name}</h1>
            <h1>{item.degree.map((deg, index) => (
              <span key={index}>{deg}{index !== item.degree.length - 1 && ", "}</span>
            ))}</h1>
            <Link href={item.Address}><MapPin /></Link>
            <Button>Schedule</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Page