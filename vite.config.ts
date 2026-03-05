import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Expose REACT_APP_* variables to process.env for compatibility.
  const reactAppProcessEnv = Object.keys(env)
    .filter((key) => key.startsWith("REACT_APP_"))
    .reduce<Record<string, string>>((acc, key) => {
      acc[`process.env.${key}`] = JSON.stringify(env[key]);
      return acc;
    }, {});

  return {
    plugins: [
      react({
        jsxRuntime: "automatic",
      }),
    ],
    base: "./",
    define: reactAppProcessEnv,
    resolve: {
      alias: {
        react: "react",
        "react-dom": "react-dom",
      },
      dedupe: ["react", "react-dom"],
    },
  };
});