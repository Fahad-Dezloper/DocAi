import { MapIcon, MapPin, Phone, PinIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NearClinic = () => {
  return (
    <div className="w-full h-40 flex gap-3 text-black relative items-center px-4 py-4 gradient2">
        <div className='w-40 h-3 rounded-b-2xl absolute top-0 left-[26%] bg-orange-400'></div>
        <div className='w-40 h-28 absolute bottom-0 right-0 rounded-t-xl bg-blue-500 overflow-hidden'>
            <img src="https://lh5.googleusercontent.com/p/AF1QipMKQ7IHTkrgZaBY7f-YOcqUjMQDp9NgybJj2bJ0=w325-h218-n-k-no" className='w-full h-full object-cover' alt="" />
        </div>
        <div className='flex flex-col h-full w-full justify-between'>
            <div className='flex justify-between w-full items-center'>
        <h3 className='font-semibold'>NSUT Clinic</h3>
        <div className='text-xs'>⭐⭐⭐⭐</div>
        </div>
        <div>Timings: <br /> 9Am to 9Pm</div>
        <div className='flex gap-2'>
            <a href={"https://maps.app.goo.gl/ixYEhv9gC3XrT9EWA"} className=''><MapPin size={20} /></a>
            <a href={"https://maps.app.goo.gl/ixYEhv9gC3XrT9EWA"} className=''><Phone size={20} /></a>
        </div>
        </div>
    </div>
  )
}

export default NearClinic