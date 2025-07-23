export function createOfftimeTitle(
  duration?: number,
  panelCode?: string | null,
  prevPanelCode?: string | null,
): string {
  const parts: string[] = ["προετοιμασία μηχανής"];
  if (duration != null) {
    parts.push(`${duration}λεπ`);
  }
  if (panelCode || prevPanelCode) {
    const route = `${prevPanelCode ?? ""}${prevPanelCode || panelCode ? " -> " : ""}${panelCode ?? ""}`.trim();
    parts.push(route);
  }
  return parts.filter(Boolean).join(" | ");
}