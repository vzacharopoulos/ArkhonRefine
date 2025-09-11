import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";


const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//docker rm -f caddy
// docker run -d --name caddy -p 127.0.0.1:80:80 -p 127.0.0.1:443:443 -p 192.168.11.15:80:80 -p 192.168.11.15:443:443 -v C:\caddy\Caddyfile:/etc/caddy/Caddyfile -v caddy_data:/data -v caddy_config:/config `caddy//docker cp caddy:/data/caddy/pki/authorities/local/root.crt .\caddy-rootCA.crt