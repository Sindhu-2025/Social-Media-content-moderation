import { CATEGORIES } from "../constants/data";

export default function ClassificationPanel({ result }) {
  if (!result) return null;

  const sorted = [...result.flags].sort((a, b) => b.confidence - a.confidence);
  const topThreat = sorted[0];
  const isSafe = topThreat.confidence < 0.4;

  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem" }}>
      <span style={{ background: "rgba(255,107,53,0.15)", color: "#FF6B35", borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.72rem", fontWeight: 700 }}>STEP 3</span>
      <h3 style={{ color: "#fff", margin: "0.4rem 0 1rem", fontSize: "1rem", fontWeight: 700 }}>AI Classification Results</h3>

      <div style={{ marginBottom: "1.25rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ color: "#aaa", fontSize: "0.82rem" }}>Overall threat level</span>
          <span style={{ color: isSafe ? "#26de81" : "#FF3B5C", fontWeight: 700, fontSize: "0.85rem" }}>
            {isSafe ? "SAFE" : topThreat.confidence > 0.75 ? "HIGH" : "MEDIUM"}
          </span>
        </div>
        <div style={{ height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "99px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${topThreat.confidence * 100}%`, background: isSafe ? "#26de81" : topThreat.confidence > 0.75 ? "#FF3B5C" : "#F7B731", borderRadius: "99px", transition: "width 1s ease" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {sorted.map((flag) => {
          const cat = CATEGORIES.find((c) => c.id === flag.category);
          const pct = Math.round(flag.confidence * 100);
          return (
            <div key={flag.category} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0.8rem", background: pct > 50 ? `${cat?.color}10` : "rgba(255,255,255,0.02)", border: `1px solid ${pct > 50 ? cat?.color + "33" : "rgba(255,255,255,0.05)"}`, borderRadius: "8px" }}>
              <span>{cat?.icon}</span>
              <span style={{ flex: 1, color: pct > 50 ? cat?.color : "#888", fontSize: "0.82rem", fontWeight: pct > 50 ? 600 : 400 }}>{cat?.label}</span>
              <div style={{ width: "80px", height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: cat?.color, borderRadius: "99px" }} />
              </div>
              <span style={{ color: cat?.color, fontSize: "0.8rem", fontWeight: 700, width: "35px", textAlign: "right" }}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}