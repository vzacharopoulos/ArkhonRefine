// helpers
  export function cleanFilters(crud: any[]) {
    return crud.filter((f) => {
      if (f.value == null) return false;
      if (Array.isArray(f.value) && f.value.length === 0) return false;
      if (typeof f.value === "string" && f.value.trim() === "") return false;
      return true;
    });
  }
export const normalizeRange = (a?: string | number, b?: string | number) => {
  const toNum = (v: any) => (v === "" || v == null ? null : Number(v));
  let from = toNum(a);
  let to   = toNum(b);
  if (from != null && to != null && from > to) [from, to] = [to, from];
  return { from, to };
};
  export function toGraphQLFilter(crud: any[]) {
    const f: any = {};
    for (const { field, operator, value } of crud) {
      if (value == null) continue;
      if (Array.isArray(value) && value.length === 0) continue;

      const key = String(field);
      const target = (f[key] ??= {});
      switch (operator) {
        case "contains":
          target.contains = value;
          break;
        case "eq":
          target.eq = value;
          break;
        case "in":
          target.in = Array.isArray(value) ? value : [value];
          break;
      }
    }
    return f;
  }

  export function toGraphQLSorting(sorters: any[]) {
    return (sorters ?? []).map((s) => ({
      field: s.field,
      direction: String(s.order || "").toUpperCase() === "ASC" ? "ASC" : "DESC",
    }));
  }

  // Normalizes the two inputs to [from, to] numbers (or nulls), swaps if reversed,
// and returns undefined when both are empty (so the filter clears).
export const numberRangeFilterMapper = (selectedKeys: React.Key[]) => {
  const [fromRaw, toRaw] = (selectedKeys ?? []) as (string | number | undefined)[];

  const toNumOrNull = (v: any) =>
    v === "" || v == null ? null : Number(v);

  let from = toNumOrNull(fromRaw);
  let to   = toNumOrNull(toRaw);

  if (from != null && to != null && from > to) [from, to] = [to, from];

  // no values -> clear filter
  if (from == null && to == null) return undefined;

  return [from, to]; // Refine will store as { field: "currWeight", operator: "in", value: [from, to] }
};

