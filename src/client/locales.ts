/** i18n keys for the dsh-font-size plugin. */

export type FontSizeKey =
  | 'settings.fontSize.title'
  | 'settings.fontSize.description'
  | 'settings.fontSize.min'
  | 'settings.fontSize.max'

export const en: Record<FontSizeKey, string> = {
  'settings.fontSize.title': 'Conversation font size',
  'settings.fontSize.description': 'Adjust chat message text size, 12-22 pixels',
  'settings.fontSize.min': '12px',
  'settings.fontSize.max': '22px',
}

export const zh: Record<FontSizeKey, string> = {
  'settings.fontSize.title': '对话字体大小',
  'settings.fontSize.description': '调整聊天消息文字大小，12-22 像素',
  'settings.fontSize.min': '12px',
  'settings.fontSize.max': '22px',
}
