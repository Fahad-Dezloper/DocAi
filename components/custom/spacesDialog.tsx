"use client";
import axios from "axios";
import {motion} from 'framer-motion'
import { XIcon, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";

import Loader from "../dockAi/PopOverLoader";
import Mansorygrid from "../ui/mansory-grid";

// Global cache object (Persists even when component unmounts)
// const spaceCache = {};

const SpacesDialog = ({ spaceName, spaceIdd, setPopOver, popOver }) => {
  const [spaceData, setSpacesData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("Space id is this:", spaceIdd);
  console.log("Space Name is this:", spaceName);

  const treatmentPlans = [
    {
      id: 1,
      title: "Anxiety",
      icon: "🧘‍♂️",
      brief: "Calm your mind with simple steps.",
      details: ["Practice Deep Breathing: Inhale for 4 seconds", 
        "hold for 7, exhale for 8.",  
        "Stay Active: Regular exercise helps release stress",  
        "Healthy Diet: Avoid caffeine, eat whole foods.",  
        "Good Sleep: Maintain a consistent sleep routine.",  
        "Talk to Someone: Therapy and support groups help."  ],
    },
    {
      id: 2,
      title: "Diabetes",
      icon: "🍏",
      brief: "Control sugar levels naturally.",
      details: [
        "Healthy Diet: Eat fiber-rich, low-carb meals.",
        "Regular Exercise: 30 minutes of walking or yoga.",
        "Hydration: Drink plenty of water daily.",
        "Monitor Sugar Levels: Keep track and adjust diet accordingly.",
        "Stress Management: Meditate and avoid excessive stress."
      ],
    },
    {
      id: 3,
      title: "High Blood Pressure",
      icon: "❤️",
      brief: "Maintain a healthy heart naturally.",
      details: [
        "Reduce Salt Intake: Aim for less than 2,300 mg/day.",
        "Stay Active: At least 150 minutes of exercise per week.",
        "Eat Healthy: Focus on fruits, vegetables, and lean protein.",
        "Limit Alcohol & Caffeine: Consume in moderation.",
        "Manage Stress: Try meditation and deep breathing exercises."
      ],      
    },
    {
      id: 4,
      title: "Obesity",
      icon: "⚖️",
      brief: "Sustainable weight loss & wellness.",
      details: [
        "Eat Nutrient-Dense Foods: More veggies, lean protein, whole grains.",
        "Exercise Regularly: 150–300 minutes of moderate activity per week.",
        "Portion Control: Eat smaller meals, avoid binge eating.",
        "Stay Hydrated: Water boosts metabolism & reduces hunger.",
        "Sleep Well: Lack of sleep can increase cravings."
      ],
    },
    {
      id: 5,
      title: "Depression",
      icon: "💙",
      brief: "Boost your mood with self-care.",
      details: [
        "Stay Connected: Talk to friends & family.",
        "Exercise Daily: It releases mood-boosting endorphins.",
        "Healthy Routine: Get proper sleep & balanced meals.",
        "Practice Gratitude: Write down things you’re grateful for.",
        "Seek Professional Help: Therapy or counseling is valuable."
      ],
    },
  ];
  

  // const fetchData = async (forceRefresh = false) => {
  //   // If data is already cached and no force refresh, use cached data
  //   if (spaceCache[spaceIdd] && !forceRefresh) {
  //     console.log("Using cached data for:", spaceName);
  //     setSpacesData(spaceCache[spaceIdd]);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     console.log("Fetching data...", spaceIdd);
  //     const res = await axios.get(`/api/space/spaceProjects?id=${spaceIdd}`);
  //     const projects = Array.isArray(res.data)
  //       ? res.data.map((item) => item.project)
  //       : [];
  //     console.log("Fetched projects for", spaceName, projects);

  //     // Cache the fetched data globally
  //     spaceCache[spaceIdd] = projects;
  //     setSpacesData(projects);
  //   } catch (error) {
  //     console.error("Error while fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (spaceIdd) {
  //     fetchData();
  //   }
  // }, [spaceIdd]);

  return (
    <motion.div className="size-full pt-8 pb-2 text-3xl flex flex-col gap-4 overflow-y-scroll text-white">
      <div className="px-8 flex justify-between items-center">
        <div className="capitalize font-roboto text-4xl font-semibold">{spaceName}</div>

        <div className="flex gap-2">
          {/* Refresh Button */}
          {/* <div
            onClick={() => fetchData(true)} // Force refresh
            className="p-2 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-800"
          >
            <RotateCcw size={24} />
          </div> */}

          {/* Close Button */}
          <div
            onClick={() => setPopOver(!popOver)}
            className="p-2 cursor-pointer rounded-full hover:bg-gray-800"
          >
            <XIcon size={24} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-[2vw] text-white font-semibold flex flex-col size-full items-center justify-center">
          <Loader />
          <h3 className="text-[2vw] opacity-20">Fetching Your Projects...</h3>
        </div>
      ) : treatmentPlans.length > 0 ? (
        <div className="w-full h-fit overflow-y-scroll columns-2xs px-6">
          {treatmentPlans.map((project, i) => (
            <motion.div initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4 }}
           key={i} className="w-[25vw] mt-4 relative">
              <Mansorygrid
                name={project.title}
                brief={project.brief}
                details={project.details}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col size-full items-center justify-center">
          <img
            src="https://app.100xdevs.com/NoBookmark.svg"
            alt="No Bookmark image"
            className="w-[50vw] h-[50vh]"
          />
          <h1 className="text-lg text-center">
            Well.. You haven&apos;t saved anything in this space🌌 yet.... <br />
            💡When you find something you want to save for later, Click the ✅
            icon and it will appear here.
          </h1>
        </div>
      )}
    </motion.div>
  );
};

export default SpacesDialog;
