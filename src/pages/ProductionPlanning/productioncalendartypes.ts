import { EventInput } from "fullcalendar";

export interface PanelMachinePause {
  id?: number;
  pporderid?: number;
  pausestartdate?: Date;
  pauseenddate?: Date;
  pauseduration?: number;
  pausecomment?: string;
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
}

export interface ProdOrdersView {
  isCanceled: number;
  speed: number;
  ttm: number;
  time?: number;
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
