import type { StateCreator, StoreMutatorIdentifier } from "zustand";

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...args) => {
    const prev = get();
    // @ts-expect-error – spread is safe
    set(...args);
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
      console.groupCollapsed(
        `%c[zustand] %c${name ?? "store"} %c@ ${new Date().toLocaleTimeString()}`,
        "color:#764abc;font-weight:bold",
        "color:inherit;font-weight:bold",
        "color:gray;font-weight:normal",
      );
      console.log("%cprev", "color:#9E9E9E;font-weight:bold", prev);
      console.log("%cnext", "color:#4CAF50;font-weight:bold", get());
      console.groupEnd();
    }
  };
  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;
