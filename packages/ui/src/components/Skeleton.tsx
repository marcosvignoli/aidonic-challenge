import React from "react";
import { semanticClasses } from "../styling-utils";

export interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "text",
  width,
  height,
  animation = "pulse",
}) => {
  const baseClasses = `${semanticClasses.loadingBg} rounded`;

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-pulse",
    none: "",
  };

  const variantClasses = {
    text: "h-4 w-full",
    circular: "rounded-full",
    rectangular: "w-full h-full",
  };

  const style: React.CSSProperties = {};
  if (width) {
    style.width = typeof width === "number" ? `${width}px` : width;
  }
  if (height) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineHeight?: string;
  spacing?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = "",
  lineHeight = "h-4",
  spacing = "space-y-2",
}) => {
  return (
    <div className={`${spacing} ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className={lineHeight}
          width={index === lines - 1 ? "75%" : "100%"}
        />
      ))}
    </div>
  );
};

export interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  showTitle?: boolean;
  showText?: boolean;
  textLines?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = "",
  showImage = true,
  showTitle = true,
  showText = true,
  textLines = 3,
}) => {
  return (
    <div
      className={`${semanticClasses.bgPrimary} rounded-lg shadow p-4 ${className}`}
    >
      {showImage && (
        <Skeleton variant="rectangular" className="w-full h-32 mb-4" />
      )}
      {showTitle && <Skeleton variant="text" className="h-6 w-3/4 mb-2" />}
      {showText && <SkeletonText lines={textLines} className="space-y-2" />}
    </div>
  );
};

export interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
  showHeader?: boolean;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  className = "",
  showHeader = true,
}) => {
  return (
    <div
      className={`${semanticClasses.bgPrimary} rounded-lg shadow ${className}`}
    >
      <div className="overflow-x-auto">
        <table
          className={`min-w-full divide-y ${semanticClasses.borderPrimary}`}
        >
          {showHeader && (
            <thead className={semanticClasses.tableBg}>
              <tr>
                {Array.from({ length: columns }, (_, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 text-left text-xs font-medium ${semanticClasses.textSecondary} uppercase tracking-wider`}
                  >
                    <Skeleton variant="text" className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody
            className={`${semanticClasses.bgPrimary} divide-y ${semanticClasses.borderPrimary}`}
          >
            {Array.from({ length: rows }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }, (_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <Skeleton
                      variant="text"
                      className="h-4"
                      width={colIndex === 0 ? "60%" : "80%"}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
