import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";



const localIp = process.env.VITE_LOCAL_IP || "localhost";
console.log(`🌐 Vite running at http://${localIp}:5173`);

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
   server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
