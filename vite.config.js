import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// User site (monty16597.github.io) is served at the domain root, so base is '/'.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
