/**
 * Utilities for caching data in the application
 * Implements various caching strategies to improve performance
 */

// Simple in-memory cache
const memoryCache = new Map<string, { data: any; expiry: number }>();

/**
 * Stores a value in the memory cache
 * 
 * @param key - Unique key to identify the cached value
 * @param data - Data to cache
 * @param ttlSeconds - Time to live in seconds (default: 5 minutes)
 */
export function setCache(key: string, data: any, ttlSeconds = 300): void {
  const expiry = Date.now() + ttlSeconds * 1000;
  memoryCache.set(key, { data, expiry });
}

/**
 * Retrieves a value from the memory cache
 * 
 * @param key - Key to retrieve from the cache
 * @returns The cached data or null if not found or expired
 */
export function getCache<T>(key: string): T | null {
  const cached = memoryCache.get(key);
  
  // Return null if not in cache or expired
  if (!cached || cached.expiry < Date.now()) {
    memoryCache.delete(key); // Clean up expired item
    return null;
  }
  
  return cached.data as T;
}

/**
 * Clears a specific item from the cache
 * 
 * @param key - Key to remove from the cache
 */
export function clearCache(key: string): void {
  memoryCache.delete(key);
}

/**
 * Clears all items from the cache
 */
export function clearAllCache(): void {
  memoryCache.clear();
}

/**
 * Wraps a function with caching functionality
 * 
 * @param fn - Function to wrap with caching
 * @param keyFn - Function to generate a cache key from the arguments
 * @param ttlSeconds - Time to live in seconds
 * @returns A wrapped function that caches results
 */
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyFn: (...args: Parameters<T>) => string,
  ttlSeconds = 300
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const cacheKey = keyFn(...args);
    const cachedValue = getCache<ReturnType<T>>(cacheKey);
    
    if (cachedValue !== null) {
      return cachedValue;
    }
    
    const result = await fn(...args);
    setCache(cacheKey, result, ttlSeconds);
    return result;
  };
}

/**
 * Helper for working with the browser's local storage
 */
export const localStorage = {
  /**
   * Store a value in local storage with expiration
   */
  set: (key: string, value: any, ttlSeconds = 86400): void => {
    const item = {
      value,
      expiry: Date.now() + ttlSeconds * 1000,
    };
    window.localStorage.setItem(key, JSON.stringify(item));
  },
  
  /**
   * Get a value from local storage, respecting expiration
   */
  get: <T>(key: string): T | null => {
    const itemStr = window.localStorage.getItem(key);
    if (!itemStr) return null;
    
    try {
      const item = JSON.parse(itemStr);
      if (Date.now() > item.expiry) {
        window.localStorage.removeItem(key);
        return null;
      }
      return item.value as T;
    } catch (e) {
      window.localStorage.removeItem(key);
      return null;
    }
  },
  
  /**
   * Remove a value from local storage
   */
  remove: (key: string): void => {
    window.localStorage.removeItem(key);
  },
  
  /**
   * Clear all values from local storage
   */
  clear: (): void => {
    window.localStorage.clear();
  }
};

/**
 * Configure service worker caching for offline support
 * This should be called in a service worker file
 */
export function setupServiceWorkerCache(): void {
  // This would be implemented in a service worker file
  // Example implementation would use the Cache API
} 