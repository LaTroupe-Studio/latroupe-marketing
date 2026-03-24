/**
 * Design tokens extracted from the Figma design.
 *
 * GRID SPECS:
 *   Frame width:  1509px
 *   Margins:      65px each side
 *   Gutters:      24px
 *   Columns:      12
 *   Content area: 1509 - (65 × 2) = 1379px
 *   Column width: (1379 - 11 × 24) / 12 ≈ 92.9px
 */

export const GRID = {
  maxWidth: 1509,
  margin: 65,
  gutter: 24,
  columns: 12,
} as const;

export const COLORS = {
  terracotaDark: "#28170E",
  terracota4: "#452515",
  terracota2: "#AC6752",
  azul1: "#2F4868",
  azulDark: "#0B172C",
  beige2: "#F7F6F5",
  beige3: "#ECE6E3",
  white: "#FFFFFF",
} as const;

/**
 * Typography: the production site uses Roobert and Roobert Mono.
 * Ensure font files are placed in /public/fonts/ and loaded in globals.css.
 * See globals.css @font-face declarations.
 */
export const FONTS = {
  heading: "'Roobert', 'DM Sans', system-ui, sans-serif",
  body: "'Roobert', 'DM Sans', system-ui, sans-serif",
  mono: "'Roobert Mono', 'Space Mono', monospace",
} as const;
