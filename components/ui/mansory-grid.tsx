import React, { useEffect, useState } from "react";
import { WobbleCard } from "./wobble-card";
import { ArrowRight, CornerDownRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const imageCache = {};

const Mansorygrid = ({ name, brief, details }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [PopOver, showPopOver] = useState(false);

  const [boxColor] = useState(() => {
    const colors = [
      "bg-cyan-700",
      "bg-purple-700",
      "bg-sky-600",
      "bg-stone-400",
      "bg-slate-400",
      "bg-indigo-800",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  });


  return (
    <WobbleCard
      containerClassName={"w-full"}
      className={`${previewImage ? "min-h-[25vh]" : "min-h-[20vh]"} ${boxColor} flex flex-col z-[30] justify-between`}
    >
      <div className="flex flex-col w-full !h-full">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
          {name}
        </h2>
        <div className="flex gap-1 items-center">
          <CornerDownRightIcon />
          <h4 className="text-xs px-3 py-1 bg-gray-600 hover:bg-gray-700 cursor-pointer rounded-full mt-1">
            {brief}
          </h4>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="flex flex-col gap-1 text-lg z-[40] cursor-pointer hover:gap-3 duration-200 mt-4 ease-in-out items-center"
        >
         {details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> {/* Check icon */}
              {detail}
            </li>
          ))}
        </div>
      </motion.div>
    </WobbleCard>
  );
};

export default Mansorygrid;
