import { useState, useEffect } from "react";

const EVENTS = [
  "Content received for moderation",
  "Pre-processing pipeline initiated",
  "Tokenization complete",
  "AI model inference started",
  "Classification scores computed",
  "Decision engine rule evaluation",
  "Action executed and logged",
];

export default function AuditLogger({ result, text }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!result) { setLogs([]); return; }
    const entries = EVENTS.map((msg, i) => ({
      id: i,
      time: new Date(Date.now() - (EVENTS.length - i) * 180).toISOString().split("T")[1].slice(0, 12),
      msg,
      level: i === 6 ? "SUCCESS" : "INFO",
    }));
    setLogs(entries);
  }, [result]);

  if (!result) return null;

  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem" }}>
      <span style={{ background: "rgba(38,222,129,0.15)", color: "#26de81", borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.72rem", fontWeight: 700 }}>STEP 7</span>
      <h3 style={{ color: "#fff", margin: "0.5rem 0 1rem", fontSize: "1rem", fontWeight: 700 }}>Audit Logger</h3>

      <div style={{ fontFamily: "monospace", fontSize: "0.78rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        {logs.map((log) => (
          <div key={log.id} style={{ display: "flex", gap: "0.75rem", padding: "0.4rem 0.6rem", background: "rgba(0,0,0,0.3)", borderRadius: "6px" }}>
            <span style={{ color: "#444", flexShrink: 0 }}>{log.time}</span>
            <span style={{ color: log.level === "SUCCESS" ? "#26de81" : "#5577aa", flexShrink: 0, fontWeight: 700 }}>[{log.level}]</span>
            <span style={{ color: "#aaa" }}>{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}