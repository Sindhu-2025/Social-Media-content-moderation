import { useState } from "react";
import LiveQueue from "./components/LiveQueue";
import PreProcessor from "./components/PreProcessor";
import AnalysisResult from "./components/AnalysisResult";
import ClassificationPanel from "./components/ClassificationPanel";
import DecisionEngine from "./components/DecisionEngine";
import ActionExecutor from "./components/ActionExecutor";
import AuditLogger from "./components/AuditLogger";
import FeedbackLoop from "./components/FeedbackLoop";
import StatsBar from "./components/StatsBar";
import SummaryDashboard from "./components/SummaryDashboard";
import { analyzeContent } from "./utils/analyzeContent";
import { SAMPLE_POSTS } from "./constants/data";

export default function App() {
  const [input, setInput]   = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleAnalyze = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeContent(input);
      if (data && data.flags) {
        setResult(data);
        setHistory((prev) => [{ text: input, result: data, ts: Date.now() }, ...prev].slice(0, 20));
      } else {
        console.error("Invalid response:", data);
        alert("Analysis returned invalid data. Check console.");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      alert(`Error: ${err.message}`);
    }
    setLoading(false);
  };

  const loadSample = () => {
    const post = SAMPLE_POSTS[Math.floor(Math.random() * SAMPLE_POSTS.length)];
    setInput(post);
    setResult(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #FF3B5C, #A55EEA)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🛡️</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>ContentGuard AI</div>
            <div style={{ color: "#555", fontSize: "0.72rem" }}>Social Media Moderation Platform</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ width: "8px", height: "8px", background: "#26de81", borderRadius: "50%", display: "inline-block" }} />
          <span style={{ color: "#26de81", fontSize: "0.78rem", fontWeight: 600 }}>System Online</span>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <StatsBar history={history} />

        {/* Step 1 — Live Queue */}
        <LiveQueue history={history} />

        {/* Step 2 — Input & Pre-processor */}
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem" }}>
          <span style={{ background: "rgba(38,222,129,0.15)", color: "#26de81", borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.72rem", fontWeight: 700 }}>STEP 2</span>
          <h3 style={{ color: "#fff", margin: "0.5rem 0 1rem", fontSize: "1rem", fontWeight: 700 }}>Content Input</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste social media content here to analyze..."
            rows={4}
            style={{ width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#fff", padding: "0.85rem", fontSize: "0.88rem", resize: "vertical", outline: "none", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
            <button
              onClick={loadSample}
              style={{ padding: "0.55rem 1.2rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#aaa", fontSize: "0.83rem", cursor: "pointer" }}
            >
              ↗ Load Sample
            </button>
            <button
              onClick={handleAnalyze}
              disabled={loading || !input.trim()}
              style={{ padding: "0.55rem 1.5rem", background: loading ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #FF3B5C, #A55EEA)", border: "none", borderRadius: "8px", color: loading ? "#555" : "#fff", fontSize: "0.83rem", fontWeight: 700, cursor: loading ? "default" : "pointer" }}
            >
              {loading ? "Analyzing…" : "⚡ Analyze Content"}
            </button>
          </div>
        </div>

        {/* Pre-processor */}
        <PreProcessor text={input} active={loading || !!result} />

        {/* Step 3 — Classification */}
        <ClassificationPanel result={result} />

        {/* Step 4 — Decision Engine */}
        <DecisionEngine result={result} />

        {/* Step 5 — Action Executor */}
        <ActionExecutor result={result} />

        {/* Step 6 — Analysis Result */}
        <AnalysisResult result={result} text={input} />

        {/* Step 7 — Audit Logger */}
        <AuditLogger result={result} text={input} />

        {/* Feedback & Summary */}
        {result && <FeedbackLoop />}
        {history.length > 0 && <SummaryDashboard history={history} />}
      </div>
    </div>
  );
}