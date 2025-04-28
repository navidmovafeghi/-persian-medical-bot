/**
 * Global type definitions that apply across the entire application
 */

// Declare global types, interfaces, and namespaces here
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_ENABLE_HEALTH_TRACKER: string;
    NEXT_PUBLIC_ENABLE_FOOD_DIARY: string;
    NEXT_PUBLIC_AUTH_DOMAIN: string;
    NEXT_PUBLIC_AUTH_CLIENT_ID: string;
    NEXT_PUBLIC_AUTH_AUDIENCE: string;
    NEXT_PUBLIC_ANALYTICS_ID: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

// Extend Window interface if needed
interface Window {
  // Add custom properties to Window
}

// Useful utility types
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type Nullable<T> = T | null;

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

type ForwardRefComponent<P = {}, R = any> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<R>
>;

// For styled-components or other CSS-in-JS libraries
type CSSProperties = React.CSSProperties; 