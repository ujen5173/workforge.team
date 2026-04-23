import { useCallback, useEffect, useRef } from "react";

type KeyCombo = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
};

type Options = {
  targetRef?: React.RefObject<HTMLElement | null>;
  onMatch?: () => void;
};

export function useKeyPress(combo: KeyCombo, options?: Options) {
  const comboRef = useRef(combo);
  const targetRef = options?.targetRef;

  // keeps latest combo without re-binding listeners
  useEffect(() => {
    comboRef.current = combo;
  }, [combo]);

  const matchCombo = useCallback((e: KeyboardEvent): boolean => {
    const c = comboRef.current;

    return (
      e.key.toLowerCase() === c.key.toLowerCase() &&
      !!c.ctrl === e.ctrlKey &&
      !!c.shift === e.shiftKey &&
      !!c.alt === e.altKey &&
      !!c.meta === e.metaKey
    );
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // If targetRef is provided, only trigger when that element is focused
      if (targetRef?.current) {
        const active = document.activeElement;
        if (active !== targetRef.current) return;
      }

      if (matchCombo(e)) {
        e.preventDefault();
        options?.onMatch?.();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [matchCombo, targetRef, options]);

  return null;
}
