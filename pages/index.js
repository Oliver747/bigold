import { useState } from "react";

const totalImages = 16;

export default function Home() {
  const [history, setHistory] = useState([1]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = history[currentIndex];
  const imagePath = `/avatars/${currentImage}.webp`;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleGenerate = () => {
    const newId = Math.floor(Math.random() * totalImages) + 1;
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newId);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = `avatar_${currentImage}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between bg-[#7da7d9] text-white"
      style={{ fontFamily: "sans-serif" }}
    >
      {/* 主头像 */}
      <div className="relative mt-8 mb-4 w-full flex justify-center">
        <img
          src={imagePath}
          alt="Avatar"
          className="w-72 h-72 object-cover rounded-2xl shadow-lg"
        />

        {/* 左下角方形头像 */}
        <img
          src={imagePath}
          alt="corner-left"
          className="absolute left-4 bottom-[-20px] w-16 h-16 rounded-lg border-2 border-white z-10"
        />

        {/* 右下角圆形头像 */}
        <img
          src={imagePath}
          alt="corner-right"
          className="absolute right-4 bottom-[-20px] w-16 h-16 rounded-full border-2 border-white z-10"
        />
      </div>

      {/* 标题文字 */}
      <div className="text-center text-lg mb-6">
        <div className="font-bold text-2xl">BLUE LIGHT #{currentImage}</div>
        <div className="text-sm mt-1 tracking-wide">BASED ON MIXIN INSCRIPTION</div>
      </div>

      {/* 按钮区 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={handlePrev}
          className="bg-white text-[#1a2e46] px-6 py-2 rounded shadow-md text-lg font-semibold hover:opacity-90"
        >
          PREV
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-[#1a2e46] px-6 py-2 rounded shadow-md text-lg font-semibold hover:opacity-90"
        >
          NEXT
        </button>
        <button
          onClick={handleGenerate}
          className="bg-white text-[#1a2e46] px-6 py-2 rounded shadow-md text-lg font-semibold hover:opacity-90"
        >
          RANDOM
        </button>
        <button
          onClick={handleDownload}
          className="bg-white text-[#1a2e46] px-6 py-2 rounded shadow-md text-lg font-semibold hover:opacity-90"
        >
          DOWNLOAD
        </button>
      </div>

      {/* 页脚 */}
      <footer className="w-full text-center text-xs text-white py-4 bg-transparent">
        © 2025 Avatar Generator. All rights reserved.
      </footer>
    </div>
  );
}
