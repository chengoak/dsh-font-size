import type { Context } from '@deepseek-ai/cordis'
// Type-only imports to pull Context merges for slots/locale.
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import { en, zh, type FontSizeKey } from './locales.ts'
import { FontSizeRow } from './FontSizeRow.tsx'
import { clampFontSize, readStoredFontSize, writeStoredFontSize } from './storage.ts'

export type { FontSizeKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'chengoak-dsh-font-size': FontSizeKey
  }

  // The core web app owns the actual 'settings.general.item' slot, but the
  // declaration is not exported from any installed npm package. We augment the
  // SlotMap here so our plugin can register into it; runtime dispatch still
  // goes through the core slot renderer.
  interface SlotMap {
    'settings.general.item': { kind: 'list'; scope: 'root'; owner: object }
  }
}

function applyFontSize(value: number): void {
  let tag = document.getElementById('dsh-font-size-style') as HTMLStyleElement | null
  if (tag === null) {
    tag = document.createElement('style')
    tag.id = 'dsh-font-size-style'
    tag.dataset.plugin = '@chengoak/dsh-font-size'
    document.head.appendChild(tag)
  }
  // Override the core's hard-coded `font-size: 16px` rules on chat bubbles
  // and assistant text. The core CSS lives in core packages we can't
  // change from a plugin, so we inject a global stylesheet at runtime with
  // `!important` to win the cascade. The selectors target:
  //   - User bubbles: any className ending in `_bubble` (CSS-Modules hash)
  //   - Assistant text: any className containing `_markdown` (CSS-Modules
  //     hash, e.g. `_markdown_1nba0_5`) — this is the actual class that
  //     dsh-web's AssistantMarkdown renders into (verified against the real
  //     DOM; the old `[data-streaming]` selector matched 0 elements).
  //   - Streaming text: the `<div data-streaming>` wrapper (kept for safety,
  //     in case some dsh-web builds still use it while streaming).
  // All rules are scoped to the chat transcript subtree by anchoring on the
  // `[class*="_root"]` ancestor — the only place the chat view lives in the
  // DOM — so we don't accidentally override unrelated UI in the future.
  const px = `${value}px`
  const lineUser = `calc(${px} * 1.5)`
  const lineAssistant = `calc(${px} * 1.75)`
  tag.textContent = `
    [class*="_root"] [class*="_bubble"],
    [class*="_root"] [class*="_bubble"] * {
      font-size: ${px} !important;
      line-height: ${lineUser} !important;
    }
    [class*="_root"] [class*="_markdown"],
    [class*="_root"] [class*="_markdown"] * {
      font-size: ${px} !important;
      line-height: ${lineAssistant} !important;
    }
    [class*="_root"] [data-streaming],
    [class*="_root"] [data-streaming] * {
      font-size: ${px} !important;
      line-height: ${lineAssistant} !important;
    }
  `
}

export const inject = ['slots', 'locale'] as const

export function apply(ctx: Context): void {
  // Register locale dictionaries for the settings row.
  ctx.effect(() => ctx.locale.register('chengoak-dsh-font-size', { zh, en }), 'dsh-font-size: dictionaries')

  // Initial apply on boot.
  applyFontSize(readStoredFontSize())

  // Register the settings row in General settings.
  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'chengoak.dsh-font-size',
    order: 22,
    locale: 'chengoak-dsh-font-size',
    inject: () => ({
      initialFontSize: readStoredFontSize(),
      onChange: (value: number) => {
        const clamped = clampFontSize(value)
        writeStoredFontSize(clamped)
        applyFontSize(clamped)
      },
    }),
  }, FontSizeRow))
}
