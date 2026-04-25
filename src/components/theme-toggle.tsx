"use client";

import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

function getInitialIsDark() {
  if (typeof window === "undefined") return false;

  const stored = window.localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;

  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialIsDark);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      window.localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background/60 p-2 text-muted-foreground transition hover:bg-background"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
