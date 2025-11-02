import { useEffect } from "react";

export default function FlowerEffect() {
  useEffect(() => {
    const container = document.body;
    const interval = setInterval(() => {
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.style.left = Math.random() * 100 + "vw";
      flower.style.animationDuration = Math.random() * 3 + 2 + "s";
      flower.innerText = "🌸";
      container.appendChild(flower);
      setTimeout(() => flower.remove(), 5000);
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return null;
}
