import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setupTests.ts",
    include: ["src/tests/**/*.test.tsx"],
    exclude: [...configDefaults.exclude, "tests/*"],
  },
  build: {
    rollupOptions: {
      input: "src/app/main.tsx",
    },
  },
});
