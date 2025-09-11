import { registerSW } from "virtual:pwa-register";

// Register the service worker for PWA support
registerSW({
  immediate: true,
  onOfflineReady() {
    console.log("PWA offline cache ready");
  },
});

