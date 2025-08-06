export type PanelProductionOrderExt2 = {
  prodOrder: string;
  productionNo: number;
  tradecode: string;
  code: string;
  widthin: number | null;
  widthout: number | null;

  panelSpeed?: {
    speed: number | null;
  } | null;

  pporderline?: {
    id: number;
    pporderno: string;
    status: number;
    pporders?: {
      id: number;
      status: number;
    } | null;
  } | null;

  fintradeSync?: {
    id: number;
    ftrdate: string | null; // ISO date string!
    cus?: {
      id: number;
      name?: string | null;
      geo?: {
        descr: string;
      } | null;
      custfindata?: {
        comid: number | null;
      } | null;
    } | null;
    salesman?: {
      name: string;
      cnt?: {
        code: string;
      } | null;
      code: string;
    } | null;
  } | null;
};