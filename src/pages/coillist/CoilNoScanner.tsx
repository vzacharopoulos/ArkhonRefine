import React, { useEffect, useRef, useState } from "react";
import { createWorker, OEM, PSM } from "tesseract.js";
type Roi = { left: number; top: number; width: number; height: number };
type Props = {
  onFound?: (coilNo: string) => void;
  // Optional whitelist of acceptable coil numbers. If provided and continuous is true,
  // the scanner will keep snapping until one of these is recognized.
  validCoils?: string[];
  // When true and validCoils provided, auto-scan every ~1200ms until a match is found.
  continuous?: boolean;
  // Accept near-matches up to this Levenshtein distance (0 = exact only)
  maxDistance?: number;
  Roi?: Roi;
  onRoiChange?: (next: Roi) => void;
  // OPTIONAL — persist per-browser
  persistRoiKey?: string; // e.g. "coil-scanner-roi"
};

const CoilNoScanner: React.FC<Props> = ({
  onFound,
  validCoils,
  continuous = false,
  maxDistance = 1,
  Roi: roiProp,
  onRoiChange,
  persistRoiKey,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<any>(null);

  const [coilNo, setCoilNo] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const validSetRef = useRef<Set<string> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 🔻 NEW: Rejected hits (not acceptable) storage
  type RejectedHit = {
    id: string;
    norm: string;
    count: number;
    last: number;
    confidence?: number;
  };
  const rejectMapRef = useRef<Map<string, RejectedHit>>(new Map());
  const [rejectedList, setRejectedList] = useState<RejectedHit[]>([]);

  // Normalize whitelist when it changes
  useEffect(() => {
    if (validCoils && validCoils.length) {
      const norm = new Set(validCoils.map((v) => normalize(v)));
      validSetRef.current = norm;
    } else {
      validSetRef.current = null;
    }
  }, [validCoils]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const worker = await createWorker("eng");
      await worker.setParameters({
        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.:/",
        tessedit_pageseg_mode: PSM.SPARSE_TEXT,
        tessedit_ocr_engine_mode: String(OEM.DEFAULT),
        user_defined_dpi: "300",
      });
      if (!mounted) {
        await worker.terminate();
        return;
      }
      workerRef.current = worker;
      setReady(true);
    })();
    return () => {
      mounted = false;
      (async () => {
        if (workerRef.current) await workerRef.current.terminate();
      })();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (e) {
      console.error("Camera error:", e);
    }
  };

  const normalize = (s: string) => s.toUpperCase().replace(/\s+/g, "").trim();

// Allowed JP suffixes (extend here if needed)
const JP_SUFFIXES = ["MHMZS",  "M0MZS", "K0MZS"] as const;

const JP_FINDER = new RegExp(
  `J[PB]\\d{6}(?:F0D|LED)\\d(?:${JP_SUFFIXES.join("|")})`
);
// J[PB] means "J" followed by either "P" or "B"
const DC_FINDER = /[DC]\d{12}[ABCD]/; // D or C, 12 digits, then A/B/C/D

/**
 * Scan a long OCR string, detect if a valid code exists, and return the one match.
 * Normalizes text to reduce OCR mistakes (O->0, I->1) and removes whitespace.
 * Returns the normalized code, or null if none found.
 */
 function extract(raw: string): string | null {
  // 1) Normalize for OCR
  const t = (raw || "")
    .toUpperCase()
    .replace(/\s+/g, "") // remove all whitespace
    .replace(/O/g, "0")  // O -> 0
    .replace(/T/g, "1")  // T -> 1
    .replace(/I/g, "1"); // I -> 1



  // 2) Try JP first, then D/C
  const m = t.match(JP_FINDER) || t.match(DC_FINDER);
  return m ? m[0] : raw;
}
  
  //  const extract = (raw: string) => {

  //   let text = (raw || "").toUpperCase().replace(/\s+/g, "");
  //   // Common OCR swaps
  //   text = text.replace(/O/g, "0");
    
  //   const jpPattern = /^JP\d{6}F0D\d(?:MHMZS|KMZS|MMZS|M0MZS|K0MZS)$/;
  //   const dPattern = /^D|C\d{12}[ABCD]$/;
      //   text = text.replace(/O/g, "0");

  //   // Only two accepted patterns:
  //   // 1) JP + 6 digits + F0D + 1 digit + MHMZS  (e.g., JP534436F0D3MHMZS)
  //   const jp = text.match(new RegExp(jpPattern.source, "g")) || [];  
  //   if (jp.length) { console.log("[Scanner] matched JP:", jp[0]); return jp[0]; }
    
  //   // 2) D + 12 digits + B  (e.g., D202507120341B)
  //   const dcode = text.match(/D\d{12}[ABCD]/g) || [];
  //   if (dcode.length) { console.log("[Scanner] matched D:", dcode[0]); return dcode[0]; }
    
  //   // If label has explicit key
  //   const m = text.match(/COIL\s*NO\.?[:\-]?([A-Z0-9\-]+)/);
  //   if (m?.[1]) {
  //     const t = m[1];
  //     if (jpPattern.test(t) || dPattern.test(t)) return t;
  //   }
  //   return null;
  // };
  // Simple Levenshtein distance for fuzzy acceptance
  const lev = (a: string, b: string) => {
    const m = a.length,
      n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost,
        );
      }
    }
    return dp[m][n];
  };

  const isAcceptable = (candidate: string | null) => {
    if (!candidate) return false;
    const norm = normalize(candidate);
    const set = validSetRef.current;
    if (!set || set.size === 0) return true; // if no whitelist, any candidate is fine
    if (set.has(norm)) return true;
    // fuzzy compare
    for (const v of set) {
      if (lev(v, norm) <= maxDistance) return true;
    }
    return false;
  };

  // 🔻 NEW: helpers for rejected list
  const recordRejected = (id: string, confidence?: number) => {
    const norm = normalize(id);
    if (!norm) return;
    const now = Date.now();
    const m = rejectMapRef.current;
    const existing = m.get(norm);
    if (existing) {
      existing.count += 1;
      existing.last = now;
      if (typeof confidence === "number") existing.confidence = confidence;
    } else {
      m.set(norm, { id, norm, count: 1, last: now, confidence });
    }
    setRejectedList(Array.from(m.values()).sort((a, b) => b.last - a.last));
  };

  const clearRejected = () => {
    rejectMapRef.current.clear();
    setRejectedList([]);
  };

  const copyRejected = async () => {
    const lines = rejectedList
      .map(
        (r) =>
          `${r.id}\tcount=${r.count}\tlast=${new Date(r.last).toLocaleString()}` +
          (typeof r.confidence === "number"
            ? `\tconf=${r.confidence.toFixed(1)}`
            : ""),
      )
      .join("\n");
    try {
      await navigator.clipboard.writeText(lines || "");
    } catch {}
  };

 const DEFAULT_ROI: Roi = { left: 0.20, top: 0.35, width: 0.60, height: 0.15 };

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const clampRoi = (r: Roi): Roi => {
  const left = clamp(r.left);
  const top = clamp(r.top);
  const width = clamp(r.width, 0.01, 1 - left);
  const height = clamp(r.height, 0.01, 1 - top);
  return { left, top, width, height };
};

// Load from localStorage (if provided) → prop → default
const loadInitialRoi = (persistKey?: string, propRoi?: Roi): Roi => {
  if (persistKey) {
    try {
      const raw = localStorage.getItem(persistKey);
      if (raw) return clampRoi(JSON.parse(raw));
    } catch {}
  }
  return propRoi ? clampRoi(propRoi) : DEFAULT_ROI;
};

const [Roi, setRoi] = useState<Roi>(() => loadInitialRoi(persistRoiKey, roiProp));


useEffect(() => {
  // if parent changes roi prop, sync local
  if (roiProp) setRoi(clampRoi(roiProp));
}, [roiProp]);

const updateRoi = (next: Roi) => {
  const clamped = clampRoi(next);
  setRoi(clamped);
  onRoiChange?.(clamped);
  if (persistRoiKey) {
    try { localStorage.setItem(persistRoiKey, JSON.stringify(clamped)); } catch {}
  }
};
//const ROI = { left: 0.20, top: 0.35, width: 0.60, height: 0.15 };
// 35% from left, 40% from top, 30% wide, 20% tall (make it whatever you want)

const snapAndOCR = async () => {
  if (!videoRef.current || !canvasRef.current || !workerRef.current) return;
  setBusy(true);
  try {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const w = video.videoWidth;
    const h = video.videoHeight;
    if (!w || !h) throw new Error("Video not ready");

    // Draw full video once (optional; needed only if you want to visualize)
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0, w, h);

    // --- 1) Compute ROI from the shared constants ---
   const cropX = Math.round(w * Roi.left);
const cropY = Math.round(h * Roi.top);
const cropW = Math.round(w * Roi.width);
const cropH = Math.round(h * Roi.height);

    // --- 2) Grab pixels only from ROI ---
    const roi = ctx.getImageData(cropX, cropY, cropW, cropH);

    // --- 3) Threshold the ROI (same logic you had) ---
    const data = roi.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const gray = (r * 0.299 + g * 0.587 + b * 0.114) | 0;
      const v = gray > 160 ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = v;
      // alpha stays as-is
    }

    // (Optional) Draw processed ROI back on the main canvas for debugging
    ctx.putImageData(roi, cropX, cropY);

    // --- 4) Feed ONLY the ROI to Tesseract (faster & more accurate) ---
    // Stage canvas: hold the processed ROI at native ROI size
    const stage = document.createElement("canvas");
    stage.width = cropW;
    stage.height = cropH;
    stage.getContext("2d")!.putImageData(roi, 0, 0);

    // Scale to a target width that Tesseract handles well (700–1200px works nicely)
    const targetW = Math.min(900, cropW); // don’t upscale too much
    const scale = targetW / cropW;
    const targetH = Math.round(cropH * scale);

    const tmp = document.createElement("canvas");
    tmp.width = targetW;
    tmp.height = targetH;
    const tctx = tmp.getContext("2d")!;
    tctx.imageSmoothingEnabled = true;
    tctx.drawImage(stage, 0, 0, cropW, cropH, 0, 0, targetW, targetH);

    // OCR the small canvas
    const { data: ocr } = await workerRef.current.recognize(tmp);
    const found = extract(ocr.text || "");
    setCoilNo(found || "(not found)");

      if (isAcceptable(found ?? null)) {
        if (onFound && found) onFound(found);
        stopContinuous();
      } else if (found) {
        // 🔻 NEW: keep non-acceptable IDs
        recordRejected(found, (data as any)?.confidence);
      }
    } catch (e) {
      console.error(e);
      setCoilNo("(error)");
    } finally {
      setBusy(false);
    }
  };

  const startContinuous = () => {
    if (!continuous || running) return;
    setRunning(true);
    timerRef.current = setInterval(() => {
      if (!busy && ready) {
        snapAndOCR();
      }
    }, 1200);
  };

  const stopContinuous = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);
  };

  useEffect(() => {
    if (continuous && validSetRef.current && validSetRef.current.size > 0) {
      startContinuous();
      return stopContinuous;
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continuous, ready, validCoils]);

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button onClick={startCamera}>Enable Camera</button>
        {validSetRef.current && validSetRef.current.size > 0 && (
          running ? (
            <button onClick={stopContinuous}>Stop Auto</button>
          ) : (
            <button onClick={startContinuous} disabled={!ready}>
              Start Auto
            </button>
          )
        )}
      </div>

 <div style={{ position: "relative", width: "100%", maxWidth: 640 }}>
  <video ref={videoRef} playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  <div
    style={{
      position: "absolute",
      left: `${Roi.left * 100}%`,
      top: `${Roi.top * 100}%`,
      width: `${Roi.width * 100}%`,
      height: `${Roi.height * 100}%`,
      border: "2px dashed rgba(255,255,255,0.9)",
      boxSizing: "border-box",
      pointerEvents: "none",
      zIndex: 2,
    }}
  />
</div>


      <button onClick={snapAndOCR} disabled={busy || !ready} style={{ marginTop: 12 }}>
        {busy ? "Reading..." : "Scan COIL NO"}
      </button>

      <div style={{ marginTop: 8 }}>
        <strong>COIL NO:</strong> {coilNo}
      </div>

      {/* 🔻 NEW: Rejected list panel */}
      <div style={{ marginTop: 12, padding: 8, border: "1px solid #ddd", borderRadius: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>Rejected candidates (not acceptable)</strong>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={copyRejected} disabled={!rejectedList.length}>
              Copy
            </button>
            <button onClick={clearRejected} disabled={!rejectedList.length}>
              Clear
            </button>
          </div>
        </div>
        {rejectedList.length === 0 ? (
          <div style={{ color: "#666", marginTop: 6 }}>None yet.</div>
        ) : (
          <ul style={{ margin: "6px 0 0 16px" }}>
            {rejectedList.map((r) => (
              <li key={r.norm}>
                <code>{r.id}</code> ×{r.count} · last {new Date(r.last).toLocaleTimeString()}
                {typeof r.confidence === "number" && <> · conf {r.confidence.toFixed(1)}</>}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 6, marginTop: 8, maxWidth: 640 }}>
  {([
    ["Left", "left"],
    ["Top", "top"],
    ["Width", "width"],
    ["Height", "height"],
  ] as const).map(([label, key]) => (
    <React.Fragment key={key}>
      <label style={{ fontSize: 12 }}>{label}</label>
      <input
        type="range" min={0} max={100}
        value={Math.round(Roi[key] * 100)}
        onChange={(e) => updateRoi({ ...Roi, [key]: Number(e.target.value) / 100 })}
      />
      <span style={{ width: 38, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
        {Math.round(Roi[key] * 100)}%
      </span>
    </React.Fragment>
  ))}
</div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CoilNoScanner;
