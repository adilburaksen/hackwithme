declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  const src: string;
  export default src;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.json';

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Augment the NodeJS namespace to include API_KEY in ProcessEnv
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}