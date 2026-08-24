import { useState, useCallback } from 'react'
import css from './FontSizeRow.module.css'
import { readStoredFontSize } from './storage.ts'

export interface FontSizeRowProps {
  initialFontSize: number
  onChange: (value: number) => void
}

const MIN = 12
const MAX = 22

export function FontSizeRow({ initialFontSize, onChange }: FontSizeRowProps): JSX.Element {
  // The `initialFontSize` prop is captured when the slot entry is *registered*
  // and dsh-web caches it across settings-panel opens, so it goes stale as
  // soon as the user changes the value. Read the persisted value on mount
  // instead so the slider always reflects the actual stored font size.
  const [fontSize, setFontSize] = useState<number>(() => readStoredFontSize(initialFontSize))

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value)
    setFontSize(value)
    onChange(value)
  }, [onChange])

  return (
    <div className={css.row}>
      <div className={css.labelGroup}>
        <span className={css.title}>对话字体大小</span>
        <span className={css.description}>调整聊天消息文字大小，12-22 像素</span>
      </div>
      <div className={css.control}>
        <input
          type="range"
          className={css.slider}
          min={MIN}
          max={MAX}
          step={1}
          value={fontSize}
          onChange={handleChange}
          aria-label="Conversation font size"
        />
        <output className={css.value}>{fontSize}px</output>
      </div>
    </div>
  )
}
