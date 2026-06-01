import { CATEGORIES } from "../constants/data";

export default function SummaryDashboard({ history }) {
  if (!history.length) return null;

  const counts = {};
  CATEGORIES.forEach((c) => { counts[c.id] = 0; });
  history.forEach((h) => {
    h.result.flags.forEach((f) => {
      if (f.confidence > 0.5) counts[f.category] = (counts[f.category] || 0) + 1;
    });
  });

  const sorted = CATEGORIES.map((c) => ({ ...c, count: counts[c.id] || 0 })).sort((a, b) => b.count - a.count);
  const max = Math.max(...sorted.map((s) => s.count), 1);

  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem" }}>
      <h3 style={{ color: "#fff", margin: "0 0 1rem", fontSize: "1rem", fontWeight: 700 }}>Session Summary</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {sorted.map((cat) => (
          <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ width: "22px", textAlign: "center" }}>{cat.icon}</span>
            <span style={{ color: "#888", fontSize: "0.8rem", width: "120px" }}>{cat.label}</span>
            <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(cat.count / max) * 100}%`, background: cat.color, borderRadius: "99px", transition: "width 0.6s ease" }} />
            </div>
            <span style={{ color: cat.color, fontSize: "0.8rem", fontWeight: 700, width: "20px", textAlign: "right" }}>{cat.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}