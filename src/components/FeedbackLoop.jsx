import { useState } from "react";

export default function FeedbackLoop() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem" }}>
      <h3 style={{ color: "#fff", margin: "0 0 0.75rem", fontSize: "1rem", fontWeight: 700 }}>Was this analysis accurate?</h3>
      <div style={{ display: "flex", gap: "0.6rem" }}>
        {["👍 Yes, correct", "👎 No, wrong", "🤔 Partially"].map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            style={{ padding: "0.5rem 1rem", background: selected === opt ? "rgba(165,94,234,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${selected === opt ? "#A55EEA" : "rgba(255,255,255,0.08)"}`, borderRadius: "8px", color: selected === opt ? "#A55EEA" : "#888", fontSize: "0.82rem", cursor: "pointer" }}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected && (
        <div style={{ marginTop: "0.75rem", color: "#26de81", fontSize: "0.82rem" }}>
          ✅ Thanks! Your feedback helps improve the model.
        </div>
      )}
    </div>
  );
}