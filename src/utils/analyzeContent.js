export async function analyzeContent(text) {
  try {
    const response = await fetch("/api/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      alert(`API Error ${response.status}: ${JSON.stringify(data)}`);
      return null;
    }

    console.log("Analysis result:", data);
    return data;

  } catch (err) {
    console.error("Fetch failed:", err);
    alert(`Fetch failed: ${err.message}`);
    return null;
  }
}