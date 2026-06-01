import { useState } from "react";

const ACTIONS = [
  { id: "remove",   icon: "🗑️", label: "Remove Content",    desc: "Permanently deletes post from platform",  color: "#FF3B5C" },
  { id: "warn",     icon: "⚠️", label: "Warn User",         desc: "Sends policy violation notification",     color: "#F7B731" },
  { id: "restrict", icon: "🔒", label: "Restrict Account",  desc: "Limits posting for 24–72 hours",          color: "#FF6B35" },
  { id: "escalate", icon: "📤", label: "Escalate to Human", desc: "Routes to senior moderation team",        color: "#A55EEA" },
  { id: "log",      icon: "📋", label: "Log & Monitor",     desc: "Records event, watches future activity",  color: "#26de81" },
];

export default function ActionExecutor({ result }) {
  const [executed, setExecuted] = useState([]);
  const [loading,  setLoading]  = useState(null);

  if (!result) return null;

  const execute = async (id) => {
    setLoading(id);
    await new Promise((r) => setTimeout(r, 900));
    setExecuted((prev) => [...new Set([...prev, id])]);
    setLoading(null);
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem" }}>
      <span style={{ background: "rgba(252,92,101,0.15)", color: "#FC5C65", borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.72rem", fontWeight: 700 }}>STEP 5</span>
      <h3 style={{ color: "#fff", margin: "0.5rem 0 1.25rem", fontSize: "1rem", fontWeight: 700 }}>Action Executor</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {ACTIONS.map((action) => {
          const done = executed.includes(action.id);
          const busy = loading === action.id;
          return (
            <div key={action.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", background: done ? `${action.color}10` : "rgba(255,255,255,0.02)", border: `1px solid ${done ? action.color + "44" : "rgba(255,255,255,0.05)"}`, borderRadius: "10px", transition: "all 0.3s" }}>
              <span style={{ fontSize: "1.2rem" }}>{action.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: done ? action.color : "#ccc", fontWeight: 600, fontSize: "0.85rem" }}>{action.label}</div>
                <div style={{ color: "#555", fontSize: "0.75rem", marginTop: "0.1rem" }}>{action.desc}</div>
              </div>
              <button
                onClick={() => execute(action.id)}
                disabled={done || busy}
                style={{ padding: "0.35rem 0.9rem", background: done ? `${action.color}20` : "rgba(255,255,255,0.05)", border: `1px solid ${done ? action.color + "55" : "rgba(255,255,255,0.1)"}`, borderRadius: "6px", color: done ? action.color : "#888", fontSize: "0.78rem", fontWeight: 600, cursor: done || busy ? "default" : "pointer", minWidth: "72px" }}
              >
                {busy ? "…" : done ? "✓ Done" : "Execute"}
              </button>
            </div>
          );
        })}
      </div>

      {executed.length > 0 && (
        <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", background: "rgba(38,222,129,0.06)", border: "1px solid rgba(38,222,129,0.2)", borderRadius: "8px" }}>
          <span style={{ color: "#26de81", fontSize: "0.82rem", fontWeight: 600 }}>
            ✅ {executed.length} action{executed.length > 1 ? "s" : ""} executed successfully
          </span>
        </div>
      )}
    </div>
  );
}