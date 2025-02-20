"use client";
import { useState, useEffect } from "react";

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to calculate the time left until midnight
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set time to 12 AM of the next day

    const diff = midnight.getTime() - now.getTime();

    return {
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  useEffect(() => {
    // Set the initial time left
    setTimeLeft(calculateTimeLeft());

    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-gray-800 p-4">
      {(["hours", "minutes", "seconds"] as const).map((unit) => (
        <div
          key={unit}
          className={`flex flex-col items-center px-4 py-2 rounded-lg w-24 md:w-32 ${
            unit === "seconds"
              ? "border border-red-500 text-red-500"
              : "bg-gray-100"
          }`}
        >
          <span className="text-xl md:text-2xl font-bold">
            {timeLeft[unit].toString().padStart(2, "0")}
          </span>
          <span className="text-xs md:text-sm">
            {unit.charAt(0).toUpperCase() + unit.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
}
