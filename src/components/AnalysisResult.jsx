import { CATEGORIES } from "../constants/data";

export default function AnalysisResult({ result, text }) {
  if (!result) return null;

  const top = [...result.flags].sort((a, b) => b.confidence - a.confidence)[0];
  const isSafe = top.confidence < 0.4;

  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem" }}>
      <span style={{ background: "rgba(165,94,234,0.15)", color: "#A55EEA", borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.72rem", fontWeight: 700 }}>STEP 6</span>
      <h3 style={{ color: "#fff", margin: "0.5rem 0 1rem", fontSize: "1rem", fontWeight: 700 }}>Analysis Result</h3>

      {/* Verdict banner */}
      <div style={{ padding: "1rem 1.25rem", background: isSafe ? "rgba(38,222,129,0.08)" : "rgba(255,59,92,0.08)", border: `1px solid ${isSafe ? "rgba(38,222,129,0.3)" : "rgba(255,59,92,0.3)"}`, borderRadius: "10px", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "1.5rem" }}>{isSafe ? "✅" : "🚨"}</span>
        <div>
          <div style={{ color: isSafe ? "#26de81" : "#FF3B5C", fontWeight: 700, fontSize: "0.95rem" }}>
            {isSafe ? "Content Approved" : "Content Flagged"}
          </div>
          <div style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.15rem" }}>{result.reasoning}</div>
        </div>
      </div>

      {/* Flag breakdown */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {result.flags.map((flag) => {
          const cat = CATEGORIES.find((c) => c.id === flag.category);
          const pct = Math.round(flag.confidence * 100);
          if (pct < 5) return null;
          return (
            <span key={flag.category} style={{ padding: "0.25rem 0.7rem", background: `${cat?.color}18`, border: `1px solid ${cat?.color}44`, borderRadius: "20px", color: cat?.color, fontSize: "0.78rem", fontWeight: 600 }}>
              {cat?.icon} {cat?.label} {pct}%
            </span>
          );
        })}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <button style={{ padding: "0.5rem 1.1rem", background: "rgba(38,222,129,0.1)", border: "1px solid rgba(38,222,129,0.3)", borderRadius: "8px", color: "#26de81", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
          ✓ Approve
        </button>
        <button style={{ padding: "0.5rem 1.1rem", background: "rgba(255,59,92,0.1)", border: "1px solid rgba(255,59,92,0.3)", borderRadius: "8px", color: "#FF3B5C", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
          ✕ Remove
        </button>
        <button style={{ padding: "0.5rem 1.1rem", background: "rgba(247,183,49,0.1)", border: "1px solid rgba(247,183,49,0.3)", borderRadius: "8px", color: "#F7B731", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
          ↑ Escalate
        </button>
      </div>
    </div>
  );
}