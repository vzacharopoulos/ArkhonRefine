import { EventInput } from "fullcalendar";

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
  totalTime?:number;
  totalTtm?:number
   previd?: number;
   pporderlines?:PPOrderLine;
  prevpanelcode?: string;
  offtimeduration?: number;
  offtimestartdate?: Date;
  offtimeenddate?: Date;


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
  pporders:PPOrder;
}

export interface finishedPporders extends Omit<PPOrder, 'estDateOfProd' | 'panelcode'> {
  totalMeter?: number;
  speed?: number;
  code: string;
  time?: number;
}


 
export interface WorkingHoursConfig {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  workingDays: number[]; // 0 = Sunday, 6 = Saturday
}