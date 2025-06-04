// Type definitions for next/font

declare module 'next/font/local' {
  import { NextFont } from 'next/dist/compiled/@next/font';
  
  interface LocalFontProps {
    src: string | Array<{ path: string; weight?: string; style?: string }>;
    display?: string;
    weight?: string;
    style?: string;
    fallback?: string[];
    preload?: boolean;
    variable?: string;
    adjustFontFallback?: boolean | string;
    declarations?: Array<{ prop: string; value: string }>;
  }
  
  function localFont(props: LocalFontProps): NextFont;
  
  export default localFont;
}
