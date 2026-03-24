/// <reference types="vite/client" />

declare module '*.png' {
  const src: string;
  export default src;
}

declare module 'react-helmet' {
  import * as React from 'react';

  interface HelmetProps {
    children?: React.ReactNode;
  }

  export class Helmet extends React.Component<HelmetProps> {}
}
