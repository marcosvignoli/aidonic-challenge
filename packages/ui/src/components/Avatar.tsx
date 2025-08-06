import React from "react";
import { colors, borderRadius } from "../design-tokens";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  size = "md",
  fallback,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const baseClasses = `inline-flex items-center justify-center rounded-full bg-[${colors.secondary[200]}] text-[${colors.secondary[700]}] font-medium`;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const fallbackText = fallback ? getInitials(fallback) : "?";

  return (
    <div className={`${baseClasses} ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="font-medium">{fallbackText}</span>
      )}
    </div>
  );
};
