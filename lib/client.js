window.__ModuleLoader__.load({
	id: "@chengoak/dsh-font-size",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/locales.ts
		const en = {
			"settings.fontSize.title": "Conversation font size",
			"settings.fontSize.description": "Adjust chat message text size, 12-22 pixels",
			"settings.fontSize.min": "12px",
			"settings.fontSize.max": "22px"
		};
		const zh = {
			"settings.fontSize.title": "对话字体大小",
			"settings.fontSize.description": "调整聊天消息文字大小，12-22 像素",
			"settings.fontSize.min": "12px",
			"settings.fontSize.max": "22px"
		};
		//#endregion
		//#region \0dsh-css:src/client/FontSizeRow.module.css.mjs
		const css = ".Dpn1zq_row{border-bottom:1px solid var(--dsw-alias-border-l2,#0000000f);justify-content:space-between;align-items:center;gap:16px;min-height:48px;padding:12px 0;display:flex}.Dpn1zq_labelGroup{flex-direction:column;flex:1;gap:2px;min-width:0;display:flex}.Dpn1zq_title{color:var(--dsw-alias-text-primary,#1f2329);font-size:14px;font-weight:500}.Dpn1zq_description{color:var(--dsw-alias-text-tertiary,#8f959e);font-size:12px;line-height:1.4}.Dpn1zq_control{flex-shrink:0;align-items:center;gap:12px;display:flex}.Dpn1zq_slider{background:var(--dsw-alias-border-l1,#0000001a);appearance:none;cursor:pointer;border-radius:2px;width:120px;height:4px}.Dpn1zq_slider::-webkit-slider-thumb{appearance:none;background:var(--dsw-alias-fill-brand,#4e6ef2);border:2px solid var(--dsw-alias-fill-white,#fff);border-radius:50%;width:16px;height:16px;box-shadow:0 1px 3px #00000026}.Dpn1zq_slider::-moz-range-thumb{background:var(--dsw-alias-fill-brand,#4e6ef2);border:2px solid var(--dsw-alias-fill-white,#fff);cursor:pointer;border-radius:50%;width:16px;height:16px;box-shadow:0 1px 3px #00000026}.Dpn1zq_value{min-width:40px;color:var(--dsw-alias-text-primary,#1f2329);text-align:right;font-size:14px;font-weight:500}";
		const tagId = "@chengoak/dsh-font-size/FontSizeRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@chengoak/dsh-font-size";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var FontSizeRow_module_css_default = {
			"control": "Dpn1zq_control",
			"description": "Dpn1zq_description",
			"labelGroup": "Dpn1zq_labelGroup",
			"row": "Dpn1zq_row",
			"slider": "Dpn1zq_slider",
			"title": "Dpn1zq_title",
			"value": "Dpn1zq_value"
		};
		//#endregion
		//#region src/client/FontSizeRow.tsx
		const MIN = 12;
		const MAX = 22;
		function FontSizeRow({ initialFontSize, onChange }) {
			const [fontSize, setFontSize] = (0, react.useState)(initialFontSize);
			const handleChange = (0, react.useCallback)((event) => {
				const value = Number(event.currentTarget.value);
				setFontSize(value);
				onChange(value);
			}, [onChange]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: FontSizeRow_module_css_default.row,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: FontSizeRow_module_css_default.labelGroup,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: FontSizeRow_module_css_default.title,
						children: "对话字体大小"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: FontSizeRow_module_css_default.description,
						children: "调整聊天消息文字大小，12-22 像素"
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: FontSizeRow_module_css_default.control,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "range",
						className: FontSizeRow_module_css_default.slider,
						min: MIN,
						max: MAX,
						step: 1,
						value: fontSize,
						onChange: handleChange,
						"aria-label": "Conversation font size"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("output", {
						className: FontSizeRow_module_css_default.value,
						children: [fontSize, "px"]
					})]
				})]
			});
		}
		//#endregion
		//#region src/client/index.ts
		const STORAGE_KEY = "chengoak.dsh-font-size.messageFontSize";
		const DEFAULT_FONT_SIZE = 16;
		const MIN_FONT_SIZE = 12;
		const MAX_FONT_SIZE = 22;
		function clampFontSize(value) {
			if (Number.isNaN(value)) return DEFAULT_FONT_SIZE;
			return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.round(value)));
		}
		function readStoredFontSize() {
			try {
				const raw = localStorage.getItem(STORAGE_KEY);
				return clampFontSize(raw === null ? DEFAULT_FONT_SIZE : Number(raw));
			} catch {
				return DEFAULT_FONT_SIZE;
			}
		}
		function writeStoredFontSize(value) {
			try {
				localStorage.setItem(STORAGE_KEY, String(value));
			} catch {}
		}
		function applyFontSize(value) {
			let tag = document.getElementById("dsh-font-size-style");
			if (tag === null) {
				tag = document.createElement("style");
				tag.id = "dsh-font-size-style";
				tag.dataset.plugin = "@chengoak/dsh-font-size";
				document.head.appendChild(tag);
			}
			const px = `${value}px`;
			const lineUser = `calc(${px} * 1.5)`;
			const lineAssistant = `calc(${px} * 1.75)`;
			tag.textContent = `
    [class*="_root"] [class*="_bubble"],
    [class*="_root"] [class*="_bubble"] * {
      font-size: ${px} !important;
      line-height: ${lineUser} !important;
    }
    [class*="_root"] [data-streaming],
    [class*="_root"] [data-streaming] * {
      font-size: ${px} !important;
      line-height: ${lineAssistant} !important;
    }
  `;
		}
		const inject = ["slots", "locale"];
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register("chengoak-dsh-font-size", {
				zh,
				en
			}), "dsh-font-size: dictionaries");
			applyFontSize(readStoredFontSize());
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "chengoak.dsh-font-size",
				order: 22,
				locale: "chengoak-dsh-font-size",
				inject: () => ({
					initialFontSize: readStoredFontSize(),
					onChange: (value) => {
						const clamped = clampFontSize(value);
						writeStoredFontSize(clamped);
						applyFontSize(clamped);
					}
				})
			}, FontSizeRow));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map