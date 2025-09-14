"use client";

import { useEffect, useState } from "react";

export default function VintageClockRoom() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || !time) {
    // Avoid hydration mismatch
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center p-4">
        <div className="text-amber-900 font-mono text-lg">Loading clock...</div>
      </div>
    );
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondsDeg = seconds * 6;
  const minutesDeg = minutes * 6 + seconds * 0.1;
  const hoursDeg = (hours % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60);

  const numerals = [
    "XII", "I", "II", "III", "IV", "V",
    "VI", "VII", "VIII", "IX", "X", "XI",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center p-4">
      {/* Room wrapper */}
      <div className="relative w-full max-w-5xl h-[560px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-amber-100 to-amber-50">
        
        {/* === WALL + INTERIOR === */}
        <div className="absolute inset-0">
          {/* wallpaper */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-200/60"></div>

          {/* picture frame */}
          <div className="absolute left-12 top-20 w-32 h-24 bg-amber-200 rounded-md shadow-md flex items-center justify-center border-4 border-amber-300">
            <div className="w-24 h-14 bg-gradient-to-r from-rose-200 to-yellow-100 rounded-sm" />
          </div>

          {/* window */}
          <div className="absolute right-12 top-12 w-44 h-36 bg-sky-100 rounded-md border-4 border-sky-200 shadow-inner overflow-hidden">
            <div className="w-full h-1/2 bg-gradient-to-b from-sky-200 to-sky-400" />
            <div className="w-full h-1/2 bg-green-200" />
          </div>

          {/* hook & string */}
          <div className="absolute left-1/2 -translate-x-1/2 top-8 flex flex-col items-center z-20">
            <div className="w-6 h-6 rounded-full bg-gray-700 shadow-md" />
            <div className="w-0.5 h-12 bg-gray-600" />
          </div>

          {/* floor */}
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-amber-400 to-amber-300 border-t-8 border-amber-500" />
        </div>

        {/* furniture */}
        <div className="absolute bottom-6 left-10 right-10 flex items-end gap-8 z-10">
          <div className="flex-1 max-w-[520px]">
            <div className="relative h-40 bg-red-200 rounded-2xl shadow-md p-4">
              <div className="absolute -top-6 left-6 w-20 h-12 bg-red-300 rounded-md shadow-sm" />
              <div className="absolute -top-6 right-6 w-20 h-12 bg-red-300 rounded-md shadow-sm" />
              <div className="absolute bottom-4 left-6 w-24 h-10 bg-amber-100 rounded-md" />
            </div>
            <div className="mt-2 flex gap-2">
              <div className="w-20 h-8 bg-amber-200 rounded-full" />
              <div className="w-36 h-8 bg-amber-200 rounded-full" />
            </div>
          </div>

          <div className="w-48 h-24 bg-amber-200 rounded-xl shadow-lg flex items-center justify-center">
            <div className="w-28 h-12 bg-amber-300 rounded-md" />
          </div>

          <div className="w-28 flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-emerald-200 rounded-full shadow-inner" />
            <div className="w-14 h-28 bg-yellow-100 rounded-lg shadow-md flex items-start justify-center">
              <div className="w-8 h-14 bg-yellow-200 rounded-t-md" />
            </div>
          </div>
        </div>

        {/* rug */}
        <div className="absolute left-20 right-20 bottom-14 h-28 bg-gradient-to-b from-pink-100 to-pink-200 rounded-3xl shadow-inner z-10" />

        {/* === CLOCK === */}
        <div className="absolute left-1/2 -translate-x-1/2 top-20 z-30 flex items-center justify-center w-[55%] max-w-[400px] aspect-square">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full border-[10px] md:border-[14px] border-amber-900 bg-amber-50 shadow-[0_18px_40px_rgba(0,0,0,0.25)] flex items-center justify-center">
              <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-b from-amber-50 to-amber-100 relative">
                
                {/* Roman numerals */}
                {numerals.map((num, i) => {
                  const angle = (i * 30 - 60) * (Math.PI / 180);
                  const radius = 0.43;
                  const x = 50 + radius * 100 * Math.sin(angle);
                  const y = 50 - radius * 100 * Math.cos(angle);
                  return (
                    <div
                      key={i}
                      className="absolute text-amber-900 font-serif font-bold text-[10px] sm:text-xs md:text-sm lg:text-base select-none"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%,-50%)",
                      }}
                    >
                      {num}
                    </div>
                  );
                })}

                {/* hands */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  {/* Hour hand */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "50%",
                      left: "50%",
                      transform: `translateX(-50%) rotate(${hoursDeg}deg)`,
                      transformOrigin: "50% 100%",
                      width: "6px",
                      height: "28%",
                      borderRadius: "8px",
                      background: "linear-gradient(180deg,#6b4b00,#2a1b00)",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                      transition: "transform 450ms cubic-bezier(.2,.8,.2,1)",
                    }}
                  />
                  {/* Minute hand */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "50%",
                      left: "50%",
                      transform: `translateX(-50%) rotate(${minutesDeg}deg)`,
                      transformOrigin: "50% 100%",
                      width: "4px",
                      height: "40%",
                      borderRadius: "6px",
                      background: "linear-gradient(180deg,#9a6b00,#6b3e00)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.18)",
                      transition: "transform 300ms cubic-bezier(.2,.8,.2,1)",
                    }}
                  />
                  {/* Second hand */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "50%",
                      left: "50%",
                      transform: `translateX(-50%) rotate(${secondsDeg}deg)`,
                      transformOrigin: "50% 100%",
                      width: "2px",
                      height: "48%",
                      borderRadius: "3px",
                      background: "linear-gradient(180deg,#ff4d4d,#c12727)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      transition: "transform 110ms linear",
                    }}
                  />
                </div>

                {/* knob */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-amber-900 border-2 border-amber-600 shadow" />

                {/* digital */}
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center">
                  <div className="text-sm md:text-lg lg:text-xl font-bold text-amber-900 font-mono select-none">
                    {String((hours % 12) || 12).padStart(2, "0")}:
                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs md:text-sm text-amber-700 font-semibold">
                    {hours >= 12 ? "PM" : "AM"}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -inset-1 rounded-full border border-amber-800 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

