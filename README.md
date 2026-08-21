# @chengoak/dsh-font-size

[English](#english) · [中文](#中文)

为 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI 添加「对话字体大小」设置项，可在 **12–22 px** 范围内调节聊天消息字号。

Adds a **Conversation font size** control to the **General settings** page of the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI. Adjusts chat message text size in the range **12–22 px**.

## 效果 · Effect

| 默认 16 px | 调至 22 px |
| --- | --- |
| ![16px](docs/chat-16px.png) | ![22px](docs/chat-22px.png) |

设置面板新增一行：设置面板新增「对话字体大小」一行 → A new row in **Settings → General**:

![settings](docs/settings-row.png)

---

## 中文

### 是什么

一个独立的 DeepSeek Harness Web GUI 插件，在「设置 → 通用设置」里新增一个 **对话字体大小** 滑块（12–22 px，默认 16 px）。设置后实时生效，刷新页面后保持。

### 安装

```sh
# 在 deepseek-harness 仓库内启动 dsh web（使用 workspace 源码）：
pnpm dsh web --port 3080

# 链接当前插件到 web profile（已开发调试时）
pnpm dsh plugin --profile web add link:/Users/li/dsh-font-size
```

启动后打开 `http://127.0.0.1:3080/`，在「设置 → 通用设置」里即可看到「对话字体大小」一行。

### 持久化

使用浏览器 `localStorage`，key 为 `chengoak.dsh-font-size.messageFontSize`。**仅在本浏览器生效**，切换浏览器或清空本地数据后会回到默认 16 px。

### 实现原理

核心 `MessageItem.module.css` 把 `font-size: 16px` 硬编码在 `.bubble` 里，没有暴露 CSS 变量。插件通过注入全局 `<style>`，用属性选择器（`[class*="_bubble"]`、`[data-streaming]`）+ `!important` 覆盖，作用范围限定在聊天列内。

### 已知限制

- 暂未走核心的 settings namespace 持久化，跨浏览器/跨设备不生效。
- 仅覆盖 user bubble 与 assistant 文本；侧边栏、输入框字号不在调节范围内。

---

## English

### What it does

A standalone DSH Web GUI plugin that adds a **Conversation font size** slider (12–22 px, default 16 px) to **Settings → General**. Changes apply live and persist across reloads.

### Install

```sh
# Run dsh web from inside the deepseek-harness workspace (uses workspace source):
pnpm dsh web --port 3080

# Link this plugin into the web profile (during development):
pnpm dsh plugin --profile web add link:/Users/li/dsh-font-size
```

Open `http://127.0.0.1:3080/`, go to **Settings → General**, the **Conversation font size** row will be there.

### Persistence

Stored in browser `localStorage` under the key `chengoak.dsh-font-size.messageFontSize`. **Per-browser only** — switching browsers or clearing site data resets to the 16 px default.

### How it works

Core `MessageItem.module.css` hard-codes `font-size: 16px` on `.bubble` and doesn't expose a CSS variable. The plugin injects a global `<style>` with attribute selectors (`[class*="_bubble"]`, `[data-streaming]`) plus `!important` to win the cascade. Selectors are scoped under the chat transcript subtree to avoid affecting unrelated UI.

### Known limitations

- Not yet wired into the core settings namespace; the value does not roam across browsers or devices.
- Only user bubbles and assistant text are covered. Sidebar and input controls keep their default size.

## License

MIT.
