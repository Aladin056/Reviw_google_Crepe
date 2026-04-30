import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Gift, Star, RotateCcw, CheckCircle2 } from "lucide-react";

// 👉 Remplace par ton vrai lien Google Avis
const GOOGLE_REVIEW_URL = "https://g.page/r/CVG7bO5XPR9PEBM/review";

const prizes = [
  { label: "🥤 Boisson offerte", probability: 60 },
  { label: "🥞 Crêpe Nutella", probability: 10 },
  { label: "🥤 Smoothie", probability: 10 },
  { label: "🍫 Kinder Bueno", probability: 20 },
];

function pickPrize() {
  const total = prizes.reduce((sum, prize) => sum + prize.probability, 0);
  let random = Math.random() * total;

  for (const prize of prizes) {
    random -= prize.probability;
    if (random <= 0) return prize;
  }

  return prizes[0];
}

export default function App() {
  const [step, setStep] = useState("start");
  const [hasClickedReview, setHasClickedReview] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const playedRef = useRef(false);

  const colors = useMemo(
    () => ["#fde68a", "#bfdbfe", "#fecaca", "#bbf7d0", "#ddd6fe", "#fed7aa"],
    []
  );

  const handleReviewClick = () => {
    setHasClickedReview(true);
    window.open(GOOGLE_REVIEW_URL, "_blank");
  };

  const handleSpin = () => {
    if (playedRef.current || isSpinning) return;

    const prize = pickPrize();
    const prizeIndex = prizes.findIndex((p) => p.label === prize.label);
    const segmentAngle = 360 / prizes.length;
    const targetAngle = 360 - prizeIndex * segmentAngle - segmentAngle / 2;
    const spins = 5 * 360;
    const finalRotation = rotation + spins + targetAngle;

    playedRef.current = true;
    setIsSpinning(true);
    setRotation(finalRotation);

    setTimeout(() => {
      setResult(prize);
      setIsSpinning(false);
      setStep("result");
    }, 4000);
  };

  const resetDemo = () => {
    playedRef.current = false;
    setResult(null);
    setRotation(0);
    setStep("start");
    setHasClickedReview(false);
  };

  return (
    <div style={{ minHeight: "100vh", padding: 20, textAlign: "center" }}>
      <h1>🎁 Laisse ton avis et gagne !</h1>
      <p>Laisse un avis Google honnête puis tente ta chance.</p>

      {step === "start" && (
        <div>
          <button onClick={handleReviewClick}>
            ⭐ Laisser un avis Google
          </button>

          <br /><br />

          <button
            disabled={!hasClickedReview}
            onClick={() => setStep("wheel")}
          >
            J'ai laissé mon avis, jouer
          </button>
        </div>
      )}

      {step === "wheel" && (
        <div>
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              margin: "20px auto",
              border: "10px solid #333",
              position: "relative",
              overflow: "hidden",
              transform: `rotate(${rotation}deg)`,
              transition: "transform 4s ease-out",
              background: `conic-gradient(${prizes
                .map((_, i) => {
                  const start = (i * 360) / prizes.length;
                  const end = ((i + 1) * 360) / prizes.length;
                  return `${colors[i % colors.length]} ${start}deg ${end}deg`;
                })
                .join(",")})`,
            }}
          />

          <button onClick={handleSpin} disabled={isSpinning}>
            {isSpinning ? "Ça tourne..." : "🎯 Tourner la roue"}
          </button>
        </div>
      )}

      {step === "result" && result && (
        <div>
          <h2>🎉 Tu as gagné :</h2>
          <h1>{result.label}</h1>

        </div>
      )}
    </div>
  );
}