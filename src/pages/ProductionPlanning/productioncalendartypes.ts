import { EventInput } from "fullcalendar";

export interface PPOrder {
  id: number;
  pporderno?: string;
  panelcode?: string;
  status?: number;
  startDateDatetime?: Date;
  finishDateDatetime?: Date;
  estDateOfProd?: Date;
  createDate?: Date;


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
}

export interface finishedPporders extends Omit<PPOrder, 'estDateOfProd' | 'panelcode'> {
  totalMeter?: number;
  speed?: number;
  code: string;
  time?: number;
}


 export interface SidebarProps {
    weekendsVisible: boolean;
    onToggleWeekends: () => void;
    currentEvents: EventInput[];
    onToggleCurrentEvents: () => void;
    unscheduledorders: PPOrder[];
    selectedOrderId: number | null;
    onSelectOrder: (id: number) => void;
    orderLines: PPOrderLine[];
    orderLinesLoading: boolean;
    totalTime: {
    hours: number;
    minutes: number;
    formatted: string;
  };
  }
