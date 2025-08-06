import React from "react";

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

interface PerformanceObserver {
  onMetricComplete: (metric: PerformanceMetric) => void;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private observers: PerformanceObserver[] = [];

  startTimer(name: string, metadata?: Record<string, any>): void {
    const metric: PerformanceMetric = {
      name,
      startTime: performance.now(),
      metadata,
    };
    this.metrics.set(name, metric);
  }

  endTimer(name: string): PerformanceMetric | null {
    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`Performance metric "${name}" not found`);
      return null;
    }

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;

    this.observers.forEach((observer) => {
      observer.onMetricComplete(metric);
    });

    return metric;
  }

  getMetric(name: string): PerformanceMetric | null {
    return this.metrics.get(name) || null;
  }

  getAllMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  clearMetrics(): void {
    this.metrics.clear();
  }

  addObserver(observer: PerformanceObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: PerformanceObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
}

// Memory usage monitoring
export function getMemoryUsage(): {
  used: number;
  total: number;
  percentage: number;
} {
  if ("memory" in performance) {
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
    };
  }
  return { used: 0, total: 0, percentage: 0 };
}

// Component render time monitoring
export function withPerformanceMonitoring<T extends React.ComponentType<any>>(
  Component: T,
  componentName: string
): T {
  const WrappedComponent = React.forwardRef<any, any>((props, ref) => {
    const startTime = React.useRef(performance.now());

    React.useEffect(() => {
      const endTime = performance.now();
      const duration = endTime - startTime.current;

      if (duration > 16) {
        // Longer than one frame (16.67ms)
        console.warn(
          `Slow render detected for ${componentName}: ${duration.toFixed(2)}ms`
        );
      }
    });

    return React.createElement(Component, { ...props, ref });
  });

  WrappedComponent.displayName = `withPerformanceMonitoring(${componentName})`;
  return WrappedComponent as unknown as T;
}

// Debounced function with performance tracking
export function debounceWithPerformance<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  name: string
): T {
  let timeoutId: ReturnType<typeof setTimeout>;

  return ((...args: any[]) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      const startTime = performance.now();
      const result = func(...args);
      const endTime = performance.now();

      console.log(`${name} executed in ${(endTime - startTime).toFixed(2)}ms`);

      return result;
    }, delay);
  }) as T;
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Performance hooks
export function usePerformanceTimer(name: string) {
  const startTime = React.useRef<number | null>(null);

  const start = React.useCallback(() => {
    startTime.current = performance.now();
  }, []);

  const end = React.useCallback(() => {
    if (startTime.current) {
      const endTime = performance.now();
      const duration = endTime - startTime.current;
      console.log(`${name} took ${duration.toFixed(2)}ms`);
      startTime.current = null;
    }
  }, [name]);

  return { start, end };
}

export function useMemoryUsage() {
  const [memoryUsage, setMemoryUsage] = React.useState(getMemoryUsage());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMemoryUsage(getMemoryUsage());
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return memoryUsage;
}

// Performance reporting
export function reportPerformanceMetrics(): void {
  const metrics = performanceMonitor.getAllMetrics();
  const memoryUsage = getMemoryUsage();

  console.group("Performance Report");
  console.table(
    metrics.map((m) => ({
      name: m.name,
      duration: m.duration?.toFixed(2) + "ms",
      metadata: m.metadata,
    }))
  );

  console.log("Memory Usage:", {
    used: `${(memoryUsage.used / 1024 / 1024).toFixed(2)}MB`,
    total: `${(memoryUsage.total / 1024 / 1024).toFixed(2)}MB`,
    percentage: `${memoryUsage.percentage.toFixed(1)}%`,
  });

  console.groupEnd();
}
