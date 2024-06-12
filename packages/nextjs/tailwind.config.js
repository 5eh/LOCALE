// Import constants from styles.js
import {
  ACCENT_COLOR_DARK,
  ACCENT_COLOR_LIGHT,
  ACCENT_CONTENT,
  BASE_100_DARK,
  BASE_200_DARK,
  BASE_300_DARK,
  BASE_CONTENT_DARK,
  BASE_CONTENT_LIGHT,
  ERROR_COLOR_DARK,
  ERROR_COLOR_LIGHT,
  INFO_COLOR_DARK,
  INFO_COLOR_LIGHT,
  NEUTRAL_COLOR_DARK,
  NEUTRAL_COLOR_LIGHT,
  NEUTRAL_CONTENT_DARK,
  NEUTRAL_CONTENT_LIGHT,
  PRIMARY_COLOR,
  PRIMARY_CONTENT,
  SECONDARY_COLOR_DARK,
  SECONDARY_COLOR_LIGHT,
  SECONDARY_CONTENT,
  SUCCESS_COLOR_DARK,
  SUCCESS_COLOR_LIGHT,
  WARNING_COLOR_DARK,
  WARNING_COLOR_LIGHT,
} from "../nextjs/marketplaceVariables/styles";

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: `${PRIMARY_COLOR}`,
          "primary-content": `${PRIMARY_CONTENT}`,
          secondary: `${SECONDARY_COLOR_LIGHT}`,
          "secondary-content": `${SECONDARY_CONTENT}`,
          accent: `${ACCENT_COLOR_LIGHT}`,
          "accent-content": `${ACCENT_CONTENT}`,
          neutral: `${NEUTRAL_COLOR_LIGHT}`,
          "neutral-content": `${NEUTRAL_CONTENT_LIGHT}`,
          "base-100": `${PRIMARY_COLOR}/10`,
          "base-200": `${PRIMARY_COLOR}/20`,
          "base-300": `${PRIMARY_COLOR}/30`,
          "base-content": `${BASE_CONTENT_LIGHT}`,
          info: `${INFO_COLOR_LIGHT}`,
          success: `${SUCCESS_COLOR_LIGHT}`,
          warning: `${WARNING_COLOR_LIGHT}`,
          error: `${ERROR_COLOR_LIGHT}`,
          "--rounded-btn": "9999rem",
          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        dark: {
          primary: `${PRIMARY_COLOR}`,
          "primary-content": `${PRIMARY_CONTENT}`,
          secondary: `${SECONDARY_COLOR_DARK}`,
          "secondary-content": `${SECONDARY_CONTENT}`,
          accent: `${ACCENT_COLOR_DARK}`,
          "accent-content": `${ACCENT_CONTENT}`,
          neutral: `${NEUTRAL_COLOR_DARK}`,
          "neutral-content": `${NEUTRAL_CONTENT_DARK}`,
          "base-100": `${BASE_100_DARK}`,
          "base-200": `${BASE_200_DARK}`,
          "base-300": `${BASE_300_DARK}`,
          "base-content": `${BASE_CONTENT_DARK}`,
          info: `${INFO_COLOR_DARK}`,
          success: `${SUCCESS_COLOR_DARK}`,
          warning: `${WARNING_COLOR_DARK}`,
          error: `${ERROR_COLOR_DARK}`,
          "--rounded-btn": "9999rem",
          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
