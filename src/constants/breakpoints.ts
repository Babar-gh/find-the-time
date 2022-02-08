export enum BREAKPOINT_QUERIES {
  Mobile = '(max-width: 767.8px)',
  Tablet = '(min-width: 768px) and (max-width: 1279.8px)',
  Laptop = '(min-width: 1280px) and (max-width: 1599.8px)',
  Desktop = '(min-width: 1600px)',
}

export type Breakpoint = keyof typeof BREAKPOINT_QUERIES;
