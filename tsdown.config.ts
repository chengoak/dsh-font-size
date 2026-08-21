/**
 * Standalone tsdown config for dsh-font-size.
 *
 * Uses the local shared client-bundle preset (shared/tsdown.client.ts —
 * closure-factory artifact for window.__ModuleLoader__, CSS Modules inlined,
 * externals resolved through the loader module table).
 */
import { clientBundle } from './shared/tsdown.client.ts'

export default clientBundle('@chengoak/dsh-font-size', ['src/index.ts'])
