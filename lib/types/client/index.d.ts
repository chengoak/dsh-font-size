import type { Context } from '@deepseek-ai/cordis';
import { type FontSizeKey } from './locales.ts';
export type { FontSizeKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        'chengoak-dsh-font-size': FontSizeKey;
    }
    interface SlotMap {
        'settings.general.item': {
            kind: 'list';
            scope: 'root';
            owner: object;
        };
    }
}
export declare const inject: readonly ["slots", "locale"];
export declare function apply(ctx: Context): void;
