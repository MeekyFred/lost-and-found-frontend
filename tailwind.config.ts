import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#ff8e31",
        secondary: "#5d6d7e",
        tertiary: "#3f3d56",
        accent: "#00ffff",
        info: "#2563eb",
        success: "#00ff00",
        warning: "#fcd34d",
        error: "#ff0000",
      },
      width: {
        page: "calc(100vw-260px)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ff8e31",
          secondary: "#5d6d7e",
          tertiary: "#3f3d56",
          accent: "#00ffff",
          info: "#2563eb",
          success: "#00ff00",
          warning: "#fcd34d",
          error: "#ff0000",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
