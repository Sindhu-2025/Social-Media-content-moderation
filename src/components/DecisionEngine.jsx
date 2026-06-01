import { useRef } from "react";
import { CATEGORIES } from "../constants/data";

const RULES = [
  { rule: "Confidence > 85%",      action: "Auto-Remove",  color: "#FF3B5C" },
  { rule: "Confidence 50–85%",     action: "Human Review", color: "#F7B731" },
  { rule: "Confidence < 50%",      action: "Auto-Approve", color: "#26de81" },
  { rule: "Repeat offender",       action: "Account Flag", color: "#A55EEA" },
  { rule: "Viral content flagged", action: "Escalate",     color: "#FF6B35" },
];

export default function DecisionEngine({ result }) {
  const responseTime = useRef(Math.floor(Math.random() * 40 + 20)).current;

  if (!result) return null;

  const top = [...result.flags].sort((a, b) => b.confidence - a.confidence)[0];
  const pct = Math.round(top.confidence * 100);
  const cat = CATEGORIES.find((c) => c.id === top.category);

  const decision =
    pct >= 85 ? { label: "Auto-Remove",  color: "#FF3B5C", icon: "🗑️" } :
    pct >= 50 ? { label: "Human Review", color: "#F7B731", icon: "👁️" } :
                { label: "Auto-Approve", color: "#26de81", icon: "✅" };

  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem" }}>
      <span style={{ background: "rgba(255,107,53,0.15)", color: "#FF6B35", borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.72rem", fontWeight: 700 }}>STEP 4</span>
      <h3 style={{ color: "#fff", margin: "0.5rem 0 1.25rem", fontSize: "1rem", fontWeight: 700 }}>Decision Engine</h3>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem", background: `${decision.color}12`, border: `1px solid ${decision.color}44`, borderRadius: "12px", marginBottom: "1.25rem" }}>
        <span style={{ fontSize: "2rem" }}>{decision.icon}</span>
        <div>
          <div style={{ color: decision.color, fontWeight: 700, fontSize: "1.1rem" }}>{decision.label}</div>
          <div style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.2rem" }}>
            Top signal: {cat?.icon} {cat?.label} at {pct}% confidence
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ color: "#555", fontSize: "0.72rem" }}>Response time</div>
          <div style={{ color: "#fff", fontWeight: 700 }}>{responseTime}ms</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {RULES.map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0.8rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
            <span style={{ color: "#888", fontSize: "0.82rem" }}>{r.rule}</span>
            <span style={{ background: `${r.color}20`, color: r.color, borderRadius: "5px", padding: "0.15rem 0.6rem", fontSize: "0.75rem", fontWeight: 600 }}>{r.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}