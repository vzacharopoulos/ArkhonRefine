import dayjs from "dayjs";

export const createOfftimeTooltip = (
  prevPanelCode: string | null | undefined,
  offtimeDuration: number | null | undefined,
  offtimeStartDate: Date | string | null | undefined,
  offtimeEndDate: Date | string | null | undefined
): string => {
  const prevPanel = prevPanelCode || "—";
  const duration = offtimeDuration ? `${offtimeDuration} λεπτά` : "—";
  const startDate = offtimeStartDate
    ? dayjs(offtimeStartDate).tz('Europe/Athens').format("YYYY-MM-DD HH:mm")
    : "—";
  const endDate = offtimeEndDate
    ? dayjs(offtimeEndDate).tz('Europe/Athens').format("YYYY-MM-DD HH:mm")
    : "—";

  return `Προηγούμενο πάνελ: ${prevPanel}
Διάρκεια αλλαγης: ${duration}
Έναρξη αλλαγης: ${startDate}
Λήξη αλλαγης: ${endDate}`;
};