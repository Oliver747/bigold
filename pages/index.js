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
const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#91b5e6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
  },

  imageWrapper: {
    position: "relative",
    width: "360px",
    height: "360px",
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "2rem",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  },

  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "16px",
  },

  bottomLeftImage: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "3px solid white",
    backgroundColor: "#fff",
    zIndex: 2,
  },

  bottomRightImage: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid white",
    backgroundColor: "#fff",
    zIndex: 2,
  },

  titleBox: {
    textAlign: "center",
    marginBottom: "2rem",
  },

  title: {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: 0,
    color: "#ffffff",
  },

  subtitle: {
    fontSize: "14px",
    letterSpacing: "1px",
    color: "#e0f7fa",
    margin: 0,
    marginTop: "0.5rem",
  },

  buttonRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  button: {
    padding: "10px 18px",
    backgroundColor: "#6b90c7",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    width: "130px",
    height: "44px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    opacity: 0.95,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    textAlign: "center",
    fontSize: "14px",
    color: "#ffffff",
    padding: "1rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    background: "transparent",
    marginTop: "auto",
    width: "100%",
    boxSizing: "border-box",
  },
};
