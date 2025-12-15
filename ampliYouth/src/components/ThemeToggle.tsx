import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="border border-gray-300 dark:border-slate-600 px-3 py-1 rounded-full text-xs hover:bg-gray-100 dark:hover:bg-slate-800"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
