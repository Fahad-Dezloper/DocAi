"use client"
import axios from 'axios';
import { Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button';
import CalCom from '@/components/dockAi/CalCom';

const Page = ({user}) => {
  const [account, setAccount] = useState(null);
  console.log("user galt", user);
  const [doc, setDoc] = useState([]);
  async function getDoc(){
    const res = await axios.get("/api/user/getAllDoc");
    console.log("reached here", res);
    setDoc(res.data.data);
  }

  const data = [
    {
    name: "Subhash", //Dr.
    email: "subhash@gmail.com",
    degree: ["MBBS", "MS", "PHD"],
    walletPubAdd: "516516165116651616",
    Address: "Chandigarh",
    plan: "PREMIUM",
    image: "https://media.istockphoto.com/id/1201439096/photo/male-medical-professional-is-confident-in-studio.jpg?s=612x612&w=0&k=20&c=T3a2ESMxG_cUVHvRxq4L0AKULnUPSpTR-qcBrce4h2I=",
    money: "₹500"
  },
  {
    name: "Dr. Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    degree: ["MBBS", "MD"],
    walletPubAdd: "123456789012345678",
    Address: "Mumbai",
    plan: "PREMIUM",
    image: "https://media.istockphoto.com/id/179011088/photo/indian-doctor.jpg?s=612x612&w=0&k=20&c=EwRn1EWy79prCtdo8yHM6hvCVVcaKTznVBpVURPJxt4=",
    money: "₹800"
  },
  {
    name: "Dr. Priya Sharma",
    email: "priya.sharma@gmail.com",
    degree: ["MBBS", "MS"],
    walletPubAdd: "987654321098765432",
    Address: "Delhi",
    plan: "BASIC",
    image: "https://media.istockphoto.com/id/1367507209/photo/portrait-of-indian-female-doctor-stock-photo.jpg?s=612x612&w=0&k=20&c=mI-MPGA_bHBLK9D77v8shYOZdI7Pqnlh2_xJE00tUHM=",
    money: "₹600"
  },
  {
    name: "Dr. Rohit Verma",
    email: "rohit.verma@gmail.com",
    degree: ["MBBS", "MD", "DM"],
    walletPubAdd: "543216789054321678",
    Address: "Bangalore",
    plan: "PREMIUM",
    image: "https://media.istockphoto.com/id/1212177444/photo/happy-male-doctor-of-indian-ethnicity.jpg?s=612x612&w=0&k=20&c=q5Hv1bcmMOiocprvNxpQgtqcbNcPltBnhZILdUE8BjQ=",
    money: "₹1200"
  },
  {
    name: "Dr. Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    degree: ["MBBS", "MS", "PHD"],
    walletPubAdd: "112233445566778899",
    Address: "Kolkata",
    plan: "STANDARD",
    image: "https://media.istockphoto.com/id/1425798958/photo/photo-of-confident-female-doctor-in-hospital-looking-at-camera-with-smile.jpg?s=612x612&w=0&k=20&c=i91idG544pXuYkw5ju6iIzm1m-lEqQaygeOOrjG5GEk=",
    money: "₹700"
  },
  {
    name: "Dr. Sameer Joshi",
    email: "sameer.joshi@gmail.com",
    degree: ["MBBS", "MD"],
    walletPubAdd: "998877665544332211",
    Address: "Hyderabad",
    plan: "PREMIUM",
    image: "https://media.istockphoto.com/id/1346124900/photo/confident-successful-mature-doctor-at-hospital.jpg?s=612x612&w=0&k=20&c=S93n5iTDVG3_kJ9euNNUKVl9pgXTOdVQcI_oDGG-QlE=",
    money: "₹900"
  },
  {
    name: "Dr. Anjali Saxena",
    email: "anjali.saxena@gmail.com",
    degree: ["MBBS", "MS"],
    walletPubAdd: "776655443322110099",
    Address: "Chennai",
    plan: "BASIC",
    image: "https://media.istockphoto.com/id/2158610739/photo/handsome-male-doctor-with-stethoscope-over-neck-working-while-looking-at-camera-in-the.jpg?s=612x612&w=0&k=20&c=WWd2ujTaKfM7VU47_z_E-2YPIGlEEvJa4qVgavD4a70=",
    money: "₹500"
  },
  {
    name: "Dr. Rajesh Khanna",
    email: "rajesh.khanna@gmail.com",
    degree: ["MBBS", "MS", "MCH"],
    walletPubAdd: "554433221100998877",
    Address: "Pune",
    plan: "PREMIUM",
    image: "https://media.istockphoto.com/id/1189899437/photo/smiling-doctor-standing-on-grey-wall.jpg?s=612x612&w=0&k=20&c=VUbnInyo4_sF3Be_cZZDs3E-uquRx9dP4Zbd-Q-5VkU=",
    money: "₹1100"
  },
  {
    name: "Dr. Swati Agarwal",
    email: "swati.agarwal@gmail.com",
    degree: ["MBBS", "MD", "DM"],
    walletPubAdd: "665544332211009988",
    Address: "Ahmedabad",
    plan: "STANDARD",
    image: "https://media.istockphoto.com/id/479378798/photo/portrait-of-female-doctor.jpg?s=612x612&w=0&k=20&c=P-W8KSJBYhYj2RSx1Zhff6FCGvtRDC3AAzox8deMmew=",
    money: "₹750"
  },
  {
    name: "Dr. Vikram Choudhary",
    email: "vikram.choudhary@gmail.com",
    degree: ["MBBS", "MD"],
    walletPubAdd: "332211009988776655",
    Address: "Jaipur",
    plan: "BASIC",
    image: "https://media.istockphoto.com/id/1298800629/photo/portrait-of-confident-male-doctor-looking-at-camera.jpg?s=612x612&w=0&k=20&c=CB3h3a-0yUBgaZHhF2Kd5ibfDv25Qcjsca-ia5gIWUM=",
    money: "₹550"
  },
  {
    name: "Dr. Sneha Deshmukh",
    email: "sneha.deshmukh@gmail.com",
    degree: ["MBBS", "MS"],
    walletPubAdd: "778899001122334455",
    Address: "Lucknow",
    plan: "PREMIUM",
    image: "https://media.istockphoto.com/id/1412849328/photo/portrait-of-a-young-nurse-doctor.jpg?s=612x612&w=0&k=20&c=7xyroZ4ZjhIxdzo69ouaa7wUnqt-cTg15hTxoG2nBKs=",
    money: "₹850"
  },
  {
    name: "Dr. Manish Tiwari",
    email: "manish.tiwari@gmail.com",
    degree: ["MBBS", "MS", "PHD"],
    walletPubAdd: "990011223344556677",
    Address: "Indore",
    plan: "STANDARD",
    image: "https://media.istockphoto.com/id/1468678624/photo/nurse-hospital-employee-and-portrait-of-black-man-in-a-healthcare-wellness-and-clinic-feeling.jpg?s=612x612&w=0&k=20&c=AGQPyeEitUPVm3ud_h5_yVX4NKY9mVyXbFf50ZIEtQI=",
    money: "₹650"
  },
  {
    name: "Dr. Kavita Nair",
    email: "kavita.nair@gmail.com",
    degree: ["MBBS", "MD"],
    walletPubAdd: "221100998877665544",
    Address: "Bhopal",
    plan: "PREMIUM",
    image: "https://media.istockphoto.com/id/1346711310/photo/portrait-of-smiling-female-doctor-wearing-uniform-standing.jpg?s=612x612&w=0&k=20&c=nPsBL7HwQ7y14HP6J7lcCyKl51X5pPSPGnweXHFzT9o=",
    money: "₹950"
  },
  {
    name: "Dr. Amit Singh",
    email: "amit.singh@gmail.com",
    degree: ["MBBS", "MS"],
    walletPubAdd: "334455667788990011",
    Address: "Nagpur",
    plan: "BASIC",
    image: "https://media.istockphoto.com/id/2158610739/photo/handsome-male-doctor-with-stethoscope-over-neck-working-while-looking-at-camera-in-the.jpg?s=612x612&w=0&k=20&c=WWd2ujTaKfM7VU47_z_E-2YPIGlEEvJa4qVgavD4a70=",
    money: "₹600"
  },
  {
    name: "Dr. Ritu Gupta",
    email: "ritu.gupta@gmail.com",
    degree: ["MBBS", "MD"],
    walletPubAdd: "445566778899001122",
    Address: "Patna",
    plan: "STANDARD",
    image: "https://media.istockphoto.com/id/1058457940/photo/smiling-female-doctor-standing-with-medical-colleagues-in-a-hospital.jpg?s=612x612&w=0&k=20&c=3mBnrRaoM8spOm2u4FGXVfsyVTXoKzmPoH0vdqM4yUM=",
    money: "₹700"
  },
  {
    name: "Dr. Sandeep Malhotra",
    email: "sandeep.malhotra@gmail.com",
    degree: ["MBBS", "MS", "MCH"],
    walletPubAdd: "556677889900112233",
    Address: "Chandigarh",
    plan: "PREMIUM",
    image: "https://media.istockphoto.com/id/1441980127/photo/successful-mature-adult-businessman-stands-in-corporate-office.jpg?s=612x612&w=0&k=20&c=k-mT8UQ57BinOoCkfV_d9Ey3p_jG6oJaqt8GRfEJl4g=",
    money: "₹1000"
  }
]

  useEffect(() => {
    getDoc();
  }, [])


  return (
    <div className='flex flex-row justify-center pb-2 border overflow-y-scroll py-3 rounded-2xl h-[88vh]'>
    <div className='w-full h-full flex flex-wrap gap-5 px-4 py-6 overflow-y-scrolll'>
      {data.map((item, i) => (
        <div
        key={i}
        className="w-[18vw] rounded-2xl overflow-hidden flex flex-col gap-6 h-[38vh] bg-white shadow-lg transition-transform duration-300 hover:scale-105"
      >
        {/* Top Section with Avatar */}
        <div className="w-full h-1/2 gradient relative flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-white absolute bottom-[-30%] rounded-full bg-white flex items-center justify-center shadow-md">
            <img
              src={item.image || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      
        {/* Bottom Section with Details */}
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-900 px-4 text-center">
          {/* Name */}
          <h1 className="text-lg font-semibold">{item.name}</h1>
      
          {/* Degree */}
          <p className="text-sm text-gray-600">
            {item.degree.map((deg, index) => (
              <span key={index}>
                {deg}
                {index !== item.degree.length - 1 && ", "}
              </span>
            ))}
          </p>
      
          {/* Icons & Links */}
          <div className="flex gap-4 mt-2">
            <Link href={item.Address} className="text-blue-500 hover:text-blue-700">
              <MapPin size={20} />
            </Link>
            <Link href={`mailto:${item.email}`} className="text-red-500 hover:text-red-700">
              <Mail size={20} />
            </Link>
          </div>
      
          {/* Button */}
          {/* <Button className="mt-3 px-6 py-2 rounded-lg bg-blue-500 text-white flex gap-2 items-center hover:bg-blue-600"> */}
            {/* Schedule <span className="font-semibold">{item.money}</span> */}
            <CalCom />
        </div>
      </div>      
      ))}
    </div>
    </div>
  )
}

export default Page