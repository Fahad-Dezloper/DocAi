"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'

import { getUser } from '@/queries/queries'
import axios from 'axios'

const Navvv = ({user}) => {

    // async function getUserr(){
    //     try {
    //         const access = await axios.post("/")
    //         console.log("user data", access);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //   getUserr();
    // }, [])
    
    const navLink = [{
            name: "Ai Bot",
            link: "/"
        },
        {
            name: "Healthcare News",
            link: "/health"        
        }, {
            name: "Talk to Doc",
            link: "/doc"
        }]
  return (
    <div className='w-full flex items-center justify-center'>
        <div className='flex gap-3 bg-[#4338CA] rounded-full mt-4 mb-3'>
            {/* {user} */}
            {navLink.map((item, i) => (
                <Link key={i} href={item.link} className='py-2 px-4 text-white'>{item.name}</Link>
            ))}
        </div>
    </div>
  )
}

export default Navvv