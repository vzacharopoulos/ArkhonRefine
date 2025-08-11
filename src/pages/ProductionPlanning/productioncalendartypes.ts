import { EventInput } from "fullcalendar";

export interface PanelMachinePause {
  id?: number;
  pporderid?: number;
  pausestartdate?: Date;
  pauseenddate?: Date;
  pauseduration?: number;
  pausecomment?: string;
}
export interface groupIn{
  cin?: string;
  thickin?: string;
  moldin?: string;
  cout?: string;
  thickout?: string;
  moldout?: string;
  totalTtm?: number;
  tTime?: number;
  count?: number;
}

export interface PPOrder {
  id: number;
  pporderno?: string;
  panelcode?: string;
  status?: number;
  startDateDatetime?: Date;
  finishDateDatetime?: Date;
  estStartDate?: Date;
  estFinishDate?: Date;
  createDate?: Date;
  totalTime?: number;
  totalTtm?: number;
  previd?: number;
  pporderlines?: PPOrderLine;
  prevpanelcode?: string;
  offtimeduration?: number;
  offtimestartdate?: Date;
  offtimeenddate?: Date;
   pauses?: PanelMachinePause[];
  groupIn?: groupIn[];
}

export interface ProdOrdersView {
  isCanceled: number;
  speed: number;
  ttm: number;
  time?: number;
  cin?: string;
  cout?: string;
  moldin?: string;
  moldout?: string;
  thickin?: string;
  thickout?: string;
  count?: number;
}

export interface PpOrderLinesResponse {
  pporderlines2: {
    nodes: PPOrderLine[];
    totalCount: number;
  };
}


export interface PPOrderLine {
  id: number;
  pporderno?: string;
  panelcode?: string;
  status?: number;
  custporderno?: string;
  upDate?: Date;
  prodOrdersView?: ProdOrdersView;
  pporders: PPOrder;
}

export interface finishedPporders
  extends Omit<PPOrder, "estDateOfProd" | "panelcode"> {
  totalMeter?: number;
  speed?: number;
  code: string;
  time?: number;
  offtimeduration?: number;
  offtimestartdate?: Date;
  offtimeenddate?: Date;
  previd?: number;
  prevpanelcode?: string;
    panelmachinepauses?: PanelMachinePause[];
}

export interface WorkingHoursConfig {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  /**
   * Indicates whether the given date is considered a working day.
   * When used in the default configuration this value corresponds
   * to the specific day of week.
   */
  isWorkingDay: boolean;
}
