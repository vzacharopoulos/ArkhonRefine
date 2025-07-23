export const dayToGreekName = (dayNumber: number): string => {
  const greekDays = [
    "Κυριακή",    // 0
    "Δευτέρα",    // 1
    "Τρίτη",      // 2
    "Τετάρτη",    // 3
    "Πέμπτη",     // 4
    "Παρασκευή",  // 5
    "Σάββατο",    // 6
  ];
  return greekDays[dayNumber] || "";
};