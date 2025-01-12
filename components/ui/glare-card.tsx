"use client"
import { cn } from "@/lib/utils";
import { useRef } from "react";

export const GlareCard = ({name, num}) => {
  return (
    <div className="relative w-full bg-white text-black rounded-[2.5em] p-4 transition-transform duration-400 ease-in-out hover:cursor-pointer hover:scale-[0.97] active:scale-[0.9]">
      <div className="flex flex-col justify-between gap-20 h-full transition-transform duration-400 ease-in-out hover:scale-[0.96]">
        <div className="flex justify-between">
          <span className="font-bold">{num}.</span>
          <p className="font-semibold">{name}</p>
        </div>
        <div className="flex justify-between items-end">
          <p className="font-semibold">Space</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={32}
            viewBox="0 -960 960 960"
            width={32}
            className="transition-transform duration-400 ease-in-out hover:scale-105"
          >
            <path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={48}
          viewBox="0 -960 960 960"
          width={48}
          className="w-16 h-16 transition-transform duration-400 ease-in-out hover:scale-105"
        >
          <path d="m393-165 279-335H492l36-286-253 366h154l-36 255Zm-73 85 40-280H160l360-520h80l-40 320h240L400-80h-80Zm153-395Z" />
        </svg>
      </div>
    </div>
  );
};
