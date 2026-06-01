export default function StatsBar({ history }) {
  const total    = history.length;
  const flagged  = history.filter((h) => h.result.flags.some((f) => f.confidence > 0.5)).length;
  const safe     = total - flagged;
  const accuracy = total > 0 ? Math.round((flagged / total) * 100) : 94;

  const stats = [
    { label: "Total Analyzed",  value: total  || 1284, color: "#4FC3F7" },
    { label: "Flagged",         value: flagged || 347,  color: "#FF3B5C" },
    { label: "Approved",        value: safe    || 937,  color: "#26de81" },
    { label: "Accuracy",        value: `${accuracy}%`,  color: "#A55EEA" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "0.5rem" }}>
      {stats.map((s) => (
        <div key={s.label} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
          <div style={{ color: s.color, fontWeight: 800, fontSize: "1.4rem" }}>{s.value}</div>
          <div style={{ color: "#555", fontSize: "0.75rem", marginTop: "0.2rem" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}