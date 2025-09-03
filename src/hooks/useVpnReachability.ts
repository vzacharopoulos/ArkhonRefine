import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/providers/data";

export function useVpnReachability(timeoutMs = 800) {
  const [reachable, setReachable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), timeoutMs);
        const res = await fetch(`${API_BASE_URL}/health`, {
          method: "GET",
          signal: ctrl.signal,
          cache: "no-store",
        });
        clearTimeout(t);
        if (!cancelled) setReachable(res.ok);
      } catch {
        if (!cancelled) setReachable(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [timeoutMs]);

  return reachable;
}

