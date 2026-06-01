import { useState, useEffect } from "react";

export function useTheme() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.style.background = dark ? "#0A0A0F" : "#F4F4F6";
    document.body.style.color      = dark ? "#e8e8e8" : "#111";
  }, [dark]);

  return { dark, toggleTheme: () => setDark((d) => !d) };
}