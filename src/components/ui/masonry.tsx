"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type MasonryProps = {
  children: React.ReactNode;
  columnWidth?: number;
  columnCount?: number;
  maxColumnCount?: number;
  gap?: number;
  itemHeight?: number;
  defaultWidth?: number;
  defaultHeight?: number;
  overscan?: number;
  scrollFps?: number;
  fallback?: React.ReactNode;
  linear?: boolean;
  asChild?: boolean;
};

export type MasonryItemProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  asChild?: boolean;
};

export function MasonryItem({ children }: MasonryItemProps) {
  return <>{children}</>;
}

function getColumnCount({
  width,
  columnWidth,
  maxColumnCount,
}: {
  width: number;
  columnWidth: number;
  maxColumnCount?: number;
}) {
  const raw = Math.max(1, Math.floor(width / columnWidth));
  return maxColumnCount ? Math.min(maxColumnCount, raw) : raw;
}

export function Masonry({
  children,
  columnWidth = 320,
  columnCount,
  maxColumnCount,
  gap = 24,
  defaultWidth = 1280,
  linear = false,
}: MasonryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const update = () => {
      setContainerWidth(el.getBoundingClientRect().width);
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const items = useMemo(() => {
    const arr: React.ReactElement[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      arr.push(child);
    });
    return arr;
  }, [children]);

  const resolvedColumnCount = useMemo(() => {
    if (columnCount) return columnCount;
    const w = containerWidth ?? defaultWidth;
    return getColumnCount({
      width: w,
      columnWidth,
      maxColumnCount,
    });
  }, [columnCount, containerWidth, defaultWidth, columnWidth, maxColumnCount]);

  const effectiveWidth = containerWidth ?? defaultWidth;
  const calculatedColumnWidth = useMemo(() => {
    const totalGap = gap * Math.max(0, resolvedColumnCount - 1);
    return Math.max(
      240,
      Math.floor((effectiveWidth - totalGap) / resolvedColumnCount),
    );
  }, [effectiveWidth, gap, resolvedColumnCount]);

  const columns = useMemo(() => {
    const cols: React.ReactNode[][] = Array.from(
      { length: resolvedColumnCount },
      () => [],
    );

    if (linear) {
      items.forEach((item, idx) => {
        const col = idx % resolvedColumnCount;
        cols[col]!.push(item);
      });
      return cols;
    }

    // Non-linear (greedy shortest column) behavior for completeness.
    // We don't measure actual item heights here; this is best-effort.
    const estimatedHeights = items.map(() => 1);
    const colHeights = Array.from({ length: resolvedColumnCount }, () => 0);
    items.forEach((item, idx) => {
      const h = estimatedHeights[idx] ?? 1;
      let target = 0;
      for (let c = 1; c < colHeights.length; c++) {
        const cHeight = colHeights[c] ?? 0;
        const targetHeight = colHeights[target] ?? 0;
        if (cHeight < targetHeight) target = c;
      }
      cols[target]!.push(item);
      colHeights[target] = (colHeights[target] ?? 0) + h;
    });
    return cols;
  }, [items, linear, resolvedColumnCount]);

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="flex items-start"
        style={{
          gap,
          alignItems: "flex-start",
        }}
      >
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className="flex flex-col"
            style={{ gap, width: calculatedColumnWidth }}
          >
            {col.map((item, idx) => (
              <div key={idx}>{item}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
