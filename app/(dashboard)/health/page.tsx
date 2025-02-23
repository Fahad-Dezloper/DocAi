"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CACHE_KEY = "health_news_cache";
const CACHE_EXPIRY_KEY = "health_news_expiry";
const CACHE_DURATION = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

const Page = () => {
    const [news, setNews] = useState([]);

    async function fetchHealthNews() {
        try {
            const res = await axios.get("https://newsdata.io/api/1/news?apikey=pub_71307f324199bddf63579870ef4604775037b&q=health&country=in&language=en&category=health");
            console.log("Fetched news:", res.data.results);

            setNews(res.data.results);

            // Save data to localStorage with expiry time
            localStorage.setItem(CACHE_KEY, JSON.stringify(res.data.results));
            localStorage.setItem(CACHE_EXPIRY_KEY, JSON.stringify(Date.now() + CACHE_DURATION));
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    useEffect(() => {
        const cachedNews = localStorage.getItem(CACHE_KEY);
        const cachedExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

        if (cachedNews && cachedExpiry && Date.now() < JSON.parse(cachedExpiry)) {
            console.log("Using cached news");
            setNews(JSON.parse(cachedNews));
        } else {
            console.log("Fetching fresh news");
            fetchHealthNews();
        }
    }, []);

    return (
        // grid grid-cols-3 text-black flex-wrap overflow-y-scroll
        <div className="flex flex-row justify-center pb-2 border overflow-y-scroll py-3 rounded-2xl h-[88vh] ">
        <div className="w-full h-fit overflow-y-scroll columns-3xs px-6">
    {news && news.map((item) => (
        <div key={item.article_id} className='w-[18vw] h-fit rounded-xl overflow-hidden mt-4 relative'>
        <div 
            className={`${item.image_url ? "min-h-[25vh]" : "min-h-[20vh]"} flex bg-white text-black flex-col z-[30] justify-between`}
        >
            {/* Image */}
            <div className="w-full h-[50%]">
                {item.image_url && <img src={item.image_url} alt="news" className="w-full h-full object-cover" />}
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
                <h1 className="text-lg font-bold line-clamp-2">{item.title}</h1>
                <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>

                {/* Footer */}
                <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                    <span>{item.pubDate}</span>
                    <span className="font-semibold">{item.source}</span>
                </div>
            </div>
        </div>
        </div>
    ))}
</div>
</div>
    );
}

export default Page;
