import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import "react-calendar/dist/Calendar.css";
import "./CountdownWithCalendar.css";

export default function CountdownWithCalendar() {
  const weddingDate = new Date("2025-08-02T00:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [month, setMonth] = useState(weddingDate);

  function getTimeLeft() {
    const diff = weddingDate - new Date();
    return {
      days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <h2 className="title">
        THÁNG {month.getMonth() + 1} / {month.getFullYear()}
      </h2>

      <div className="calendar-wrapper">
        <Calendar
          value={weddingDate}
          tileClassName={({ date, view }) => {
            if (
              view === "month" &&
              date.getDate() === weddingDate.getDate() &&
              date.getMonth() === weddingDate.getMonth()
            ) {
              return "highlight-date";
            }
          }}
        />
      </div>

      <div className="time-grid">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div className="time-block" key={label}>
            <AnimatePresence mode="wait">
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="time-value"
              >
                {value.toString().padStart(2, "0")}
              </motion.div>
            </AnimatePresence>
            <div className="time-label">
              {label === "days"
                ? "Ngày"
                : label === "hours"
                ? "Giờ"
                : label === "minutes"
                ? "Phút"
                : "Giây"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
