const STEPS = [
  { id: 1, label: "Tokenization",       desc: "Split text into tokens" },
  { id: 2, label: "Normalization",      desc: "Lowercase, trim whitespace" },
  { id: 3, label: "Entity extraction",  desc: "Detect names, URLs, mentions" },
  { id: 4, label: "Language detection", desc: "Identify content language" },
  { id: 5, label: "Context embedding",  desc: "Vectorize for model input" },
];

export default function PreProcessor({ text, active }) {
  if (!active || !text) return null;

  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem" }}>
      <span style={{ background: "rgba(38,222,129,0.15)", color: "#26de81", borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.72rem", fontWeight: 700 }}>STEP 2 — PRE-PROCESSING</span>
      <h3 style={{ color: "#fff", margin: "0.5rem 0 1rem", fontSize: "1rem", fontWeight: 700 }}>Pre-Processor Pipeline</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {STEPS.map((s) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.55rem 0.8rem", background: "rgba(38,222,129,0.05)", border: "1px solid rgba(38,222,129,0.12)", borderRadius: "8px" }}>
            <span style={{ color: "#26de81", fontWeight: 700, fontSize: "0.8rem", width: "18px" }}>✓</span>
            <span style={{ color: "#ccc", fontSize: "0.83rem", fontWeight: 600 }}>{s.label}</span>
            <span style={{ color: "#555", fontSize: "0.78rem" }}>— {s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}