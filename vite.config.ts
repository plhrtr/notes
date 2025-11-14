import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
    },
    host: "localhost", // optional
    port: 5173, // default
  },
  plugins: [react(), tsconfigPaths()],
});
