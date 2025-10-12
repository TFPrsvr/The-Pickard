declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

// Side-effect imports
declare module '*.css?inline'
declare module '*/globals.css'
