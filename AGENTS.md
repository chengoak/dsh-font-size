# AGENTS.md — dsh-font-size

DSH web GUI plugin `@chengoak/dsh-font-size`. 包级规则：只写本包特有约定，不重复根 AGENTS.md 与 packages/AGENTS.md 的全局/包级规则。

## 本包要点

- 客户端插件：仅在 web 平台生效，往 `settings.general.item` slot 注入一行 slider。
- 持久化用浏览器 `localStorage`（`chengoak.dsh-font-size.messageFontSize`），**不**走 core 的 settings namespace。
- 注入全局 `<style id="dsh-font-size-style">` 覆盖 core 硬编码的 `font-size: 16px`，选择器锚定在 `[class*="_root"]` 子树内。

## 提交前检查

```sh
pnpm --filter @chengoak/dsh-font-size typecheck
pnpm --filter @chengoak/dsh-font-size build
```
