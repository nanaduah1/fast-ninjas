import { useMemo } from "react";

enum CacheStores {
  memory,
  LocalDb,
}

export function useCache(timeout = 30, store = CacheStores.LocalDb) {
  const cache = useMemo(() => {
    const useStore =
      store === CacheStores.LocalDb
        ? new LocalStorageStore()
        : new MemoryStore();

    return new Cache(timeout, useStore);
  }, [store]);

  return cache;
}

interface IStore {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  clear(): void;
}

class MemoryStore implements IStore {
  private readonly db: { [key: string]: string } = {};
  getItem(key: string): string {
    return this.db[key];
  }
  setItem(key: string, value: string): void {
    this.db[key] = value;
  }
  clear(): void {
    for (const key in this.db) {
      delete this.db[key];
    }
  }
}

class LocalStorageStore implements IStore {
  private readonly keys = [];
  getItem(key: string): string {
    return localStorage.getItem(key) ?? "";
  }
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  clear(): void {
    this.keys.forEach((k) => localStorage.removeItem(k));
  }
}

type CachedRecord = { data: any; timeout: number };

class Cache {
  private readonly timeout: number;
  private readonly store: IStore;
  constructor(timeoutSeconds: number, store: IStore) {
    this.timeout = timeoutSeconds;
    this.store = store;
  }

  getOrSet<T>(key: string, setter?: () => T, timeout?: number) {
    const keyToLower = key.toLowerCase();
    const strData = this.store.getItem(keyToLower);
    const now = new Date();
    if (strData) {
      const dataObj = JSON.parse(strData) as CachedRecord;
      if (dataObj.timeout > now.getTime()) return dataObj.data as T;
    }

    if (!setter) return undefined as T;

    const response = setter();
    const itemTimeout = now.getTime() + 1000 * (timeout ?? this.timeout);

    return Promise.resolve(response).then((val) => {
      this.store.setItem(
        keyToLower,
        JSON.stringify({ data: val, timeout: itemTimeout })
      );
      return val;
    });
  }
}
