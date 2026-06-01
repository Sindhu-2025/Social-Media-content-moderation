import { CATEGORIES } from "../constants/data";

export function exportReport(result, input) {
  if (!result) return;

  const top = [...result.flags].sort((a, b) => b.confidence - a.confidence)[0];
  const cat = CATEGORIES.find((c) => c.id === top.category);
  const pct = Math.round(top.confidence * 100);
  const isSafe = pct < 40;
  const date = new Date().toLocaleString();

  const rows = result.flags
    .sort((a, b) => b.confidence - a.confidence)
    .map((f) => {
      const c = CATEGORIES.find((x) => x.id === f.category);
      return `
        <tr>
          <td>${c?.icon} ${c?.label}</td>
          <td>
            <div style="background:#eee;border-radius:4px;overflow:hidden;height:8px;width:120px">
              <div style="width:${Math.round(f.confidence * 100)}%;height:100%;background:${c?.color}"></div>
            </div>
          </td>
          <td style="color:${c?.color};font-weight:700">${Math.round(f.confidence * 100)}%</td>
        </tr>`;
    }).join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Moderation Report</title>
  <style>
    body { font-family: sans-serif; background: #0A0A0F; color: #e8e8e8; padding: 2rem; }
    h1   { color: #fff; font-size: 1.8rem; margin-bottom: 0.25rem; }
    .badge { display:inline-block; padding:0.25rem 0.75rem; border-radius:6px; font-size:0.8rem; font-weight:700; margin-bottom:1.5rem; background:${isSafe ? "rgba(38,222,129,0.15)" : "rgba(255,59,92,0.15)"}; color:${isSafe ? "#26de81" : "#FF3B5C"}; }
    .card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.25rem; margin-bottom:1rem; }
    table { width:100%; border-collapse:collapse; }
    td, th { padding:0.6rem 0.75rem; text-align:left; border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.85rem; }
    th { color:#555; font-weight:600; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; }
    .content-box { background:rgba(0,0,0,0.3); border-radius:8px; padding:1rem; font-size:0.9rem; color:#ccc; line-height:1.6; word-break:break-word; }
    .reasoning   { background:rgba(255,255,255,0.03); border-left:2px solid rgba(255,255,255,0.15); padding:0.75rem 1rem; border-radius:4px; color:#bbb; font-size:0.85rem; }
    .footer { color:#333; font-size:0.75rem; margin-top:2rem; text-align:center; }
  </style>
</head>
<body>
  <h1>🛡️ Moderation Report</h1>
  <div class="badge">${isSafe ? "✅ CONTENT APPROVED" : "🚨 CONTENT FLAGGED"}</div>
  <p style="color:#555;margin-top:-0.75rem;font-size:0.82rem">Generated: ${date}</p>

  <div class="card">
    <h3 style="color:#fff;margin:0 0 0.75rem">Analyzed Content</h3>
    <div class="content-box">${input}</div>
  </div>

  <div class="card">
    <h3 style="color:#fff;margin:0 0 0.75rem">Top Signal</h3>
    <p style="color:${cat?.color};font-size:1.1rem;font-weight:700;margin:0">${cat?.icon} ${cat?.label} — ${pct}% confidence</p>
  </div>

  <div class="card">
    <h3 style="color:#fff;margin:0 0 0.75rem">Classification Breakdown</h3>
    <table>
      <thead><tr><th>Category</th><th>Confidence Bar</th><th>Score</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>

  <div class="card">
    <h3 style="color:#fff;margin:0 0 0.75rem">AI Reasoning</h3>
    <div class="reasoning">${result.reasoning}</div>
  </div>

  <div class="footer">AI-Based Social Media Content Moderation System · Powered by Claude AI</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `moderation-report-${Date.now()}.html`;
  a.click();
  URL.revokeObjectURL(url);
}