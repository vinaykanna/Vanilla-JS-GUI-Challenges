import { defineConfig } from "vite";

// Multiple entry points
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        selectableGrid: "./src/selectable-grid/selectable-grid.html",
      },
    },
  },
});
