import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

const path = ".env";
dotenv.config({ path });

const DEFAULT_PORT = 2048;
const port = parseInt(process.env.VITE_PORT) || DEFAULT_PORT;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: { port },
});
