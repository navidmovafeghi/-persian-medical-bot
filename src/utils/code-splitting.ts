/**
 * Utilities for code splitting and dynamic imports
 * This helps reduce initial bundle size and improve loading performance
 */

import { lazy, ComponentType, LazyExoticComponent } from 'react';

/**
 * Dynamically imports a component
 * @param importFunc - Dynamic import function for the component
 * @returns Lazy loaded component
 */
export function lazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(importFunc);
}

/**
 * Preloads a component in the background
 * @param importFunc - Dynamic import function for the component to preload
 */
export function preloadComponent(importFunc: () => Promise<any>): void {
  importFunc();
}

/**
 * Prefetches a route for faster navigation
 * @param route - Route to prefetch
 */
export function prefetchRoute(route: string): void {
  // This function can be replaced with Next.js router.prefetch if needed
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  link.as = 'document';
  document.head.appendChild(link);
} 