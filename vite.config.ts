import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

const localIp = process.env.VITE_LOCAL_IP || "localhost";
console.log(`🌐 Vite running at http://${localIp}:5173`);

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      // minimal + automatic updates
      registerType: "autoUpdate",
      injectRegister: "auto",

      // simple manifest (adjust names/colors if you like)
      manifest: {
        name: "Coil Scanner",
        short_name: "Scanner",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1890ff",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },

      // ❗ No runtime caching rules, and no precache beyond defaults
      // If you want ZERO precache, set globPatterns: [].
      workbox: {
        globPatterns: [],       // ← disables precaching files
        runtimeCaching: [],     // ← no runtime cache either
        // navigateFallback: "/index.html", // optional; omit if you truly want minimal SW
      },

      // Let SW run in dev so you can test installability on your LAN https
      devOptions: { enabled: true },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});