import { useState } from "react";
import { CARDS } from "./cards";
import "./App.css";

// ─── Single face-down card ───────────────────────────────────────────────────
function CardBack({ onClick, index }) {
  return (
    <div
      className="card-back"
      onClick={onClick}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="card-back-pattern">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i}>🔥</span>
        ))}
      </div>
      <p className="pick-me">PICK ME</p>
    </div>
  );
}

// ─── The roast reveal screen ─────────────────────────────────────────────────
function RoastScreen({ card, onReset }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="roast-screen">
      <div className="roast-card" style={{ "--color": card.color }}>

        {/* Top half — always visible */}
        <div className="roast-top">
          {card.image ? (
            <img src={card.image} alt={card.name} className="roast-img" />
          ) : (
            <div className="roast-emoji">{card.emoji}</div>
          )}
          <h2 className="roast-name">{card.name}</h2>
          <div className="roast-meme">
            {card.memeText.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        {/* Bottom half — tap to reveal */}
        {!revealed ? (
          <button className="reveal-btn" onClick={() => setRevealed(true)}>
            TAP TO GET ROASTED 🔥
          </button>
        ) : (
          <div className="roast-bottom">
            <p className="roast-label">🔥 WHY YOU PICKED THIS 🔥</p>
            <p className="roast-text">{card.roast}</p>
            <button className="reset-btn" onClick={onReset}>
              pick another card (you can't escape) 💀
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState(null);

  // Shuffle cards once on load
  const [shuffled] = useState(() =>
    [...CARDS].sort(() => Math.random() - 0.5)
  );

  if (selected) {
    return <RoastScreen card={selected} onReset={() => setSelected(null)} />;
  }

  return (
    <div className="app">
      <h1 className="title">PICK A CARD</h1>
      <p className="subtitle">
        every card reveals the truth about you.<br />
        <span className="warning">you have been warned 💀</span>
      </p>

      <div className="grid">
        {shuffled.map((card, i) => (
          <CardBack key={card.id} index={i} onClick={() => setSelected(card)} />
        ))}
      </div>

      <p className="footer">a completely useless project ✨</p>
    </div>
  );
}
