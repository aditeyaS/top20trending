import themes from "./src/config/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // eslint-disable-line no-undef
  daisyui: {
    logs: false,
    themes: [...themes],
  },
};
