import { useEffect, useState } from "react";

interface CountdownProps {
  date: string;
}

export default function Countdown({ date }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(date).getTime() - new Date().getTime();
      if (diff <= 0) return clearInterval(interval);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

  if (!timeLeft) return null;
  return (
    <div className="mt-6 bg-white/70 p-4 rounded-xl shadow-md text-xl">
      💖 Còn {timeLeft.days} ngày {timeLeft.hours} giờ {timeLeft.mins} phút {timeLeft.secs} giây 💖
    </div>
  );
}
