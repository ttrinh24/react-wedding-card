import { useEffect, useState } from "react";
import Countdown from "./components/Countdown";
import FlowerEffect from "./components/FlowerEffect";
import bg from "./assets/bg.jpg";
import music from "./assets/music.mp3";

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(() => new Audio(music));

  useEffect(() => {
    audio.loop = true;
    playing ? audio.play() : audio.pause();
    return () => audio.pause();
  }, [playing, audio]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center text-pink-800"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FlowerEffect />
      <h1 className="text-4xl font-bold mt-10 mb-2">Thiệp Cưới Online</h1>
      <h2 className="text-2xl font-semibold">Vinh 💕 Loan</h2>
      <p className="text-lg mt-2">Trân trọng kính mời bạn đến dự lễ thành hôn</p>
      <p className="text-md mt-1">Nhà hàng Hoa Sen, Quận 1, TP.HCM</p>

      <Countdown date="2025-12-20T00:00:00" />

      <button
        onClick={() => setPlaying(!playing)}
        className="mt-6 px-4 py-2 bg-pink-200 rounded-xl shadow hover:bg-pink-300"
      >
        {playing ? "Tắt nhạc 🎵" : "Bật nhạc 🎶"}
      </button>
    </div>
  );
}
