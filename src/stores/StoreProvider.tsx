"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import { createAppStore, type AppStore, type StoreState } from "./useStore";

const StoreContext = createContext<AppStore | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  storeRef.current ??= createAppStore();

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

// The hook every component will use
export function useAppStore<T>(selector: (state: StoreState) => T): T {
  const store = useContext(StoreContext);
  if (!store)
    throw new Error("useAppStore must be used inside <StoreProvider>");
  return useStore(store, selector);
}
