type BreakpointType = "xs" | "sm" | "md" | "lg" | "xl";

export const breakpoints: Record<BreakpointType, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// for styled component
const customMediaQuery = (maxWidth: number) =>
  `@media (min-width: ${maxWidth}px)`;
export const media = {
  xs: customMediaQuery(breakpoints.xs),
  sm: customMediaQuery(breakpoints.sm),
  md: customMediaQuery(breakpoints.md),
  lg: customMediaQuery(breakpoints.lg),
  xl: customMediaQuery(breakpoints.xl),
};
