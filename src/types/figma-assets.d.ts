declare module 'figma:asset/*' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

// Specific known figma asset modules (some toolchains require exact names)
declare module 'figma:asset/7cf70cc92ae0aa3d58dd5a54b861696108cdcbfc.png' {
  const value: string;
  export default value;
}
