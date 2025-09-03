// Enums
export enum Openstatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

// Common helpers (match server behavior)
export type BooleanFilter = {
  eq?: boolean;
};

export type DateFilter = {
  eq?: string | Date;
  gte?: string | Date;
  lte?: string | Date;
  gt?: string | Date;
  lt?: string | Date;
  in?: (string | Date)[];
};

// StringFilter used in common helpers (documents/upDateFrom/upDateTo not used directly here)
export type StringFilter = {
  eq?: string | string[];
  contains?: string;
  iLike?: string;
  startsWith?: string;
  endsWith?: string;
  in?: string[];
  isNull?: boolean;
};

// Local helpers defined in coils-filter.input.ts
export type IntInInput = {
  in?: number[];
};

export type FloatEqInput = {
  eq?: number;
};

export type IntEqInput = {
  eq?: number;
};

// Local StringFilterInput (subset of StringFilter used by several coil fields)
export type StringFilterInput = {
  eq?: string;
  iLike?: string;
  contains?: string;
};
export type FilterLock = {
  field: keyof CoilsFilterInput;
  // add other properties if toLock has them
};
// Enum filter for Openstatus
export type OpenstatusFilterInput = {
  eq?: Openstatus;
  in?: Openstatus[]; // note: matches GraphQL schema @Field(() => [openstatus])
};

// Main input (1:1 with server’s CoilsFilterInput)
export type CoilsFilterInput = {
  status?: number;

  isLoaded?: BooleanFilter;
  loadDate?: DateFilter;
  isUnloaded?: BooleanFilter;

  coilno?: StringFilterInput;

  loc?: IntInInput;
  loc_in?: IntInInput;

  color?: StringFilterInput;

  upDate?: DateFilter;
  upDateFrom?: DateFilter;
  upDateTo?: DateFilter;

  documents?: StringFilter;

  supcoilId?: StringFilterInput;

  currWeightFrom?: StringFilterInput;
  currWeight?: StringFilterInput;
  currWeightTo?: StringFilterInput;

  openstatus?: OpenstatusFilterInput;

  thickness?: StringFilterInput;
  widthCoil?: StringFilterInput;
};