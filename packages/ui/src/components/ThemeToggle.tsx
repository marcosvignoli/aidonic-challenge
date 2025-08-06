"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./Button";

export interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  showLabels = false,
}) => {
  const { theme, setTheme, isDark } = useTheme();

  const themes = [
    { value: "light" as const, label: "Light", icon: "☀️" },
    { value: "dark" as const, label: "Dark", icon: "🌙" },
    { value: "system" as const, label: "System", icon: "💻" },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {themes.map(({ value, label, icon }) => (
        <Button
          key={value}
          variant={theme === value ? "primary" : "outline"}
          size="sm"
          onClick={() => setTheme(value)}
          aria-label={`Switch to ${label} theme`}
          className="flex items-center gap-1"
        >
          <span role="img" aria-hidden="true">
            {icon}
          </span>
          {showLabels && <span>{label}</span>}
        </Button>
      ))}
    </div>
  );
};
