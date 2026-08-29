// Toram Tools — static file server.
// Everything (routing, calculators, theming) happens client-side in public/js.
// This server's only job is to serve the SPA shell and its assets.
import compression from "compression";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(compression());
app.use(express.static(PUBLIC_DIR, { extensions: ["html"] }));

// SPA fallback: any non-file route serves index.html, client router takes over.
app.get("*", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Toram Tools running at http://localhost:${PORT}`);
});
