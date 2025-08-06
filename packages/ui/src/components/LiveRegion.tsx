"use client";

import React, { useEffect, useRef } from "react";

export interface LiveRegionProps {
  children: React.ReactNode;
  role?: "status" | "alert" | "log" | "timer";
  ariaLive?: "polite" | "assertive" | "off";
  className?: string;
  clearOnUnmount?: boolean;
}

export const LiveRegion: React.FC<LiveRegionProps> = ({
  children,
  role = "status",
  ariaLive = "polite",
  className = "",
  clearOnUnmount = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (clearOnUnmount && ref.current) {
        ref.current.textContent = "";
      }
    };
  }, [clearOnUnmount]);

  return (
    <div
      ref={ref}
      role={role}
      aria-live={ariaLive}
      className={`sr-only ${className}`}
      aria-atomic="true"
    >
      {children}
    </div>
  );
};
