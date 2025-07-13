import { useState } from "react";

const totalImages = 10; // 假设你有 10 张头像：1.png ~ 10.png

export default function Home() {
  const [imageIndex, setImageIndex] = useState(1);

  const handleGenerate = () => {
    const randomIndex = Math.floor(Math.random() * totalImages) + 1;
    setImageIndex(randomIndex);
  };

  const imagePath = `/avatars/${imageIndex}.png`;

  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "Arial" }}>
      <h1>🎲 随机头像生成器</h1>

      <img
        src={imagePath}
        alt="avatar"
        style={{
          width: 200,
          height: 200,
          objectFit: "cover",
          borderRadius: "10px",
          marginTop: "20px"
        }}
      />

      <button
        onClick={handleGenerate}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        随机生成头像
      </button>
    </div>
  );
}
