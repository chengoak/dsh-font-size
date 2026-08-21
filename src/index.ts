/**
 * Host half of dsh-font-size.
 *
 * Phase 1 keeps everything in the browser (localStorage + injected CSS) so the
 * user can test the visual effect without touching the apiproxy allowlist. A
 * later phase can add a Host namespace for durable settings.yaml storage.
 */
import type { Context } from '@deepseek-ai/cordis'

export function apply(_ctx: Context): void {
  // Browser-side plugin: no host behavior in phase 1.
}
