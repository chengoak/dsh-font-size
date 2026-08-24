// Shared storage helpers for the font-size setting.
// Kept in its own module so both the slot entry (index.ts) and the row
// component (FontSizeRow.tsx) can read the persisted value without creating
// a circular import.

export const STORAGE_KEY = 'chengoak.dsh-font-size.messageFontSize'

export const DEFAULT_FONT_SIZE = 16
export const MIN_FONT_SIZE = 12
export const MAX_FONT_SIZE = 22

export function clampFontSize(value: number): number {
  if (Number.isNaN(value)) return DEFAULT_FONT_SIZE
  return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.round(value)))
}

/**
 * Read the persisted font size, falling back to `fallback` when nothing is
 * stored yet or the store is unavailable.
 */
export function readStoredFontSize(fallback: number = DEFAULT_FONT_SIZE): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return clampFontSize(raw === null ? fallback : Number(raw))
  } catch {
    return fallback
  }
}

export function writeStoredFontSize(value: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(value))
  } catch {
    // ignore
  }
}
