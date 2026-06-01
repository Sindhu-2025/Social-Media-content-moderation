const QUEUE_ITEMS = [
  { id: "Q-1042", type: "hate_speech",   status: "pending",    time: "0:12" },
  { id: "Q-1041", type: "spam",          status: "processing", time: "0:34" },
  { id: "Q-1040", type: "cyberbullying", status: "resolved",   time: "1:05" },
  { id: "Q-1039", type: "violence",      status: "resolved",   time: "2:18" },
];

const STATUS_COLORS = {
  pending:    "#F7B731",
  processing: "#4FC3F7",
  resolved:   "#26de81",
};

export default function LiveQueue({ history }) {
  const items = history.length > 0
    ? history.slice(0, 4).map((h, i) => ({
        id: `Q-${1042 + i}`,
        type: h.result.flags.sort((a, b) => b.confidence - a.confidence)[0]?.category || "unknown",
        status: "resolved",
        time: "just now",
      }))
    : QUEUE_ITEMS;

  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <span style={{ background: "rgba(79,195,247,0.15)", color: "#4FC3F7", borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.72rem", fontWeight: 700 }}>STEP 1</span>
          <h3 style={{ color: "#fff", margin: "0.4rem 0 0", fontSize: "1rem", fontWeight: 700 }}>Live Moderation Queue</h3>
        </div>
        <span style={{ background: "rgba(255,59,92,0.15)", color: "#FF3B5C", borderRadius: "20px", padding: "0.2rem 0.7rem", fontSize: "0.75rem", fontWeight: 700 }}>
          {items.filter((i) => i.status !== "resolved").length} pending
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0.8rem", background: "rgba(0,0,0,0.25)", borderRadius: "8px" }}>
            <span style={{ color: "#555", fontSize: "0.75rem", fontFamily: "monospace", width: "55px" }}>{item.id}</span>
            <span style={{ flex: 1, color: "#aaa", fontSize: "0.82rem" }}>{item.type.replace("_", " ")}</span>
            <span style={{ color: "#555", fontSize: "0.75rem" }}>{item.time}</span>
            <span style={{ background: `${STATUS_COLORS[item.status]}18`, color: STATUS_COLORS[item.status], borderRadius: "20px", padding: "0.15rem 0.6rem", fontSize: "0.72rem", fontWeight: 600 }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}