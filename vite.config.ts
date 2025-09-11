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
      strategies: "injectManifest",
      // 🔥 explicitly set the source and the output name
srcDir: "src",
      filename: "service-worker.ts",
      injectManifest: {
        // allow precaching of large app chunk(s)
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
      },
      registerType: "autoUpdate",
  injectRegister: "auto", // 👈 disable auto injection
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

      devOptions: { enabled: true, type: "module" },
    }),
  ],
  server: { host: "0.0.0.0", port: 5173 },
});
