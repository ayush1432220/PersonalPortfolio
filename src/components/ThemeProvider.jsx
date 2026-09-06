import React, { createContext, useContext, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { focusRing } from "./DesignSystem";

const STORAGE_KEY = "portfolio-theme";
const ThemeContext = createContext(null);

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage can throw in private-browsing contexts — theme just won't persist.
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

export function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={`p-2.5 rounded-full bg-bg-surface border border-border-default text-text-secondary hover:text-text-primary transition-colors duration-300 ${focusRing} ${className}`}
    >
      {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
}
