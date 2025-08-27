import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: string; output: string; }
};

export type Abcparams = {
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  dimstr1?: Maybe<Scalars['String']['output']>;
  dimstr2?: Maybe<Scalars['String']['output']>;
  dimstr3?: Maybe<Scalars['String']['output']>;
  dimstr4?: Maybe<Scalars['String']['output']>;
  dimstr5?: Maybe<Scalars['String']['output']>;
  distrdims1?: Maybe<Scalars['Float']['output']>;
  distrdims2?: Maybe<Scalars['Float']['output']>;
  distrdims3?: Maybe<Scalars['Float']['output']>;
  distrstr1?: Maybe<Scalars['String']['output']>;
  distrstr2?: Maybe<Scalars['String']['output']>;
  distrstr3?: Maybe<Scalars['String']['output']>;
};

export type Accbalsheet = {
  comid?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  kepyocount?: Maybe<Scalars['Float']['output']>;
  kepyocountupd?: Maybe<Scalars['Float']['output']>;
  lkepyocredit?: Maybe<Scalars['Float']['output']>;
  lkepyocreditupd?: Maybe<Scalars['Float']['output']>;
  lkepyodebit?: Maybe<Scalars['Float']['output']>;
  lkepyodebitupd?: Maybe<Scalars['Float']['output']>;
  lperiodcredit?: Maybe<Scalars['Float']['output']>;
  lperiodcreditupd?: Maybe<Scalars['Float']['output']>;
  lperioddebit?: Maybe<Scalars['Float']['output']>;
  lperioddebitupd?: Maybe<Scalars['Float']['output']>;
  master?: Maybe<Account>;
  masterid?: Maybe<Scalars['Float']['output']>;
  skepyocredit?: Maybe<Scalars['Float']['output']>;
  skepyocreditupd?: Maybe<Scalars['Float']['output']>;
  skepyodebit?: Maybe<Scalars['Float']['output']>;
  skepyodebitupd?: Maybe<Scalars['Float']['output']>;
  speriodcredit?: Maybe<Scalars['Float']['output']>;
  speriodcreditupd?: Maybe<Scalars['Float']['output']>;
  sperioddebit?: Maybe<Scalars['Float']['output']>;
  sperioddebitupd?: Maybe<Scalars['Float']['output']>;
  tdlperiodcredit?: Maybe<Scalars['Float']['output']>;
  tdlperiodcreditupd?: Maybe<Scalars['Float']['output']>;
  tdlperioddebit?: Maybe<Scalars['Float']['output']>;
  tdlperioddebitupd?: Maybe<Scalars['Float']['output']>;
  tdsperiodcredit?: Maybe<Scalars['Float']['output']>;
  tdsperiodcreditupd?: Maybe<Scalars['Float']['output']>;
  tdsperioddebit?: Maybe<Scalars['Float']['output']>;
  tdsperioddebitupd?: Maybe<Scalars['Float']['output']>;
};

export type Accclosetemplate = {
  accclosetemplatelines?: Maybe<Array<Accclosetemplatelines>>;
  acceventtype?: Maybe<Acceventtype>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dsrid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  istd?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
};

export type Accclosetemplatelines = {
  acccredit?: Maybe<Scalars['Float']['output']>;
  accdebit?: Maybe<Scalars['Float']['output']>;
  accfrom?: Maybe<Scalars['String']['output']>;
  accto?: Maybe<Scalars['String']['output']>;
  aecid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  linenum?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Accclosetemplate>;
};

export type Accdiffmodel = {
  accdiffmodellines?: Maybe<Array<Accdiffmodellines>>;
  akind?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  diffgroup?: Maybe<Scalars['Float']['output']>;
  employeenum?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  mobilenum?: Maybe<Scalars['Float']['output']>;
};

export type Accdiffmodellines = {
  accdiffmodel?: Maybe<Accdiffmodel>;
  coef?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  fromdate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Float']['output'];
};

export type Acceventtype = {
  abcanal?: Maybe<Scalars['Float']['output']>;
  abcmode?: Maybe<Scalars['Float']['output']>;
  abcmodel?: Maybe<Scalars['Float']['output']>;
  accclosetemplates?: Maybe<Array<Accclosetemplate>>;
  accevtemplates?: Maybe<Array<Accevtemplate>>;
  accountevents?: Maybe<Array<Accountevent>>;
  analdists?: Maybe<Array<Analdist>>;
  atype?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  daysrange?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dlaid?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  isanal?: Maybe<Scalars['Float']['output']>;
  iscancelling?: Maybe<Scalars['Float']['output']>;
  journal?: Maybe<Journal>;
  justification?: Maybe<Scalars['String']['output']>;
  mydatacode?: Maybe<Scalars['String']['output']>;
  mydatatype?: Maybe<Scalars['Float']['output']>;
  needauthority?: Maybe<Scalars['Float']['output']>;
  noupdkepyo?: Maybe<Scalars['Float']['output']>;
  noupdmyf?: Maybe<Scalars['Float']['output']>;
  primaryaccount?: Maybe<Account>;
  selfpricing?: Maybe<Scalars['Float']['output']>;
  specialinvoicecategory?: Maybe<Scalars['Float']['output']>;
  updkepyobalancesheet?: Maybe<Scalars['Float']['output']>;
  userjournallines?: Maybe<Array<Userjournallines>>;
  zerovaluemode?: Maybe<Scalars['Float']['output']>;
};

export type Accevtemplate = {
  acceventtype?: Maybe<Acceventtype>;
  accevtemplines?: Maybe<Array<Accevtemplines>>;
  braid?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  codeprefix?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dsrid?: Maybe<Scalars['Float']['output']>;
  fastentry?: Maybe<Scalars['Float']['output']>;
  fastentrydata?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  mydatacode?: Maybe<Scalars['String']['output']>;
  mydatatype?: Maybe<Scalars['Float']['output']>;
  periodicity?: Maybe<Scalars['Float']['output']>;
  repeatondays?: Maybe<Scalars['String']['output']>;
  selfpricing?: Maybe<Scalars['Float']['output']>;
};

export type Accevtemplines = {
  accountmask?: Maybe<Scalars['String']['output']>;
  aepid?: Maybe<Scalars['Float']['output']>;
  calcformula?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  cord?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  justification?: Maybe<Scalars['String']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Accevtemplate>;
};

export type Account = {
  accbalsheets?: Maybe<Array<Accbalsheet>>;
  accdiffmodelid?: Maybe<Scalars['Float']['output']>;
  acceventtypes?: Maybe<Array<Acceventtype>>;
  accountext?: Maybe<Accountext>;
  accounts?: Maybe<Array<Account>>;
  accounts2?: Maybe<Array<Account>>;
  accounts3?: Maybe<Array<Account>>;
  acctrns?: Maybe<Array<Acctrn>>;
  ads?: Maybe<Analdist>;
  almode?: Maybe<Scalars['Float']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  balancetransfer?: Maybe<Scalars['Float']['output']>;
  behaviour?: Maybe<Scalars['Float']['output']>;
  cfyeid?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  coraccid?: Maybe<Scalars['Float']['output']>;
  corotheraccid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  flddate1?: Maybe<Scalars['Date']['output']>;
  flddate2?: Maybe<Scalars['Date']['output']>;
  flddate3?: Maybe<Scalars['Date']['output']>;
  fldfloat1?: Maybe<Scalars['Float']['output']>;
  fldfloat2?: Maybe<Scalars['Float']['output']>;
  fldfloat3?: Maybe<Scalars['Float']['output']>;
  fldfloat4?: Maybe<Scalars['Float']['output']>;
  fldfloat5?: Maybe<Scalars['Float']['output']>;
  fldfloat6?: Maybe<Scalars['Float']['output']>;
  fldstring1?: Maybe<Scalars['String']['output']>;
  fldstring2?: Maybe<Scalars['String']['output']>;
  fldstring3?: Maybe<Scalars['String']['output']>;
  fldstring4?: Maybe<Scalars['String']['output']>;
  fldstring5?: Maybe<Scalars['String']['output']>;
  fldstring6?: Maybe<Scalars['String']['output']>;
  fltid1?: Maybe<Scalars['Float']['output']>;
  fltid2?: Maybe<Scalars['Float']['output']>;
  fltid3?: Maybe<Scalars['Float']['output']>;
  foreignaccount?: Maybe<Scalars['String']['output']>;
  foreigndescr?: Maybe<Scalars['String']['output']>;
  fromaccount?: Maybe<Scalars['String']['output']>;
  grade?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  idcouple?: Maybe<Account>;
  idprimary?: Maybe<Account>;
  insynthetic?: Maybe<Scalars['Float']['output']>;
  inventoryrest?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  ismoving?: Maybe<Scalars['Float']['output']>;
  isvatwholesale?: Maybe<Scalars['Float']['output']>;
  kadactCategory?: Maybe<KadactivityCategory>;
  kadfinCategory?: Maybe<KadfinCategory>;
  kadid?: Maybe<Scalars['Float']['output']>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  lgtaxcategory?: Maybe<Lgtaxcategory>;
  maxbalance?: Maybe<Scalars['Float']['output']>;
  minbalance?: Maybe<Scalars['Float']['output']>;
  mydataacctype?: Maybe<Scalars['Float']['output']>;
  mydatacatid?: Maybe<Scalars['Float']['output']>;
  mydataclassificationsetupcode?: Maybe<Scalars['String']['output']>;
  mydatacode?: Maybe<Scalars['Float']['output']>;
  mydatadetailtype?: Maybe<Scalars['Float']['output']>;
  mydatanomos?: Maybe<Scalars['Float']['output']>;
  mydatavatdiscount?: Maybe<Scalars['Float']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  taxdisputes?: Maybe<Scalars['Float']['output']>;
  taxkind?: Maybe<Scalars['Float']['output']>;
  vat?: Maybe<Account>;
  vatdocmode?: Maybe<Scalars['Float']['output']>;
  vatupdmode?: Maybe<Scalars['Float']['output']>;
  vdcid?: Maybe<Scalars['Float']['output']>;
  vtc?: Maybe<Vatcategory>;
  warning?: Maybe<Scalars['String']['output']>;
};

export type Accountevent = {
  acceventtype?: Maybe<Acceventtype>;
  acctrns?: Maybe<Array<Acctrn>>;
  aceid?: Maybe<Scalars['Float']['output']>;
  adsid?: Maybe<Scalars['Float']['output']>;
  aepid?: Maybe<Scalars['Float']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  analdistcode?: Maybe<Scalars['String']['output']>;
  anallevel?: Maybe<Scalars['Float']['output']>;
  approvaldate?: Maybe<Scalars['Date']['output']>;
  approvaluser?: Maybe<Scalars['Float']['output']>;
  approved?: Maybe<Scalars['Float']['output']>;
  atrid?: Maybe<Scalars['Float']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  batchdeprid?: Maybe<Scalars['Float']['output']>;
  batchid?: Maybe<Scalars['Float']['output']>;
  branch?: Maybe<Branch>;
  cfoid?: Maybe<Scalars['Float']['output']>;
  cntid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  coraceid?: Maybe<Scalars['Float']['output']>;
  corfromdate?: Maybe<Scalars['Date']['output']>;
  cororiginaceid?: Maybe<Scalars['Float']['output']>;
  corotheraceid?: Maybe<Scalars['Float']['output']>;
  cortodate?: Maybe<Scalars['Date']['output']>;
  cur?: Maybe<Currency>;
  district?: Maybe<Scalars['String']['output']>;
  dsrid?: Maybe<Scalars['Float']['output']>;
  dsrnumber?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  isbalanced?: Maybe<Scalars['Float']['output']>;
  iscancelled?: Maybe<Scalars['Float']['output']>;
  isprinted?: Maybe<Scalars['Float']['output']>;
  jouid?: Maybe<Scalars['Float']['output']>;
  journal?: Maybe<Journal>;
  journalnum?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  localrate?: Maybe<Scalars['Float']['output']>;
  mgrecId1?: Maybe<Scalars['Float']['output']>;
  mydatacode?: Maybe<Scalars['String']['output']>;
  mydatatype?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ptrid?: Maybe<Scalars['Float']['output']>;
  relaceid?: Maybe<Scalars['Float']['output']>;
  reltype?: Maybe<Scalars['Float']['output']>;
  rootaceline?: Maybe<Scalars['Float']['output']>;
  rootatrid?: Maybe<Scalars['Float']['output']>;
  secondaryrate?: Maybe<Scalars['Float']['output']>;
  selfpricing?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  specialinvoicecategory?: Maybe<Scalars['Float']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  svftrid?: Maybe<Scalars['Float']['output']>;
  taxfreeid?: Maybe<Scalars['Float']['output']>;
  trAfm?: Maybe<Scalars['String']['output']>;
  trCntid?: Maybe<Scalars['Float']['output']>;
  trDistrict?: Maybe<Scalars['String']['output']>;
  trName?: Maybe<Scalars['String']['output']>;
  trStreet?: Maybe<Scalars['String']['output']>;
  trZipcode?: Maybe<Scalars['String']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  traderaccid?: Maybe<Scalars['Float']['output']>;
  transdate?: Maybe<Scalars['Date']['output']>;
  updcount?: Maybe<Scalars['Float']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type Accountext = {
  acc?: Maybe<Account>;
  accid?: Maybe<Scalars['Float']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  closingdate?: Maybe<Scalars['Date']['output']>;
  cntid?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  consentdate?: Maybe<Scalars['Date']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  doyid?: Maybe<Scalars['Float']['output']>;
  fathername?: Maybe<Scalars['String']['output']>;
  faxnumber?: Maybe<Scalars['String']['output']>;
  geoid?: Maybe<Scalars['Float']['output']>;
  isgdpr?: Maybe<Scalars['Float']['output']>;
  jobdescr?: Maybe<Scalars['String']['output']>;
  manager?: Maybe<Scalars['String']['output']>;
  myfacctype?: Maybe<Scalars['Float']['output']>;
  myfnotobject?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone1?: Maybe<Scalars['String']['output']>;
  phone2?: Maybe<Scalars['String']['output']>;
  ptrid?: Maybe<Scalars['Float']['output']>;
  refacccode?: Maybe<Scalars['String']['output']>;
  refaccdescr?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  sumkepyo?: Maybe<Scalars['Float']['output']>;
  taxfreeid?: Maybe<Scalars['Float']['output']>;
  telex?: Maybe<Scalars['String']['output']>;
  updkepyo?: Maybe<Scalars['Float']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type Acctrn = {
  acc?: Maybe<Account>;
  accdifmodelid?: Maybe<Scalars['Float']['output']>;
  accid?: Maybe<Scalars['Float']['output']>;
  ace?: Maybe<Accountevent>;
  aceid?: Maybe<Scalars['Float']['output']>;
  adsid?: Maybe<Scalars['String']['output']>;
  aetid?: Maybe<Scalars['Float']['output']>;
  analperc?: Maybe<Scalars['Float']['output']>;
  approved?: Maybe<Scalars['Float']['output']>;
  atrid?: Maybe<Scalars['Float']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  braid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  curid?: Maybe<Scalars['Float']['output']>;
  dateendcheck?: Maybe<Scalars['Date']['output']>;
  difatrid?: Maybe<Scalars['Float']['output']>;
  doccode?: Maybe<Scalars['String']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  isclosing?: Maybe<Scalars['Float']['output']>;
  iscredit?: Maybe<Scalars['Float']['output']>;
  isdebit?: Maybe<Scalars['Float']['output']>;
  isflag5?: Maybe<Scalars['Float']['output']>;
  isflag6?: Maybe<Scalars['Float']['output']>;
  isflag7?: Maybe<Scalars['Float']['output']>;
  isflag8?: Maybe<Scalars['Float']['output']>;
  isflag9?: Maybe<Scalars['Float']['output']>;
  isflag10?: Maybe<Scalars['Float']['output']>;
  isflag11?: Maybe<Scalars['Float']['output']>;
  isflag12?: Maybe<Scalars['Float']['output']>;
  isflag13?: Maybe<Scalars['Float']['output']>;
  isflag14?: Maybe<Scalars['Float']['output']>;
  isflag15?: Maybe<Scalars['Float']['output']>;
  isflag16?: Maybe<Scalars['Float']['output']>;
  isflag17?: Maybe<Scalars['Float']['output']>;
  isflag18?: Maybe<Scalars['Float']['output']>;
  isflag19?: Maybe<Scalars['Float']['output']>;
  isflag20?: Maybe<Scalars['Float']['output']>;
  isopening?: Maybe<Scalars['Float']['output']>;
  jouid?: Maybe<Scalars['Float']['output']>;
  journalnum?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  kepyocount?: Maybe<Scalars['Float']['output']>;
  kepyovalue?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  lkepyovalue?: Maybe<Scalars['Float']['output']>;
  localvalue?: Maybe<Scalars['Float']['output']>;
  mgrecId2?: Maybe<Scalars['Float']['output']>;
  myfcount?: Maybe<Scalars['Float']['output']>;
  rootatrid?: Maybe<Scalars['Float']['output']>;
  secondaryvalue?: Maybe<Scalars['Float']['output']>;
  skepyovalue?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  transdate?: Maybe<Scalars['Date']['output']>;
  trnvalue?: Maybe<Scalars['Float']['output']>;
  updatekepyo?: Maybe<Scalars['Float']['output']>;
};

export type Analdist = {
  acceventtype?: Maybe<Acceventtype>;
  accounts?: Maybe<Array<Account>>;
  analdistlines?: Maybe<Array<Analdistlines>>;
  atype?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  comtradelines?: Maybe<Array<Comtradelines>>;
  descr?: Maybe<Scalars['String']['output']>;
  dlpdsrid?: Maybe<Scalars['Float']['output']>;
  dmode?: Maybe<Scalars['Float']['output']>;
  dsrid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
};

export type Analdistlines = {
  accid?: Maybe<Scalars['Float']['output']>;
  ads?: Maybe<Analdist>;
  adsid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
};

export type Asset = {
  abcmask?: Maybe<Scalars['String']['output']>;
  assetcategory?: Maybe<Assetcategory>;
  assetcategory2?: Maybe<Assetcategory>;
  assetorginfos?: Maybe<Array<Assetorginfo>>;
  assettradelines?: Maybe<Array<Assettradelines>>;
  basedeprdescr?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  deprcoef1?: Maybe<Scalars['Float']['output']>;
  deprcoef2?: Maybe<Scalars['Float']['output']>;
  deprcoef3?: Maybe<Scalars['Float']['output']>;
  deprcoef4?: Maybe<Scalars['Float']['output']>;
  deprcoef5?: Maybe<Scalars['Float']['output']>;
  depricedassets?: Maybe<Array<Depricedasset>>;
  deprmode?: Maybe<Scalars['Float']['output']>;
  deprtrans?: Maybe<Array<Deprtrans>>;
  descr?: Maybe<Scalars['String']['output']>;
  discountoption?: Maybe<Scalars['Float']['output']>;
  elpfairvalueloss?: Maybe<Scalars['String']['output']>;
  elpimpairment?: Maybe<Scalars['String']['output']>;
  elpimpairmentinversion?: Maybe<Scalars['String']['output']>;
  elpnetposition?: Maybe<Scalars['String']['output']>;
  elpunimpaired?: Maybe<Scalars['String']['output']>;
  flddate1?: Maybe<Scalars['Date']['output']>;
  flddate2?: Maybe<Scalars['Date']['output']>;
  flddate3?: Maybe<Scalars['Date']['output']>;
  fldfloat1?: Maybe<Scalars['Float']['output']>;
  fldfloat2?: Maybe<Scalars['Float']['output']>;
  fldfloat3?: Maybe<Scalars['Float']['output']>;
  fldfloat4?: Maybe<Scalars['Float']['output']>;
  fldfloat5?: Maybe<Scalars['Float']['output']>;
  fldfloat6?: Maybe<Scalars['Float']['output']>;
  fldstring1?: Maybe<Scalars['String']['output']>;
  fldstring2?: Maybe<Scalars['String']['output']>;
  fldstring3?: Maybe<Scalars['String']['output']>;
  fldstring4?: Maybe<Scalars['String']['output']>;
  fldstring5?: Maybe<Scalars['String']['output']>;
  fldstring6?: Maybe<Scalars['String']['output']>;
  fltid1?: Maybe<Scalars['Float']['output']>;
  fltid2?: Maybe<Scalars['Float']['output']>;
  fltid3?: Maybe<Scalars['Float']['output']>;
  fndid?: Maybe<Scalars['Float']['output']>;
  fndperc?: Maybe<Scalars['Float']['output']>;
  glasset?: Maybe<Scalars['String']['output']>;
  gldepr1?: Maybe<Scalars['String']['output']>;
  gldepr2?: Maybe<Scalars['String']['output']>;
  gldepr3?: Maybe<Scalars['String']['output']>;
  gldepr4?: Maybe<Scalars['String']['output']>;
  gldepr5?: Maybe<Scalars['String']['output']>;
  gldepred1?: Maybe<Scalars['String']['output']>;
  gldepred2?: Maybe<Scalars['String']['output']>;
  gldepred3?: Maybe<Scalars['String']['output']>;
  gldepred4?: Maybe<Scalars['String']['output']>;
  gldepred5?: Maybe<Scalars['String']['output']>;
  gldiffrecalc?: Maybe<Scalars['String']['output']>;
  glearning?: Maybe<Scalars['String']['output']>;
  glfund?: Maybe<Scalars['String']['output']>;
  glloss?: Maybe<Scalars['String']['output']>;
  glproduction?: Maybe<Scalars['String']['output']>;
  glprofit?: Maybe<Scalars['String']['output']>;
  gltaxfreevalue?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  immeddepr?: Maybe<Scalars['Float']['output']>;
  intid?: Maybe<Scalars['Float']['output']>;
  inuse?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  movingoutside?: Maybe<Scalars['Float']['output']>;
  notincludedincost?: Maybe<Scalars['Float']['output']>;
  overdepr?: Maybe<Scalars['Float']['output']>;
  regnum?: Maybe<Scalars['String']['output']>;
  reliteid?: Maybe<Scalars['Float']['output']>;
  remainvalue?: Maybe<Scalars['Float']['output']>;
  specialvatstatus?: Maybe<Scalars['Float']['output']>;
  tfdid?: Maybe<Scalars['Float']['output']>;
  tfdperc?: Maybe<Scalars['Float']['output']>;
  tfvid?: Maybe<Scalars['Float']['output']>;
  totalunits?: Maybe<Scalars['Float']['output']>;
  vatadded?: Maybe<Scalars['Float']['output']>;
  vtc?: Maybe<Vatcategory>;
};

export type Assetcategory = {
  assets?: Maybe<Array<Asset>>;
  assets2?: Maybe<Array<Asset>>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  crossdeprgusid?: Maybe<Scalars['Float']['output']>;
  deprcoef1?: Maybe<Scalars['Float']['output']>;
  deprcoef2?: Maybe<Scalars['Float']['output']>;
  deprcoef3?: Maybe<Scalars['Float']['output']>;
  deprcoef4?: Maybe<Scalars['Float']['output']>;
  deprcoef5?: Maybe<Scalars['Float']['output']>;
  deprmode?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  elpfairvalueloss?: Maybe<Scalars['String']['output']>;
  elpimpairment?: Maybe<Scalars['String']['output']>;
  elpimpairmentinversion?: Maybe<Scalars['String']['output']>;
  elpunimpaired?: Maybe<Scalars['String']['output']>;
  glasset?: Maybe<Scalars['String']['output']>;
  gldepr1?: Maybe<Scalars['String']['output']>;
  gldepr2?: Maybe<Scalars['String']['output']>;
  gldepr3?: Maybe<Scalars['String']['output']>;
  gldepr4?: Maybe<Scalars['String']['output']>;
  gldepr5?: Maybe<Scalars['String']['output']>;
  gldepred1?: Maybe<Scalars['String']['output']>;
  gldepred2?: Maybe<Scalars['String']['output']>;
  gldepred3?: Maybe<Scalars['String']['output']>;
  gldepred4?: Maybe<Scalars['String']['output']>;
  gldepred5?: Maybe<Scalars['String']['output']>;
  gldiffrecalc?: Maybe<Scalars['String']['output']>;
  glearning?: Maybe<Scalars['String']['output']>;
  glfund?: Maybe<Scalars['String']['output']>;
  glloss?: Maybe<Scalars['String']['output']>;
  glproduction?: Maybe<Scalars['String']['output']>;
  glprofit?: Maybe<Scalars['String']['output']>;
  gltaxfreevalue?: Maybe<Scalars['String']['output']>;
  gusid?: Maybe<Scalars['Float']['output']>;
  lossgusid?: Maybe<Scalars['Float']['output']>;
  profitgusid?: Maybe<Scalars['Float']['output']>;
  rejustgusid?: Maybe<Scalars['Float']['output']>;
};

export type Assetorginfo = {
  aoidate?: Maybe<Scalars['Date']['output']>;
  ast?: Maybe<Asset>;
  branch?: Maybe<Branch>;
  department?: Maybe<Department>;
  id: Scalars['Float']['output'];
  location?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Float']['output']>;
  sn?: Maybe<Scalars['String']['output']>;
};

export type Assetparams = {
  ascperc?: Maybe<Scalars['Float']['output']>;
  ascpercinuse?: Maybe<Scalars['Float']['output']>;
  assetsmask?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  countryonlinespurchases?: Maybe<Scalars['Float']['output']>;
  countryonlinessales?: Maybe<Scalars['Float']['output']>;
  datedeprsoldassets?: Maybe<Scalars['Float']['output']>;
  deprdsrid?: Maybe<Scalars['Float']['output']>;
  deprinuse?: Maybe<Scalars['Float']['output']>;
  deprinuseinfipid?: Maybe<Scalars['Float']['output']>;
  dsrcode?: Maybe<Scalars['String']['output']>;
  dsrid?: Maybe<Scalars['Float']['output']>;
  dsridias?: Maybe<Scalars['Float']['output']>;
  dsridproduction?: Maybe<Scalars['Float']['output']>;
  expirydate?: Maybe<Scalars['Date']['output']>;
  inlaw?: Maybe<Scalars['Float']['output']>;
  limitcalcdepr?: Maybe<Scalars['Float']['output']>;
  limitvalueinuse?: Maybe<Scalars['Float']['output']>;
  linearvalue?: Maybe<Scalars['Float']['output']>;
  monthcalc?: Maybe<Scalars['Float']['output']>;
  nonegativevalue?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
  perdepreciation?: Maybe<Scalars['Float']['output']>;
  regnumsmask?: Maybe<Scalars['String']['output']>;
  vatadded?: Maybe<Scalars['Float']['output']>;
};

export type Assetreadjust = {
  assettrans?: Maybe<Array<Assettrans>>;
  codeid?: Maybe<Scalars['Float']['output']>;
  coef?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
};

export type Assettradelines = {
  adsid?: Maybe<Scalars['Float']['output']>;
  ast?: Maybe<Asset>;
  ccoid?: Maybe<Scalars['Float']['output']>;
  coef?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  deprdatefrom?: Maybe<Scalars['Date']['output']>;
  dpa?: Maybe<Depricedasset>;
  dpadescr?: Maybe<Scalars['String']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  intvatamount?: Maybe<Scalars['Float']['output']>;
  itemlinevalue?: Maybe<Scalars['Float']['output']>;
  itemlinevaluefull?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  linevalue?: Maybe<Scalars['Float']['output']>;
  linevalue2?: Maybe<Scalars['Float']['output']>;
  linevalue3?: Maybe<Scalars['Float']['output']>;
  linevalue4?: Maybe<Scalars['Float']['output']>;
  linevalue5?: Maybe<Scalars['Float']['output']>;
  litemlinevalue?: Maybe<Scalars['Float']['output']>;
  llinevalue?: Maybe<Scalars['Float']['output']>;
  lnetlinevalue?: Maybe<Scalars['Float']['output']>;
  lvaldisc1?: Maybe<Scalars['Float']['output']>;
  lvaldisc2?: Maybe<Scalars['Float']['output']>;
  lvatamount?: Maybe<Scalars['Float']['output']>;
  mydatacharcat?: Maybe<Scalars['Float']['output']>;
  netlinevalue?: Maybe<Scalars['Float']['output']>;
  origincntid?: Maybe<Scalars['Float']['output']>;
  prcdisc1?: Maybe<Scalars['Float']['output']>;
  prcdisc2?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  qty?: Maybe<Scalars['Float']['output']>;
  secjustification?: Maybe<Scalars['String']['output']>;
  secstoid?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
  valdisc1?: Maybe<Scalars['Float']['output']>;
  valdisc2?: Maybe<Scalars['Float']['output']>;
  vatamount?: Maybe<Scalars['Float']['output']>;
  vatamountfull?: Maybe<Scalars['Float']['output']>;
  vtcid?: Maybe<Scalars['Float']['output']>;
};

export type Assettrans = {
  arj?: Maybe<Assetreadjust>;
  aslid?: Maybe<Scalars['Float']['output']>;
  assetnature?: Maybe<Scalars['Float']['output']>;
  assettrntype?: Maybe<Assettrntype>;
  assetvalue?: Maybe<Scalars['Float']['output']>;
  astid?: Maybe<Scalars['Float']['output']>;
  branch?: Maybe<Branch>;
  ccoid?: Maybe<Scalars['Float']['output']>;
  coef?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  deprtrans?: Maybe<Array<Deprtrans>>;
  doccode?: Maybe<Scalars['String']['output']>;
  dpa?: Maybe<Depricedasset>;
  dpaid?: Maybe<Scalars['Float']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  iasassetvalue?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  info1?: Maybe<Scalars['String']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  ltrnvalue?: Maybe<Scalars['Float']['output']>;
  ltrnvalue2?: Maybe<Scalars['Float']['output']>;
  ltrnvalue3?: Maybe<Scalars['Float']['output']>;
  ltrnvalue4?: Maybe<Scalars['Float']['output']>;
  ltrnvalue5?: Maybe<Scalars['Float']['output']>;
  qty?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  transfactor?: Maybe<Scalars['Float']['output']>;
  trndate?: Maybe<Scalars['Date']['output']>;
};

export type Assettrntype = {
  assetnature?: Maybe<Scalars['Float']['output']>;
  assettrans?: Maybe<Array<Assettrans>>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  defjustification?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dpadomain?: Maybe<Scalars['Float']['output']>;
  fincustdoctypes?: Maybe<Array<Fincustdoctype>>;
  finstoredoctypes?: Maybe<Array<Finstoredoctype>>;
  finstoredoctypes2?: Maybe<Array<Finstoredoctype>>;
  finsupdoctypes?: Maybe<Array<Finsupdoctype>>;
  isfiscal?: Maybe<Scalars['Float']['output']>;
  isias?: Maybe<Scalars['Float']['output']>;
};

export type Bank = {
  accmask?: Maybe<Scalars['String']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  apipass?: Maybe<Scalars['String']['output']>;
  apitype?: Maybe<Scalars['Float']['output']>;
  apiuser?: Maybe<Scalars['String']['output']>;
  bankaccounts?: Maybe<Array<Bankaccount>>;
  bic?: Maybe<Scalars['String']['output']>;
  bills?: Maybe<Array<Bill>>;
  city1?: Maybe<Scalars['String']['output']>;
  cnt?: Maybe<Country>;
  codeid?: Maybe<Scalars['Float']['output']>;
  compcent?: Maybe<Scalars['Float']['output']>;
  compitem?: Maybe<Scalars['Float']['output']>;
  gln?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  paylistupd?: Maybe<Scalars['Date']['output']>;
  rate?: Maybe<Scalars['Float']['output']>;
  street1?: Maybe<Scalars['String']['output']>;
  suppbankaccounts?: Maybe<Array<Suppbankaccount>>;
  taxfree?: Maybe<Taxfreejustification>;
  valeurdays1?: Maybe<Scalars['Float']['output']>;
  valeurdays2?: Maybe<Scalars['Float']['output']>;
  vatstatus?: Maybe<Scalars['Float']['output']>;
  zipcode1?: Maybe<Scalars['String']['output']>;
};

export type Bankaccbalancesheet = {
  addid?: Maybe<Scalars['Float']['output']>;
  bnkid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  lperiodcredit?: Maybe<Scalars['Float']['output']>;
  lperioddebit?: Maybe<Scalars['Float']['output']>;
  lperiodturnover?: Maybe<Scalars['Float']['output']>;
  master?: Maybe<Bankaccount>;
  masterid?: Maybe<Scalars['Float']['output']>;
  masterperiodcredit?: Maybe<Scalars['Float']['output']>;
  masterperioddebit?: Maybe<Scalars['Float']['output']>;
  masterperiodturnover?: Maybe<Scalars['Float']['output']>;
  value5?: Maybe<Scalars['Float']['output']>;
  value6?: Maybe<Scalars['Float']['output']>;
  value7?: Maybe<Scalars['Float']['output']>;
  value8?: Maybe<Scalars['Float']['output']>;
  value9?: Maybe<Scalars['Float']['output']>;
  value10?: Maybe<Scalars['Float']['output']>;
  value11?: Maybe<Scalars['Float']['output']>;
  value12?: Maybe<Scalars['Float']['output']>;
  value13?: Maybe<Scalars['Float']['output']>;
  value14?: Maybe<Scalars['Float']['output']>;
  value15?: Maybe<Scalars['Float']['output']>;
  value16?: Maybe<Scalars['Float']['output']>;
  value17?: Maybe<Scalars['Float']['output']>;
  value18?: Maybe<Scalars['Float']['output']>;
  value19?: Maybe<Scalars['Float']['output']>;
  value20?: Maybe<Scalars['Float']['output']>;
};

export type Bankaccfindata = {
  addid?: Maybe<Scalars['Float']['output']>;
  bnkid?: Maybe<Scalars['Float']['output']>;
  calcdate?: Maybe<Scalars['Date']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  lgenindefinitebalance?: Maybe<Scalars['Float']['output']>;
  lmasterbalance?: Maybe<Scalars['Float']['output']>;
  lselfindefinitebalance?: Maybe<Scalars['Float']['output']>;
  master?: Maybe<Bankaccount>;
  masterbalance?: Maybe<Scalars['Float']['output']>;
  masterid?: Maybe<Scalars['Float']['output']>;
  meanduetime?: Maybe<Scalars['Float']['output']>;
  meanpaymenttime?: Maybe<Scalars['Float']['output']>;
  upddate?: Maybe<Scalars['Date']['output']>;
  value5?: Maybe<Scalars['Float']['output']>;
  value6?: Maybe<Scalars['Float']['output']>;
  value7?: Maybe<Scalars['Float']['output']>;
  value8?: Maybe<Scalars['Float']['output']>;
  value9?: Maybe<Scalars['Float']['output']>;
  value10?: Maybe<Scalars['Float']['output']>;
  value11?: Maybe<Scalars['Float']['output']>;
  value12?: Maybe<Scalars['Float']['output']>;
  value13?: Maybe<Scalars['Float']['output']>;
  value14?: Maybe<Scalars['Float']['output']>;
  value15?: Maybe<Scalars['Float']['output']>;
  value16?: Maybe<Scalars['Float']['output']>;
  value17?: Maybe<Scalars['Float']['output']>;
  value18?: Maybe<Scalars['Float']['output']>;
  value19?: Maybe<Scalars['Float']['output']>;
  value20?: Maybe<Scalars['Float']['output']>;
};

export type Bankaccount = {
  abcmask?: Maybe<Scalars['String']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  accmaskbill?: Maybe<Scalars['String']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  baccnumber?: Maybe<Scalars['String']['output']>;
  bankaccbalancesheets?: Maybe<Array<Bankaccbalancesheet>>;
  bankaccfindata?: Maybe<Bankaccfindata>;
  bankacctrans?: Maybe<Array<Bankacctrans>>;
  bankrate?: Maybe<Scalars['Float']['output']>;
  banktradelines?: Maybe<Array<Banktradelines>>;
  bills?: Maybe<Array<Bill>>;
  bnk?: Maybe<Bank>;
  branch?: Maybe<Branch>;
  city1?: Maybe<Scalars['String']['output']>;
  closingdate?: Maybe<Scalars['Date']['output']>;
  cnt?: Maybe<Country>;
  code?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  consentdate?: Maybe<Scalars['Date']['output']>;
  cur?: Maybe<Currency>;
  descr?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  entrydate?: Maybe<Scalars['Date']['output']>;
  fintrades?: Maybe<Array<Fintrade>>;
  flddate1?: Maybe<Scalars['Date']['output']>;
  flddate2?: Maybe<Scalars['Date']['output']>;
  flddate3?: Maybe<Scalars['Date']['output']>;
  fldfloat1?: Maybe<Scalars['Float']['output']>;
  fldfloat2?: Maybe<Scalars['Float']['output']>;
  fldfloat3?: Maybe<Scalars['Float']['output']>;
  fldfloat4?: Maybe<Scalars['Float']['output']>;
  fldfloat5?: Maybe<Scalars['Float']['output']>;
  fldfloat6?: Maybe<Scalars['Float']['output']>;
  fldstring1?: Maybe<Scalars['String']['output']>;
  fldstring2?: Maybe<Scalars['String']['output']>;
  fldstring3?: Maybe<Scalars['String']['output']>;
  fldstring4?: Maybe<Scalars['String']['output']>;
  fldstring5?: Maybe<Scalars['String']['output']>;
  fldstring6?: Maybe<Scalars['String']['output']>;
  fltid1?: Maybe<Scalars['Float']['output']>;
  fltid2?: Maybe<Scalars['Float']['output']>;
  fltid3?: Maybe<Scalars['Float']['output']>;
  gln?: Maybe<Scalars['String']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  isgdpr?: Maybe<Scalars['Float']['output']>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  lastupddate?: Maybe<Scalars['Date']['output']>;
  minimumbalance?: Maybe<Scalars['Float']['output']>;
  myfnotobject?: Maybe<Scalars['Float']['output']>;
  onlinemasstrans?: Maybe<Scalars['Float']['output']>;
  onlinetrans?: Maybe<Scalars['Float']['output']>;
  paymentterms?: Maybe<Paymentterms>;
  paymentterms2?: Maybe<Array<Paymentterms>>;
  paymentterms3?: Maybe<Array<Paymentterms>>;
  paymentterms4?: Maybe<Array<Paymentterms>>;
  remarks?: Maybe<Scalars['String']['output']>;
  street1?: Maybe<Scalars['String']['output']>;
  taxfree?: Maybe<Taxfreejustification>;
  vatstatus?: Maybe<Scalars['Float']['output']>;
  zipcode1?: Maybe<Scalars['String']['output']>;
};

export type Bankacctrans = {
  addid?: Maybe<Scalars['Float']['output']>;
  bnkid?: Maybe<Scalars['Float']['output']>;
  bnktrntype?: Maybe<Bnktrntype>;
  braid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  creditupd?: Maybe<Scalars['Float']['output']>;
  curid?: Maybe<Scalars['Float']['output']>;
  debitupd?: Maybe<Scalars['Float']['output']>;
  doccode?: Maybe<Scalars['String']['output']>;
  expiredate?: Maybe<Scalars['Date']['output']>;
  extravalue1?: Maybe<Scalars['Float']['output']>;
  extravalue2?: Maybe<Scalars['Float']['output']>;
  extravalue3?: Maybe<Scalars['Float']['output']>;
  extravalue4?: Maybe<Scalars['Float']['output']>;
  fdtid?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  flag5?: Maybe<Scalars['Float']['output']>;
  flag6?: Maybe<Scalars['Float']['output']>;
  flag7?: Maybe<Scalars['Float']['output']>;
  flag8?: Maybe<Scalars['Float']['output']>;
  flag9?: Maybe<Scalars['Float']['output']>;
  flag10?: Maybe<Scalars['Float']['output']>;
  flag11?: Maybe<Scalars['Float']['output']>;
  flag12?: Maybe<Scalars['Float']['output']>;
  flag13?: Maybe<Scalars['Float']['output']>;
  flag14?: Maybe<Scalars['Float']['output']>;
  flag15?: Maybe<Scalars['Float']['output']>;
  flag16?: Maybe<Scalars['Float']['output']>;
  flag17?: Maybe<Scalars['Float']['output']>;
  flag18?: Maybe<Scalars['Float']['output']>;
  flag19?: Maybe<Scalars['Float']['output']>;
  flag20?: Maybe<Scalars['Float']['output']>;
  ftdid?: Maybe<Scalars['Float']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  isopening?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  ltrnvalue?: Maybe<Scalars['Float']['output']>;
  lturnover?: Maybe<Scalars['Float']['output']>;
  oldltrnvalue?: Maybe<Scalars['Float']['output']>;
  openamount?: Maybe<Scalars['Float']['output']>;
  openitemtype?: Maybe<Scalars['Float']['output']>;
  per?: Maybe<Bankaccount>;
  perid?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  tnacode?: Maybe<Scalars['String']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  trndate?: Maybe<Scalars['Date']['output']>;
  trnvalue?: Maybe<Scalars['Float']['output']>;
  ttrnvalue?: Maybe<Scalars['Float']['output']>;
  tturnover?: Maybe<Scalars['Float']['output']>;
  turnover?: Maybe<Scalars['Float']['output']>;
  turnoverupd?: Maybe<Scalars['Float']['output']>;
};

export type Banktradelines = {
  addid?: Maybe<Scalars['Float']['output']>;
  bna?: Maybe<Bankaccount>;
  bnclrstatus?: Maybe<Scalars['String']['output']>;
  bnkid?: Maybe<Scalars['Float']['output']>;
  bnpaymentid?: Maybe<Scalars['String']['output']>;
  bnpaystatus?: Maybe<Scalars['String']['output']>;
  bntrnid?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  diffexchval?: Maybe<Scalars['Float']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  ftrpaidid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  justification?: Maybe<Scalars['String']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  linevalue?: Maybe<Scalars['Float']['output']>;
  llinevalue?: Maybe<Scalars['Float']['output']>;
  perlinevalue?: Maybe<Scalars['Float']['output']>;
  perrate?: Maybe<Scalars['Float']['output']>;
  refcode?: Maybe<Scalars['String']['output']>;
  sodata?: Maybe<Scalars['String']['output']>;
  sorefstatus?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  ttrpaidid?: Maybe<Scalars['Float']['output']>;
};

export type Bill = {
  accmask?: Maybe<Scalars['String']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  balance?: Maybe<Scalars['Float']['output']>;
  balancecode?: Maybe<Scalars['String']['output']>;
  balancedate?: Maybe<Scalars['Date']['output']>;
  balanceopen?: Maybe<Scalars['Float']['output']>;
  bankaccnum?: Maybe<Scalars['String']['output']>;
  bbrid?: Maybe<Scalars['Float']['output']>;
  billkind?: Maybe<Billkind>;
  billstates?: Maybe<Billstates>;
  billstates2?: Maybe<Billstates>;
  bllnumber?: Maybe<Scalars['String']['output']>;
  bllvalue?: Maybe<Scalars['Float']['output']>;
  bnabnk?: Maybe<Bankaccount>;
  bnk?: Maybe<Bank>;
  brate?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  creationdate?: Maybe<Scalars['Date']['output']>;
  cur?: Maybe<Currency>;
  dateofissue?: Maybe<Scalars['Date']['output']>;
  dondomopen?: Maybe<Scalars['Float']['output']>;
  donidopen?: Maybe<Scalars['Float']['output']>;
  donnameopen?: Maybe<Scalars['String']['output']>;
  donordomaintype?: Maybe<Scalars['Float']['output']>;
  donorid?: Maybe<Scalars['Float']['output']>;
  donorname?: Maybe<Scalars['String']['output']>;
  expirationdate?: Maybe<Scalars['Date']['output']>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fundtradelines?: Maybe<Array<Fundtradelines>>;
  guarantorname?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  inputstatus?: Maybe<Scalars['Float']['output']>;
  interestrate?: Maybe<Scalars['Float']['output']>;
  isblocked?: Maybe<Scalars['Float']['output']>;
  isprinted?: Maybe<Scalars['Float']['output']>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  maybetransfered?: Maybe<Scalars['Float']['output']>;
  openbalupd?: Maybe<Scalars['Float']['output']>;
  payeeaddress?: Maybe<Scalars['String']['output']>;
  payeedomaintype?: Maybe<Scalars['Float']['output']>;
  payeeid?: Maybe<Scalars['Float']['output']>;
  payeename?: Maybe<Scalars['String']['output']>;
  placeofissue?: Maybe<Scalars['String']['output']>;
  poridopen?: Maybe<Scalars['Float']['output']>;
  portfolio?: Maybe<Portfolio>;
  posdomopen?: Maybe<Scalars['Float']['output']>;
  posidopen?: Maybe<Scalars['Float']['output']>;
  posnameopen?: Maybe<Scalars['String']['output']>;
  possessoraddress?: Maybe<Scalars['String']['output']>;
  possessordomaintype?: Maybe<Scalars['Float']['output']>;
  possessorid?: Maybe<Scalars['Float']['output']>;
  possessorname?: Maybe<Scalars['String']['output']>;
  publisheraddress?: Maybe<Scalars['String']['output']>;
  publisherdomaintype?: Maybe<Scalars['Float']['output']>;
  publisherid?: Maybe<Scalars['Float']['output']>;
  publishername?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  thirdupd?: Maybe<Scalars['Float']['output']>;
  valeurdays?: Maybe<Scalars['Float']['output']>;
};

export type Billkind = {
  accmask?: Maybe<Scalars['String']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  bankfromacc?: Maybe<Scalars['Float']['output']>;
  bills?: Maybe<Array<Bill>>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  docseries?: Maybe<Docseries>;
  isactive?: Maybe<Scalars['Float']['output']>;
  payeedomaintype?: Maybe<Scalars['Float']['output']>;
  publisherdomaintype?: Maybe<Scalars['Float']['output']>;
};

export type Billstates = {
  bills?: Maybe<Array<Bill>>;
  bills2?: Maybe<Array<Bill>>;
  billtrntypes?: Maybe<Array<Billtrntype>>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  openbalanceupd?: Maybe<Scalars['Float']['output']>;
  scodeid?: Maybe<Scalars['Float']['output']>;
};

export type Billtrntype = {
  accmask?: Maybe<Scalars['String']['output']>;
  accmask2?: Maybe<Scalars['String']['output']>;
  bankaccfutid?: Maybe<Scalars['Float']['output']>;
  billstates?: Maybe<Billstates>;
  billupd?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  curpossesorupd?: Maybe<Scalars['Float']['output']>;
  defaultjustification?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  donoropenbalance?: Maybe<Scalars['Float']['output']>;
  flag1?: Maybe<Scalars['Float']['output']>;
  flag2?: Maybe<Scalars['Float']['output']>;
  flag3?: Maybe<Scalars['Float']['output']>;
  flag4?: Maybe<Scalars['Float']['output']>;
  flag5?: Maybe<Scalars['Float']['output']>;
  flag6?: Maybe<Scalars['Float']['output']>;
  flag7?: Maybe<Scalars['Float']['output']>;
  flag8?: Maybe<Scalars['Float']['output']>;
  flag9?: Maybe<Scalars['Float']['output']>;
  flag10?: Maybe<Scalars['Float']['output']>;
  fundtradelines?: Maybe<Array<Fundtradelines>>;
  prevbllstates?: Maybe<Scalars['String']['output']>;
  prevpossesoropenbalance?: Maybe<Scalars['Float']['output']>;
  prevpossessorcat?: Maybe<Scalars['Float']['output']>;
  traderdomain?: Maybe<Scalars['Float']['output']>;
  traderfttid?: Maybe<Scalars['Float']['output']>;
  traderopenbalance?: Maybe<Scalars['Float']['output']>;
  valfndbnktrns?: Maybe<Array<Valfndbnktrn>>;
  valfndcusttrns?: Maybe<Array<Valfndcusttrn>>;
  valfndsuptrns?: Maybe<Array<Valfndsuptrn>>;
};

export type Bnktrntype = {
  bankacctrans?: Maybe<Array<Bankacctrans>>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  creditupd?: Maybe<Scalars['Float']['output']>;
  debitupd?: Maybe<Scalars['Float']['output']>;
  defaultjustification?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  finbankdoctypes?: Maybe<Array<Finbankdoctype>>;
  flag5?: Maybe<Scalars['Float']['output']>;
  flag6?: Maybe<Scalars['Float']['output']>;
  flag7?: Maybe<Scalars['Float']['output']>;
  flag8?: Maybe<Scalars['Float']['output']>;
  flag9?: Maybe<Scalars['Float']['output']>;
  flag10?: Maybe<Scalars['Float']['output']>;
  flag11?: Maybe<Scalars['Float']['output']>;
  flag12?: Maybe<Scalars['Float']['output']>;
  flag13?: Maybe<Scalars['Float']['output']>;
  flag14?: Maybe<Scalars['Float']['output']>;
  flag15?: Maybe<Scalars['Float']['output']>;
  flag16?: Maybe<Scalars['Float']['output']>;
  flag17?: Maybe<Scalars['Float']['output']>;
  flag18?: Maybe<Scalars['Float']['output']>;
  flag19?: Maybe<Scalars['Float']['output']>;
  flag20?: Maybe<Scalars['Float']['output']>;
  opening?: Maybe<Scalars['Float']['output']>;
};

export type Branch = {
  abcmask?: Maybe<Scalars['String']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  accountevents?: Maybe<Array<Accountevent>>;
  assetorginfos?: Maybe<Array<Assetorginfo>>;
  assettrans?: Maybe<Array<Assettrans>>;
  bankaccounts?: Maybe<Array<Bankaccount>>;
  branchkads?: Maybe<Array<Branchkad>>;
  city?: Maybe<Scalars['String']['output']>;
  closingdate?: Maybe<Scalars['Date']['output']>;
  cnt?: Maybe<Country>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  dipethecode?: Maybe<Scalars['String']['output']>;
  dipethepwd?: Maybe<Scalars['String']['output']>;
  docseries?: Maybe<Array<Docseries>>;
  doy?: Maybe<Doy>;
  dsrcomp?: Maybe<Scalars['String']['output']>;
  fax?: Maybe<Scalars['String']['output']>;
  fintrades?: Maybe<Array<Fintrade>>;
  gllimitdate?: Maybe<Scalars['Date']['output']>;
  gln?: Maybe<Scalars['String']['output']>;
  headquarters?: Maybe<Scalars['Float']['output']>;
  ika?: Maybe<Scalars['String']['output']>;
  ikacode?: Maybe<Scalars['String']['output']>;
  inimportconfigdata?: Maybe<Scalars['Float']['output']>;
  inimportdata?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  lastimportconfigdatetime?: Maybe<Scalars['Date']['output']>;
  lastimportdatetime?: Maybe<Scalars['Date']['output']>;
  minagrinshopcode?: Maybe<Scalars['String']['output']>;
  minagrinusr?: Maybe<Scalars['String']['output']>;
  minagrprescriberid?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  npgid?: Maybe<Scalars['Float']['output']>;
  oaedid?: Maybe<Scalars['Float']['output']>;
  phone1?: Maybe<Scalars['String']['output']>;
  phone2?: Maybe<Scalars['String']['output']>;
  porid?: Maybe<Scalars['Float']['output']>;
  ppgid?: Maybe<Scalars['Float']['output']>;
  pusers?: Maybe<Array<Puser>>;
  sepeid?: Maybe<Scalars['Float']['output']>;
  shortcut?: Maybe<Scalars['String']['output']>;
  snpgid?: Maybe<Scalars['Float']['output']>;
  speid?: Maybe<Scalars['Float']['output']>;
  startdate?: Maybe<Scalars['Date']['output']>;
  store?: Maybe<Store>;
  store2?: Maybe<Store>;
  store3?: Maybe<Store>;
  street?: Maybe<Scalars['String']['output']>;
  taxis?: Maybe<Scalars['String']['output']>;
  transporters?: Maybe<Scalars['String']['output']>;
  valadt?: Maybe<Scalars['String']['output']>;
  valafm?: Maybe<Scalars['String']['output']>;
  valdoyid?: Maybe<Scalars['Float']['output']>;
  valfathername?: Maybe<Scalars['String']['output']>;
  valjobid?: Maybe<Scalars['Float']['output']>;
  valjobposition?: Maybe<Scalars['String']['output']>;
  valname?: Maybe<Scalars['String']['output']>;
  valphone?: Maybe<Scalars['String']['output']>;
  valstreet?: Maybe<Scalars['String']['output']>;
  valsurname?: Maybe<Scalars['String']['output']>;
  valzipcode?: Maybe<Scalars['String']['output']>;
  vatstatus?: Maybe<Scalars['Float']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type Branchkad = {
  branch?: Maybe<Branch>;
  branchcodeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  kadkind?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  startdate?: Maybe<Scalars['Date']['output']>;
  stopdate?: Maybe<Scalars['Date']['output']>;
  sxkadid?: Maybe<Scalars['Float']['output']>;
};

export type Bunits = {
  busid?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  purchasewarning?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  saleswarning?: Maybe<Scalars['String']['output']>;
  shortcut?: Maybe<Scalars['String']['output']>;
  storetradelines?: Maybe<Array<Storetradelines>>;
  storetradelines2?: Maybe<Array<Storetradelines>>;
  strorder?: Maybe<Scalars['String']['output']>;
};

export type Calcdocforms = {
  atype?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  dfm?: Maybe<Docforms>;
  dfmid?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  fipid_2?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  linkid?: Maybe<Scalars['Float']['output']>;
  prevfamount?: Maybe<Scalars['Float']['output']>;
  totamount?: Maybe<Scalars['Float']['output']>;
  totamountde?: Maybe<Scalars['Float']['output']>;
};

export type Carrier = {
  address?: Maybe<Scalars['String']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  afmstate?: Maybe<Scalars['Float']['output']>;
  afmstatecheckdate?: Maybe<Scalars['Date']['output']>;
  aftersalesapikey?: Maybe<Scalars['String']['output']>;
  area?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cnt?: Maybe<Country>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  comments2?: Maybe<Scalars['String']['output']>;
  comments3?: Maybe<Scalars['String']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  iscourier?: Maybe<Scalars['Float']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  storetrades?: Maybe<Array<Storetrade>>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type Cashexpense = {
  accmask?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  debitmode?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  expensesanalyses?: Maybe<Array<Expensesanalysis>>;
};

export type Centercost = {
  abcmask?: Maybe<Scalars['String']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  presources?: Maybe<Array<Presource>>;
};

export type Coil = {
  anVcoated?: Maybe<Scalars['Float']['output']>;
  classification?: Maybe<Scalars['String']['output']>;
  clength?: Maybe<Scalars['Float']['output']>;
  cnomthickness?: Maybe<Scalars['String']['output']>;
  coathick?: Maybe<Scalars['String']['output']>;
  coating?: Maybe<Scalars['String']['output']>;
  coilno?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  commentsPanel?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  corderid?: Maybe<Scalars['String']['output']>;
  createDate?: Maybe<Scalars['Date']['output']>;
  currLength?: Maybe<Scalars['Float']['output']>;
  currLengthAgr?: Maybe<Scalars['Float']['output']>;
  currLengthAlu?: Maybe<Scalars['Float']['output']>;
  currLengthAlue?: Maybe<Scalars['Float']['output']>;
  currLengthAlup?: Maybe<Scalars['Float']['output']>;
  currLengthBit?: Maybe<Scalars['Float']['output']>;
  currLengthPap?: Maybe<Scalars['Float']['output']>;
  currLengthPol?: Maybe<Scalars['Float']['output']>;
  currLengthSto?: Maybe<Scalars['Float']['output']>;
  currWeight?: Maybe<Scalars['Float']['output']>;
  customer?: Maybe<Scalars['String']['output']>;
  customs?: Maybe<Scalars['Float']['output']>;
  cutComment?: Maybe<Scalars['String']['output']>;
  cutDate?: Maybe<Scalars['Date']['output']>;
  cutWastage?: Maybe<Scalars['Float']['output']>;
  dateDiffCutNow?: Maybe<Scalars['Float']['output']>;
  dateDiffCutProd?: Maybe<Scalars['Float']['output']>;
  dateDiffCutSales?: Maybe<Scalars['Float']['output']>;
  dateDiffDelCut?: Maybe<Scalars['Float']['output']>;
  dateDiffDelNow?: Maybe<Scalars['Float']['output']>;
  dateDiffDelPaint?: Maybe<Scalars['Float']['output']>;
  dateDiffDelSales?: Maybe<Scalars['Float']['output']>;
  dateTrans?: Maybe<Scalars['Date']['output']>;
  datediff?: Maybe<Scalars['Float']['output']>;
  datediffnow?: Maybe<Scalars['Float']['output']>;
  dateofDes34?: Maybe<Scalars['Date']['output']>;
  dcustomer?: Maybe<Scalars['String']['output']>;
  dcustomerName?: Maybe<Scalars['String']['output']>;
  delDate?: Maybe<Scalars['Date']['output']>;
  dischargePort?: Maybe<Scalars['String']['output']>;
  documents?: Maybe<Scalars['String']['output']>;
  donkey?: Maybe<Scalars['Float']['output']>;
  gaugeThickness?: Maybe<Scalars['String']['output']>;
  grossWeight?: Maybe<Scalars['Float']['output']>;
  heatno?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  initWeight?: Maybe<Scalars['Float']['output']>;
  innerdiameter?: Maybe<Scalars['Float']['output']>;
  loadDate?: Maybe<Scalars['Date']['output']>;
  loaderid?: Maybe<Scalars['String']['output']>;
  loc?: Maybe<Scalars['Float']['output']>;
  locTrans?: Maybe<Scalars['Float']['output']>;
  locationAccess: Array<UsersLocationAccess>;
  nomthickness?: Maybe<Scalars['String']['output']>;
  openstatus?: Maybe<Scalars['String']['output']>;
  orderDate?: Maybe<Scalars['Date']['output']>;
  paintDate?: Maybe<Scalars['Date']['output']>;
  paintType?: Maybe<Scalars['String']['output']>;
  painted?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  prodComment?: Maybe<Scalars['String']['output']>;
  prodDate?: Maybe<Scalars['Date']['output']>;
  productCode?: Maybe<Scalars['String']['output']>;
  property?: Maybe<Scalars['Float']['output']>;
  ptradecode?: Maybe<Scalars['String']['output']>;
  quality?: Maybe<Scalars['Float']['output']>;
  sheetType?: Maybe<Scalars['String']['output']>;
  slithick?: Maybe<Scalars['String']['output']>;
  slitrange?: Maybe<Scalars['String']['output']>;
  status: StatusType;
  steelGrade?: Maybe<Scalars['String']['output']>;
  supcoilId?: Maybe<Scalars['String']['output']>;
  supplier?: Maybe<Scalars['String']['output']>;
  surfaceType?: Maybe<Scalars['String']['output']>;
  tempStatus?: Maybe<Scalars['Float']['output']>;
  thickness?: Maybe<Scalars['Float']['output']>;
  tnomthickness?: Maybe<Scalars['String']['output']>;
  tporderId?: Maybe<Scalars['String']['output']>;
  tporderSort?: Maybe<Scalars['Float']['output']>;
  upDate?: Maybe<Scalars['Date']['output']>;
  vesselName?: Maybe<Scalars['String']['output']>;
  wastage?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  widthCoil?: Maybe<Scalars['Float']['output']>;
};

export type CoilColorType = {
  code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  groupid?: Maybe<Scalars['Int']['output']>;
  hexcode?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive?: Maybe<Scalars['Int']['output']>;
  isPvc?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
};

/** Fields by which coils can be sorted */
export type CoilSortField =
  | 'WIDTH'
  | 'coilno'
  | 'color'
  | 'currWeight'
  | 'id'
  | 'openstatus'
  | 'thickness'
  | 'upDate'
  | 'widthCoil';

export type Coils = {
  anVcoated?: Maybe<Scalars['Int']['output']>;
  classification?: Maybe<Scalars['String']['output']>;
  clength?: Maybe<Scalars['Float']['output']>;
  cnomthickness?: Maybe<Scalars['String']['output']>;
  coathick?: Maybe<Scalars['String']['output']>;
  coating?: Maybe<Scalars['String']['output']>;
  coilno?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  commentsPanel?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  corderid?: Maybe<Scalars['String']['output']>;
  createDate?: Maybe<Scalars['Date']['output']>;
  currLength?: Maybe<Scalars['Float']['output']>;
  currLengthAgr?: Maybe<Scalars['Float']['output']>;
  currLengthAlu?: Maybe<Scalars['Float']['output']>;
  currLengthAlue?: Maybe<Scalars['Float']['output']>;
  currLengthAlup?: Maybe<Scalars['Float']['output']>;
  currLengthBit?: Maybe<Scalars['Float']['output']>;
  currLengthPap?: Maybe<Scalars['Float']['output']>;
  currLengthPol?: Maybe<Scalars['Float']['output']>;
  currLengthSto?: Maybe<Scalars['Float']['output']>;
  currWeight?: Maybe<Scalars['Float']['output']>;
  customer?: Maybe<Scalars['String']['output']>;
  customs?: Maybe<Scalars['Int']['output']>;
  cutComment?: Maybe<Scalars['String']['output']>;
  cutDate?: Maybe<Scalars['Date']['output']>;
  cutWastage?: Maybe<Scalars['Float']['output']>;
  dateDiffCutNow?: Maybe<Scalars['Int']['output']>;
  dateDiffCutProd?: Maybe<Scalars['Int']['output']>;
  dateDiffCutSales?: Maybe<Scalars['Int']['output']>;
  dateDiffDelCut?: Maybe<Scalars['Int']['output']>;
  dateDiffDelNow?: Maybe<Scalars['Int']['output']>;
  dateDiffDelPaint?: Maybe<Scalars['Int']['output']>;
  dateDiffDelSales?: Maybe<Scalars['Int']['output']>;
  dateTrans?: Maybe<Scalars['Date']['output']>;
  datediff?: Maybe<Scalars['Int']['output']>;
  datediffnow?: Maybe<Scalars['Int']['output']>;
  dateofDes34?: Maybe<Scalars['Date']['output']>;
  dcustomer?: Maybe<Scalars['String']['output']>;
  dcustomerName?: Maybe<Scalars['String']['output']>;
  delDate?: Maybe<Scalars['Date']['output']>;
  dischargePort?: Maybe<Scalars['String']['output']>;
  documents?: Maybe<Scalars['String']['output']>;
  donkey?: Maybe<Scalars['Int']['output']>;
  gaugeThickness?: Maybe<Scalars['String']['output']>;
  grossWeight?: Maybe<Scalars['Float']['output']>;
  heatno?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  initWeight?: Maybe<Scalars['Float']['output']>;
  innerdiameter?: Maybe<Scalars['Int']['output']>;
  loadDate?: Maybe<Scalars['Date']['output']>;
  loaderid?: Maybe<Scalars['String']['output']>;
  loc?: Maybe<Scalars['Int']['output']>;
  locTrans?: Maybe<Scalars['Int']['output']>;
  locationAccess: Array<UsersLocationAccess>;
  nomthickness?: Maybe<Scalars['String']['output']>;
  openstatus: Openstatus;
  orderDate?: Maybe<Scalars['Date']['output']>;
  paintDate?: Maybe<Scalars['Date']['output']>;
  paintType?: Maybe<Scalars['String']['output']>;
  painted: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  prodComment?: Maybe<Scalars['String']['output']>;
  prodDate?: Maybe<Scalars['Date']['output']>;
  productCode?: Maybe<Scalars['String']['output']>;
  property?: Maybe<Scalars['Int']['output']>;
  ptradecode?: Maybe<Scalars['String']['output']>;
  quality?: Maybe<Scalars['Int']['output']>;
  sheetType?: Maybe<Scalars['String']['output']>;
  slithick: Scalars['String']['output'];
  slitrange: Scalars['String']['output'];
  status?: Maybe<Status>;
  steelGrade?: Maybe<Scalars['String']['output']>;
  supcoilId?: Maybe<Scalars['String']['output']>;
  supplier?: Maybe<Scalars['String']['output']>;
  surfaceType?: Maybe<Scalars['String']['output']>;
  tempStatus?: Maybe<Scalars['Int']['output']>;
  thickness?: Maybe<Scalars['Float']['output']>;
  tnomthickness?: Maybe<Scalars['String']['output']>;
  tporderId?: Maybe<Scalars['String']['output']>;
  tporderSort?: Maybe<Scalars['Int']['output']>;
  upDate?: Maybe<Scalars['Date']['output']>;
  vesselName?: Maybe<Scalars['String']['output']>;
  wastage?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  widthCoil?: Maybe<Scalars['Float']['output']>;
};

export type CoilsFilterInput = {
  coilno?: InputMaybe<StringFilterInput>;
  color?: InputMaybe<StringFilterInput>;
  currWeight?: InputMaybe<StringFilterInput>;
  currWeightFrom?: InputMaybe<StringFilterInput>;
  currWeightTo?: InputMaybe<StringFilterInput>;
  loc?: InputMaybe<IntInInput>;
  loc_in?: InputMaybe<IntInInput>;
  openstatus?: InputMaybe<OpenstatusFilterInput>;
  status?: InputMaybe<Scalars['Int']['input']>;
  thickness?: InputMaybe<StringFilterInput>;
  upDateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  upDateTo?: InputMaybe<Scalars['DateTime']['input']>;
  widthCoil?: InputMaybe<StringFilterInput>;
};

export type CoilsResponse = {
  nodes: Array<Coil>;
  totalCount: Scalars['Int']['output'];
};

export type CoilsSortInput = {
  direction: SortOrder;
  field: CoilSortField;
};

export type Colorlist = {
  codeid?: Maybe<Scalars['Float']['output']>;
  colorlistlines?: Maybe<Array<Colorlistlines>>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  ismain?: Maybe<Scalars['Float']['output']>;
};

export type Colorlistlines = {
  clgid?: Maybe<Scalars['Float']['output']>;
  colorcode?: Maybe<Scalars['String']['output']>;
  colordescr?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Colorlist>;
  linkid?: Maybe<Scalars['Float']['output']>;
  optcolordescr?: Maybe<Scalars['String']['output']>;
  ordernum?: Maybe<Scalars['Float']['output']>;
};

export type Colorsizeqtys = {
  colorcode?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  itecolor?: Maybe<Itecolor>;
  iteid?: Maybe<Scalars['Float']['output']>;
  qtymode?: Maybe<Scalars['Float']['output']>;
  size1?: Maybe<Scalars['Float']['output']>;
  size2?: Maybe<Scalars['Float']['output']>;
  size3?: Maybe<Scalars['Float']['output']>;
  size4?: Maybe<Scalars['Float']['output']>;
  size5?: Maybe<Scalars['Float']['output']>;
  size6?: Maybe<Scalars['Float']['output']>;
  size7?: Maybe<Scalars['Float']['output']>;
  size8?: Maybe<Scalars['Float']['output']>;
  size9?: Maybe<Scalars['Float']['output']>;
  size10?: Maybe<Scalars['Float']['output']>;
  size11?: Maybe<Scalars['Float']['output']>;
  size12?: Maybe<Scalars['Float']['output']>;
  size13?: Maybe<Scalars['Float']['output']>;
  size14?: Maybe<Scalars['Float']['output']>;
  size15?: Maybe<Scalars['Float']['output']>;
  size16?: Maybe<Scalars['Float']['output']>;
  size17?: Maybe<Scalars['Float']['output']>;
  size18?: Maybe<Scalars['Float']['output']>;
  size19?: Maybe<Scalars['Float']['output']>;
  size20?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
};

export type Company = {
  abcparams?: Maybe<Abcparams>;
  accclosetemplates?: Maybe<Array<Accclosetemplate>>;
  acceventtypes?: Maybe<Array<Acceventtype>>;
  accevtemplates?: Maybe<Array<Accevtemplate>>;
  accountantid?: Maybe<Scalars['Float']['output']>;
  accounts?: Maybe<Array<Account>>;
  activity?: Maybe<Scalars['String']['output']>;
  adt?: Maybe<Scalars['String']['output']>;
  aefoldernumber?: Maybe<Scalars['String']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  afmcheckpwd?: Maybe<Scalars['String']['output']>;
  afmcheckusername?: Maybe<Scalars['String']['output']>;
  afmstatusinertdays?: Maybe<Scalars['Float']['output']>;
  aftersalespaymentcodeid?: Maybe<Scalars['String']['output']>;
  aftersalestoken?: Maybe<Scalars['String']['output']>;
  aftersalesuuid?: Maybe<Scalars['String']['output']>;
  allimitdate?: Maybe<Scalars['Date']['output']>;
  allowmodifications?: Maybe<Scalars['Float']['output']>;
  analdists?: Maybe<Array<Analdist>>;
  assetparams?: Maybe<Assetparams>;
  autocheckafm?: Maybe<Scalars['Float']['output']>;
  autocreate?: Maybe<Scalars['Float']['output']>;
  billcodelength?: Maybe<Scalars['Float']['output']>;
  bills?: Maybe<Array<Bill>>;
  billtrntypes?: Maybe<Array<Billtrntype>>;
  bnktrntypes?: Maybe<Array<Bnktrntype>>;
  bookcategory?: Maybe<Scalars['Float']['output']>;
  branches?: Maybe<Array<Branch>>;
  category?: Maybe<Scalars['Float']['output']>;
  chdblafm?: Maybe<Scalars['Float']['output']>;
  checkafm?: Maybe<Scalars['Float']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cnt?: Maybe<Country>;
  codeid?: Maybe<Scalars['Float']['output']>;
  companysize?: Maybe<Scalars['Float']['output']>;
  comptitle?: Maybe<Scalars['String']['output']>;
  costdecimals?: Maybe<Scalars['Float']['output']>;
  costfolders?: Maybe<Array<Costfolder>>;
  costs?: Maybe<Array<Cost>>;
  customers?: Maybe<Array<Customer>>;
  custparams?: Maybe<Custparams>;
  custtrntypes?: Maybe<Array<Custtrntype>>;
  datefromMydata?: Maybe<Scalars['Date']['output']>;
  defaultmailserver?: Maybe<Scalars['Float']['output']>;
  deptstats?: Maybe<Scalars['String']['output']>;
  dipethe?: Maybe<Scalars['String']['output']>;
  dipethepwd?: Maybe<Scalars['String']['output']>;
  dispatchdateMydata?: Maybe<Scalars['Date']['output']>;
  docseries?: Maybe<Array<Docseries>>;
  doy?: Maybe<Doy>;
  ean13Comprefix?: Maybe<Scalars['String']['output']>;
  ean13Comprefix2?: Maybe<Scalars['String']['output']>;
  ean13Comprefix3?: Maybe<Scalars['String']['output']>;
  ean13Comprefix4?: Maybe<Scalars['String']['output']>;
  ean13Comprefix5?: Maybe<Scalars['String']['output']>;
  ean13Comprefix6?: Maybe<Scalars['String']['output']>;
  earchivedirectory?: Maybe<Scalars['String']['output']>;
  edicode?: Maybe<Scalars['String']['output']>;
  einvoicedays?: Maybe<Scalars['Float']['output']>;
  einvoicekey?: Maybe<Scalars['String']['output']>;
  einvoiceurl?: Maybe<Scalars['String']['output']>;
  einvoiceurlid?: Maybe<Scalars['Float']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailaccount?: Maybe<Emailaccount>;
  enabledocrights?: Maybe<Scalars['Float']['output']>;
  equivmode?: Maybe<Scalars['Float']['output']>;
  eurosystemhds?: Maybe<Array<Eurosystemhd>>;
  facebookname?: Maybe<Scalars['String']['output']>;
  facebookuseraccesstoken?: Maybe<Scalars['String']['output']>;
  fathername?: Maybe<Scalars['String']['output']>;
  fax?: Maybe<Scalars['String']['output']>;
  finbankdoctypes?: Maybe<Array<Finbankdoctype>>;
  fincustdoctypes?: Maybe<Array<Fincustdoctype>>;
  finparams?: Maybe<Finparams>;
  finstoredoctypes?: Maybe<Array<Finstoredoctype>>;
  finsupdoctypes?: Maybe<Array<Finsupdoctype>>;
  fintradedatessynchronization?: Maybe<Scalars['Float']['output']>;
  fiscyears?: Maybe<Array<Fiscyear>>;
  fulltextsearchurl?: Maybe<Scalars['String']['output']>;
  fundstrntypes?: Maybe<Array<Fundstrntype>>;
  gdprEnabled?: Maybe<Scalars['Float']['output']>;
  gemh?: Maybe<Scalars['String']['output']>;
  glitems?: Maybe<Array<Glitem>>;
  gllimitdate?: Maybe<Scalars['Date']['output']>;
  gln?: Maybe<Scalars['String']['output']>;
  glparams?: Maybe<Glparams>;
  glupdatestructs?: Maybe<Array<Glupdatestruct>>;
  hfefolder?: Maybe<Scalars['String']['output']>;
  ika?: Maybe<Scalars['String']['output']>;
  ikaam?: Maybe<Scalars['String']['output']>;
  includeinfts?: Maybe<Scalars['Float']['output']>;
  includeinstatistics?: Maybe<Scalars['Float']['output']>;
  incomingmailauthwithssl?: Maybe<Scalars['Float']['output']>;
  incomingmailserver?: Maybe<Scalars['String']['output']>;
  incomingmailserverport?: Maybe<Scalars['Float']['output']>;
  initializationdate?: Maybe<Scalars['Date']['output']>;
  intrastatpwd?: Maybe<Scalars['String']['output']>;
  intrastatusername?: Maybe<Scalars['String']['output']>;
  involvessv?: Maybe<Scalars['Float']['output']>;
  isaccountoffice?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  itemcategories?: Maybe<Array<Itemcategory>>;
  itemgroups?: Maybe<Array<Itemgroup>>;
  itemqtycommisions?: Maybe<Array<Itemqtycommision>>;
  journals?: Maybe<Array<Journal>>;
  kbs?: Maybe<Scalars['Float']['output']>;
  kepyolimit?: Maybe<Scalars['Float']['output']>;
  localcurid?: Maybe<Scalars['Float']['output']>;
  logemail?: Maybe<Scalars['Float']['output']>;
  lotifypwd?: Maybe<Scalars['String']['output']>;
  lotifyurl?: Maybe<Scalars['String']['output']>;
  lotifyuser?: Maybe<Scalars['String']['output']>;
  mailauthenticate?: Maybe<Scalars['Float']['output']>;
  mailauthwithssl?: Maybe<Scalars['Float']['output']>;
  mailencoding?: Maybe<Scalars['Float']['output']>;
  mailserver?: Maybe<Scalars['String']['output']>;
  mailserverport?: Maybe<Scalars['Float']['output']>;
  mailserverpwd?: Maybe<Scalars['String']['output']>;
  mailserveruser?: Maybe<Scalars['String']['output']>;
  mainbuildingid?: Maybe<Scalars['Float']['output']>;
  materials?: Maybe<Array<Material>>;
  matparams?: Maybe<Matparams>;
  matpricecategories?: Maybe<Array<Matpricecategory>>;
  mattrntypes?: Maybe<Array<Mattrntype>>;
  minagrinshopcode?: Maybe<Scalars['String']['output']>;
  minagrinusr?: Maybe<Scalars['String']['output']>;
  minagrprescriberid?: Maybe<Scalars['Float']['output']>;
  modulesMydata?: Maybe<Scalars['String']['output']>;
  moduletags?: Maybe<Scalars['String']['output']>;
  myfpwd?: Maybe<Scalars['String']['output']>;
  myfusername?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  npgid?: Maybe<Scalars['Float']['output']>;
  oaedpwd?: Maybe<Scalars['String']['output']>;
  oaeduser?: Maybe<Scalars['String']['output']>;
  onlineofflinetimerinterval?: Maybe<Scalars['Float']['output']>;
  onlinepaykey?: Maybe<Scalars['String']['output']>;
  onlinepaypwd?: Maybe<Scalars['String']['output']>;
  onlinepayurl?: Maybe<Scalars['String']['output']>;
  onlinepayuser?: Maybe<Scalars['String']['output']>;
  pandektispwd?: Maybe<Scalars['String']['output']>;
  pandektisusername?: Maybe<Scalars['String']['output']>;
  passwordMydata?: Maybe<Scalars['String']['output']>;
  password_39A?: Maybe<Scalars['String']['output']>;
  paymentterms?: Maybe<Array<Paymentterms>>;
  percentdecimals?: Maybe<Scalars['Float']['output']>;
  phone1?: Maybe<Scalars['String']['output']>;
  phone2?: Maybe<Scalars['String']['output']>;
  phonedialurl?: Maybe<Scalars['String']['output']>;
  ppgid?: Maybe<Scalars['Float']['output']>;
  presidentname?: Maybe<Scalars['String']['output']>;
  pricecategories?: Maybe<Array<Pricecategory>>;
  pricedecimals?: Maybe<Scalars['Float']['output']>;
  printafterinvdispatch?: Maybe<Scalars['Float']['output']>;
  printertype?: Maybe<Scalars['Float']['output']>;
  printlogindate?: Maybe<Scalars['Float']['output']>;
  productionparams?: Maybe<Productionparams>;
  providererptransmissionmode?: Maybe<Scalars['Float']['output']>;
  providertransmissionmode?: Maybe<Scalars['Float']['output']>;
  proxyserver?: Maybe<Scalars['String']['output']>;
  proxyserverbypass?: Maybe<Scalars['String']['output']>;
  proxyserverport?: Maybe<Scalars['Float']['output']>;
  proxyserverpwd?: Maybe<Scalars['String']['output']>;
  proxyserveruser?: Maybe<Scalars['String']['output']>;
  pusers?: Maybe<Array<Puser>>;
  qtydecimals?: Maybe<Scalars['Float']['output']>;
  relcusid?: Maybe<Scalars['Float']['output']>;
  reliabilities?: Maybe<Array<Reliability>>;
  reportvatdata?: Maybe<Scalars['String']['output']>;
  requestMydata?: Maybe<Scalars['String']['output']>;
  retailonlinedateMydata?: Maybe<Scalars['Date']['output']>;
  retailparams?: Maybe<Retailparams>;
  retailparamsext?: Maybe<Retailparamsext>;
  rfwebaccountid?: Maybe<Scalars['Float']['output']>;
  routes?: Maybe<Array<Route>>;
  salesmen?: Maybe<Array<Salesman>>;
  salesparams?: Maybe<Salesparams>;
  sanumber?: Maybe<Scalars['String']['output']>;
  secondarycurid?: Maybe<Scalars['Float']['output']>;
  sendMydata?: Maybe<Scalars['String']['output']>;
  serviceparams?: Maybe<Serviceparams>;
  shipcauses?: Maybe<Array<Shipcause>>;
  shortcut?: Maybe<Scalars['String']['output']>;
  signingauthor?: Maybe<Scalars['String']['output']>;
  smscountrycallingcode?: Maybe<Scalars['String']['output']>;
  smslocalphonelength?: Maybe<Scalars['Float']['output']>;
  smslocalphoneprefix?: Maybe<Scalars['Float']['output']>;
  smsprovider?: Maybe<Scalars['Float']['output']>;
  smspwd?: Maybe<Scalars['String']['output']>;
  smsuser?: Maybe<Scalars['String']['output']>;
  specifications?: Maybe<Array<Specification>>;
  spsurcharges?: Maybe<Array<Spsurcharges>>;
  stores?: Maybe<Array<Store>>;
  street?: Maybe<Scalars['String']['output']>;
  supparams?: Maybe<Supparams>;
  suppliers?: Maybe<Array<Supplier>>;
  suptrntypes?: Maybe<Array<Suptrntype>>;
  sxcompanyext?: Maybe<Sxcompanyext>;
  taxispwd?: Maybe<Scalars['String']['output']>;
  taxisusername?: Maybe<Scalars['String']['output']>;
  taxotherperiodkind?: Maybe<Scalars['Float']['output']>;
  tdocdb?: Maybe<Scalars['String']['output']>;
  tdocdbpass?: Maybe<Scalars['String']['output']>;
  tdocdbuser?: Maybe<Scalars['String']['output']>;
  tdocodbc?: Maybe<Scalars['String']['output']>;
  tradecodelength?: Maybe<Scalars['Float']['output']>;
  tradelimitdate?: Maybe<Scalars['Date']['output']>;
  twittername?: Maybe<Scalars['String']['output']>;
  twittertokenkey?: Maybe<Scalars['String']['output']>;
  twittertokensecret?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  url_39A?: Maybe<Scalars['String']['output']>;
  userjournals?: Maybe<Array<Userjournal>>;
  usernameMydata?: Maybe<Scalars['String']['output']>;
  username_39A?: Maybe<Scalars['String']['output']>;
  validatestore?: Maybe<Scalars['Float']['output']>;
  valuedecimals?: Maybe<Scalars['Float']['output']>;
  varcomtemplates?: Maybe<Array<Varcomtemplate>>;
  varcomtrades?: Maybe<Array<Varcomtrades>>;
  vatstatus?: Maybe<Scalars['Float']['output']>;
  warning?: Maybe<Scalars['String']['output']>;
  webpage?: Maybe<Scalars['String']['output']>;
  webshop?: Maybe<Scalars['Float']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type Composition = {
  coef?: Maybe<Scalars['Float']['output']>;
  componentqty?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  ite?: Maybe<Material>;
  iteidcomponent?: Maybe<Material>;
  linetype?: Maybe<Scalars['Float']['output']>;
  prlinetype?: Maybe<Scalars['Float']['output']>;
};

export type Comtradelines = {
  abmid?: Maybe<Scalars['Float']['output']>;
  accdifmodelid?: Maybe<Scalars['Float']['output']>;
  accid?: Maybe<Scalars['Float']['output']>;
  analdist?: Maybe<Analdist>;
  bntrnid?: Maybe<Scalars['String']['output']>;
  ccoid?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  creditupd?: Maybe<Scalars['Float']['output']>;
  debitupd?: Maybe<Scalars['Float']['output']>;
  expensepercentage?: Maybe<Scalars['Float']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  groupvalue?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  justification?: Maybe<Scalars['String']['output']>;
  kepyoupd?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  linevalue?: Maybe<Scalars['Float']['output']>;
  llinevalue?: Maybe<Scalars['Float']['output']>;
  refcode?: Maybe<Scalars['String']['output']>;
  sodata?: Maybe<Scalars['String']['output']>;
  sorefstatus?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  subjecttovat?: Maybe<Scalars['Float']['output']>;
  tlinevalue?: Maybe<Scalars['Float']['output']>;
  turnoverupd?: Maybe<Scalars['Float']['output']>;
  varcomtrades?: Maybe<Varcomtrades>;
  vtc?: Maybe<Vatcategory>;
};

export type Cost = {
  accmask?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  costfolderests?: Maybe<Array<Costfolderest>>;
  dasmcost?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  stockmode?: Maybe<Scalars['Float']['output']>;
  vataccmask?: Maybe<Scalars['String']['output']>;
  vtcid?: Maybe<Scalars['Float']['output']>;
};

export type Costfolder = {
  accmask?: Maybe<Scalars['String']['output']>;
  accmaskest?: Maybe<Scalars['String']['output']>;
  braid?: Maybe<Scalars['Float']['output']>;
  cfodate?: Maybe<Scalars['Date']['output']>;
  cftid?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  costfolderests?: Maybe<Array<Costfolderest>>;
  descr?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  estdate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Float']['output'];
  remarks?: Maybe<Scalars['String']['output']>;
  upddate?: Maybe<Scalars['Date']['output']>;
};

export type Costfolderest = {
  cfo?: Maybe<Costfolder>;
  cfoid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  cost?: Maybe<Cost>;
  cstid?: Maybe<Scalars['Float']['output']>;
  lvalueest?: Maybe<Scalars['Float']['output']>;
};

export type Country = {
  accmaskcust?: Maybe<Scalars['String']['output']>;
  accmasksup?: Maybe<Scalars['String']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  bankaccounts?: Maybe<Array<Bankaccount>>;
  banks?: Maybe<Array<Bank>>;
  branches?: Maybe<Array<Branch>>;
  carriers?: Maybe<Array<Carrier>>;
  code?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  companies?: Maybe<Array<Company>>;
  custaddresses?: Maybe<Array<Custaddress>>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  intrastatcode?: Maybe<Scalars['String']['output']>;
  optcodeid?: Maybe<Scalars['String']['output']>;
  pgroups?: Maybe<Array<Pgroup>>;
  salesmen?: Maybe<Array<Salesman>>;
  stores?: Maybe<Array<Store>>;
  storetrades?: Maybe<Array<Storetrade>>;
  suppaddresses?: Maybe<Array<Suppaddress>>;
  suppliers?: Maybe<Array<Supplier>>;
};

export type CreateCompletePauseInput = {
  pausecomment?: InputMaybe<Scalars['String']['input']>;
  pauseduration: Scalars['Int']['input'];
  pauseenddate: Scalars['Date']['input'];
  pausestartdate: Scalars['Date']['input'];
  pporderid: Scalars['Int']['input'];
};

export type CreatePpordersInput = {
  createDate?: InputMaybe<Scalars['Date']['input']>;
  estDateOfProd?: InputMaybe<Scalars['Date']['input']>;
  estFinishDate?: InputMaybe<Scalars['Date']['input']>;
  estStartDate?: InputMaybe<Scalars['Date']['input']>;
  finishDate?: InputMaybe<Scalars['Date']['input']>;
  finishDateDatetime?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  offtimeduration?: InputMaybe<Scalars['Int']['input']>;
  offtimeenddate?: InputMaybe<Scalars['Date']['input']>;
  offtimestartdate?: InputMaybe<Scalars['Date']['input']>;
  panelcode?: InputMaybe<Scalars['String']['input']>;
  pauseduration?: InputMaybe<Scalars['Int']['input']>;
  pauseenddate?: InputMaybe<Scalars['Date']['input']>;
  pausestartdate?: InputMaybe<Scalars['Date']['input']>;
  pporderno?: InputMaybe<Scalars['String']['input']>;
  previd?: InputMaybe<Scalars['Int']['input']>;
  prevpanelcode?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  startDateDatetime?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
};

export type Currency = {
  accountevents?: Maybe<Array<Accountevent>>;
  bankaccounts?: Maybe<Array<Bankaccount>>;
  bills?: Maybe<Array<Bill>>;
  code?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  equivals?: Maybe<Array<Equival>>;
  equivals2?: Maybe<Array<Equival>>;
  fintrades?: Maybe<Array<Fintrade>>;
  fundtradelines?: Maybe<Array<Fundtradelines>>;
  lockcurid?: Maybe<Scalars['Float']['output']>;
  lockrate?: Maybe<Scalars['Float']['output']>;
  materials?: Maybe<Array<Material>>;
  pricesdecimals?: Maybe<Scalars['Float']['output']>;
  salesmen?: Maybe<Array<Material>>;
  suppliers?: Maybe<Array<Supplier>>;
  symbol?: Maybe<Scalars['String']['output']>;
  valuesdecimals?: Maybe<Scalars['Float']['output']>;
};

export type Custaddress = {
  carid?: Maybe<Scalars['Float']['output']>;
  cdoyid?: Maybe<Scalars['Float']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cnt?: Maybe<Country>;
  code?: Maybe<Scalars['String']['output']>;
  colidcollector?: Maybe<Scalars['Float']['output']>;
  colidsalesman?: Maybe<Scalars['Float']['output']>;
  contactperson?: Maybe<Scalars['String']['output']>;
  defaultdiscount?: Maybe<Scalars['Float']['output']>;
  dehcode?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dipethecode?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  expvalue1?: Maybe<Scalars['Float']['output']>;
  expvalue2?: Maybe<Scalars['Float']['output']>;
  faxnumber?: Maybe<Scalars['String']['output']>;
  fpastatus?: Maybe<Scalars['Float']['output']>;
  gasstationlicensenum?: Maybe<Scalars['String']['output']>;
  geo?: Maybe<Geogrpos>;
  gln?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  per?: Maybe<Customer>;
  phone1?: Maybe<Scalars['String']['output']>;
  phone2?: Maybe<Scalars['String']['output']>;
  ptrid?: Maybe<Scalars['Float']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  rotid?: Maybe<Scalars['Float']['output']>;
  shvid?: Maybe<Scalars['Float']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  taxfreeid?: Maybe<Scalars['Float']['output']>;
  telex?: Maybe<Scalars['String']['output']>;
  trsid?: Maybe<Scalars['Float']['output']>;
  ublacctcustomerpartyid?: Maybe<Scalars['String']['output']>;
  vesseloperationdata?: Maybe<Scalars['String']['output']>;
  vesseloperationdate?: Maybe<Scalars['Date']['output']>;
  vesseloperationdoy?: Maybe<Scalars['Float']['output']>;
  vesseloperationnumber?: Maybe<Scalars['String']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type Custfindata = {
  calcdate?: Maybe<Scalars['Date']['output']>;
  comid: Scalars['Int']['output'];
  curfyeidmeanpaytime?: Maybe<Scalars['Float']['output']>;
  lastcreditdate?: Maybe<Scalars['Date']['output']>;
  lastdebitdate?: Maybe<Scalars['Date']['output']>;
  lgenindefinitebalance?: Maybe<Scalars['Float']['output']>;
  lmasterbalance?: Maybe<Scalars['Float']['output']>;
  lselfindefinitebalance?: Maybe<Scalars['Float']['output']>;
  master?: Maybe<Customer>;
  masterbalance?: Maybe<Scalars['Float']['output']>;
  masterid: Scalars['Int']['output'];
  meanduetime?: Maybe<Scalars['Float']['output']>;
  meanpaymenttime?: Maybe<Scalars['Float']['output']>;
  salescost?: Maybe<Scalars['Float']['output']>;
  salescostperiods?: Maybe<Scalars['String']['output']>;
  upddate?: Maybe<Scalars['Date']['output']>;
  value5?: Maybe<Scalars['Float']['output']>;
  value6?: Maybe<Scalars['Float']['output']>;
  value7?: Maybe<Scalars['Float']['output']>;
  value8?: Maybe<Scalars['Float']['output']>;
  value9?: Maybe<Scalars['Float']['output']>;
  value10?: Maybe<Scalars['Float']['output']>;
  value11?: Maybe<Scalars['Float']['output']>;
  value12?: Maybe<Scalars['Float']['output']>;
  value13?: Maybe<Scalars['Float']['output']>;
  value14?: Maybe<Scalars['Float']['output']>;
  value15?: Maybe<Scalars['Float']['output']>;
  value16?: Maybe<Scalars['Float']['output']>;
  value17?: Maybe<Scalars['Float']['output']>;
  value18?: Maybe<Scalars['Float']['output']>;
  value19?: Maybe<Scalars['Float']['output']>;
  value20?: Maybe<Scalars['Float']['output']>;
};

export type Customer = {
  abcddid?: Maybe<Scalars['Int']['output']>;
  abcmask?: Maybe<Scalars['String']['output']>;
  acccrdlimit?: Maybe<Scalars['Float']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  afmstate?: Maybe<Scalars['Int']['output']>;
  afmstatecheckdate?: Maybe<Scalars['Date']['output']>;
  afmstateexcludecheck?: Maybe<Scalars['Int']['output']>;
  ageid?: Maybe<Scalars['Int']['output']>;
  autoemail?: Maybe<Scalars['String']['output']>;
  autoemailenabled?: Maybe<Scalars['Int']['output']>;
  autoemailpwd?: Maybe<Scalars['String']['output']>;
  autoemailsendto: Scalars['Int']['output'];
  braid?: Maybe<Scalars['Int']['output']>;
  bunits?: Maybe<Bunits>;
  carrier?: Maybe<Scalars['String']['output']>;
  carrier2?: Maybe<Carrier>;
  catrealty?: Maybe<Scalars['Int']['output']>;
  city1?: Maybe<Scalars['String']['output']>;
  city2?: Maybe<Scalars['String']['output']>;
  closingdate?: Maybe<Scalars['Date']['output']>;
  cnt?: Maybe<Country>;
  code: Scalars['String']['output'];
  colidcollector?: Maybe<Salesman>;
  colidsalesman?: Maybe<Salesman>;
  com?: Maybe<Company>;
  comedicode?: Maybe<Scalars['String']['output']>;
  comid: Scalars['Int']['output'];
  consentdate?: Maybe<Scalars['Date']['output']>;
  cprid?: Maybe<Scalars['Int']['output']>;
  crdlimit?: Maybe<Scalars['Float']['output']>;
  cur?: Maybe<Currency>;
  custaddresses?: Maybe<Array<Custaddress>>;
  custfindata?: Maybe<Custfindata>;
  custresppeople?: Maybe<Array<Custrespperson>>;
  custtradelines?: Maybe<Array<Custtradelines>>;
  defaultdiscount?: Maybe<Scalars['Float']['output']>;
  dehcode?: Maybe<Scalars['String']['output']>;
  dipethe?: Maybe<Scalars['String']['output']>;
  disclimit?: Maybe<Scalars['Float']['output']>;
  district1?: Maybe<Scalars['String']['output']>;
  district2?: Maybe<Scalars['String']['output']>;
  dlvtype?: Maybe<Deliverytype>;
  doy?: Maybe<Doy>;
  ecomavailable?: Maybe<Scalars['Int']['output']>;
  edicode?: Maybe<Scalars['String']['output']>;
  einvoicecansend?: Maybe<Scalars['Int']['output']>;
  einvoicesendmethod?: Maybe<Scalars['Int']['output']>;
  einvoicetags?: Maybe<Scalars['String']['output']>;
  einvoiceupload?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  entrydate?: Maybe<Scalars['Date']['output']>;
  expvalue1?: Maybe<Scalars['Float']['output']>;
  expvalue2?: Maybe<Scalars['Float']['output']>;
  fathername?: Maybe<Scalars['String']['output']>;
  fax1?: Maybe<Scalars['String']['output']>;
  fax2?: Maybe<Scalars['String']['output']>;
  fintradeSyncs?: Maybe<Array<FintradeSync>>;
  fintrades?: Maybe<Array<Fintrade>>;
  flddate1?: Maybe<Scalars['Date']['output']>;
  flddate2?: Maybe<Scalars['Date']['output']>;
  flddate3?: Maybe<Scalars['Date']['output']>;
  fldfloat1?: Maybe<Scalars['Float']['output']>;
  fldfloat2?: Maybe<Scalars['Float']['output']>;
  fldfloat3?: Maybe<Scalars['Float']['output']>;
  fldfloat4?: Maybe<Scalars['Float']['output']>;
  fldfloat5?: Maybe<Scalars['Float']['output']>;
  fldfloat6?: Maybe<Scalars['Float']['output']>;
  fldstring1?: Maybe<Scalars['String']['output']>;
  fldstring2?: Maybe<Scalars['String']['output']>;
  fldstring3?: Maybe<Scalars['String']['output']>;
  fldstring4?: Maybe<Scalars['String']['output']>;
  fldstring5?: Maybe<Scalars['String']['output']>;
  fldstring6?: Maybe<Scalars['String']['output']>;
  fltid1?: Maybe<Scalars['Int']['output']>;
  fltid2?: Maybe<Scalars['Int']['output']>;
  fltid3?: Maybe<Scalars['Int']['output']>;
  fpastatus: Scalars['Int']['output'];
  freqmtrldays?: Maybe<Scalars['Int']['output']>;
  freqmtrlinfoqty?: Maybe<Scalars['Int']['output']>;
  freqmtrlorder?: Maybe<Scalars['Int']['output']>;
  freqmtrlpertrade?: Maybe<Scalars['Int']['output']>;
  freqmtrltrades?: Maybe<Scalars['Int']['output']>;
  frmtype?: Maybe<Scalars['Int']['output']>;
  geo?: Maybe<Geogrpos>;
  gln?: Maybe<Scalars['String']['output']>;
  grp?: Maybe<Pgroup>;
  id: Scalars['Int']['output'];
  identitynum?: Maybe<Scalars['String']['output']>;
  isactive?: Maybe<Scalars['Int']['output']>;
  isgdpr: Scalars['Int']['output'];
  isindividual?: Maybe<Scalars['Int']['output']>;
  issuecntid?: Maybe<Scalars['Int']['output']>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  lastupddate?: Maybe<Scalars['Date']['output']>;
  lastupddatetime?: Maybe<Scalars['Date']['output']>;
  legalf?: Maybe<Scalars['Int']['output']>;
  logexpr?: Maybe<Scalars['String']['output']>;
  logexprlimit?: Maybe<Scalars['Float']['output']>;
  maxdiscount?: Maybe<Scalars['Float']['output']>;
  meanpaytimestartbalance?: Maybe<Scalars['Float']['output']>;
  meanpaytimestartdate?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  npgid?: Maybe<Scalars['Int']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  ocp?: Maybe<Occupation>;
  omode: Scalars['Int']['output'];
  opencrdlimit?: Maybe<Scalars['Float']['output']>;
  orderlimit?: Maybe<Scalars['Float']['output']>;
  panCheck1?: Maybe<Scalars['Int']['output']>;
  panCheck2?: Maybe<Scalars['Int']['output']>;
  panTiresias?: Maybe<Scalars['String']['output']>;
  paymentdays?: Maybe<Scalars['String']['output']>;
  paymenthourfrom?: Maybe<Scalars['Date']['output']>;
  paymenthourto?: Maybe<Scalars['Date']['output']>;
  paymentstatus: Scalars['Int']['output'];
  paymentterms?: Maybe<Paymentterms>;
  perid?: Maybe<Scalars['Int']['output']>;
  pestdimosid?: Maybe<Scalars['Int']['output']>;
  pestperid?: Maybe<Scalars['Int']['output']>;
  phone11?: Maybe<Scalars['String']['output']>;
  phone12?: Maybe<Scalars['String']['output']>;
  phone21?: Maybe<Scalars['String']['output']>;
  phone22?: Maybe<Scalars['String']['output']>;
  poststatus?: Maybe<Scalars['Int']['output']>;
  ppgid?: Maybe<Scalars['Int']['output']>;
  pricecategory?: Maybe<Pricecategory>;
  prtid?: Maybe<Scalars['Int']['output']>;
  relcomid?: Maybe<Scalars['Float']['output']>;
  reliability?: Maybe<Reliability>;
  remarks?: Maybe<Scalars['String']['output']>;
  rfcode?: Maybe<Scalars['String']['output']>;
  route?: Maybe<Route>;
  satlineorder?: Maybe<Scalars['Float']['output']>;
  sattotalorder?: Maybe<Scalars['Int']['output']>;
  shv?: Maybe<Shipvia>;
  specialvatstatus: Scalars['Int']['output'];
  specifications?: Maybe<Array<Specification>>;
  street1?: Maybe<Scalars['String']['output']>;
  street2?: Maybe<Scalars['String']['output']>;
  suppliers?: Maybe<Array<Supplier>>;
  taxfreeid?: Maybe<Scalars['Int']['output']>;
  telex1?: Maybe<Scalars['String']['output']>;
  telex2?: Maybe<Scalars['String']['output']>;
  transdoclimit?: Maybe<Scalars['Float']['output']>;
  ublacctcustomerpartyid?: Maybe<Scalars['String']['output']>;
  valuelimit?: Maybe<Scalars['Float']['output']>;
  warning?: Maybe<Scalars['String']['output']>;
  webcustomers?: Maybe<Array<Webcustomer>>;
  webpage?: Maybe<Scalars['String']['output']>;
  workforce?: Maybe<Scalars['Int']['output']>;
  zipcode1?: Maybe<Scalars['String']['output']>;
  zipcode2?: Maybe<Scalars['String']['output']>;
};

export type CustomerFilterInput = {
  afm?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone11?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerResponse = {
  nodes: Array<Customer>;
  totalCount: Scalars['Int']['output'];
};

export type CustomerSortField =
  | 'id'
  | 'name';

export type CustomerSortInput = {
  direction: SortOrder;
  field: CustomerSortField;
};

export type Customertrans = {
  addid?: Maybe<Scalars['Float']['output']>;
  braid?: Maybe<Scalars['Float']['output']>;
  busid?: Maybe<Scalars['Float']['output']>;
  cjoid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  creditupd?: Maybe<Scalars['Float']['output']>;
  curid?: Maybe<Scalars['Float']['output']>;
  custtrntype?: Maybe<Custtrntype>;
  debitupd?: Maybe<Scalars['Float']['output']>;
  doccode?: Maybe<Scalars['String']['output']>;
  expiredate?: Maybe<Scalars['Date']['output']>;
  extravalue1?: Maybe<Scalars['Float']['output']>;
  extravalue2?: Maybe<Scalars['Float']['output']>;
  extravalue3?: Maybe<Scalars['Float']['output']>;
  extravalue4?: Maybe<Scalars['Float']['output']>;
  fdtid?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  flag5?: Maybe<Scalars['Float']['output']>;
  flag6?: Maybe<Scalars['Float']['output']>;
  flag7?: Maybe<Scalars['Float']['output']>;
  flag8?: Maybe<Scalars['Float']['output']>;
  flag9?: Maybe<Scalars['Float']['output']>;
  flag10?: Maybe<Scalars['Float']['output']>;
  flag11?: Maybe<Scalars['Float']['output']>;
  flag12?: Maybe<Scalars['Float']['output']>;
  flag13?: Maybe<Scalars['Float']['output']>;
  flag14?: Maybe<Scalars['Float']['output']>;
  flag15?: Maybe<Scalars['Float']['output']>;
  flag16?: Maybe<Scalars['Float']['output']>;
  flag17?: Maybe<Scalars['Float']['output']>;
  flag18?: Maybe<Scalars['Float']['output']>;
  flag19?: Maybe<Scalars['Float']['output']>;
  flag20?: Maybe<Scalars['Float']['output']>;
  ftdid?: Maybe<Scalars['Float']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  isopening?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  ltrnvalue?: Maybe<Scalars['Float']['output']>;
  lturnover?: Maybe<Scalars['Float']['output']>;
  oldltrnvalue?: Maybe<Scalars['Float']['output']>;
  openamount?: Maybe<Scalars['Float']['output']>;
  openitemtype?: Maybe<Scalars['Float']['output']>;
  perid?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  tnacode?: Maybe<Scalars['String']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  trndate?: Maybe<Scalars['Date']['output']>;
  trnvalue?: Maybe<Scalars['Float']['output']>;
  ttrnvalue?: Maybe<Scalars['Float']['output']>;
  tturnover?: Maybe<Scalars['Float']['output']>;
  turnover?: Maybe<Scalars['Float']['output']>;
  turnoverupd?: Maybe<Scalars['Float']['output']>;
};

export type Custparams = {
  acccrdlimit?: Maybe<Scalars['Float']['output']>;
  accountmaskdef?: Maybe<Scalars['String']['output']>;
  autolength?: Maybe<Scalars['Float']['output']>;
  autopdfsavefolder?: Maybe<Scalars['String']['output']>;
  autopdfsavemode?: Maybe<Scalars['Float']['output']>;
  autopdfsaveperpost?: Maybe<Scalars['Float']['output']>;
  billinst?: Maybe<Scalars['Float']['output']>;
  billstates?: Maybe<Scalars['String']['output']>;
  blsopbal?: Maybe<Scalars['Float']['output']>;
  cntiddef?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  continuity?: Maybe<Scalars['Float']['output']>;
  crdlimit?: Maybe<Scalars['Float']['output']>;
  creditcheckgroupmode?: Maybe<Scalars['Float']['output']>;
  creditcheckmode?: Maybe<Scalars['Float']['output']>;
  creditlimitsgroupmode?: Maybe<Scalars['Float']['output']>;
  creditlimitsmode?: Maybe<Scalars['Float']['output']>;
  curiddef?: Maybe<Scalars['Float']['output']>;
  cusocpids?: Maybe<Scalars['String']['output']>;
  custjobcodemask?: Maybe<Scalars['String']['output']>;
  custmaturecoef0?: Maybe<Scalars['Float']['output']>;
  custmaturecoef1?: Maybe<Scalars['Float']['output']>;
  custmaturecoef2?: Maybe<Scalars['Float']['output']>;
  custmaturecoef3?: Maybe<Scalars['Float']['output']>;
  custmaturecoef4?: Maybe<Scalars['Float']['output']>;
  custmaturecoef5?: Maybe<Scalars['Float']['output']>;
  custmaturecoef6?: Maybe<Scalars['Float']['output']>;
  custmaturecoef7?: Maybe<Scalars['Float']['output']>;
  custmaturecoef8?: Maybe<Scalars['Float']['output']>;
  custmaturecoef9?: Maybe<Scalars['Float']['output']>;
  custmaturecoef10?: Maybe<Scalars['Float']['output']>;
  custmaturecoef11?: Maybe<Scalars['Float']['output']>;
  custmaturecoef12?: Maybe<Scalars['Float']['output']>;
  custmaturecoef13?: Maybe<Scalars['Float']['output']>;
  custmaturecoef14?: Maybe<Scalars['Float']['output']>;
  custmaturecoef15?: Maybe<Scalars['Float']['output']>;
  custmaturecoef100?: Maybe<Scalars['Float']['output']>;
  custmaturedescr1?: Maybe<Scalars['String']['output']>;
  custmaturedescr2?: Maybe<Scalars['String']['output']>;
  custmaturedescr3?: Maybe<Scalars['String']['output']>;
  custmaturedescr4?: Maybe<Scalars['String']['output']>;
  custmaturedescr5?: Maybe<Scalars['String']['output']>;
  custmaturedescr6?: Maybe<Scalars['String']['output']>;
  custmaturedescr7?: Maybe<Scalars['String']['output']>;
  custmaturedescr8?: Maybe<Scalars['String']['output']>;
  custmaturedescr9?: Maybe<Scalars['String']['output']>;
  custmaturedescr10?: Maybe<Scalars['String']['output']>;
  custmaturedescr11?: Maybe<Scalars['String']['output']>;
  custmaturedescr12?: Maybe<Scalars['String']['output']>;
  custmaturedescr13?: Maybe<Scalars['String']['output']>;
  custmaturedescr14?: Maybe<Scalars['String']['output']>;
  custmaturedescr15?: Maybe<Scalars['String']['output']>;
  custmaturefrom1?: Maybe<Scalars['Float']['output']>;
  custmaturefrom2?: Maybe<Scalars['Float']['output']>;
  custmaturefrom3?: Maybe<Scalars['Float']['output']>;
  custmaturefrom4?: Maybe<Scalars['Float']['output']>;
  custmaturefrom5?: Maybe<Scalars['Float']['output']>;
  custmaturefrom6?: Maybe<Scalars['Float']['output']>;
  custmaturefrom7?: Maybe<Scalars['Float']['output']>;
  custmaturefrom8?: Maybe<Scalars['Float']['output']>;
  custmaturefrom9?: Maybe<Scalars['Float']['output']>;
  custmaturefrom10?: Maybe<Scalars['Float']['output']>;
  custmaturefrom11?: Maybe<Scalars['Float']['output']>;
  custmaturefrom12?: Maybe<Scalars['Float']['output']>;
  custmaturefrom13?: Maybe<Scalars['Float']['output']>;
  custmaturefrom14?: Maybe<Scalars['Float']['output']>;
  custmaturefrom15?: Maybe<Scalars['Float']['output']>;
  custmatureto1?: Maybe<Scalars['Float']['output']>;
  custmatureto2?: Maybe<Scalars['Float']['output']>;
  custmatureto3?: Maybe<Scalars['Float']['output']>;
  custmatureto4?: Maybe<Scalars['Float']['output']>;
  custmatureto5?: Maybe<Scalars['Float']['output']>;
  custmatureto6?: Maybe<Scalars['Float']['output']>;
  custmatureto7?: Maybe<Scalars['Float']['output']>;
  custmatureto8?: Maybe<Scalars['Float']['output']>;
  custmatureto9?: Maybe<Scalars['Float']['output']>;
  custmatureto10?: Maybe<Scalars['Float']['output']>;
  custmatureto11?: Maybe<Scalars['Float']['output']>;
  custmatureto12?: Maybe<Scalars['Float']['output']>;
  custmatureto13?: Maybe<Scalars['Float']['output']>;
  custmatureto14?: Maybe<Scalars['Float']['output']>;
  custmatureto15?: Maybe<Scalars['Float']['output']>;
  customercodemask?: Maybe<Scalars['String']['output']>;
  customercodememo?: Maybe<Scalars['String']['output']>;
  customercodemode?: Maybe<Scalars['Float']['output']>;
  delimeter?: Maybe<Scalars['String']['output']>;
  doctitlefields?: Maybe<Scalars['String']['output']>;
  doctitlemode?: Maybe<Scalars['Float']['output']>;
  equivcheckmode?: Maybe<Scalars['Float']['output']>;
  equivminusid?: Maybe<Scalars['Float']['output']>;
  equivmndsrid?: Maybe<Scalars['Float']['output']>;
  equivpldsrid?: Maybe<Scalars['Float']['output']>;
  equivplusid?: Maybe<Scalars['Float']['output']>;
  fpastatusdef?: Maybe<Scalars['Float']['output']>;
  geoiddef?: Maybe<Scalars['Float']['output']>;
  msg?: Maybe<Scalars['String']['output']>;
  npgiddef?: Maybe<Scalars['Float']['output']>;
  ocpiddef?: Maybe<Scalars['Float']['output']>;
  omodedef?: Maybe<Scalars['Float']['output']>;
  opencrdlimit?: Maybe<Scalars['Float']['output']>;
  paddchar?: Maybe<Scalars['String']['output']>;
  prciddef?: Maybe<Scalars['Float']['output']>;
  ptriddef?: Maybe<Scalars['Float']['output']>;
  reliabilitymess?: Maybe<Scalars['Float']['output']>;
  rlbiddef?: Maybe<Scalars['Float']['output']>;
  searchshowremain?: Maybe<Scalars['Float']['output']>;
  shviddef?: Maybe<Scalars['Float']['output']>;
  svdsrid?: Maybe<Scalars['Float']['output']>;
  taxfreeid?: Maybe<Scalars['Float']['output']>;
  title1?: Maybe<Scalars['String']['output']>;
  title2?: Maybe<Scalars['String']['output']>;
  title3?: Maybe<Scalars['String']['output']>;
  title4?: Maybe<Scalars['String']['output']>;
  title5?: Maybe<Scalars['String']['output']>;
  title6?: Maybe<Scalars['String']['output']>;
  title7?: Maybe<Scalars['String']['output']>;
  title8?: Maybe<Scalars['String']['output']>;
  title9?: Maybe<Scalars['String']['output']>;
  title10?: Maybe<Scalars['String']['output']>;
  title11?: Maybe<Scalars['String']['output']>;
  title12?: Maybe<Scalars['String']['output']>;
  title13?: Maybe<Scalars['String']['output']>;
  title14?: Maybe<Scalars['String']['output']>;
  title15?: Maybe<Scalars['String']['output']>;
  title16?: Maybe<Scalars['String']['output']>;
};

export type Custrespperson = {
  canmovetocrm?: Maybe<Scalars['Float']['output']>;
  conid?: Maybe<Scalars['Float']['output']>;
  consentdate?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  mobile?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  per?: Maybe<Customer>;
  privatephone?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
};

export type Custtradelines = {
  addid?: Maybe<Scalars['Float']['output']>;
  bntrnid?: Maybe<Scalars['String']['output']>;
  colidsalesman?: Maybe<Salesman>;
  comid?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  cus?: Maybe<Customer>;
  cusid?: Maybe<Scalars['Float']['output']>;
  diffexchval?: Maybe<Scalars['Float']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  ftrpaidid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  justification?: Maybe<Scalars['String']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  linevalue?: Maybe<Scalars['Float']['output']>;
  llinevalue?: Maybe<Scalars['Float']['output']>;
  perlinevalue?: Maybe<Scalars['Float']['output']>;
  perrate?: Maybe<Scalars['Float']['output']>;
  refcode?: Maybe<Scalars['String']['output']>;
  relfundslineid?: Maybe<Scalars['Float']['output']>;
  sodata?: Maybe<Scalars['String']['output']>;
  sorefstatus?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  ttrpaidid?: Maybe<Scalars['Float']['output']>;
};

export type Custtrntype = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  creditupd?: Maybe<Scalars['Float']['output']>;
  customertrans?: Maybe<Array<Customertrans>>;
  debitupd?: Maybe<Scalars['Float']['output']>;
  defaultjustification?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  finbankdoctypes?: Maybe<Array<Finbankdoctype>>;
  fincustdoctypes?: Maybe<Array<Fincustdoctype>>;
  fincustdoctypes2?: Maybe<Array<Fincustdoctype>>;
  flag5?: Maybe<Scalars['Float']['output']>;
  flag6?: Maybe<Scalars['Float']['output']>;
  flag7?: Maybe<Scalars['Float']['output']>;
  flag8?: Maybe<Scalars['Float']['output']>;
  flag9?: Maybe<Scalars['Float']['output']>;
  flag10?: Maybe<Scalars['Float']['output']>;
  flag11?: Maybe<Scalars['Float']['output']>;
  flag12?: Maybe<Scalars['Float']['output']>;
  flag13?: Maybe<Scalars['Float']['output']>;
  flag14?: Maybe<Scalars['Float']['output']>;
  flag15?: Maybe<Scalars['Float']['output']>;
  flag16?: Maybe<Scalars['Float']['output']>;
  flag17?: Maybe<Scalars['Float']['output']>;
  flag18?: Maybe<Scalars['Float']['output']>;
  flag19?: Maybe<Scalars['Float']['output']>;
  flag20?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  opening?: Maybe<Scalars['Float']['output']>;
  turnoverupd?: Maybe<Scalars['Float']['output']>;
  upddatemode?: Maybe<Scalars['Float']['output']>;
};

export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
};

export type Deliverytype = {
  code?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  suppliers?: Maybe<Array<Supplier>>;
};

export type Department = {
  assetorginfos?: Maybe<Array<Assetorginfo>>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
};

export type Depricedasset = {
  aadid?: Maybe<Scalars['Float']['output']>;
  assettradelines?: Maybe<Array<Assettradelines>>;
  assettrans?: Maybe<Array<Assettrans>>;
  ast?: Maybe<Asset>;
  astid?: Maybe<Scalars['Float']['output']>;
  braid?: Maybe<Scalars['Float']['output']>;
  ccoid?: Maybe<Scalars['Float']['output']>;
  cntid?: Maybe<Scalars['Float']['output']>;
  costfid?: Maybe<Scalars['Float']['output']>;
  curvalue?: Maybe<Scalars['Float']['output']>;
  deprdatefrom?: Maybe<Scalars['Date']['output']>;
  deprdateto?: Maybe<Scalars['Date']['output']>;
  depricablevalue?: Maybe<Scalars['Float']['output']>;
  deprinuse?: Maybe<Scalars['Float']['output']>;
  deprtrans?: Maybe<Array<Deprtrans>>;
  descr?: Maybe<Scalars['String']['output']>;
  diffdeprcoef?: Maybe<Scalars['Float']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  globalindividualassetid?: Maybe<Scalars['String']['output']>;
  globalreturnableassetid?: Maybe<Scalars['String']['output']>;
  iasdeprinuse?: Maybe<Scalars['Float']['output']>;
  iasremainvalue?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  initdate?: Maybe<Scalars['Date']['output']>;
  initqty?: Maybe<Scalars['Float']['output']>;
  inittrade?: Maybe<Scalars['String']['output']>;
  initvalue?: Maybe<Scalars['Float']['output']>;
  inputkind?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  isdepred?: Maybe<Scalars['Float']['output']>;
  isfiscal?: Maybe<Scalars['Float']['output']>;
  isias?: Maybe<Scalars['Float']['output']>;
  lexvalue?: Maybe<Scalars['Float']['output']>;
  mydatacharcat?: Maybe<Scalars['Float']['output']>;
  objvalue?: Maybe<Scalars['Float']['output']>;
  productiondpaid?: Maybe<Scalars['Float']['output']>;
  qty?: Maybe<Scalars['Float']['output']>;
  ratablevalue?: Maybe<Scalars['Float']['output']>;
  remainvalue?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
  tdcurvalue?: Maybe<Scalars['Float']['output']>;
  tddeprdatefrom?: Maybe<Scalars['Date']['output']>;
  tddeprdateto?: Maybe<Scalars['Date']['output']>;
  tddeprvalue?: Maybe<Scalars['Float']['output']>;
  tdundeprvalue1?: Maybe<Scalars['Float']['output']>;
  tdundeprvalue2?: Maybe<Scalars['Float']['output']>;
  undeprvalue1?: Maybe<Scalars['Float']['output']>;
  undeprvalue2?: Maybe<Scalars['Float']['output']>;
  undeprvalue3?: Maybe<Scalars['Float']['output']>;
  undeprvalue4?: Maybe<Scalars['Float']['output']>;
  undeprvalue5?: Maybe<Scalars['Float']['output']>;
  underproduction?: Maybe<Scalars['Float']['output']>;
  vtc?: Maybe<Vatcategory>;
};

export type Deprtrans = {
  ast?: Maybe<Asset>;
  astid?: Maybe<Scalars['Float']['output']>;
  atn?: Maybe<Assettrans>;
  atype?: Maybe<Scalars['Float']['output']>;
  calcdepr?: Maybe<Scalars['Float']['output']>;
  ccoid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  deprdatefrom?: Maybe<Scalars['Date']['output']>;
  deprdateto?: Maybe<Scalars['Date']['output']>;
  deprdays?: Maybe<Scalars['Float']['output']>;
  deprtype?: Maybe<Scalars['Float']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  dpa?: Maybe<Depricedasset>;
  dttype?: Maybe<Scalars['Float']['output']>;
  glupdated?: Maybe<Scalars['Float']['output']>;
  iasdiftrnvalue1?: Maybe<Scalars['Float']['output']>;
  iasdiftrnvalue2?: Maybe<Scalars['Float']['output']>;
  iastrndate?: Maybe<Scalars['Date']['output']>;
  iastrnvalue1?: Maybe<Scalars['Float']['output']>;
  iastrnvalue2?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  isopening?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['Float']['output']>;
  trndate?: Maybe<Scalars['Date']['output']>;
  trnvalue1?: Maybe<Scalars['Float']['output']>;
  trnvalue2?: Maybe<Scalars['Float']['output']>;
  trnvalue3?: Maybe<Scalars['Float']['output']>;
  trnvalue4?: Maybe<Scalars['Float']['output']>;
  trnvalue5?: Maybe<Scalars['Float']['output']>;
};

export type Detailitemqtys = {
  bincode?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  initqty1?: Maybe<Scalars['Float']['output']>;
  initqty2?: Maybe<Scalars['Float']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  parid?: Maybe<Scalars['Float']['output']>;
  primaryqty?: Maybe<Scalars['Float']['output']>;
  secondaryqty?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
};

export type Docforms = {
  accdatasource?: Maybe<Scalars['Float']['output']>;
  calcdocforms?: Maybe<Array<Calcdocforms>>;
  closeddocid?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  frmtype?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  internalstr?: Maybe<Scalars['String']['output']>;
  isbalance?: Maybe<Scalars['Float']['output']>;
  prevfyeid?: Maybe<Scalars['Float']['output']>;
  prtid?: Maybe<Scalars['Float']['output']>;
  prtid2?: Maybe<Scalars['Float']['output']>;
  uservardocforms?: Maybe<Array<Uservardocforms>>;
  uservardocformsmessages?: Maybe<Array<Uservardocformsmessages>>;
  vardocforms?: Maybe<Array<Vardocforms>>;
  vardocformslines?: Maybe<Array<Vardocformslines>>;
};

export type Docrel = {
  doc?: Maybe<Documents>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  masterid?: Maybe<Scalars['Float']['output']>;
};

export type Docseries = {
  accessrights?: Maybe<Scalars['String']['output']>;
  aldsrid?: Maybe<Scalars['Float']['output']>;
  autonumbering?: Maybe<Scalars['Float']['output']>;
  billkinds?: Maybe<Array<Billkind>>;
  branch?: Maybe<Branch>;
  calcfieldsum?: Maybe<Scalars['Float']['output']>;
  cedisabled?: Maybe<Scalars['Float']['output']>;
  checktradecode?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  codeprefix?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  contrdsrid?: Maybe<Scalars['Float']['output']>;
  defaultdrivername?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dlaid?: Maybe<Scalars['Float']['output']>;
  docseries?: Maybe<Docseries>;
  docseriesnumbers?: Maybe<Array<Docseriesnumber>>;
  doctypeid?: Maybe<Scalars['Float']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  drafttype?: Maybe<Scalars['Float']['output']>;
  dsridbankpmt?: Maybe<Scalars['Float']['output']>;
  dsridcashpmt?: Maybe<Scalars['Float']['output']>;
  dsridcnl?: Maybe<Scalars['Float']['output']>;
  dsridcredit?: Maybe<Scalars['Float']['output']>;
  dsridpmt?: Maybe<Scalars['Float']['output']>;
  einvoiceattachtype?: Maybe<Scalars['Float']['output']>;
  einvoicecansend?: Maybe<Scalars['Float']['output']>;
  einvoicecanstore?: Maybe<Scalars['Float']['output']>;
  einvoiceconfirm?: Maybe<Scalars['Float']['output']>;
  einvoicedrafttype?: Maybe<Scalars['Float']['output']>;
  einvoicedrivername?: Maybe<Scalars['String']['output']>;
  einvoicefrmallcomp?: Maybe<Scalars['Float']['output']>;
  einvoicefrmtype?: Maybe<Scalars['Float']['output']>;
  einvoicekind?: Maybe<Scalars['String']['output']>;
  einvoicenumofcopies?: Maybe<Scalars['Float']['output']>;
  einvoiceprint?: Maybe<Scalars['Float']['output']>;
  einvoiceprintformid?: Maybe<Scalars['Float']['output']>;
  einvoiceprtid?: Maybe<Scalars['Float']['output']>;
  einvoiceprtorientation?: Maybe<Scalars['Float']['output']>;
  einvoiceprttype?: Maybe<Scalars['Float']['output']>;
  einvoicetags?: Maybe<Scalars['String']['output']>;
  einvoiceupload?: Maybe<Scalars['Float']['output']>;
  einvoiceuploaddescr?: Maybe<Scalars['String']['output']>;
  fintrades?: Maybe<Array<Fintrade>>;
  frmallcomp?: Maybe<Scalars['Float']['output']>;
  frmtype?: Maybe<Scalars['Float']['output']>;
  fttid?: Maybe<Scalars['Float']['output']>;
  gldsrid?: Maybe<Scalars['Float']['output']>;
  glupdmode?: Maybe<Scalars['Float']['output']>;
  handmode?: Maybe<Scalars['Float']['output']>;
  insertoperation?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  isrequiredstore?: Maybe<Scalars['Float']['output']>;
  isrestricted?: Maybe<Scalars['Float']['output']>;
  labelbehaviour?: Maybe<Scalars['Float']['output']>;
  labelid?: Maybe<Scalars['Float']['output']>;
  labeltype?: Maybe<Scalars['Float']['output']>;
  lastusednumber?: Maybe<Scalars['Float']['output']>;
  locprintstatus?: Maybe<Scalars['Float']['output']>;
  mydatatradecodemode?: Maybe<Scalars['Float']['output']>;
  numberingmethod?: Maybe<Scalars['Float']['output']>;
  numofcopies?: Maybe<Scalars['Float']['output']>;
  prdcodeid?: Maybe<Scalars['Float']['output']>;
  printconfirm?: Maybe<Scalars['Float']['output']>;
  printingbehaviour?: Maybe<Scalars['Float']['output']>;
  prtid?: Maybe<Scalars['Float']['output']>;
  prtorientation?: Maybe<Scalars['Float']['output']>;
  prttype?: Maybe<Scalars['Float']['output']>;
  ptrid?: Maybe<Scalars['Float']['output']>;
  retailsernum?: Maybe<Scalars['String']['output']>;
  scriptcode?: Maybe<Scalars['Float']['output']>;
  scriptfunction?: Maybe<Scalars['String']['output']>;
  sendMydata?: Maybe<Scalars['Float']['output']>;
  sendemail?: Maybe<Scalars['Float']['output']>;
  shcid?: Maybe<Scalars['Float']['output']>;
  statusdef?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
  strictcancel?: Maybe<Scalars['Float']['output']>;
  strictpayment?: Maybe<Scalars['Float']['output']>;
  syndsrid?: Maybe<Scalars['Float']['output']>;
  tasid?: Maybe<Scalars['Float']['output']>;
  tasid2?: Maybe<Scalars['Float']['output']>;
  tasid3?: Maybe<Scalars['Float']['output']>;
  tasid4?: Maybe<Scalars['Float']['output']>;
  tradegenerate?: Maybe<Scalars['Float']['output']>;
  useintransform?: Maybe<Scalars['Float']['output']>;
};

export type Docseriesnumber = {
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  docseries?: Maybe<Docseries>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  lastusednumber?: Maybe<Scalars['Float']['output']>;
};

export type Documents = {
  dctid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  docdate?: Maybe<Scalars['Date']['output']>;
  docrels?: Maybe<Array<Docrel>>;
  doctype?: Maybe<Scalars['String']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  hasimage?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  isfolder?: Maybe<Scalars['Float']['output']>;
  iszip?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  masterid?: Maybe<Scalars['Float']['output']>;
  uploaddate?: Maybe<Scalars['Date']['output']>;
  uploaddescr?: Maybe<Scalars['String']['output']>;
};

export type Doy = {
  branches?: Maybe<Array<Branch>>;
  code?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  companies?: Maybe<Array<Company>>;
  contact?: Maybe<Scalars['String']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  newdoyid?: Maybe<Scalars['Float']['output']>;
  phone1?: Maybe<Scalars['String']['output']>;
  phone2?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  suppliers?: Maybe<Array<Supplier>>;
  sxaccountants?: Maybe<Array<Sxaccountant>>;
  sxaccountants2?: Maybe<Array<Sxaccountant>>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type Emailaccount = {
  companies?: Maybe<Array<Company>>;
  emailaddress?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  incomingfolders?: Maybe<Scalars['String']['output']>;
  insertdate?: Maybe<Scalars['Date']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  pusers?: Maybe<Array<Puser>>;
};

export type Equival = {
  cur?: Maybe<Currency>;
  curid?: Maybe<Scalars['Float']['output']>;
  curidref?: Maybe<Scalars['Float']['output']>;
  curidref2?: Maybe<Currency>;
  fixingrate?: Maybe<Scalars['Float']['output']>;
  purchaserate?: Maybe<Scalars['Float']['output']>;
  ratedate?: Maybe<Scalars['Date']['output']>;
  salesrate?: Maybe<Scalars['Float']['output']>;
};

export type Eurosystemck = {
  eshd?: Maybe<Eurosystemhd>;
  expression?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
};

export type Eurosystemdt = {
  checklength?: Maybe<Scalars['Float']['output']>;
  checktype?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  deallowed?: Maybe<Scalars['Float']['output']>;
  deinstructions?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  eshd?: Maybe<Eurosystemhd>;
  eshdid?: Maybe<Scalars['Float']['output']>;
  fldcheckvalue?: Maybe<Scalars['Float']['output']>;
  fldtype?: Maybe<Scalars['Float']['output']>;
  fldtype2Data?: Maybe<Scalars['String']['output']>;
  fldtype3Data?: Maybe<Scalars['Float']['output']>;
  fldtype4Data?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
};

export type Eurosystemhd = {
  category?: Maybe<Scalars['String']['output']>;
  categoryid?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  docformscodeid?: Maybe<Scalars['Float']['output']>;
  docformsdomaintype?: Maybe<Scalars['Float']['output']>;
  eurosystemcks?: Maybe<Array<Eurosystemck>>;
  eurosystemdts?: Maybe<Array<Eurosystemdt>>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  prevyearamounts?: Maybe<Scalars['Float']['output']>;
};

export type Eurosystemlistsdt = {
  code?: Maybe<Scalars['String']['output']>;
  deinstructions?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  eslihd?: Maybe<Eurosystemlistshd>;
  eslihdid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  timestamp?: Maybe<Scalars['Date']['output']>;
};

export type Eurosystemlistshd = {
  code?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  eurosystemlistsdts?: Maybe<Array<Eurosystemlistsdt>>;
  id: Scalars['Float']['output'];
  timestamp?: Maybe<Scalars['Date']['output']>;
};

export type Expensesanalysis = {
  cashexpense?: Maybe<Cashexpense>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  intsurvalue?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  reallvatvalue?: Maybe<Scalars['Float']['output']>;
  realvatvalue?: Maybe<Scalars['Float']['output']>;
  spsurcharges?: Maybe<Spsurcharges>;
  surlvalue?: Maybe<Scalars['Float']['output']>;
  surlvatvalue?: Maybe<Scalars['Float']['output']>;
  survalue?: Maybe<Scalars['Float']['output']>;
  survatvalue?: Maybe<Scalars['Float']['output']>;
  turnovermode?: Maybe<Scalars['Float']['output']>;
  vtcid?: Maybe<Scalars['Float']['output']>;
};

export type Finbankdoctype = {
  abcmask?: Maybe<Scalars['String']['output']>;
  abcmode?: Maybe<Scalars['Float']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  bankdlaid?: Maybe<Scalars['Float']['output']>;
  billdel?: Maybe<Scalars['Float']['output']>;
  bnktrntype?: Maybe<Bnktrntype>;
  calcdiffexch?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  createmultiplefintrans?: Maybe<Scalars['Float']['output']>;
  custtrntype?: Maybe<Custtrntype>;
  daysrange?: Maybe<Scalars['Float']['output']>;
  daytotals?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  fbtid?: Maybe<Scalars['Float']['output']>;
  foreigncurid?: Maybe<Scalars['Float']['output']>;
  glupdmode?: Maybe<Scalars['Float']['output']>;
  gusid?: Maybe<Scalars['Float']['output']>;
  gusidacc?: Maybe<Scalars['Float']['output']>;
  gusidcus?: Maybe<Scalars['Float']['output']>;
  gusidfin?: Maybe<Scalars['Float']['output']>;
  gusidsup?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  intrastatcode?: Maybe<Scalars['String']['output']>;
  involvessv?: Maybe<Scalars['Float']['output']>;
  ismydatafromacc?: Maybe<Scalars['Float']['output']>;
  mydatacode?: Maybe<Scalars['String']['output']>;
  mydatatype?: Maybe<Scalars['Float']['output']>;
  myfqtyupd?: Maybe<Scalars['Float']['output']>;
  myfvaltype?: Maybe<Scalars['Float']['output']>;
  myfvalupd?: Maybe<Scalars['Float']['output']>;
  needauthority?: Maybe<Scalars['Float']['output']>;
  openitemtype?: Maybe<Scalars['Float']['output']>;
  reversevalues?: Maybe<Scalars['Float']['output']>;
  selfpricing?: Maybe<Scalars['Float']['output']>;
  suptrntype?: Maybe<Suptrntype>;
  tnacode?: Maybe<Scalars['String']['output']>;
  valfndbnktrns?: Maybe<Array<Valfndbnktrn>>;
};

export type Fincustdoctype = {
  abcmask?: Maybe<Scalars['String']['output']>;
  abcmode?: Maybe<Scalars['Float']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  assetdlaid?: Maybe<Scalars['Float']['output']>;
  assettrntype?: Maybe<Assettrntype>;
  attsecid?: Maybe<Scalars['Float']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  autoserveorder?: Maybe<Scalars['Float']['output']>;
  backorderfields?: Maybe<Scalars['String']['output']>;
  backordermode?: Maybe<Scalars['Float']['output']>;
  backorderprosptied?: Maybe<Scalars['Float']['output']>;
  billdel?: Maybe<Scalars['Float']['output']>;
  billprospmode?: Maybe<Scalars['Float']['output']>;
  billtiedmode?: Maybe<Scalars['Float']['output']>;
  buscheckmode?: Maybe<Scalars['Float']['output']>;
  busid?: Maybe<Scalars['Float']['output']>;
  busttid?: Maybe<Scalars['Float']['output']>;
  calcdiffexch?: Maybe<Scalars['Float']['output']>;
  cancelexoflisi?: Maybe<Scalars['Float']['output']>;
  checkexclusivematerial?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  colorremainmode?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comdlaid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  commissionmode?: Maybe<Scalars['Float']['output']>;
  createmultiplefintrans?: Maybe<Scalars['Float']['output']>;
  creditmode?: Maybe<Scalars['Float']['output']>;
  custtrntype?: Maybe<Custtrntype>;
  custtrntype2?: Maybe<Custtrntype>;
  daysrange?: Maybe<Scalars['Float']['output']>;
  daytotals?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  discountmode?: Maybe<Scalars['Float']['output']>;
  einvoicekind?: Maybe<Scalars['String']['output']>;
  expensesmode?: Maybe<Scalars['Float']['output']>;
  forbidnegativevatvalue?: Maybe<Scalars['Float']['output']>;
  foreigncurid?: Maybe<Scalars['Float']['output']>;
  fullremainmode?: Maybe<Scalars['Float']['output']>;
  glupdmode?: Maybe<Scalars['Float']['output']>;
  gusid?: Maybe<Scalars['Float']['output']>;
  gusidasset?: Maybe<Scalars['Float']['output']>;
  gusidcsup?: Maybe<Scalars['Float']['output']>;
  gusidcus?: Maybe<Scalars['Float']['output']>;
  gusidsrc?: Maybe<Scalars['Float']['output']>;
  gusidstore?: Maybe<Scalars['Float']['output']>;
  handmodedocpacking?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  intcreditaccmask?: Maybe<Scalars['String']['output']>;
  intdebitaccmask?: Maybe<Scalars['String']['output']>;
  intrastatcode?: Maybe<Scalars['String']['output']>;
  involvessv?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  isforabroadsales?: Maybe<Scalars['Float']['output']>;
  isforretailstatistics?: Maybe<Scalars['Float']['output']>;
  ismydatafromacc?: Maybe<Scalars['Float']['output']>;
  keepbackorder?: Maybe<Scalars['Float']['output']>;
  kepyoqtyupd?: Maybe<Scalars['Float']['output']>;
  kepyovalupd?: Maybe<Scalars['Float']['output']>;
  lottranscode?: Maybe<Scalars['Float']['output']>;
  makelot?: Maybe<Scalars['Float']['output']>;
  makelotlines?: Maybe<Scalars['Float']['output']>;
  mattrntype?: Maybe<Mattrntype>;
  mattrntype2?: Maybe<Mattrntype>;
  mattrntype3?: Maybe<Mattrntype>;
  mattrntype4?: Maybe<Mattrntype>;
  mattrntype5?: Maybe<Mattrntype>;
  mydatacode?: Maybe<Scalars['String']['output']>;
  mydatatype?: Maybe<Scalars['Float']['output']>;
  myfqtyupd?: Maybe<Scalars['Float']['output']>;
  myfvaltype?: Maybe<Scalars['Float']['output']>;
  myfvalupd?: Maybe<Scalars['Float']['output']>;
  needauthority?: Maybe<Scalars['Float']['output']>;
  openitemtype?: Maybe<Scalars['Float']['output']>;
  parsellmodelines?: Maybe<Scalars['Float']['output']>;
  partitionmode?: Maybe<Scalars['Float']['output']>;
  pricemode?: Maybe<Scalars['Float']['output']>;
  proofofmovementdoc?: Maybe<Scalars['Float']['output']>;
  prospmode?: Maybe<Scalars['Float']['output']>;
  qtyinactivemode?: Maybe<Scalars['Float']['output']>;
  reversevalues?: Maybe<Scalars['Float']['output']>;
  selfpricing?: Maybe<Scalars['Float']['output']>;
  sernummode?: Maybe<Scalars['Float']['output']>;
  servicedlaid?: Maybe<Scalars['Float']['output']>;
  snqtymode?: Maybe<Scalars['Float']['output']>;
  specialinvoicecategory?: Maybe<Scalars['Float']['output']>;
  stockcheckaction?: Maybe<Scalars['Float']['output']>;
  stockcheckmode?: Maybe<Scalars['Float']['output']>;
  stockremainmode?: Maybe<Scalars['Float']['output']>;
  storedlaid?: Maybe<Scalars['Float']['output']>;
  storeprocname?: Maybe<Scalars['String']['output']>;
  suptrntype?: Maybe<Suptrntype>;
  taxfreemode?: Maybe<Scalars['Float']['output']>;
  thirdmode?: Maybe<Scalars['Float']['output']>;
  tiedmode?: Maybe<Scalars['Float']['output']>;
  tnacode?: Maybe<Scalars['String']['output']>;
  todelete?: Maybe<Scalars['Float']['output']>;
  transbillprosptied?: Maybe<Scalars['Float']['output']>;
  transcomp?: Maybe<Scalars['Float']['output']>;
  transcomponlyafterpost?: Maybe<Scalars['Float']['output']>;
  updatestatus?: Maybe<Scalars['Float']['output']>;
  valfndcusttrns?: Maybe<Array<Valfndcusttrn>>;
};

export type Finparams = {
  billexpireinclude?: Maybe<Scalars['Float']['output']>;
  checkdublicatebill?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  excludecancdocs?: Maybe<Scalars['Float']['output']>;
  idxcalcbalancetrndate?: Maybe<Scalars['Float']['output']>;
  mptautocalcbalance?: Maybe<Scalars['Float']['output']>;
  mptautoexcludebalance?: Maybe<Scalars['Float']['output']>;
  mptautoexcludecrdbalance?: Maybe<Scalars['Float']['output']>;
  mptstartdate?: Maybe<Scalars['Date']['output']>;
  useages?: Maybe<Scalars['Float']['output']>;
};

export type Finstoredoctype = {
  abcmask?: Maybe<Scalars['String']['output']>;
  abcmode?: Maybe<Scalars['Float']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  assetdlaid?: Maybe<Scalars['Float']['output']>;
  assettrntype?: Maybe<Assettrntype>;
  assettrntype2?: Maybe<Assettrntype>;
  atype?: Maybe<Scalars['Float']['output']>;
  billdel?: Maybe<Scalars['Float']['output']>;
  busttid?: Maybe<Scalars['Float']['output']>;
  busttsecid?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  colorremainmode?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  costoid?: Maybe<Scalars['Float']['output']>;
  createmultiplefintrans?: Maybe<Scalars['Float']['output']>;
  daysrange?: Maybe<Scalars['Float']['output']>;
  daytotals?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  einvoicekind?: Maybe<Scalars['String']['output']>;
  fbusttid?: Maybe<Scalars['Float']['output']>;
  foreigncurid?: Maybe<Scalars['Float']['output']>;
  fullremainmode?: Maybe<Scalars['Float']['output']>;
  glupdmode?: Maybe<Scalars['Float']['output']>;
  gusid?: Maybe<Scalars['Float']['output']>;
  gusidasset?: Maybe<Scalars['Float']['output']>;
  gusidcomp?: Maybe<Scalars['Float']['output']>;
  gusidstore?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  intrastatcode?: Maybe<Scalars['String']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  kepyoqtyupd?: Maybe<Scalars['Float']['output']>;
  kepyovalupd?: Maybe<Scalars['Float']['output']>;
  lottranscode?: Maybe<Scalars['Float']['output']>;
  makelot?: Maybe<Scalars['Float']['output']>;
  makelotlines?: Maybe<Scalars['Float']['output']>;
  mattrntype?: Maybe<Mattrntype>;
  mattrntype2?: Maybe<Mattrntype>;
  mattrntype3?: Maybe<Mattrntype>;
  mattrntype4?: Maybe<Mattrntype>;
  mattrntype5?: Maybe<Mattrntype>;
  mattrntype6?: Maybe<Mattrntype>;
  mydatacode?: Maybe<Scalars['String']['output']>;
  needauthority?: Maybe<Scalars['Float']['output']>;
  openitemtype?: Maybe<Scalars['Float']['output']>;
  parsellmode?: Maybe<Scalars['Float']['output']>;
  parsellmodelines?: Maybe<Scalars['Float']['output']>;
  partitionmode?: Maybe<Scalars['Float']['output']>;
  pricemode?: Maybe<Scalars['Float']['output']>;
  proofofmovementdoc?: Maybe<Scalars['Float']['output']>;
  prstoid?: Maybe<Scalars['Float']['output']>;
  reversevalues?: Maybe<Scalars['Float']['output']>;
  sernummode?: Maybe<Scalars['Float']['output']>;
  snapog?: Maybe<Scalars['Float']['output']>;
  snqtymode?: Maybe<Scalars['Float']['output']>;
  stockcheckaction?: Maybe<Scalars['Float']['output']>;
  stockcheckmode?: Maybe<Scalars['Float']['output']>;
  stockremainmode?: Maybe<Scalars['Float']['output']>;
  storedlaid?: Maybe<Scalars['Float']['output']>;
  storeprocname?: Maybe<Scalars['String']['output']>;
  taxfreemode?: Maybe<Scalars['Float']['output']>;
  thirdmode?: Maybe<Scalars['Float']['output']>;
  tnacode?: Maybe<Scalars['String']['output']>;
  transcomp?: Maybe<Scalars['Float']['output']>;
  transcomponlyafterpost?: Maybe<Scalars['Float']['output']>;
};

export type Finsupdoctype = {
  abcmask?: Maybe<Scalars['String']['output']>;
  abcmode?: Maybe<Scalars['Float']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  assetdlaid?: Maybe<Scalars['Float']['output']>;
  assettrntype?: Maybe<Assettrntype>;
  attsecid?: Maybe<Scalars['Float']['output']>;
  atype?: Maybe<Scalars['Float']['output']>;
  backorderfields?: Maybe<Scalars['String']['output']>;
  backordermode?: Maybe<Scalars['Float']['output']>;
  backorderprosptied?: Maybe<Scalars['Float']['output']>;
  billdel?: Maybe<Scalars['Float']['output']>;
  billprospmode?: Maybe<Scalars['Float']['output']>;
  billtiedmode?: Maybe<Scalars['Float']['output']>;
  buscheckmode?: Maybe<Scalars['Float']['output']>;
  busid?: Maybe<Scalars['Float']['output']>;
  busttid?: Maybe<Scalars['Float']['output']>;
  calcdiffexch?: Maybe<Scalars['Float']['output']>;
  cancelexoflisi?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  colorremainmode?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comdlaid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  createmultiplefintrans?: Maybe<Scalars['Float']['output']>;
  daysrange?: Maybe<Scalars['Float']['output']>;
  daytotals?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  disccreditlinevalinitcheck?: Maybe<Scalars['Float']['output']>;
  discountmode?: Maybe<Scalars['Float']['output']>;
  einvoicekind?: Maybe<Scalars['String']['output']>;
  expensesmode?: Maybe<Scalars['Float']['output']>;
  forbidnegativevatvalue?: Maybe<Scalars['Float']['output']>;
  foreigncurid?: Maybe<Scalars['Float']['output']>;
  fstid?: Maybe<Scalars['Float']['output']>;
  fullremainmode?: Maybe<Scalars['Float']['output']>;
  glupdmode?: Maybe<Scalars['Float']['output']>;
  gusid?: Maybe<Scalars['Float']['output']>;
  gusidasset?: Maybe<Scalars['Float']['output']>;
  gusidsrc?: Maybe<Scalars['Float']['output']>;
  gusidstore?: Maybe<Scalars['Float']['output']>;
  gusidsup?: Maybe<Scalars['Float']['output']>;
  handmodedocpacking?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  intcreditaccmask?: Maybe<Scalars['String']['output']>;
  intdebitaccmask?: Maybe<Scalars['String']['output']>;
  intrastatcode?: Maybe<Scalars['String']['output']>;
  involvessv?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  isforabroadpurchase?: Maybe<Scalars['Float']['output']>;
  isforretailstatistics?: Maybe<Scalars['Float']['output']>;
  ismydatafromacc?: Maybe<Scalars['Float']['output']>;
  keepbackorder?: Maybe<Scalars['Float']['output']>;
  kepyoqtyupd?: Maybe<Scalars['Float']['output']>;
  kepyovalupd?: Maybe<Scalars['Float']['output']>;
  lottranscode?: Maybe<Scalars['Float']['output']>;
  makelot?: Maybe<Scalars['Float']['output']>;
  makelotlines?: Maybe<Scalars['Float']['output']>;
  mattrntype?: Maybe<Mattrntype>;
  mattrntype2?: Maybe<Mattrntype>;
  mattrntype3?: Maybe<Mattrntype>;
  mattrntype4?: Maybe<Mattrntype>;
  mattrntype5?: Maybe<Mattrntype>;
  mydatacode?: Maybe<Scalars['String']['output']>;
  mydatatype?: Maybe<Scalars['Float']['output']>;
  myfqtyupd?: Maybe<Scalars['Float']['output']>;
  myfvaltype?: Maybe<Scalars['Float']['output']>;
  myfvalupd?: Maybe<Scalars['Float']['output']>;
  needauthority?: Maybe<Scalars['Float']['output']>;
  openitemtype?: Maybe<Scalars['Float']['output']>;
  parsellmodelines?: Maybe<Scalars['Float']['output']>;
  partitionmode?: Maybe<Scalars['Float']['output']>;
  pricemode?: Maybe<Scalars['Float']['output']>;
  proofofmovementdoc?: Maybe<Scalars['Float']['output']>;
  prospmode?: Maybe<Scalars['Float']['output']>;
  qtyinactivemode?: Maybe<Scalars['Float']['output']>;
  reversevalues?: Maybe<Scalars['Float']['output']>;
  selfpricing?: Maybe<Scalars['Float']['output']>;
  sernummode?: Maybe<Scalars['Float']['output']>;
  servicedlaid?: Maybe<Scalars['Float']['output']>;
  snqtymode?: Maybe<Scalars['Float']['output']>;
  stockcheckaction?: Maybe<Scalars['Float']['output']>;
  stockcheckmode?: Maybe<Scalars['Float']['output']>;
  stockremainmode?: Maybe<Scalars['Float']['output']>;
  storedlaid?: Maybe<Scalars['Float']['output']>;
  storeprocname?: Maybe<Scalars['String']['output']>;
  subcontract?: Maybe<Scalars['Float']['output']>;
  suppliersmode?: Maybe<Scalars['Float']['output']>;
  suptrntype?: Maybe<Suptrntype>;
  taxfreemode?: Maybe<Scalars['Float']['output']>;
  thirdmode?: Maybe<Scalars['Float']['output']>;
  tiedmode?: Maybe<Scalars['Float']['output']>;
  tnacode?: Maybe<Scalars['String']['output']>;
  todelete?: Maybe<Scalars['Float']['output']>;
  transbillprosptied?: Maybe<Scalars['Float']['output']>;
  transcomp?: Maybe<Scalars['Float']['output']>;
  transcomponlyafterpost?: Maybe<Scalars['Float']['output']>;
  updatestatus?: Maybe<Scalars['Float']['output']>;
  valfndsuptrns?: Maybe<Array<Valfndsuptrn>>;
};

export type Fintrade = {
  accmask?: Maybe<Scalars['String']['output']>;
  addid?: Maybe<Scalars['Float']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  approvaldate?: Maybe<Scalars['Date']['output']>;
  approvaluser?: Maybe<Scalars['Float']['output']>;
  approved?: Maybe<Scalars['Float']['output']>;
  assettradelines?: Maybe<Array<Assettradelines>>;
  assettrans?: Maybe<Array<Assettrans>>;
  atype?: Maybe<Scalars['Float']['output']>;
  banid?: Maybe<Scalars['Float']['output']>;
  bankacctrans?: Maybe<Array<Bankacctrans>>;
  banktradelines?: Maybe<Array<Banktradelines>>;
  batchid?: Maybe<Scalars['Float']['output']>;
  bna?: Maybe<Bankaccount>;
  bnaid?: Maybe<Scalars['Float']['output']>;
  bnkid?: Maybe<Scalars['Float']['output']>;
  branch?: Maybe<Branch>;
  busid?: Maybe<Scalars['Float']['output']>;
  carid?: Maybe<Scalars['Float']['output']>;
  cashamount?: Maybe<Scalars['Float']['output']>;
  ccoid?: Maybe<Scalars['Float']['output']>;
  cfoid?: Maybe<Scalars['Float']['output']>;
  colidsalesman?: Maybe<Salesman>;
  comid?: Maybe<Scalars['Float']['output']>;
  comtradelines?: Maybe<Array<Comtradelines>>;
  costmode?: Maybe<Scalars['Float']['output']>;
  crmactid?: Maybe<Scalars['Float']['output']>;
  cshid?: Maybe<Scalars['Float']['output']>;
  cstid?: Maybe<Scalars['Float']['output']>;
  cur?: Maybe<Currency>;
  cus?: Maybe<Customer>;
  cusid?: Maybe<Scalars['Float']['output']>;
  customertrans?: Maybe<Array<Customertrans>>;
  custtradelines?: Maybe<Array<Custtradelines>>;
  diffexchval?: Maybe<Scalars['Float']['output']>;
  docseries?: Maybe<Docseries>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  dsrid?: Maybe<Scalars['Float']['output']>;
  dsrnumber?: Maybe<Scalars['Float']['output']>;
  einvoiceid?: Maybe<Scalars['String']['output']>;
  einvoiceurl?: Maybe<Scalars['String']['output']>;
  expenses?: Maybe<Scalars['Float']['output']>;
  expensesanalyses?: Maybe<Array<Expensesanalysis>>;
  expiredate?: Maybe<Scalars['Date']['output']>;
  extravalue1?: Maybe<Scalars['Float']['output']>;
  extravalue2?: Maybe<Scalars['Float']['output']>;
  extravalue3?: Maybe<Scalars['Float']['output']>;
  extravalue4?: Maybe<Scalars['Float']['output']>;
  extseries?: Maybe<Scalars['String']['output']>;
  extseriesno?: Maybe<Scalars['Float']['output']>;
  fdtid?: Maybe<Scalars['Float']['output']>;
  fintransforms?: Maybe<Array<Fintransform>>;
  fldid?: Maybe<Scalars['Float']['output']>;
  fldtype?: Maybe<Scalars['Float']['output']>;
  fromeshop?: Maybe<Scalars['Float']['output']>;
  ftrdate?: Maybe<Scalars['Date']['output']>;
  ftridbankpayment?: Maybe<Scalars['Float']['output']>;
  ftridcancelling?: Maybe<Scalars['Float']['output']>;
  ftridcashpayment?: Maybe<Scalars['Float']['output']>;
  ftridpayment?: Maybe<Scalars['Float']['output']>;
  ftrpaytype?: Maybe<Scalars['Float']['output']>;
  ftrtime?: Maybe<Scalars['Date']['output']>;
  fttid?: Maybe<Scalars['Float']['output']>;
  fundtradelines?: Maybe<Array<Fundtradelines>>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  glupdated?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  involvessv?: Maybe<Scalars['Float']['output']>;
  iscancelled?: Maybe<Scalars['Float']['output']>;
  isprinted?: Maybe<Scalars['Float']['output']>;
  iteid?: Maybe<Scalars['Float']['output']>;
  itemtrans?: Maybe<Array<Itemtrans>>;
  justification?: Maybe<Scalars['String']['output']>;
  kepyoqtyupd?: Maybe<Scalars['Float']['output']>;
  kepyovalupd?: Maybe<Scalars['Float']['output']>;
  lamount?: Maybe<Scalars['Float']['output']>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  lastupddate?: Maybe<Scalars['Date']['output']>;
  lexpenses?: Maybe<Scalars['Float']['output']>;
  lkepyoamount?: Maybe<Scalars['Float']['output']>;
  localrate?: Maybe<Scalars['Float']['output']>;
  longlang?: Maybe<Scalars['String']['output']>;
  lturnover?: Maybe<Scalars['Float']['output']>;
  lvatamount?: Maybe<Scalars['Float']['output']>;
  mydatacode?: Maybe<Scalars['String']['output']>;
  mydatatype?: Maybe<Scalars['Float']['output']>;
  openamount?: Maybe<Scalars['Float']['output']>;
  openitemtype?: Maybe<Scalars['Float']['output']>;
  panTiresias?: Maybe<Scalars['String']['output']>;
  paymentagreements?: Maybe<Array<Paymentagreement>>;
  paymentterms?: Maybe<Paymentterms>;
  porid?: Maybe<Scalars['Float']['output']>;
  poststatus?: Maybe<Scalars['Float']['output']>;
  shipmentno?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  specialinvoicecategory?: Maybe<Scalars['Float']['output']>;
  staid?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  stoenddate?: Maybe<Scalars['Date']['output']>;
  storetrade?: Maybe<Storetrade>;
  storetradelines?: Maybe<Array<Storetradelines>>;
  sup?: Maybe<Supplier>;
  supid?: Maybe<Scalars['Float']['output']>;
  suppliertrans?: Maybe<Array<Suppliertrans>>;
  suptradelines?: Maybe<Array<Suptradelines>>;
  svftrid?: Maybe<Scalars['Float']['output']>;
  tamount?: Maybe<Scalars['Float']['output']>;
  taxqrcode?: Maybe<Scalars['String']['output']>;
  taxsignature?: Maybe<Scalars['String']['output']>;
  texpenses?: Maybe<Scalars['Float']['output']>;
  totamount?: Maybe<Scalars['Float']['output']>;
  totlamount?: Maybe<Scalars['Float']['output']>;
  tottamount?: Maybe<Scalars['Float']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  traderrate?: Maybe<Scalars['Float']['output']>;
  transmissionfailure?: Maybe<Scalars['Float']['output']>;
  tturnover?: Maybe<Scalars['Float']['output']>;
  turnover?: Maybe<Scalars['Float']['output']>;
  tvatamount?: Maybe<Scalars['Float']['output']>;
  ublacctransactionpartyid?: Maybe<Scalars['String']['output']>;
  ublcontractdocrefid?: Maybe<Scalars['String']['output']>;
  ublprojectrefid?: Maybe<Scalars['String']['output']>;
  ublprojectreftype?: Maybe<Scalars['Float']['output']>;
  updcount?: Maybe<Scalars['Float']['output']>;
  vatamount?: Maybe<Scalars['Float']['output']>;
  vatanalyses?: Maybe<Array<Vatanalysis>>;
  voipcallid?: Maybe<Scalars['Float']['output']>;
  voucherno?: Maybe<Scalars['String']['output']>;
  zDlvDTime?: Maybe<Scalars['String']['output']>;
  zDlvTerms?: Maybe<Scalars['String']['output']>;
  zPayTerms?: Maybe<Scalars['String']['output']>;
  zcflineid?: Maybe<Scalars['Float']['output']>;
  zcoid?: Maybe<Scalars['Float']['output']>;
  zextshape?: Maybe<Scalars['String']['output']>;
  zfinished?: Maybe<Scalars['Float']['output']>;
  zincomplete?: Maybe<Scalars['Float']['output']>;
  zintshape?: Maybe<Scalars['String']['output']>;
  zsourceftrid?: Maybe<Scalars['Float']['output']>;
  zspcid?: Maybe<Scalars['Float']['output']>;
  zunderproduction?: Maybe<Scalars['Float']['output']>;
};

export type FintradeSync = {
  approved?: Maybe<Scalars['Int']['output']>;
  arkhonmesuser?: Maybe<Scalars['String']['output']>;
  colidsalesman?: Maybe<Scalars['Int']['output']>;
  comid?: Maybe<Scalars['Int']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  cus?: Maybe<Customer>;
  cusid?: Maybe<Scalars['Int']['output']>;
  dsrid?: Maybe<Scalars['Int']['output']>;
  dsrnumber?: Maybe<Scalars['String']['output']>;
  fdtid?: Maybe<Scalars['Int']['output']>;
  ftrdate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  isPrinted?: Maybe<Scalars['Int']['output']>;
  isTemp?: Maybe<Scalars['Int']['output']>;
  isToLoad?: Maybe<Scalars['Int']['output']>;
  iscanceled?: Maybe<Scalars['Int']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  lastupdate?: Maybe<Scalars['Date']['output']>;
  nofcorrections?: Maybe<Scalars['Int']['output']>;
  salesman?: Maybe<Salesman>;
  salesmanoffice?: Maybe<Scalars['Int']['output']>;
  secJustification?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  status2?: Maybe<Scalars['Int']['output']>;
  supid?: Maybe<Scalars['Int']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  zfinished?: Maybe<Scalars['Int']['output']>;
  zincomplete?: Maybe<Scalars['Int']['output']>;
  zunderproduction?: Maybe<Scalars['Int']['output']>;
};

export type FintradeSyncFilterInput = {
  comid?: InputMaybe<IntFilter>;
  dsrnumber?: InputMaybe<Scalars['String']['input']>;
  ftrdate?: InputMaybe<DateFilter>;
  iscanceled?: InputMaybe<Scalars['Boolean']['input']>;
  tradecode?: InputMaybe<Scalars['String']['input']>;
};

export type FintradeSyncResponse = {
  nodes: Array<FintradeSync>;
  totalCount: Scalars['Int']['output'];
};

export type FintradeSyncSortField =
  | 'dsrnumber'
  | 'id'
  | 'tradecode';

export type FintradeSyncSortInput = {
  direction: SortOrder;
  field: FintradeSyncSortField;
};

export type Fintransform = {
  dest?: Maybe<Fintrade>;
  destdate?: Maybe<Scalars['Date']['output']>;
  destid?: Maybe<Scalars['Float']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  sourceid?: Maybe<Scalars['Float']['output']>;
  sourcetradecode?: Maybe<Scalars['String']['output']>;
};

export type Fiscperiod = {
  begindate?: Maybe<Scalars['Date']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  enddate?: Maybe<Scalars['Date']['output']>;
  fiscyear?: Maybe<Fiscyear>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  perno?: Maybe<Scalars['Float']['output']>;
  viesperiods?: Maybe<Array<Viesperiod>>;
  viesperiods2?: Maybe<Array<Viesperiod>>;
};

export type Fiscyear = {
  begindate?: Maybe<Scalars['Date']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  enddate?: Maybe<Scalars['Date']['output']>;
  fiscperiods?: Maybe<Array<Fiscperiod>>;
  isclosed?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Fundstrntype = {
  accmask?: Maybe<Scalars['String']['output']>;
  accmask2?: Maybe<Scalars['String']['output']>;
  balance?: Maybe<Scalars['Float']['output']>;
  bankcom?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  creditcard?: Maybe<Scalars['Float']['output']>;
  curid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  fundtradelines?: Maybe<Array<Fundtradelines>>;
  groupstr?: Maybe<Scalars['String']['output']>;
  huburl?: Maybe<Scalars['String']['output']>;
  instalments?: Maybe<Scalars['Float']['output']>;
  lbalance?: Maybe<Scalars['Float']['output']>;
  limdate?: Maybe<Scalars['Float']['output']>;
  paycardtype?: Maybe<Scalars['Float']['output']>;
  paydate?: Maybe<Scalars['Float']['output']>;
  valfndbnktrns?: Maybe<Array<Valfndbnktrn>>;
  valfndcusttrns?: Maybe<Array<Valfndcusttrn>>;
  valfndsuptrns?: Maybe<Array<Valfndsuptrn>>;
};

export type Fundtradelines = {
  billreplaceflag?: Maybe<Scalars['Float']['output']>;
  billtrntype?: Maybe<Billtrntype>;
  bll?: Maybe<Bill>;
  bllcode?: Maybe<Scalars['String']['output']>;
  bllid?: Maybe<Scalars['Float']['output']>;
  bntrnid?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  creditcardexpire?: Maybe<Scalars['String']['output']>;
  creditcardnum?: Maybe<Scalars['String']['output']>;
  creditcardowner?: Maybe<Scalars['String']['output']>;
  cur?: Maybe<Currency>;
  diffexchval?: Maybe<Scalars['Float']['output']>;
  duedate?: Maybe<Scalars['Date']['output']>;
  ecrdataresult?: Maybe<Scalars['String']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fundstrntype?: Maybe<Fundstrntype>;
  id: Scalars['Float']['output'];
  installments?: Maybe<Scalars['Float']['output']>;
  ispayed?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  linevalue?: Maybe<Scalars['Float']['output']>;
  llinevalue?: Maybe<Scalars['Float']['output']>;
  localrate?: Maybe<Scalars['Float']['output']>;
  onlinepayaction?: Maybe<Scalars['Float']['output']>;
  onlinepaybank?: Maybe<Scalars['String']['output']>;
  onlinepaycard?: Maybe<Scalars['String']['output']>;
  onlinepaycardexpiry?: Maybe<Scalars['Date']['output']>;
  onlinepaycardholder?: Maybe<Scalars['String']['output']>;
  onlinepaycardnumber?: Maybe<Scalars['String']['output']>;
  onlinepaydate?: Maybe<Scalars['Date']['output']>;
  onlinepayorder?: Maybe<Scalars['String']['output']>;
  onlinepayorderexpiry?: Maybe<Scalars['Date']['output']>;
  onlinepayreceiptno?: Maybe<Scalars['String']['output']>;
  onlinepayterminalcode?: Maybe<Scalars['String']['output']>;
  onlinepaytransaction?: Maybe<Scalars['String']['output']>;
  onlinetrnbank?: Maybe<Scalars['String']['output']>;
  onlinetrncard?: Maybe<Scalars['String']['output']>;
  packauth?: Maybe<Scalars['String']['output']>;
  packdate?: Maybe<Scalars['Date']['output']>;
  packnumber?: Maybe<Scalars['String']['output']>;
  porid?: Maybe<Scalars['Float']['output']>;
  posid?: Maybe<Scalars['Float']['output']>;
  providersinput?: Maybe<Scalars['String']['output']>;
  providerssignature?: Maybe<Scalars['String']['output']>;
  refcode?: Maybe<Scalars['String']['output']>;
  reldepositftrid?: Maybe<Scalars['Float']['output']>;
  relfundslineid?: Maybe<Scalars['Float']['output']>;
  signaturetype?: Maybe<Scalars['Float']['output']>;
  sodata?: Maybe<Scalars['String']['output']>;
  sorefstatus?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
  tlinevalue?: Maybe<Scalars['Float']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  traderdomaintype?: Maybe<Scalars['Float']['output']>;
  traderid?: Maybe<Scalars['Float']['output']>;
  traderrate?: Maybe<Scalars['Float']['output']>;
  transactionid?: Maybe<Scalars['String']['output']>;
  trndate?: Maybe<Scalars['Date']['output']>;
};

export type Geogrpos = {
  codeid?: Maybe<Scalars['Float']['output']>;
  coordinates?: Maybe<Scalars['String']['output']>;
  custaddresses?: Maybe<Array<Custaddress>>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  salesmen?: Maybe<Array<Salesman>>;
  storetrades?: Maybe<Array<Storetrade>>;
  strorder?: Maybe<Scalars['String']['output']>;
  strorder2?: Maybe<Scalars['String']['output']>;
  suppaddresses?: Maybe<Array<Suppaddress>>;
  suppliers?: Maybe<Array<Supplier>>;
};

export type Glitem = {
  abcmask?: Maybe<Scalars['String']['output']>;
  analpurchasecode?: Maybe<Scalars['String']['output']>;
  analsalescode?: Maybe<Scalars['String']['output']>;
  clevel?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  costingmode?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  glpurchasecode?: Maybe<Scalars['String']['output']>;
  glsalescode?: Maybe<Scalars['String']['output']>;
  materials?: Maybe<Array<Material>>;
  mydataclassificationsetupcode?: Maybe<Scalars['String']['output']>;
  prodcode?: Maybe<Scalars['String']['output']>;
  vatpurchasecode?: Maybe<Scalars['String']['output']>;
  vatsalescode?: Maybe<Scalars['String']['output']>;
};

export type Glparams = {
  accountpoint?: Maybe<Scalars['String']['output']>;
  accountsmask?: Maybe<Scalars['String']['output']>;
  acechange?: Maybe<Scalars['Float']['output']>;
  aldlpdsrid?: Maybe<Scalars['Float']['output']>;
  aldlpmode?: Maybe<Scalars['Float']['output']>;
  aldsrid?: Maybe<Scalars['Float']['output']>;
  almode?: Maybe<Scalars['Float']['output']>;
  calcprorata?: Maybe<Scalars['Float']['output']>;
  cashaccid?: Maybe<Scalars['Float']['output']>;
  checklimitacc?: Maybe<Scalars['Float']['output']>;
  checkunbalanced?: Maybe<Scalars['Float']['output']>;
  codecompons?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  cordsrid?: Maybe<Scalars['Float']['output']>;
  corotherdsrid?: Maybe<Scalars['Float']['output']>;
  daytotalsgroupkind?: Maybe<Scalars['Float']['output']>;
  delemptylines?: Maybe<Scalars['Float']['output']>;
  difdsrid?: Maybe<Scalars['Float']['output']>;
  ftrchange?: Maybe<Scalars['Float']['output']>;
  kfasacechange?: Maybe<Scalars['Float']['output']>;
  kfasacenumchange?: Maybe<Scalars['Float']['output']>;
  kfasautonumaccevent?: Maybe<Scalars['Float']['output']>;
  kfasftrchange?: Maybe<Scalars['Float']['output']>;
  maskperfyedata?: Maybe<Scalars['String']['output']>;
  modelsaccounts?: Maybe<Scalars['Float']['output']>;
  noonlineconnection?: Maybe<Scalars['Float']['output']>;
  onlineacctrn?: Maybe<Scalars['Float']['output']>;
  prvprorataperc?: Maybe<Scalars['Float']['output']>;
  purchspldsrid?: Maybe<Scalars['Float']['output']>;
  romCheckcdcount?: Maybe<Scalars['Float']['output']>;
  salesspldsrid?: Maybe<Scalars['Float']['output']>;
  usecommercialafm?: Maybe<Scalars['Float']['output']>;
};

export type Glupdaccevent = {
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  dsrid?: Maybe<Scalars['Float']['output']>;
  glupdacceventlines?: Maybe<Array<Glupdacceventlines>>;
  gusid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  justification?: Maybe<Scalars['String']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Glupdatestruct>;
};

export type Glupdacceventlines = {
  abcmask?: Maybe<Scalars['String']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  accmaskanal?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  gusid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  isanalysed?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Glupdaccevent>;
  updformula?: Maybe<Scalars['String']['output']>;
  updtype?: Maybe<Scalars['Float']['output']>;
};

export type Glupdatestruct = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  daytotals?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  glupdaccevents?: Maybe<Array<Glupdaccevent>>;
  id: Scalars['Float']['output'];
  shortcut?: Maybe<Scalars['String']['output']>;
};

export type Groupresource = {
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  presources?: Maybe<Array<Presource>>;
};

export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
};

export type IntInInput = {
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Itecolor = {
  clgid?: Maybe<Scalars['Float']['output']>;
  colorcode?: Maybe<Scalars['String']['output']>;
  colordescr?: Maybe<Scalars['String']['output']>;
  colorsizeqtys?: Maybe<Array<Colorsizeqtys>>;
  isactive?: Maybe<Scalars['Float']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  optcolordescr?: Maybe<Scalars['String']['output']>;
  optcolordescr2?: Maybe<Scalars['String']['output']>;
  ordernum?: Maybe<Scalars['Float']['output']>;
  sezonid?: Maybe<Scalars['Float']['output']>;
  storecolorsizes?: Maybe<Array<Storecolorsize>>;
};

export type ItecolorInactivelines = {
  colorcode?: Maybe<Scalars['String']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  sizenum?: Maybe<Scalars['Float']['output']>;
};

export type Itecolsizeprice = {
  colorcode?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  price1?: Maybe<Scalars['Float']['output']>;
  price2?: Maybe<Scalars['Float']['output']>;
  price3?: Maybe<Scalars['Float']['output']>;
  price4?: Maybe<Scalars['Float']['output']>;
  price5?: Maybe<Scalars['Float']['output']>;
  price6?: Maybe<Scalars['Float']['output']>;
  price7?: Maybe<Scalars['Float']['output']>;
  price8?: Maybe<Scalars['Float']['output']>;
  price9?: Maybe<Scalars['Float']['output']>;
  price10?: Maybe<Scalars['Float']['output']>;
  price11?: Maybe<Scalars['Float']['output']>;
  price12?: Maybe<Scalars['Float']['output']>;
  price13?: Maybe<Scalars['Float']['output']>;
  price14?: Maybe<Scalars['Float']['output']>;
  price15?: Maybe<Scalars['Float']['output']>;
  price16?: Maybe<Scalars['Float']['output']>;
  price17?: Maybe<Scalars['Float']['output']>;
  price18?: Maybe<Scalars['Float']['output']>;
  price19?: Maybe<Scalars['Float']['output']>;
  price20?: Maybe<Scalars['Float']['output']>;
  pricetype?: Maybe<Scalars['Float']['output']>;
  supid?: Maybe<Scalars['Float']['output']>;
};

export type Itembalancesheet = {
  avgremage?: Maybe<Scalars['Float']['output']>;
  avgstoretime?: Maybe<Scalars['Float']['output']>;
  billedinpqty?: Maybe<Scalars['Float']['output']>;
  billedoutqty?: Maybe<Scalars['Float']['output']>;
  calcdate?: Maybe<Scalars['Date']['output']>;
  calcdate2?: Maybe<Scalars['Date']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  consumptionqty?: Maybe<Scalars['Float']['output']>;
  consumptionvalue?: Maybe<Scalars['Float']['output']>;
  costaccingrvalue?: Maybe<Scalars['Float']['output']>;
  costacclbrvalue?: Maybe<Scalars['Float']['output']>;
  costaccvhdvalue?: Maybe<Scalars['Float']['output']>;
  costvalue?: Maybe<Scalars['Float']['output']>;
  exportprqty?: Maybe<Scalars['Float']['output']>;
  exportsecqty?: Maybe<Scalars['Float']['output']>;
  exportthirdqty?: Maybe<Scalars['Float']['output']>;
  exportvalue?: Maybe<Scalars['Float']['output']>;
  fifovalue?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  importprqty?: Maybe<Scalars['Float']['output']>;
  importsecqty?: Maybe<Scalars['Float']['output']>;
  importvalue?: Maybe<Scalars['Float']['output']>;
  ingredientvalue?: Maybe<Scalars['Float']['output']>;
  kmtvalue?: Maybe<Scalars['Float']['output']>;
  laborvalue?: Maybe<Scalars['Float']['output']>;
  lifovalue?: Maybe<Scalars['Float']['output']>;
  master?: Maybe<Material>;
  masterid?: Maybe<Scalars['Float']['output']>;
  overheadvalue?: Maybe<Scalars['Float']['output']>;
  productionqty?: Maybe<Scalars['Float']['output']>;
  productionvalue?: Maybe<Scalars['Float']['output']>;
  purchasesqty?: Maybe<Scalars['Float']['output']>;
  purchasesvalue?: Maybe<Scalars['Float']['output']>;
  salescost?: Maybe<Scalars['Float']['output']>;
  salesqty?: Maybe<Scalars['Float']['output']>;
  salesvalue?: Maybe<Scalars['Float']['output']>;
  taxfreeqty?: Maybe<Scalars['Float']['output']>;
  thirdqty?: Maybe<Scalars['Float']['output']>;
  trspeed?: Maybe<Scalars['Float']['output']>;
  value1?: Maybe<Scalars['Float']['output']>;
  value2?: Maybe<Scalars['Float']['output']>;
  value3?: Maybe<Scalars['Float']['output']>;
  value4?: Maybe<Scalars['Float']['output']>;
  value5?: Maybe<Scalars['Float']['output']>;
  value6?: Maybe<Scalars['Float']['output']>;
  value7?: Maybe<Scalars['Float']['output']>;
  value8?: Maybe<Scalars['Float']['output']>;
  value9?: Maybe<Scalars['Float']['output']>;
  value10?: Maybe<Scalars['Float']['output']>;
  value11?: Maybe<Scalars['Float']['output']>;
  value12?: Maybe<Scalars['Float']['output']>;
  value13?: Maybe<Scalars['Float']['output']>;
  value14?: Maybe<Scalars['Float']['output']>;
  value15?: Maybe<Scalars['Float']['output']>;
  value16?: Maybe<Scalars['Float']['output']>;
};

export type Itemcategory = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  consprc?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  materials?: Maybe<Array<Material>>;
  relid?: Maybe<Scalars['Float']['output']>;
  strorder?: Maybe<Scalars['String']['output']>;
  touchorder?: Maybe<Scalars['Float']['output']>;
};

export type Itemfindata = {
  avgremage?: Maybe<Scalars['Float']['output']>;
  avgstoretime?: Maybe<Scalars['Float']['output']>;
  calcdate?: Maybe<Scalars['Date']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  costvalue?: Maybe<Scalars['Float']['output']>;
  fifovalue?: Maybe<Scalars['Float']['output']>;
  kmtvalue?: Maybe<Scalars['Float']['output']>;
  lifovalue?: Maybe<Scalars['Float']['output']>;
  master?: Maybe<Material>;
  masterid?: Maybe<Scalars['Float']['output']>;
  trspeed?: Maybe<Scalars['Float']['output']>;
  value1?: Maybe<Scalars['Float']['output']>;
  value2?: Maybe<Scalars['Float']['output']>;
  value3?: Maybe<Scalars['Float']['output']>;
  value4?: Maybe<Scalars['Float']['output']>;
  value5?: Maybe<Scalars['Float']['output']>;
  value6?: Maybe<Scalars['Float']['output']>;
  value7?: Maybe<Scalars['Float']['output']>;
  value8?: Maybe<Scalars['Float']['output']>;
  value9?: Maybe<Scalars['Float']['output']>;
  value10?: Maybe<Scalars['Float']['output']>;
  value11?: Maybe<Scalars['Float']['output']>;
  value12?: Maybe<Scalars['Float']['output']>;
  value13?: Maybe<Scalars['Float']['output']>;
  value14?: Maybe<Scalars['Float']['output']>;
  value15?: Maybe<Scalars['Float']['output']>;
  value16?: Maybe<Scalars['Float']['output']>;
};

export type Itemgroup = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  materials?: Maybe<Array<Material>>;
  relid?: Maybe<Scalars['Float']['output']>;
  strorder?: Maybe<Scalars['String']['output']>;
  touchorder?: Maybe<Scalars['Float']['output']>;
};

export type Itemhist = {
  codedate?: Maybe<Scalars['Date']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  itemcode?: Maybe<Scalars['String']['output']>;
};

export type Itemqtycommision = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  materials?: Maybe<Array<Material>>;
};

export type Itemsup = {
  aggreeddeldays?: Maybe<Scalars['Float']['output']>;
  aggreedprice?: Maybe<Scalars['Float']['output']>;
  codedate?: Maybe<Scalars['Date']['output']>;
  discount1?: Maybe<Scalars['Float']['output']>;
  discount2?: Maybe<Scalars['Float']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  itsuphists?: Maybe<Array<Itsuphist>>;
  lastbuysupprice?: Maybe<Scalars['Float']['output']>;
  lastbuysuppriceupdate?: Maybe<Scalars['Date']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  spcid?: Maybe<Scalars['Float']['output']>;
  sup?: Maybe<Supplier>;
  supclass?: Maybe<Scalars['Float']['output']>;
  supcolor?: Maybe<Scalars['String']['output']>;
  supid?: Maybe<Scalars['Float']['output']>;
  supitecode?: Maybe<Scalars['String']['output']>;
  supitedescr?: Maybe<Scalars['String']['output']>;
  supsize?: Maybe<Scalars['String']['output']>;
};

export type Itemtrans = {
  billedinput?: Maybe<Scalars['Float']['output']>;
  billedoutput?: Maybe<Scalars['Float']['output']>;
  bincode?: Maybe<Scalars['String']['output']>;
  braid?: Maybe<Scalars['Float']['output']>;
  busid?: Maybe<Scalars['Float']['output']>;
  buymode?: Maybe<Scalars['Float']['output']>;
  buysupmode?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  curid?: Maybe<Scalars['Float']['output']>;
  doccode?: Maybe<Scalars['String']['output']>;
  fdtid?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  flag1?: Maybe<Scalars['Float']['output']>;
  flag2?: Maybe<Scalars['Float']['output']>;
  flag3?: Maybe<Scalars['Float']['output']>;
  flag4?: Maybe<Scalars['Float']['output']>;
  flag5?: Maybe<Scalars['Float']['output']>;
  flag6?: Maybe<Scalars['Float']['output']>;
  flag7?: Maybe<Scalars['Float']['output']>;
  flag8?: Maybe<Scalars['Float']['output']>;
  flag9?: Maybe<Scalars['Float']['output']>;
  flag10?: Maybe<Scalars['Float']['output']>;
  flag11?: Maybe<Scalars['Float']['output']>;
  flag12?: Maybe<Scalars['Float']['output']>;
  flag13?: Maybe<Scalars['Float']['output']>;
  flag14?: Maybe<Scalars['Float']['output']>;
  flag15?: Maybe<Scalars['Float']['output']>;
  flag16?: Maybe<Scalars['Float']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  inputquantmode?: Maybe<Scalars['Float']['output']>;
  inputvalmode?: Maybe<Scalars['Float']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  lexvalue?: Maybe<Scalars['Float']['output']>;
  lotifyupddate?: Maybe<Scalars['Date']['output']>;
  ltrnvalue?: Maybe<Scalars['Float']['output']>;
  mattrntype?: Maybe<Mattrntype>;
  muid?: Maybe<Scalars['Float']['output']>;
  opening?: Maybe<Scalars['Float']['output']>;
  otherapog?: Maybe<Scalars['Float']['output']>;
  outputquantmode?: Maybe<Scalars['Float']['output']>;
  outputthirdmode?: Maybe<Scalars['Float']['output']>;
  outputvalmode?: Maybe<Scalars['Float']['output']>;
  parid?: Maybe<Scalars['Float']['output']>;
  perdomain?: Maybe<Scalars['Float']['output']>;
  perid?: Maybe<Scalars['Float']['output']>;
  primaryqty?: Maybe<Scalars['Float']['output']>;
  prodcostmode?: Maybe<Scalars['Float']['output']>;
  prospmode?: Maybe<Scalars['Float']['output']>;
  qty?: Maybe<Scalars['Float']['output']>;
  salescostmode?: Maybe<Scalars['Float']['output']>;
  secondaryqty?: Maybe<Scalars['Float']['output']>;
  sellmode?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  stlid?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
  tiedmode?: Maybe<Scalars['Float']['output']>;
  tnacode?: Maybe<Scalars['String']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  trndate?: Maybe<Scalars['Date']['output']>;
  trnvalue?: Maybe<Scalars['Float']['output']>;
  updmode?: Maybe<Scalars['Float']['output']>;
  updtaxfree?: Maybe<Scalars['Float']['output']>;
  updthird?: Maybe<Scalars['Float']['output']>;
};

export type Itemtransest = {
  braid?: Maybe<Scalars['Float']['output']>;
  busid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  estdate?: Maybe<Scalars['Date']['output']>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  muid?: Maybe<Scalars['Float']['output']>;
  parid?: Maybe<Scalars['Float']['output']>;
  perid?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  primaryqty?: Maybe<Scalars['Float']['output']>;
  prospmode?: Maybe<Scalars['Float']['output']>;
  qty?: Maybe<Scalars['Float']['output']>;
  secondaryqty?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  stlid?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
  tiedmode?: Maybe<Scalars['Float']['output']>;
  trndate?: Maybe<Scalars['Date']['output']>;
};

export type Itsuphist = {
  codedate?: Maybe<Scalars['Date']['output']>;
  iteid?: Maybe<Scalars['Float']['output']>;
  itemsup?: Maybe<Itemsup>;
  supid?: Maybe<Scalars['Float']['output']>;
  supitecode?: Maybe<Scalars['String']['output']>;
};

export type Journal = {
  acceventtypes?: Maybe<Array<Acceventtype>>;
  accountevents?: Maybe<Array<Accountevent>>;
  atype?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  istd?: Maybe<Scalars['Float']['output']>;
  kbsdays?: Maybe<Scalars['Float']['output']>;
  lastdate?: Maybe<Scalars['Date']['output']>;
  lastpage?: Maybe<Scalars['Float']['output']>;
  lastprintdate?: Maybe<Scalars['Date']['output']>;
  lasttransnumber?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type KadactivityCategory = {
  accounts?: Maybe<Array<Account>>;
  codeid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
};

export type KadfinCategory = {
  accounts?: Maybe<Array<Account>>;
  balupdmode?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  kadactivityCategories?: Maybe<Scalars['String']['output']>;
};

export type Lbdata = {
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  countf?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  lbprinter?: Maybe<Scalars['String']['output']>;
  lbshapes?: Maybe<Lbshapes>;
  lbtype?: Maybe<Scalars['Float']['output']>;
  prtcharset?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['Float']['output']>;
};

export type Lbshapes = {
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  hnum?: Maybe<Scalars['Float']['output']>;
  hpitch?: Maybe<Scalars['Float']['output']>;
  lbdata?: Maybe<Array<Lbdata>>;
  leftmarg?: Maybe<Scalars['Float']['output']>;
  munit?: Maybe<Scalars['Float']['output']>;
  orientation?: Maybe<Scalars['Float']['output']>;
  topmarg?: Maybe<Scalars['Float']['output']>;
  vnum?: Maybe<Scalars['Float']['output']>;
  vpitch?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type Lgtaxcategory = {
  accounts?: Maybe<Array<Account>>;
  codeid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  grplevel?: Maybe<Scalars['Float']['output']>;
};

export type Location = {
  atlaid?: Maybe<Scalars['Int']['output']>;
  atlaname?: Maybe<Scalars['String']['output']>;
  coils?: Maybe<Array<Coils>>;
  comid?: Maybe<Scalars['Int']['output']>;
  locationId: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  shortname?: Maybe<Scalars['String']['output']>;
  usersLocationAccess?: Maybe<Array<UsersLocationAccess>>;
  whgroup?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type LoginResponse = {
  accessToken: Scalars['String']['output'];
};

export type Masterlength = {
  code: Scalars['String']['output'];
  createDate?: Maybe<Scalars['Date']['output']>;
  finishDateDatetime?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  offtimeduration?: Maybe<Scalars['Float']['output']>;
  offtimeenddate?: Maybe<Scalars['Date']['output']>;
  offtimestartdate?: Maybe<Scalars['Date']['output']>;
  panelSpeed?: Maybe<PanelSpeeds>;
  pauseduration?: Maybe<Scalars['Float']['output']>;
  pauseenddate?: Maybe<Scalars['Date']['output']>;
  pausestartdate?: Maybe<Scalars['Date']['output']>;
  pporderno: Scalars['String']['output'];
  previd?: Maybe<Scalars['Int']['output']>;
  prevpanelcode?: Maybe<Scalars['String']['output']>;
  startDateDatetime?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  totalMeter?: Maybe<Scalars['Float']['output']>;
};

export type MasterlengthFilterInput = {
  lastDays?: InputMaybe<Scalars['Int']['input']>;
  pporderno?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Material = {
  abcddid?: Maybe<Scalars['Float']['output']>;
  abcmask?: Maybe<Scalars['String']['output']>;
  addonprc?: Maybe<Scalars['Float']['output']>;
  allowtrade?: Maybe<Scalars['Float']['output']>;
  analpurchasecode?: Maybe<Scalars['String']['output']>;
  analsalescode?: Maybe<Scalars['String']['output']>;
  autoprod?: Maybe<Scalars['Float']['output']>;
  autosyn?: Maybe<Scalars['Float']['output']>;
  backorderqtymode?: Maybe<Scalars['Float']['output']>;
  bincode?: Maybe<Scalars['String']['output']>;
  busid?: Maybe<Scalars['Float']['output']>;
  bustype?: Maybe<Scalars['Float']['output']>;
  buycomqty?: Maybe<Scalars['Float']['output']>;
  clevel?: Maybe<Scalars['Float']['output']>;
  cmpqty?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  composition?: Maybe<Scalars['String']['output']>;
  compositions?: Maybe<Array<Composition>>;
  compositions2?: Maybe<Array<Composition>>;
  costingmode?: Maybe<Scalars['Float']['output']>;
  countryoforigin?: Maybe<Scalars['Float']['output']>;
  cpvcategory?: Maybe<Scalars['String']['output']>;
  crmcatid?: Maybe<Scalars['Float']['output']>;
  cur?: Maybe<Currency>;
  defaultdiscount?: Maybe<Scalars['Float']['output']>;
  descr2?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  detailitemqtys?: Maybe<Array<Detailitemqtys>>;
  dim1?: Maybe<Scalars['Float']['output']>;
  dim2?: Maybe<Scalars['Float']['output']>;
  dim3?: Maybe<Scalars['Float']['output']>;
  dimmode?: Maybe<Scalars['Float']['output']>;
  dimmultmode?: Maybe<Scalars['Float']['output']>;
  discountoption?: Maybe<Scalars['Float']['output']>;
  ecomavailable?: Maybe<Scalars['Float']['output']>;
  endstock?: Maybe<Scalars['Float']['output']>;
  entrydate?: Maybe<Scalars['Date']['output']>;
  exclusiv?: Maybe<Scalars['Float']['output']>;
  expvalue1?: Maybe<Scalars['Float']['output']>;
  expvalue2?: Maybe<Scalars['Float']['output']>;
  expvalue3?: Maybe<Scalars['Float']['output']>;
  expvalue4?: Maybe<Scalars['Float']['output']>;
  expvalue5?: Maybe<Scalars['Float']['output']>;
  factorycode?: Maybe<Scalars['String']['output']>;
  flddate1?: Maybe<Scalars['Date']['output']>;
  flddate2?: Maybe<Scalars['Date']['output']>;
  flddate3?: Maybe<Scalars['Date']['output']>;
  fldfloat1?: Maybe<Scalars['Float']['output']>;
  fldfloat2?: Maybe<Scalars['Float']['output']>;
  fldfloat3?: Maybe<Scalars['Float']['output']>;
  fldfloat4?: Maybe<Scalars['Float']['output']>;
  fldfloat5?: Maybe<Scalars['Float']['output']>;
  fldfloat6?: Maybe<Scalars['Float']['output']>;
  fldstring1?: Maybe<Scalars['String']['output']>;
  fldstring2?: Maybe<Scalars['String']['output']>;
  fldstring3?: Maybe<Scalars['String']['output']>;
  fldstring4?: Maybe<Scalars['String']['output']>;
  fldstring5?: Maybe<Scalars['String']['output']>;
  fldstring6?: Maybe<Scalars['String']['output']>;
  fltid1?: Maybe<Scalars['Float']['output']>;
  fltid2?: Maybe<Scalars['Float']['output']>;
  fltid3?: Maybe<Scalars['Float']['output']>;
  frtlprice?: Maybe<Scalars['Float']['output']>;
  fuel?: Maybe<Scalars['Float']['output']>;
  fuelqtymode?: Maybe<Scalars['Float']['output']>;
  fwhsprice?: Maybe<Scalars['Float']['output']>;
  glitem?: Maybe<Glitem>;
  glpurchasecode?: Maybe<Scalars['String']['output']>;
  glsalescode?: Maybe<Scalars['String']['output']>;
  guriteid?: Maybe<Scalars['Float']['output']>;
  hasEan13?: Maybe<Scalars['Float']['output']>;
  hasspec?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  igsid?: Maybe<Scalars['Float']['output']>;
  igtid?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  isactivecrm?: Maybe<Scalars['Float']['output']>;
  isalchol?: Maybe<Scalars['Float']['output']>;
  isgift?: Maybe<Scalars['Float']['output']>;
  ispesticide?: Maybe<Scalars['Float']['output']>;
  itecolorInactivelines?: Maybe<Array<ItecolorInactivelines>>;
  itecolors?: Maybe<Array<Itecolor>>;
  itecolsizeprices?: Maybe<Array<Itecolsizeprice>>;
  itembalancesheets?: Maybe<Array<Itembalancesheet>>;
  itemcategory?: Maybe<Itemcategory>;
  itemfindata?: Maybe<Array<Itemfindata>>;
  itemgroup?: Maybe<Itemgroup>;
  itemhists?: Maybe<Array<Itemhist>>;
  itemqtycommision?: Maybe<Itemqtycommision>;
  itemsups?: Maybe<Array<Itemsup>>;
  itemtrans?: Maybe<Array<Itemtrans>>;
  itemtransests?: Maybe<Array<Itemtransest>>;
  itemtype?: Maybe<Scalars['Float']['output']>;
  kadid?: Maybe<Scalars['Float']['output']>;
  kepyo?: Maybe<Scalars['Float']['output']>;
  lastbuyprice?: Maybe<Scalars['Float']['output']>;
  lastbuypriceupdate?: Maybe<Scalars['Date']['output']>;
  lastchangepriceupdate?: Maybe<Scalars['Date']['output']>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  lastupddate?: Maybe<Scalars['Date']['output']>;
  lastupddatetime?: Maybe<Scalars['Date']['output']>;
  legaldescription?: Maybe<Scalars['String']['output']>;
  lotperiod?: Maybe<Scalars['Float']['output']>;
  materials?: Maybe<Array<Material>>;
  materials2?: Maybe<Array<Material>>;
  matpricecategory?: Maybe<Matpricecategory>;
  maxdiscount?: Maybe<Scalars['Float']['output']>;
  minlotqty?: Maybe<Scalars['Float']['output']>;
  mnfid?: Maybe<Scalars['Float']['output']>;
  mrpflag?: Maybe<Scalars['Float']['output']>;
  mrppartitiontype?: Maybe<Scalars['Float']['output']>;
  mrpplancode?: Maybe<Scalars['Float']['output']>;
  mtrmode?: Maybe<Scalars['Float']['output']>;
  mu?: Maybe<Mesunit>;
  mu1Formulamode?: Maybe<Scalars['Float']['output']>;
  mu1_2Mode?: Maybe<Scalars['Float']['output']>;
  mu1_3Mode?: Maybe<Scalars['Float']['output']>;
  mu1_4Mode?: Maybe<Scalars['Float']['output']>;
  mu1_5Mode?: Maybe<Scalars['Float']['output']>;
  mu2?: Maybe<Mesunit>;
  mu2_1?: Maybe<Scalars['Float']['output']>;
  mu3?: Maybe<Mesunit>;
  mu3_1?: Maybe<Scalars['Float']['output']>;
  mu4?: Maybe<Mesunit>;
  mu4_1?: Maybe<Scalars['Float']['output']>;
  mu5?: Maybe<Scalars['Float']['output']>;
  mu5_1?: Maybe<Scalars['Float']['output']>;
  muint_1?: Maybe<Scalars['Float']['output']>;
  mumode?: Maybe<Scalars['Float']['output']>;
  mydataclassificationother?: Maybe<Scalars['Float']['output']>;
  mydataclassificationsetupcode?: Maybe<Scalars['String']['output']>;
  notactive?: Maybe<Scalars['Float']['output']>;
  notnative?: Maybe<Scalars['Float']['output']>;
  onorder?: Maybe<Scalars['Float']['output']>;
  orderdates?: Maybe<Scalars['String']['output']>;
  orderdays?: Maybe<Scalars['Float']['output']>;
  partitions?: Maybe<Array<Partition>>;
  pestcauseid?: Maybe<Scalars['Float']['output']>;
  pestcropid?: Maybe<Scalars['Float']['output']>;
  pestdrastikiid?: Maybe<Scalars['Float']['output']>;
  pestdrugid?: Maybe<Scalars['Float']['output']>;
  pestpackcontent?: Maybe<Scalars['Float']['output']>;
  pestunitid?: Maybe<Scalars['Float']['output']>;
  prodcode?: Maybe<Scalars['String']['output']>;
  proddayesbeforeparexpireddate?: Maybe<Scalars['Float']['output']>;
  prodtypecheck?: Maybe<Scalars['Float']['output']>;
  prqtyformula?: Maybe<Scalars['String']['output']>;
  purcurid?: Maybe<Scalars['Float']['output']>;
  purdaysbeforeparexpireddate?: Maybe<Scalars['Float']['output']>;
  purprice?: Maybe<Scalars['Float']['output']>;
  purtypecheck?: Maybe<Scalars['Float']['output']>;
  qtyfromvalue?: Maybe<Scalars['Float']['output']>;
  recomqty?: Maybe<Scalars['Float']['output']>;
  relite?: Maybe<Material>;
  remarks?: Maybe<Scalars['String']['output']>;
  reorderlimit?: Maybe<Scalars['Float']['output']>;
  replacechain?: Maybe<Scalars['Float']['output']>;
  replaced?: Maybe<Scalars['Float']['output']>;
  replacevalue?: Maybe<Scalars['Float']['output']>;
  rtlmarkup?: Maybe<Scalars['Float']['output']>;
  rtlprice?: Maybe<Scalars['Float']['output']>;
  salesdaysbeforeparexpireddate?: Maybe<Scalars['Float']['output']>;
  salesparams?: Maybe<Array<Salesparams>>;
  saltypecheck?: Maybe<Scalars['Float']['output']>;
  seclimitmax?: Maybe<Scalars['Float']['output']>;
  seclimitmin?: Maybe<Scalars['Float']['output']>;
  setsautobuy?: Maybe<Scalars['Float']['output']>;
  setsautosell?: Maybe<Scalars['Float']['output']>;
  setsautostore?: Maybe<Scalars['Float']['output']>;
  setsbuymode?: Maybe<Scalars['Float']['output']>;
  setsprbuymode?: Maybe<Scalars['Float']['output']>;
  setsprsellmode?: Maybe<Scalars['Float']['output']>;
  setsprstoremode?: Maybe<Scalars['Float']['output']>;
  setssellmode?: Maybe<Scalars['Float']['output']>;
  setsstoremode?: Maybe<Scalars['Float']['output']>;
  sizelist?: Maybe<Sizelist>;
  sizelist2?: Maybe<Sizelist>;
  sizelist3?: Maybe<Sizelist>;
  sncodemask?: Maybe<Scalars['String']['output']>;
  speccolorsizes?: Maybe<Array<Speccolorsize>>;
  speccolorsizes2?: Maybe<Array<Speccolorsize>>;
  speccolorsizes3?: Maybe<Array<Speccolorsize>>;
  specialvatstatus?: Maybe<Scalars['Float']['output']>;
  specificationlines?: Maybe<Array<Specificationlines>>;
  specifications?: Maybe<Array<Specification>>;
  spsurcharges?: Maybe<Spsurcharges>;
  spsurcharges2?: Maybe<Spsurcharges>;
  spsurcharges3?: Maybe<Spsurcharges>;
  spsurcharges4?: Maybe<Spsurcharges>;
  spsurcharges5?: Maybe<Spsurcharges>;
  startstock?: Maybe<Scalars['Float']['output']>;
  stdcost?: Maybe<Scalars['Float']['output']>;
  steplotqty?: Maybe<Scalars['Float']['output']>;
  stockremainmode?: Maybe<Scalars['Float']['output']>;
  storebalancesheets?: Maybe<Array<Storebalancesheet>>;
  storefindata?: Maybe<Array<Storefindata>>;
  storetradelines?: Maybe<Array<Storetradelines>>;
  subcode1?: Maybe<Scalars['String']['output']>;
  subcode2?: Maybe<Scalars['String']['output']>;
  substitutes?: Maybe<Array<Substitute>>;
  taxfreeite?: Maybe<Material>;
  tecdocid?: Maybe<Scalars['Float']['output']>;
  thirdpart?: Maybe<Scalars['Float']['output']>;
  touchorder?: Maybe<Scalars['Float']['output']>;
  useinretail?: Maybe<Scalars['Float']['output']>;
  userdefinelot?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  vtc?: Maybe<Vatcategory>;
  warning?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  whsmarkup?: Maybe<Scalars['Float']['output']>;
  whsprice?: Maybe<Scalars['Float']['output']>;
};

export type Matparams = {
  autoean13Calc?: Maybe<Scalars['Float']['output']>;
  autolength?: Maybe<Scalars['Float']['output']>;
  backorderqtymode?: Maybe<Scalars['Float']['output']>;
  barcodechangeline?: Maybe<Scalars['Float']['output']>;
  barcodechangelinepricecheck?: Maybe<Scalars['Float']['output']>;
  barcodedelimeter?: Maybe<Scalars['String']['output']>;
  barcodemode?: Maybe<Scalars['Float']['output']>;
  barcodepaddchar?: Maybe<Scalars['String']['output']>;
  bookstorecodelength?: Maybe<Scalars['Float']['output']>;
  bookstorecodemode?: Maybe<Scalars['Float']['output']>;
  calccompprice?: Maybe<Scalars['Float']['output']>;
  calccostvalue?: Maybe<Scalars['Float']['output']>;
  calcwhsrtlprice?: Maybe<Scalars['Float']['output']>;
  checkstockmess?: Maybe<Scalars['Float']['output']>;
  checkstockwithminlimit?: Maybe<Scalars['Float']['output']>;
  colorsizeqtymode?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  compvaluemode?: Maybe<Scalars['Float']['output']>;
  consdsrid?: Maybe<Scalars['Float']['output']>;
  costingmode?: Maybe<Scalars['Float']['output']>;
  costsalesmethod?: Maybe<Scalars['Float']['output']>;
  creditopenitem?: Maybe<Scalars['Float']['output']>;
  cspacklinesmode?: Maybe<Scalars['Float']['output']>;
  deleteallcomposites?: Maybe<Scalars['Float']['output']>;
  delimeter?: Maybe<Scalars['String']['output']>;
  doraaffectfifo?: Maybe<Scalars['Float']['output']>;
  glmid?: Maybe<Scalars['Float']['output']>;
  itempricewithoutdecs?: Maybe<Scalars['Float']['output']>;
  itemtype?: Maybe<Scalars['Float']['output']>;
  lastbuymode?: Maybe<Scalars['Float']['output']>;
  lbdim1?: Maybe<Scalars['String']['output']>;
  lbdim2?: Maybe<Scalars['String']['output']>;
  lbdim3?: Maybe<Scalars['String']['output']>;
  materialbarcodememo?: Maybe<Scalars['String']['output']>;
  materialcodemask?: Maybe<Scalars['String']['output']>;
  materialcodememo?: Maybe<Scalars['String']['output']>;
  materialcodemode?: Maybe<Scalars['Float']['output']>;
  materialrelmask?: Maybe<Scalars['String']['output']>;
  materialrelmemo?: Maybe<Scalars['String']['output']>;
  maxconsprc?: Maybe<Scalars['Float']['output']>;
  mtrmode?: Maybe<Scalars['Float']['output']>;
  mtrtradedupl?: Maybe<Scalars['Float']['output']>;
  mu1?: Maybe<Scalars['Float']['output']>;
  mu1_2Mode?: Maybe<Scalars['Float']['output']>;
  mu1_3Mode?: Maybe<Scalars['Float']['output']>;
  mu1_4Mode?: Maybe<Scalars['Float']['output']>;
  mu2?: Maybe<Scalars['Float']['output']>;
  mu2_1?: Maybe<Scalars['Float']['output']>;
  mu3?: Maybe<Scalars['Float']['output']>;
  mu3_1?: Maybe<Scalars['Float']['output']>;
  mu4?: Maybe<Scalars['Float']['output']>;
  mu4_1?: Maybe<Scalars['Float']['output']>;
  noautoinsitemsup?: Maybe<Scalars['Float']['output']>;
  nonconsdsrid?: Maybe<Scalars['Float']['output']>;
  numsizes?: Maybe<Scalars['Float']['output']>;
  onlinecheckqty?: Maybe<Scalars['Float']['output']>;
  packlinesmode?: Maybe<Scalars['Float']['output']>;
  paddchar?: Maybe<Scalars['String']['output']>;
  parautolenght?: Maybe<Scalars['Float']['output']>;
  parbincode?: Maybe<Scalars['Float']['output']>;
  parcodemask?: Maybe<Scalars['String']['output']>;
  parcodemode?: Maybe<Scalars['Float']['output']>;
  pardatemode?: Maybe<Scalars['Float']['output']>;
  pardelimeter?: Maybe<Scalars['String']['output']>;
  parexpiremode?: Maybe<Scalars['Float']['output']>;
  parmode?: Maybe<Scalars['Float']['output']>;
  parpadchar?: Maybe<Scalars['String']['output']>;
  parsellmode?: Maybe<Scalars['Float']['output']>;
  parstomode?: Maybe<Scalars['Float']['output']>;
  partitioncodememo?: Maybe<Scalars['String']['output']>;
  partspecialdatedescription?: Maybe<Scalars['String']['output']>;
  prciddef?: Maybe<Scalars['Float']['output']>;
  qtyweightingprefix?: Maybe<Scalars['String']['output']>;
  rcncodesearch?: Maybe<Scalars['Float']['output']>;
  recomqty?: Maybe<Scalars['Float']['output']>;
  rplvaluemode?: Maybe<Scalars['Float']['output']>;
  rsalescostdsrid?: Maybe<Scalars['Float']['output']>;
  rtimarkupdef?: Maybe<Scalars['Float']['output']>;
  rtlfpamode?: Maybe<Scalars['Float']['output']>;
  salescostdsrid?: Maybe<Scalars['Float']['output']>;
  salescostextradim?: Maybe<Scalars['Float']['output']>;
  searchshowquantity?: Maybe<Scalars['Float']['output']>;
  setsautobuy?: Maybe<Scalars['Float']['output']>;
  setsautosell?: Maybe<Scalars['Float']['output']>;
  setsautostore?: Maybe<Scalars['Float']['output']>;
  setsbuymode?: Maybe<Scalars['Float']['output']>;
  setsprbuymode?: Maybe<Scalars['Float']['output']>;
  setsprsellmode?: Maybe<Scalars['Float']['output']>;
  setsprstoremode?: Maybe<Scalars['Float']['output']>;
  setssellmode?: Maybe<Scalars['Float']['output']>;
  setsstoremode?: Maybe<Scalars['Float']['output']>;
  showwarningonmarkuplessprice?: Maybe<Scalars['Float']['output']>;
  snactive?: Maybe<Scalars['Float']['output']>;
  sncodemask?: Maybe<Scalars['String']['output']>;
  snextralabel1?: Maybe<Scalars['String']['output']>;
  snextralabel2?: Maybe<Scalars['String']['output']>;
  snmode?: Maybe<Scalars['Float']['output']>;
  snstoremode?: Maybe<Scalars['Float']['output']>;
  storagemode?: Maybe<Scalars['Float']['output']>;
  strcountbincode?: Maybe<Scalars['Float']['output']>;
  strcountpartition?: Maybe<Scalars['Float']['output']>;
  subtractrestqtys?: Maybe<Scalars['Float']['output']>;
  sumcolorsize?: Maybe<Scalars['Float']['output']>;
  synpricemode?: Maybe<Scalars['Float']['output']>;
  title1?: Maybe<Scalars['String']['output']>;
  title2?: Maybe<Scalars['String']['output']>;
  title3?: Maybe<Scalars['String']['output']>;
  title4?: Maybe<Scalars['String']['output']>;
  title5?: Maybe<Scalars['String']['output']>;
  title6?: Maybe<Scalars['String']['output']>;
  title7?: Maybe<Scalars['String']['output']>;
  title8?: Maybe<Scalars['String']['output']>;
  title9?: Maybe<Scalars['String']['output']>;
  title10?: Maybe<Scalars['String']['output']>;
  title11?: Maybe<Scalars['String']['output']>;
  title12?: Maybe<Scalars['String']['output']>;
  title13?: Maybe<Scalars['String']['output']>;
  title14?: Maybe<Scalars['String']['output']>;
  title15?: Maybe<Scalars['String']['output']>;
  title16?: Maybe<Scalars['String']['output']>;
  transfervalues?: Maybe<Scalars['Float']['output']>;
  updmarkupmode?: Maybe<Scalars['Float']['output']>;
  useinretail?: Maybe<Scalars['Float']['output']>;
  valweightingprefix?: Maybe<Scalars['String']['output']>;
  vatgift?: Maybe<Scalars['Float']['output']>;
  vtcid?: Maybe<Scalars['Float']['output']>;
  whsmarkupdef?: Maybe<Scalars['Float']['output']>;
  xlnonlinecheckqty?: Maybe<Scalars['Float']['output']>;
};

export type Matpricecategory = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  materials?: Maybe<Array<Material>>;
};

export type Mattrntype = {
  billedinput?: Maybe<Scalars['Float']['output']>;
  billedoutput?: Maybe<Scalars['Float']['output']>;
  buymode?: Maybe<Scalars['Float']['output']>;
  buysupmode?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  defaultjustification?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  fincustdoctypes?: Maybe<Array<Fincustdoctype>>;
  fincustdoctypes2?: Maybe<Array<Fincustdoctype>>;
  fincustdoctypes3?: Maybe<Array<Fincustdoctype>>;
  fincustdoctypes4?: Maybe<Array<Fincustdoctype>>;
  fincustdoctypes5?: Maybe<Array<Fincustdoctype>>;
  finstoredoctypes?: Maybe<Array<Finstoredoctype>>;
  finstoredoctypes2?: Maybe<Array<Finstoredoctype>>;
  finstoredoctypes3?: Maybe<Array<Finstoredoctype>>;
  finstoredoctypes4?: Maybe<Array<Finstoredoctype>>;
  finstoredoctypes5?: Maybe<Array<Finstoredoctype>>;
  finstoredoctypes6?: Maybe<Array<Finstoredoctype>>;
  finsupdoctypes?: Maybe<Array<Finsupdoctype>>;
  finsupdoctypes2?: Maybe<Array<Finsupdoctype>>;
  finsupdoctypes3?: Maybe<Array<Finsupdoctype>>;
  finsupdoctypes4?: Maybe<Array<Finsupdoctype>>;
  finsupdoctypes5?: Maybe<Array<Finsupdoctype>>;
  flag1?: Maybe<Scalars['Float']['output']>;
  flag2?: Maybe<Scalars['Float']['output']>;
  flag3?: Maybe<Scalars['Float']['output']>;
  flag4?: Maybe<Scalars['Float']['output']>;
  flag5?: Maybe<Scalars['Float']['output']>;
  flag6?: Maybe<Scalars['Float']['output']>;
  flag7?: Maybe<Scalars['Float']['output']>;
  flag8?: Maybe<Scalars['Float']['output']>;
  flag9?: Maybe<Scalars['Float']['output']>;
  flag10?: Maybe<Scalars['Float']['output']>;
  flag11?: Maybe<Scalars['Float']['output']>;
  flag12?: Maybe<Scalars['Float']['output']>;
  flag13?: Maybe<Scalars['Float']['output']>;
  flag14?: Maybe<Scalars['Float']['output']>;
  flag15?: Maybe<Scalars['Float']['output']>;
  flag16?: Maybe<Scalars['Float']['output']>;
  inputquantmode?: Maybe<Scalars['Float']['output']>;
  inputvalmode?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  itemtrans?: Maybe<Array<Itemtrans>>;
  opening?: Maybe<Scalars['Float']['output']>;
  outputquantmode?: Maybe<Scalars['Float']['output']>;
  outputthirdmode?: Maybe<Scalars['Float']['output']>;
  outputvalmode?: Maybe<Scalars['Float']['output']>;
  prodcostmode?: Maybe<Scalars['Float']['output']>;
  salescostmode?: Maybe<Scalars['Float']['output']>;
  sellmode?: Maybe<Scalars['Float']['output']>;
  upddatemode?: Maybe<Scalars['Float']['output']>;
  updmode?: Maybe<Scalars['Float']['output']>;
  updtaxfree?: Maybe<Scalars['Float']['output']>;
  updthird?: Maybe<Scalars['Float']['output']>;
};

export type Mesunit = {
  code?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  decimals?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  edicode?: Maybe<Scalars['String']['output']>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  materials?: Maybe<Array<Material>>;
  materials2?: Maybe<Array<Material>>;
  materials3?: Maybe<Array<Material>>;
  materials4?: Maybe<Array<Material>>;
  mydatacode?: Maybe<Scalars['Float']['output']>;
  ublinvoicedqtyunitcode?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  addRecipe: Recipe;
  createCompletePause: PanelMachinePauses;
  /** Create a new production order */
  createPporder: Pporders;
  deleteMachinePause: Scalars['Boolean']['output'];
  /** Delete a production order */
  deletePporder: Scalars['Boolean']['output'];
  login: LoginResponse;
  removeRecipe: Scalars['Boolean']['output'];
  updateOneCoil: Coil;
  updatePauseDetails: PanelMachinePauses;
  /** Update an existing production order */
  updatePporder: Pporders;
  updatePporderlineStatus: Pporderlines2;
  updateWorkingHours: WorkingHours;
};


export type MutationAddRecipeArgs = {
  newRecipeData: NewRecipeInput;
};


export type MutationCreateCompletePauseArgs = {
  input: CreateCompletePauseInput;
};


export type MutationCreatePporderArgs = {
  input: CreatePpordersInput;
};


export type MutationDeleteMachinePauseArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePporderArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveRecipeArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateOneCoilArgs = {
  input: UpdateOneCoilInput;
};


export type MutationUpdatePauseDetailsArgs = {
  input: UpdatePauseDetailsInput;
};


export type MutationUpdatePporderArgs = {
  input: UpdatePporderInput;
};


export type MutationUpdatePporderlineStatusArgs = {
  input: UpdatePporderlineStatusInput;
};


export type MutationUpdateWorkingHoursArgs = {
  date: Scalars['String']['input'];
  update: UpdateWorkingHoursInput;
};

export type Mydataclass = {
  amount?: Maybe<Scalars['Float']['output']>;
  classificationcategory?: Maybe<Scalars['String']['output']>;
  classificationid?: Maybe<Scalars['Float']['output']>;
  classificationreceipt?: Maybe<Scalars['String']['output']>;
  classificationtype?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  linenumber?: Maybe<Scalars['Float']['output']>;
  mydatalines?: Maybe<Mydatalines>;
  mydatalinesid?: Maybe<Scalars['Float']['output']>;
  uploaddate?: Maybe<Scalars['Date']['output']>;
  vatamount?: Maybe<Scalars['Float']['output']>;
  vatcategory?: Maybe<Scalars['Float']['output']>;
  vatexemption?: Maybe<Scalars['Float']['output']>;
};

export type Mydataexplines = {
  comid?: Maybe<Scalars['Float']['output']>;
  deductionspercentage?: Maybe<Scalars['Float']['output']>;
  exptype?: Maybe<Scalars['Float']['output']>;
  expvalue?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  linecomments?: Maybe<Scalars['String']['output']>;
  linenumber?: Maybe<Scalars['Float']['output']>;
  mydataheader?: Maybe<Mydataheader>;
  mydataheaderid?: Maybe<Scalars['Float']['output']>;
  mydatavprc?: Maybe<Scalars['Float']['output']>;
};

export type Mydataheader = {
  aa?: Maybe<Scalars['String']['output']>;
  accid?: Maybe<Scalars['Float']['output']>;
  cancellationftrid?: Maybe<Scalars['Float']['output']>;
  cancellationmark?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  completeshippingbranch?: Maybe<Scalars['Float']['output']>;
  correlatedinvoices?: Maybe<Scalars['String']['output']>;
  coubranch?: Maybe<Scalars['Float']['output']>;
  coucity?: Maybe<Scalars['String']['output']>;
  coucountry?: Maybe<Scalars['Float']['output']>;
  coucountrycode?: Maybe<Scalars['String']['output']>;
  coudtype?: Maybe<Scalars['Float']['output']>;
  couid?: Maybe<Scalars['Float']['output']>;
  couidentitynum?: Maybe<Scalars['String']['output']>;
  couname?: Maybe<Scalars['String']['output']>;
  counumber?: Maybe<Scalars['String']['output']>;
  coupostalcode?: Maybe<Scalars['String']['output']>;
  coustreet?: Maybe<Scalars['String']['output']>;
  couvatnumber?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['Float']['output']>;
  currencycode?: Maybe<Scalars['String']['output']>;
  deductionsvalue?: Maybe<Scalars['Float']['output']>;
  deliveryaddrcity?: Maybe<Scalars['String']['output']>;
  deliveryaddrnumber?: Maybe<Scalars['String']['output']>;
  deliveryaddrpostalcode?: Maybe<Scalars['String']['output']>;
  deliveryaddrstreet?: Maybe<Scalars['String']['output']>;
  deviationvalue?: Maybe<Scalars['Float']['output']>;
  dispatchdate?: Maybe<Scalars['Date']['output']>;
  dispatchtime?: Maybe<Scalars['Date']['output']>;
  errorstatus?: Maybe<Scalars['Float']['output']>;
  errortext?: Maybe<Scalars['String']['output']>;
  exchangerate?: Maybe<Scalars['Float']['output']>;
  feesvalue?: Maybe<Scalars['Float']['output']>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fuelinvoice?: Maybe<Scalars['Float']['output']>;
  grossvalue?: Maybe<Scalars['Float']['output']>;
  huid?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  invoicetype?: Maybe<Scalars['String']['output']>;
  invoicevariationtype?: Maybe<Scalars['Float']['output']>;
  iscredit?: Maybe<Scalars['Float']['output']>;
  isdeliverynote?: Maybe<Scalars['Float']['output']>;
  isfromeinvoice?: Maybe<Scalars['Float']['output']>;
  issbranch?: Maybe<Scalars['Float']['output']>;
  isscity?: Maybe<Scalars['String']['output']>;
  isscountry?: Maybe<Scalars['Float']['output']>;
  isscountrycode?: Maybe<Scalars['String']['output']>;
  issid?: Maybe<Scalars['Float']['output']>;
  issname?: Maybe<Scalars['String']['output']>;
  issnumber?: Maybe<Scalars['String']['output']>;
  isspostalcode?: Maybe<Scalars['String']['output']>;
  issstreet?: Maybe<Scalars['String']['output']>;
  issstype?: Maybe<Scalars['Float']['output']>;
  issuecntid?: Maybe<Scalars['Float']['output']>;
  issuecntidcode?: Maybe<Scalars['String']['output']>;
  issuedate?: Maybe<Scalars['Date']['output']>;
  issvatnumber?: Maybe<Scalars['String']['output']>;
  loadingaddrcity?: Maybe<Scalars['String']['output']>;
  loadingaddrnumber?: Maybe<Scalars['String']['output']>;
  loadingaddrpostalcode?: Maybe<Scalars['String']['output']>;
  loadingaddrstreet?: Maybe<Scalars['String']['output']>;
  mark?: Maybe<Scalars['String']['output']>;
  movepurpose?: Maybe<Scalars['Float']['output']>;
  mydataexplines?: Maybe<Array<Mydataexplines>>;
  mydatalines?: Maybe<Array<Mydatalines>>;
  netvalue?: Maybe<Scalars['Float']['output']>;
  othermovepurposetitle?: Maybe<Scalars['String']['output']>;
  othertaxesvalue?: Maybe<Scalars['Float']['output']>;
  paymenttype?: Maybe<Scalars['Float']['output']>;
  qrurl?: Maybe<Scalars['String']['output']>;
  rejectiontype?: Maybe<Scalars['Float']['output']>;
  relftrids?: Maybe<Scalars['String']['output']>;
  selfpricing?: Maybe<Scalars['Float']['output']>;
  series?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  specialinvoicecategory?: Maybe<Scalars['Float']['output']>;
  stampdutyvalue?: Maybe<Scalars['Float']['output']>;
  startshippingbranch?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  supplyaccountno?: Maybe<Scalars['String']['output']>;
  sxid?: Maybe<Scalars['Float']['output']>;
  transmissionfailure?: Maybe<Scalars['Float']['output']>;
  updcount?: Maybe<Scalars['Float']['output']>;
  uploaddate?: Maybe<Scalars['Date']['output']>;
  vatpaymentsuspension?: Maybe<Scalars['Float']['output']>;
  vatvalue?: Maybe<Scalars['Float']['output']>;
  vehiclenumber?: Maybe<Scalars['String']['output']>;
  withheldvalue?: Maybe<Scalars['Float']['output']>;
};

export type Mydatalines = {
  applicationdate?: Maybe<Scalars['Date']['output']>;
  applicationid?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  discountoption?: Maybe<Scalars['Float']['output']>;
  doy?: Maybe<Scalars['String']['output']>;
  exptype?: Maybe<Scalars['Float']['output']>;
  fuelcode?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  invoicedetailtype?: Maybe<Scalars['Float']['output']>;
  itemcode?: Maybe<Scalars['String']['output']>;
  itemdescr?: Maybe<Scalars['String']['output']>;
  linecomments?: Maybe<Scalars['String']['output']>;
  linenumber?: Maybe<Scalars['Float']['output']>;
  measurementunit?: Maybe<Scalars['Float']['output']>;
  mydataclasses?: Maybe<Array<Mydataclass>>;
  mydataheader?: Maybe<Mydataheader>;
  mydataheaderid?: Maybe<Scalars['Float']['output']>;
  mydatavprc?: Maybe<Scalars['Float']['output']>;
  netvalue?: Maybe<Scalars['Float']['output']>;
  notvat195?: Maybe<Scalars['Float']['output']>;
  othermeasurementunitquantity?: Maybe<Scalars['Float']['output']>;
  othermeasurementunittitle?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  quantity15?: Maybe<Scalars['Float']['output']>;
  rectype?: Maybe<Scalars['Float']['output']>;
  shipid?: Maybe<Scalars['String']['output']>;
  taricno?: Maybe<Scalars['String']['output']>;
  vatamount?: Maybe<Scalars['Float']['output']>;
  vatcategory?: Maybe<Scalars['Float']['output']>;
  vatexemption?: Maybe<Scalars['Float']['output']>;
};

export type Myf = {
  aa?: Maybe<Scalars['Float']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  akind?: Maybe<Scalars['Float']['output']>;
  branhno?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  fmonth?: Maybe<Scalars['Float']['output']>;
  fromdate?: Maybe<Scalars['Date']['output']>;
  fyear?: Maybe<Scalars['Float']['output']>;
  givedate?: Maybe<Scalars['Date']['output']>;
  gsisresponse?: Maybe<Scalars['String']['output']>;
  gsisresponseid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  islocked?: Maybe<Scalars['Float']['output']>;
  myfData?: Maybe<Array<MyfData>>;
  todate?: Maybe<Scalars['Date']['output']>;
  valtype?: Maybe<Scalars['Float']['output']>;
};

export type MyfData = {
  afm?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  curid?: Maybe<Scalars['Float']['output']>;
  fromcomid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  linenum?: Maybe<Scalars['Float']['output']>;
  myf?: Maybe<Myf>;
  myfcashregid?: Maybe<Scalars['String']['output']>;
  myfdate?: Maybe<Scalars['Date']['output']>;
  myfnote?: Maybe<Scalars['Float']['output']>;
  myfnotobject?: Maybe<Scalars['Float']['output']>;
  myfqty?: Maybe<Scalars['Float']['output']>;
  myftaxval?: Maybe<Scalars['Float']['output']>;
  myfval?: Maybe<Scalars['Float']['output']>;
  perdomain?: Maybe<Scalars['Float']['output']>;
  perid?: Maybe<Scalars['Float']['output']>;
  valtype?: Maybe<Scalars['Float']['output']>;
};

export type Natinistore = {
  bincode?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  consumptionqty?: Maybe<Scalars['Float']['output']>;
  expdate?: Maybe<Scalars['Date']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  insdate?: Maybe<Scalars['Date']['output']>;
  iteid?: Maybe<Scalars['Float']['output']>;
  natinistorecolorsizes?: Maybe<Array<Natinistorecolorsize>>;
  newprqty?: Maybe<Scalars['Float']['output']>;
  newsecqty?: Maybe<Scalars['Float']['output']>;
  parid?: Maybe<Scalars['Float']['output']>;
  remprqty?: Maybe<Scalars['Float']['output']>;
  remsecqty?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
};

export type Natinistorecolorsize = {
  bincode?: Maybe<Scalars['String']['output']>;
  colorcode?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  iteid?: Maybe<Scalars['Float']['output']>;
  natinistore?: Maybe<Natinistore>;
  parid?: Maybe<Scalars['Float']['output']>;
  remsize1?: Maybe<Scalars['Float']['output']>;
  remsize2?: Maybe<Scalars['Float']['output']>;
  remsize3?: Maybe<Scalars['Float']['output']>;
  remsize4?: Maybe<Scalars['Float']['output']>;
  remsize5?: Maybe<Scalars['Float']['output']>;
  remsize6?: Maybe<Scalars['Float']['output']>;
  remsize7?: Maybe<Scalars['Float']['output']>;
  remsize8?: Maybe<Scalars['Float']['output']>;
  remsize9?: Maybe<Scalars['Float']['output']>;
  remsize10?: Maybe<Scalars['Float']['output']>;
  remsize11?: Maybe<Scalars['Float']['output']>;
  remsize12?: Maybe<Scalars['Float']['output']>;
  remsize13?: Maybe<Scalars['Float']['output']>;
  remsize14?: Maybe<Scalars['Float']['output']>;
  remsize15?: Maybe<Scalars['Float']['output']>;
  remsize16?: Maybe<Scalars['Float']['output']>;
  remsize17?: Maybe<Scalars['Float']['output']>;
  remsize18?: Maybe<Scalars['Float']['output']>;
  remsize19?: Maybe<Scalars['Float']['output']>;
  remsize20?: Maybe<Scalars['Float']['output']>;
  size1?: Maybe<Scalars['Float']['output']>;
  size2?: Maybe<Scalars['Float']['output']>;
  size3?: Maybe<Scalars['Float']['output']>;
  size4?: Maybe<Scalars['Float']['output']>;
  size5?: Maybe<Scalars['Float']['output']>;
  size6?: Maybe<Scalars['Float']['output']>;
  size7?: Maybe<Scalars['Float']['output']>;
  size8?: Maybe<Scalars['Float']['output']>;
  size9?: Maybe<Scalars['Float']['output']>;
  size10?: Maybe<Scalars['Float']['output']>;
  size11?: Maybe<Scalars['Float']['output']>;
  size12?: Maybe<Scalars['Float']['output']>;
  size13?: Maybe<Scalars['Float']['output']>;
  size14?: Maybe<Scalars['Float']['output']>;
  size15?: Maybe<Scalars['Float']['output']>;
  size16?: Maybe<Scalars['Float']['output']>;
  size17?: Maybe<Scalars['Float']['output']>;
  size18?: Maybe<Scalars['Float']['output']>;
  size19?: Maybe<Scalars['Float']['output']>;
  size20?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
};

export type NewRecipeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  ingredients: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Occupation = {
  codeid?: Maybe<Scalars['Float']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  inprschool?: Maybe<Scalars['Float']['output']>;
  kepyostatus?: Maybe<Scalars['Float']['output']>;
  myfnotobject?: Maybe<Scalars['Float']['output']>;
  strorder?: Maybe<Scalars['String']['output']>;
  suppliers?: Maybe<Array<Supplier>>;
};

export type OffsetPaging = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PPackages = {
  cin?: Maybe<Scalars['String']['output']>;
  classification?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  cout?: Maybe<Scalars['String']['output']>;
  createDt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  despatchDt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  importNo?: Maybe<Scalars['Int']['output']>;
  iteid?: Maybe<Scalars['Int']['output']>;
  itename?: Maybe<Scalars['String']['output']>;
  loc?: Maybe<Scalars['Int']['output']>;
  moldin?: Maybe<Scalars['String']['output']>;
  moldout?: Maybe<Scalars['String']['output']>;
  packno?: Maybe<Scalars['String']['output']>;
  panelSpeed?: Maybe<PanelSpeeds>;
  panelThickness?: Maybe<Scalars['String']['output']>;
  panelWeightPerMeter?: Maybe<Scalars['Float']['output']>;
  pcs?: Maybe<Scalars['Int']['output']>;
  productionTime?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  thickin?: Maybe<Scalars['String']['output']>;
  thickout?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  upDate?: Maybe<Scalars['Date']['output']>;
  widthin?: Maybe<Scalars['String']['output']>;
  widthout?: Maybe<Scalars['String']['output']>;
};

export type PanelMachinePauses = {
  id: Scalars['ID']['output'];
  order: Pporders;
  pausecomment?: Maybe<Scalars['String']['output']>;
  pauseduration?: Maybe<Scalars['Int']['output']>;
  pauseenddate?: Maybe<Scalars['Date']['output']>;
  pausestartdate: Scalars['Date']['output'];
  pporderid: Scalars['Int']['output'];
};

export type PanelProductionOrdersExt2SortField =
  | 'ftrdate'
  | 'prodOrder'
  | 'productionNo'
  | 'tradecode';

export type PanelSpeeds = {
  code: Scalars['String']['output'];
  packages: Array<PPackages>;
  prodorderview: Array<ProdOrdersView>;
  speed?: Maybe<Scalars['Float']['output']>;
  thickness?: Maybe<Scalars['String']['output']>;
};

export type Partition = {
  accpurmask?: Maybe<Scalars['String']['output']>;
  accsalmask?: Maybe<Scalars['String']['output']>;
  boundqty1?: Maybe<Scalars['Float']['output']>;
  boundqty2?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  consumable?: Maybe<Scalars['Float']['output']>;
  countryoforigin?: Maybe<Scalars['Float']['output']>;
  estqty1?: Maybe<Scalars['Float']['output']>;
  estqty2?: Maybe<Scalars['Float']['output']>;
  expectedqty1?: Maybe<Scalars['Float']['output']>;
  expectedqty2?: Maybe<Scalars['Float']['output']>;
  expiredate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Float']['output'];
  initqty1?: Maybe<Scalars['Float']['output']>;
  initqty2?: Maybe<Scalars['Float']['output']>;
  inputdate?: Maybe<Scalars['Date']['output']>;
  inputqty1?: Maybe<Scalars['Float']['output']>;
  inputqty2?: Maybe<Scalars['Float']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  lotifyqtymode?: Maybe<Scalars['Float']['output']>;
  lpackagevolume?: Maybe<Scalars['Float']['output']>;
  outputqty1?: Maybe<Scalars['Float']['output']>;
  outputqty2?: Maybe<Scalars['Float']['output']>;
  purchable?: Maybe<Scalars['Float']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  saleable?: Maybe<Scalars['Float']['output']>;
  specialdate?: Maybe<Scalars['Date']['output']>;
  storetradelines?: Maybe<Array<Storetradelines>>;
  storetrades?: Maybe<Array<Storetrade>>;
};

export type Paymentagreement = {
  amounttobepayed?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  duedate?: Maybe<Scalars['Date']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fundtype?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
};

export type Paymenttermlines = {
  comid?: Maybe<Scalars['Float']['output']>;
  fundtype?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Paymentterms>;
  payedwithindays?: Maybe<Scalars['Float']['output']>;
  paypcnt?: Maybe<Scalars['Float']['output']>;
  ptrid?: Maybe<Scalars['Float']['output']>;
};

export type Paymentterms = {
  accmask?: Maybe<Scalars['String']['output']>;
  bankaccounts?: Maybe<Array<Bankaccount>>;
  bankbna?: Maybe<Bankaccount>;
  cashbna?: Maybe<Bankaccount>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  dsridbankpmt?: Maybe<Scalars['Float']['output']>;
  dsridcancelpmt?: Maybe<Scalars['Float']['output']>;
  dsridcashcancelpmt?: Maybe<Scalars['Float']['output']>;
  dsridcashnegcancelpmt?: Maybe<Scalars['Float']['output']>;
  dsridcashnegpmt?: Maybe<Scalars['Float']['output']>;
  dsridcashpmt?: Maybe<Scalars['Float']['output']>;
  dsridnegcancelpmt?: Maybe<Scalars['Float']['output']>;
  dsridnegpmt?: Maybe<Scalars['Float']['output']>;
  dsridpmt?: Maybe<Scalars['Float']['output']>;
  dsridsupbankpmt?: Maybe<Scalars['Float']['output']>;
  dsridsupcashpmt?: Maybe<Scalars['Float']['output']>;
  edicode?: Maybe<Scalars['String']['output']>;
  fintrades?: Maybe<Array<Fintrade>>;
  fttid?: Maybe<Scalars['Float']['output']>;
  glcodeseg?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  immediatevatpayment?: Maybe<Scalars['Float']['output']>;
  immediatevatpaymentdays?: Maybe<Scalars['Float']['output']>;
  involvessv?: Maybe<Scalars['Float']['output']>;
  mydatacode?: Maybe<Scalars['Float']['output']>;
  paymenttermlines?: Maybe<Array<Paymenttermlines>>;
  reliablines?: Maybe<Array<Reliablines>>;
  supbankbna?: Maybe<Bankaccount>;
  supcashbnaid?: Maybe<Scalars['Float']['output']>;
  supdsridcancelpmt?: Maybe<Scalars['Float']['output']>;
  supdsridnegcancelpmt?: Maybe<Scalars['Float']['output']>;
  supdsridnegpmt?: Maybe<Scalars['Float']['output']>;
  supdsridpmt?: Maybe<Scalars['Float']['output']>;
  suppliers?: Maybe<Array<Supplier>>;
};

export type Pgroup = {
  acccrdlimit?: Maybe<Scalars['Float']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  cnt?: Maybe<Country>;
  code?: Maybe<Scalars['String']['output']>;
  crdlimit?: Maybe<Scalars['Float']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  disclimit?: Maybe<Scalars['Float']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isgroupsupervisor?: Maybe<Scalars['Float']['output']>;
  logexpr?: Maybe<Scalars['String']['output']>;
  logexprlimit?: Maybe<Scalars['Float']['output']>;
  opencrdlimit?: Maybe<Scalars['Float']['output']>;
  orderlimit?: Maybe<Scalars['Float']['output']>;
  pgrouplines?: Maybe<Array<Pgrouplines>>;
  strorder?: Maybe<Scalars['String']['output']>;
  suppliers?: Maybe<Array<Supplier>>;
  transdoclimit?: Maybe<Scalars['Float']['output']>;
  valuelimit?: Maybe<Scalars['Float']['output']>;
};

export type Pgrouplines = {
  comid?: Maybe<Scalars['Float']['output']>;
  grp?: Maybe<Pgroup>;
  grpid?: Maybe<Scalars['Float']['output']>;
  reliability?: Maybe<Reliability>;
};

export type Phasegroup = {
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  greids?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  specifications?: Maybe<Array<Specification>>;
  storetrades?: Maybe<Array<Storetrade>>;
};

export type Portfolio = {
  accmask?: Maybe<Scalars['String']['output']>;
  bills?: Maybe<Array<Bill>>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
};

export type PpackagesSummary = {
  cin?: Maybe<Scalars['String']['output']>;
  cout?: Maybe<Scalars['String']['output']>;
  itename?: Maybe<Scalars['String']['output']>;
  moldin?: Maybe<Scalars['String']['output']>;
  moldout?: Maybe<Scalars['String']['output']>;
  thickin?: Maybe<Scalars['String']['output']>;
  thickout?: Maybe<Scalars['String']['output']>;
  totalProductionTime: Scalars['Float']['output'];
  tradecode?: Maybe<Scalars['String']['output']>;
};

export type PporderGroupIn = {
  cin?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Float']['output']>;
  cout?: Maybe<Scalars['String']['output']>;
  moldin?: Maybe<Scalars['String']['output']>;
  moldout?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<Pporderlines2>>;
  tTime?: Maybe<Scalars['Float']['output']>;
  thickin?: Maybe<Scalars['String']['output']>;
  thickout?: Maybe<Scalars['String']['output']>;
  totalTtm?: Maybe<Scalars['Float']['output']>;
};

export type Pporderlines2 = {
  custporderno?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isCanceled?: Maybe<Scalars['Int']['output']>;
  panelcode?: Maybe<Scalars['String']['output']>;
  pporderno?: Maybe<Scalars['String']['output']>;
  pporders?: Maybe<Pporders>;
  prodDate?: Maybe<Scalars['Date']['output']>;
  prodOrdersView?: Maybe<ProdOrdersView>;
  status?: Maybe<Scalars['Int']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  upDate?: Maybe<Scalars['Date']['output']>;
};

export type Pporderlines2FilterInput = {
  custporderno?: InputMaybe<StringFilter>;
  isCanceled?: InputMaybe<Scalars['Boolean']['input']>;
  ppordernos?: InputMaybe<StringFilter>;
  prodDate?: InputMaybe<DateFilter>;
  status?: InputMaybe<IntFilter>;
  tradecode?: InputMaybe<StringFilter>;
};

export type Pporderlines2Response = {
  nodes: Array<Pporderlines2>;
  totalCount: Scalars['Int']['output'];
};

export type Pporderlines2SortField =
  | 'id'
  | 'pporderno'
  | 'prodDate';

export type Pporderlines2SortInput = {
  direction: SortOrder;
  field: Pporderlines2SortField;
};

export type Pporders = {
  createDate?: Maybe<Scalars['Date']['output']>;
  estDateOfProdDatetime?: Maybe<Scalars['Date']['output']>;
  estFinishDate?: Maybe<Scalars['Date']['output']>;
  estStartDate?: Maybe<Scalars['Date']['output']>;
  finishDate?: Maybe<Scalars['Date']['output']>;
  finishDateDatetime?: Maybe<Scalars['Date']['output']>;
  groupIn?: Maybe<Array<PporderGroupIn>>;
  id: Scalars['Int']['output'];
  offtimeduration?: Maybe<Scalars['Int']['output']>;
  offtimeenddate?: Maybe<Scalars['Date']['output']>;
  offtimestartdate?: Maybe<Scalars['Date']['output']>;
  panelcode?: Maybe<Scalars['String']['output']>;
  pauseduration?: Maybe<Scalars['Int']['output']>;
  pauseenddate?: Maybe<Scalars['Date']['output']>;
  pauses?: Maybe<Array<PanelMachinePauses>>;
  pausestartdate?: Maybe<Scalars['Date']['output']>;
  pporderlines: Array<Pporderlines2>;
  pporderno?: Maybe<Scalars['String']['output']>;
  previd?: Maybe<Scalars['Int']['output']>;
  prevpanelcode?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['Date']['output']>;
  startDateDatetime?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  totalTime?: Maybe<Scalars['Float']['output']>;
  totalTtm?: Maybe<Scalars['Float']['output']>;
};

export type PpordersFilterInput = {
  lastDays?: InputMaybe<Scalars['Int']['input']>;
  pporderno?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Prdata = {
  comid?: Maybe<Scalars['Float']['output']>;
  domainid1?: Maybe<Scalars['Float']['output']>;
  domainid2?: Maybe<Scalars['Float']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  fdate?: Maybe<Scalars['Date']['output']>;
  fld1?: Maybe<Scalars['Float']['output']>;
  fld2?: Maybe<Scalars['Float']['output']>;
  fld3?: Maybe<Scalars['Float']['output']>;
  fld4?: Maybe<Scalars['Float']['output']>;
  fld5?: Maybe<Scalars['Float']['output']>;
  fld6?: Maybe<Scalars['Float']['output']>;
  fromtime?: Maybe<Scalars['String']['output']>;
  giftqty?: Maybe<Scalars['Float']['output']>;
  iteid?: Maybe<Scalars['Float']['output']>;
  lastmodifieddate?: Maybe<Scalars['Date']['output']>;
  ldate?: Maybe<Scalars['Date']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  prdef?: Maybe<Prdef>;
  prpid?: Maybe<Scalars['Float']['output']>;
  qty?: Maybe<Scalars['Float']['output']>;
  totime?: Maybe<Scalars['String']['output']>;
  usrid?: Maybe<Scalars['Float']['output']>;
};

export type Prdef = {
  acache?: Maybe<Scalars['Float']['output']>;
  cdsid?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  coltitles?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  compmodulus?: Maybe<Scalars['Float']['output']>;
  cspricemode?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  discmode?: Maybe<Scalars['Float']['output']>;
  domain1?: Maybe<Scalars['Float']['output']>;
  domain1Dbviewfield?: Maybe<Scalars['String']['output']>;
  domain1Dbviewid?: Maybe<Scalars['Float']['output']>;
  domain2?: Maybe<Scalars['Float']['output']>;
  domain2Dbviewfield?: Maybe<Scalars['String']['output']>;
  domain2Dbviewid?: Maybe<Scalars['Float']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  fdate?: Maybe<Scalars['Date']['output']>;
  formula?: Maybe<Scalars['String']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  isprogressivescale?: Maybe<Scalars['Float']['output']>;
  joined?: Maybe<Scalars['Float']['output']>;
  ldate?: Maybe<Scalars['Date']['output']>;
  prdata?: Maybe<Array<Prdata>>;
  prdefinition?: Maybe<Scalars['Float']['output']>;
  qtyscale?: Maybe<Scalars['Float']['output']>;
  scalefld?: Maybe<Scalars['String']['output']>;
  scriptcode?: Maybe<Scalars['Float']['output']>;
  scriptfunction?: Maybe<Scalars['String']['output']>;
  scriptparams?: Maybe<Scalars['String']['output']>;
  storedsernum?: Maybe<Scalars['Float']['output']>;
  usealterprices?: Maybe<Scalars['Float']['output']>;
  usescript?: Maybe<Scalars['Float']['output']>;
  zerobalance?: Maybe<Scalars['Float']['output']>;
};

export type Presource = {
  abcid1?: Maybe<Scalars['Float']['output']>;
  abcid2?: Maybe<Scalars['Float']['output']>;
  abcid3?: Maybe<Scalars['Float']['output']>;
  abcid4?: Maybe<Scalars['Float']['output']>;
  abcid5?: Maybe<Scalars['Float']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  calctype?: Maybe<Scalars['Float']['output']>;
  centercost?: Maybe<Centercost>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  distrno?: Maybe<Scalars['Float']['output']>;
  formexpvalue?: Maybe<Scalars['String']['output']>;
  groupresource?: Maybe<Groupresource>;
  mesunit?: Maybe<Scalars['String']['output']>;
  modifiable?: Maybe<Scalars['Float']['output']>;
  reskind?: Maybe<Scalars['Float']['output']>;
};

export type Pricecategory = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
};

export type Printtemplate = {
  autopaperfeed?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  einvoice?: Maybe<Scalars['Float']['output']>;
  isdotmatrix?: Maybe<Scalars['Float']['output']>;
  prtcategory?: Maybe<Scalars['Float']['output']>;
  taxdevcfg?: Maybe<Taxdevcfg>;
};

export type Processgroup = {
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  storetradelines?: Maybe<Array<Storetradelines>>;
};

export type ProdOrdersView = {
  cin?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  cout?: Maybe<Scalars['String']['output']>;
  fintradeSync?: Maybe<FintradeSync>;
  importNo?: Maybe<Scalars['Int']['output']>;
  isCanceled?: Maybe<Scalars['Boolean']['output']>;
  moldin?: Maybe<Scalars['String']['output']>;
  moldout?: Maybe<Scalars['String']['output']>;
  panelSpeed?: Maybe<PanelSpeeds>;
  pporderline?: Maybe<Pporderlines2>;
  prodOrder: Scalars['String']['output'];
  productionNo: Scalars['Int']['output'];
  speed?: Maybe<Scalars['Float']['output']>;
  thickin?: Maybe<Scalars['String']['output']>;
  thickout?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  ttm?: Maybe<Scalars['Float']['output']>;
  widthin?: Maybe<Scalars['String']['output']>;
  widthout?: Maybe<Scalars['String']['output']>;
};

export type ProdOrdersViewFilterInput = {
  cin?: InputMaybe<StringFilter>;
  code?: InputMaybe<StringFilter>;
  count?: InputMaybe<Scalars['Float']['input']>;
  fintradeSyncDate?: InputMaybe<DateFilter>;
  fintradeSyncStatus?: InputMaybe<IntFilter>;
  isCanceled?: InputMaybe<Scalars['Boolean']['input']>;
  pporderno?: InputMaybe<StringFilter>;
  prodOrder?: InputMaybe<StringFilter>;
  salesmanName?: InputMaybe<StringFilter>;
  tradecode?: InputMaybe<StringFilter>;
  ttm?: InputMaybe<IntFilter>;
};

export type ProdOrdersViewResponse = {
  nodes: Array<ProdOrdersView>;
  totalCount: Scalars['Int']['output'];
};

export type ProdOrdersViewSortInput = {
  direction: SortOrder;
  field: PanelProductionOrdersExt2SortField;
};

export type Productionparams = {
  acccondsrid?: Maybe<Scalars['Float']['output']>;
  accdsrid?: Maybe<Scalars['Float']['output']>;
  allprodlevels?: Maybe<Scalars['Float']['output']>;
  byprodcost?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  consdsrid?: Maybe<Scalars['Float']['output']>;
  consdsrid2?: Maybe<Scalars['Float']['output']>;
  contrdsrid?: Maybe<Scalars['Float']['output']>;
  delzeroqtylines?: Maybe<Scalars['Float']['output']>;
  finsubcontrmode?: Maybe<Scalars['Float']['output']>;
  minusprods?: Maybe<Scalars['Float']['output']>;
  mpsdayrange?: Maybe<Scalars['Float']['output']>;
  practiceperiod?: Maybe<Scalars['Float']['output']>;
  pricedecimals?: Maybe<Scalars['Float']['output']>;
  pricemode?: Maybe<Scalars['Float']['output']>;
  proddocseries?: Maybe<Scalars['String']['output']>;
  proddocseries2?: Maybe<Scalars['String']['output']>;
  proddsrid?: Maybe<Scalars['Float']['output']>;
  proddsrid2?: Maybe<Scalars['Float']['output']>;
  prodtomatdsrid?: Maybe<Scalars['Float']['output']>;
  prospmode?: Maybe<Scalars['Float']['output']>;
  speccopies?: Maybe<Scalars['Float']['output']>;
  specdrafttype?: Maybe<Scalars['Float']['output']>;
  specdrivername?: Maybe<Scalars['String']['output']>;
  specfrmtype?: Maybe<Scalars['Float']['output']>;
  specmaskcode?: Maybe<Scalars['String']['output']>;
  specprtid?: Maybe<Scalars['Float']['output']>;
  specqtydecimals?: Maybe<Scalars['Float']['output']>;
  storecostmode?: Maybe<Scalars['Float']['output']>;
  tiedmode?: Maybe<Scalars['Float']['output']>;
  valuedecimals?: Maybe<Scalars['Float']['output']>;
};

export type Puser = {
  abbreviation?: Maybe<Scalars['String']['output']>;
  allcompanies?: Maybe<Scalars['Float']['output']>;
  allowaltuserauth?: Maybe<Scalars['Float']['output']>;
  allowdbbackup?: Maybe<Scalars['Float']['output']>;
  allowdbcreate?: Maybe<Scalars['Float']['output']>;
  allowdbdelete?: Maybe<Scalars['Float']['output']>;
  allowdbrestore?: Maybe<Scalars['Float']['output']>;
  allowhierarchyviolation?: Maybe<Scalars['Float']['output']>;
  allowsynchdata?: Maybe<Scalars['Float']['output']>;
  branch?: Maybe<Branch>;
  com?: Maybe<Company>;
  crmemail?: Maybe<Scalars['String']['output']>;
  crmemailpassword?: Maybe<Scalars['String']['output']>;
  crmid?: Maybe<Scalars['Float']['output']>;
  defaultmailserver?: Maybe<Scalars['Float']['output']>;
  dsridforcrmsales?: Maybe<Scalars['Float']['output']>;
  dsridforcrmservice?: Maybe<Scalars['Float']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailaccount?: Maybe<Emailaccount>;
  enterastab?: Maybe<Scalars['Float']['output']>;
  expiredate?: Maybe<Scalars['Date']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  grpid?: Maybe<Scalars['Float']['output']>;
  hasauthority?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  iscashier?: Maybe<Scalars['Float']['output']>;
  isosuser?: Maybe<Scalars['Float']['output']>;
  isportalvisiblebydefault?: Maybe<Scalars['Float']['output']>;
  lastchpwd?: Maybe<Scalars['Date']['output']>;
  mailserverpolicy?: Maybe<Scalars['Float']['output']>;
  minagricusr?: Maybe<Scalars['String']['output']>;
  minagricusrafm?: Maybe<Scalars['String']['output']>;
  minagricusrshopcode?: Maybe<Scalars['String']['output']>;
  mobilephone?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  passwordErrorTries?: Maybe<Scalars['Float']['output']>;
  passwordHistoryList?: Maybe<Scalars['String']['output']>;
  phonedialext?: Maybe<Scalars['String']['output']>;
  phonedialpwd?: Maybe<Scalars['String']['output']>;
  phonedialurl?: Maybe<Scalars['String']['output']>;
  phonedialuser?: Maybe<Scalars['String']['output']>;
  pwd?: Maybe<Scalars['String']['output']>;
  qlikflags?: Maybe<Scalars['Float']['output']>;
  relativegrpids?: Maybe<Scalars['String']['output']>;
  restrictedbranches?: Maybe<Scalars['Float']['output']>;
  ssoadmin?: Maybe<Scalars['Float']['output']>;
  supervisor?: Maybe<Scalars['Float']['output']>;
  systemreminders?: Maybe<Scalars['Float']['output']>;
  systemremindersperiod?: Maybe<Scalars['Float']['output']>;
  touchretaildeleteitems?: Maybe<Scalars['Float']['output']>;
  touchretaildiscount?: Maybe<Scalars['Float']['output']>;
  touchretailopendrawer?: Maybe<Scalars['Float']['output']>;
  touchretailreprint?: Maybe<Scalars['Float']['output']>;
  userauthbyssoprovider?: Maybe<Scalars['Float']['output']>;
  usercustommainmenu?: Maybe<Scalars['Float']['output']>;
  userlogininfos?: Maybe<Array<Userlogininfo>>;
  usershortcuts?: Maybe<Array<Usershortcuts>>;
  usgid?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  allMachinePauses: Array<PanelMachinePauses>;
  allowedLocations: Array<Location>;
  availableCoils: CoilsResponse;
  coil?: Maybe<Coil>;
  coilColor?: Maybe<CoilColorType>;
  coilColors: Array<CoilColorType>;
  coils: CoilsResponse;
  customer?: Maybe<Customer>;
  customers: CustomerResponse;
  expectedCoils: CoilsResponse;
  fintradeSync?: Maybe<FintradeSync>;
  fintradeSyncs: FintradeSyncResponse;
  location?: Maybe<Location>;
  locations: Array<Location>;
  machinePause: PanelMachinePauses;
  machinePausesByOrder: Array<PanelMachinePauses>;
  masterlength?: Maybe<Masterlength>;
  masterlengths: Array<Masterlength>;
  me: Users;
  panelProduction: ProdOrdersViewResponse;
  panelProductionByCount: Array<ProdOrdersView>;
  panelProductionOrdersExt2?: Maybe<ProdOrdersView>;
  panelSpeed?: Maybe<PanelSpeeds>;
  panelSpeeds: Array<PanelSpeeds>;
  ppackage?: Maybe<PPackages>;
  ppackages: Array<PPackages>;
  ppackagesGrouped: Array<PpackagesSummary>;
  /** Get a single production order by ID */
  pporder: Pporders;
  pporderline2?: Maybe<Pporderlines2>;
  pporderlines2: Pporderlines2Response;
  /** Get all production orders */
  pporders: Array<Pporders>;
  recipe: Recipe;
  recipes: Array<Recipe>;
  status?: Maybe<StatusType>;
  statusByName?: Maybe<StatusType>;
  statuses: Array<StatusType>;
  user?: Maybe<Users>;
  users: Array<Users>;
  workingHours?: Maybe<WorkingHours>;
  workingHoursAll: Array<WorkingHours>;
};


export type QueryAllowedLocationsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryAvailableCoilsArgs = {
  filter?: InputMaybe<CoilsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Array<CoilsSortInput>>;
};


export type QueryCoilArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCoilColorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCoilsArgs = {
  filter?: InputMaybe<CoilsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCustomerArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCustomersArgs = {
  filter?: InputMaybe<CustomerFilterInput>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<CustomerSortInput>>;
};


export type QueryExpectedCoilsArgs = {
  filter?: InputMaybe<CoilsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Array<CoilsSortInput>>;
};


export type QueryFintradeSyncArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFintradeSyncsArgs = {
  filter?: InputMaybe<FintradeSyncFilterInput>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<FintradeSyncSortInput>>;
};


export type QueryLocationArgs = {
  locationId: Scalars['Int']['input'];
};


export type QueryMachinePauseArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMachinePausesByOrderArgs = {
  orderId: Scalars['Int']['input'];
};


export type QueryMasterlengthArgs = {
  pporderno: Scalars['String']['input'];
};


export type QueryMasterlengthsArgs = {
  filter?: InputMaybe<MasterlengthFilterInput>;
};


export type QueryPanelProductionArgs = {
  filter?: InputMaybe<ProdOrdersViewFilterInput>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<ProdOrdersViewSortInput>>;
};


export type QueryPanelProductionByCountArgs = {
  count: Scalars['Int']['input'];
};


export type QueryPanelProductionOrdersExt2Args = {
  prodOrder: Scalars['String']['input'];
};


export type QueryPanelSpeedArgs = {
  code: Scalars['String']['input'];
};


export type QueryPpackageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPporderArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPporderline2Args = {
  id: Scalars['Int']['input'];
};


export type QueryPporderlines2Args = {
  filter?: InputMaybe<Pporderlines2FilterInput>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<Pporderlines2SortInput>>;
};


export type QueryPpordersArgs = {
  filter?: InputMaybe<PpordersFilterInput>;
};


export type QueryRecipeArgs = {
  id: Scalars['String']['input'];
};


export type QueryRecipesArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryStatusArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStatusByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryWorkingHoursArgs = {
  date: Scalars['String']['input'];
};

/** recipe */
export type Recipe = {
  creationDate: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ingredients: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type Reliability = {
  acccrdlimit?: Maybe<Scalars['Float']['output']>;
  acccrdlimitpwd?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  continuity?: Maybe<Scalars['Float']['output']>;
  customers?: Maybe<Array<Customer>>;
  daysofoutstandinginvoice?: Maybe<Scalars['Float']['output']>;
  daysofoutstandinginvoicepwd?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  disclimit?: Maybe<Scalars['Float']['output']>;
  disclimitpwd?: Maybe<Scalars['String']['output']>;
  fdtmode?: Maybe<Scalars['Float']['output']>;
  fdtmodepwd?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  logexpr?: Maybe<Scalars['String']['output']>;
  logexprlimit?: Maybe<Scalars['Float']['output']>;
  logexprlimitpwd?: Maybe<Scalars['String']['output']>;
  meanduetime?: Maybe<Scalars['Float']['output']>;
  meanduetimepwd?: Maybe<Scalars['String']['output']>;
  meanpaylimit?: Maybe<Scalars['Float']['output']>;
  meanpaylimitpwd?: Maybe<Scalars['String']['output']>;
  msg?: Maybe<Scalars['String']['output']>;
  opencrdlimit?: Maybe<Scalars['Float']['output']>;
  opencrdlimitpwd?: Maybe<Scalars['String']['output']>;
  orderlimit?: Maybe<Scalars['Float']['output']>;
  orderlimitpwd?: Maybe<Scalars['String']['output']>;
  pgrouplines?: Maybe<Array<Pgrouplines>>;
  ptrmode?: Maybe<Scalars['Float']['output']>;
  ptrmodepwd?: Maybe<Scalars['String']['output']>;
  pwd?: Maybe<Scalars['String']['output']>;
  pwdscript?: Maybe<Scalars['String']['output']>;
  reliablines?: Maybe<Array<Reliablines>>;
  rlbmode?: Maybe<Scalars['Float']['output']>;
  selfopencrdlimit?: Maybe<Scalars['Float']['output']>;
  selfopencrdlimitpwd?: Maybe<Scalars['String']['output']>;
  transdoclimit?: Maybe<Scalars['Float']['output']>;
  transdoclimitpwd?: Maybe<Scalars['String']['output']>;
  valuelimit?: Maybe<Scalars['Float']['output']>;
  valuelimitpwd?: Maybe<Scalars['String']['output']>;
  varpwd?: Maybe<Scalars['Float']['output']>;
};

export type Reliablines = {
  id: Scalars['Float']['output'];
  link?: Maybe<Reliability>;
  paymentterms?: Maybe<Paymentterms>;
  rlbid?: Maybe<Scalars['Float']['output']>;
  tradeid?: Maybe<Scalars['Float']['output']>;
};

export type Retailparams = {
  allowreturncash?: Maybe<Scalars['Float']['output']>;
  barcodemode?: Maybe<Scalars['Float']['output']>;
  billdsrid?: Maybe<Scalars['Float']['output']>;
  blncrttid?: Maybe<Scalars['Float']['output']>;
  bragroupatitle?: Maybe<Scalars['String']['output']>;
  bragroupbtitle?: Maybe<Scalars['String']['output']>;
  closrttid?: Maybe<Scalars['Float']['output']>;
  colorsizemode?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  cusid?: Maybe<Scalars['Float']['output']>;
  custsearchfields?: Maybe<Scalars['String']['output']>;
  dpstrttid?: Maybe<Scalars['Float']['output']>;
  findfirstdatepayment?: Maybe<Scalars['Float']['output']>;
  loadbranchsalesmen?: Maybe<Scalars['Float']['output']>;
  openrttid?: Maybe<Scalars['Float']['output']>;
  prpid?: Maybe<Scalars['Float']['output']>;
  recalclinevaluesoncuschange?: Maybe<Scalars['Float']['output']>;
  repeatednewrecord?: Maybe<Scalars['Float']['output']>;
  showbankdepositsasexpenses?: Maybe<Scalars['Float']['output']>;
  showpicture?: Maybe<Scalars['Float']['output']>;
  useretailserviceforonoff?: Maybe<Scalars['Float']['output']>;
};

export type Retailparamsext = {
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
};

export type Route = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  descr2?: Maybe<Scalars['String']['output']>;
  prefecture?: Maybe<Scalars['String']['output']>;
  storetrades?: Maybe<Array<Storetrade>>;
};

export type RssLinks = {
  description?: Maybe<Scalars['String']['output']>;
  domainkind?: Maybe<Scalars['Float']['output']>;
  gdenable?: Maybe<Scalars['Float']['output']>;
  groupid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastupdate?: Maybe<Scalars['Date']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  parentid?: Maybe<Scalars['Float']['output']>;
  pubdate?: Maybe<Scalars['Date']['output']>;
  rssNews?: Maybe<Array<RssNews>>;
  sitelink?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userid?: Maybe<Scalars['Float']['output']>;
};

export type RssNews = {
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isread?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  pubdate?: Maybe<Scalars['Date']['output']>;
  rssl?: Maybe<RssLinks>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Salesman = {
  abcmask?: Maybe<Scalars['String']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  ageid?: Maybe<Scalars['Float']['output']>;
  birthdate?: Maybe<Scalars['Date']['output']>;
  braid?: Maybe<Scalars['Float']['output']>;
  canbuy?: Maybe<Scalars['Float']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cnt?: Maybe<Country>;
  code?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  compellation?: Maybe<Scalars['Float']['output']>;
  cur?: Maybe<Currency>;
  customers?: Maybe<Array<Customer>>;
  customers2?: Maybe<Array<Customer>>;
  custtradelines?: Maybe<Array<Custtradelines>>;
  district?: Maybe<Scalars['String']['output']>;
  eduid?: Maybe<Scalars['Float']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  famid?: Maybe<Scalars['Float']['output']>;
  fax?: Maybe<Scalars['String']['output']>;
  fintradeSync?: Maybe<Array<FintradeSync>>;
  fintrades?: Maybe<Array<Fintrade>>;
  geo?: Maybe<Geogrpos>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  iscollector?: Maybe<Scalars['Float']['output']>;
  isrepr?: Maybe<Scalars['Float']['output']>;
  issalesman?: Maybe<Scalars['Float']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pdaAllowvaluechanges?: Maybe<Scalars['Float']['output']>;
  pdaBlkid?: Maybe<Scalars['Float']['output']>;
  pdaCashdsrid?: Maybe<Scalars['Float']['output']>;
  pdaPwd?: Maybe<Scalars['String']['output']>;
  pdaSalesdsrid?: Maybe<Scalars['Float']['output']>;
  phone1?: Maybe<Scalars['String']['output']>;
  phone2?: Maybe<Scalars['String']['output']>;
  rate01?: Maybe<Scalars['Float']['output']>;
  rate02?: Maybe<Scalars['Float']['output']>;
  recordright?: Maybe<Scalars['Float']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  salesmen?: Maybe<Array<Salesman>>;
  smnidsup?: Maybe<Salesman>;
  street?: Maybe<Scalars['String']['output']>;
  telex?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  usgid?: Maybe<Scalars['Float']['output']>;
  usrid?: Maybe<Scalars['Float']['output']>;
  zipcode1?: Maybe<Scalars['String']['output']>;
};

export type Salesparams = {
  autodeleteguritem?: Maybe<Scalars['Float']['output']>;
  autodelproductions?: Maybe<Scalars['Float']['output']>;
  autopdfsavefolder?: Maybe<Scalars['String']['output']>;
  autopdfsavemode?: Maybe<Scalars['Float']['output']>;
  autopdfsaveperpost?: Maybe<Scalars['Float']['output']>;
  buscostingmode?: Maybe<Scalars['Float']['output']>;
  busselectmode?: Maybe<Scalars['Float']['output']>;
  calcmode?: Maybe<Scalars['Float']['output']>;
  calcpersontrasportation?: Maybe<Scalars['Float']['output']>;
  checknegativedoctotvalue?: Maybe<Scalars['Float']['output']>;
  checkoffer?: Maybe<Scalars['Float']['output']>;
  cntidoriginpurchaseslines?: Maybe<Scalars['Float']['output']>;
  cntidoriginsaleslines?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  custdiscount?: Maybe<Scalars['Float']['output']>;
  custmaxdisccheckmode?: Maybe<Scalars['Float']['output']>;
  custmode?: Maybe<Scalars['Float']['output']>;
  custposition?: Maybe<Scalars['Float']['output']>;
  custsearchfields?: Maybe<Scalars['String']['output']>;
  defaultbusid?: Maybe<Scalars['Float']['output']>;
  delimeter?: Maybe<Scalars['String']['output']>;
  dimlength1?: Maybe<Scalars['Float']['output']>;
  dimlength2?: Maybe<Scalars['Float']['output']>;
  dimlength3?: Maybe<Scalars['Float']['output']>;
  dimlength4?: Maybe<Scalars['Float']['output']>;
  dimlength5?: Maybe<Scalars['Float']['output']>;
  dimstr1?: Maybe<Scalars['String']['output']>;
  dimstr2?: Maybe<Scalars['String']['output']>;
  dimstr3?: Maybe<Scalars['String']['output']>;
  dimstr4?: Maybe<Scalars['String']['output']>;
  dimstr5?: Maybe<Scalars['String']['output']>;
  docamountincludeswarranty?: Maybe<Scalars['Float']['output']>;
  docwithclosefolderchange?: Maybe<Scalars['Float']['output']>;
  einvRootdir?: Maybe<Scalars['String']['output']>;
  insertnewcustomeraftersearch?: Maybe<Scalars['Float']['output']>;
  intrastatdatemode?: Maybe<Scalars['Float']['output']>;
  intrnegmode?: Maybe<Scalars['Float']['output']>;
  ite?: Maybe<Material>;
  itemdiscount?: Maybe<Scalars['Float']['output']>;
  itemmaxdisccheckmode?: Maybe<Scalars['Float']['output']>;
  itemmaxdiscountlinecheck?: Maybe<Scalars['Float']['output']>;
  itemposition?: Maybe<Scalars['Float']['output']>;
  keepoutzeropartitions?: Maybe<Scalars['Float']['output']>;
  noweightcalc?: Maybe<Scalars['Float']['output']>;
  pcreditdsrid?: Maybe<Scalars['Float']['output']>;
  pdaPrpid?: Maybe<Scalars['Float']['output']>;
  pextradim?: Maybe<Scalars['Float']['output']>;
  prosp1?: Maybe<Scalars['String']['output']>;
  prosp2?: Maybe<Scalars['String']['output']>;
  prosp3?: Maybe<Scalars['String']['output']>;
  prosp4?: Maybe<Scalars['String']['output']>;
  prpolicydiscount?: Maybe<Scalars['Float']['output']>;
  prpolicyoverride?: Maybe<Scalars['Float']['output']>;
  pstockcreditdsrid?: Maybe<Scalars['Float']['output']>;
  purchasesautoapplygiftsmode?: Maybe<Scalars['Float']['output']>;
  purchasestotsedit?: Maybe<Scalars['Float']['output']>;
  purchbarcodemode?: Maybe<Scalars['Float']['output']>;
  purchcfomask?: Maybe<Scalars['String']['output']>;
  purchdsrid?: Maybe<Scalars['Float']['output']>;
  purchtradedupl?: Maybe<Scalars['Float']['output']>;
  qtychangeautosnmode?: Maybe<Scalars['Float']['output']>;
  requiredbus?: Maybe<Scalars['Float']['output']>;
  rtdsrid?: Maybe<Scalars['Float']['output']>;
  salesautoapplygiftsmode?: Maybe<Scalars['Float']['output']>;
  salesbarcodemode?: Maybe<Scalars['Float']['output']>;
  salescfomask?: Maybe<Scalars['String']['output']>;
  salesdsrid?: Maybe<Scalars['Float']['output']>;
  salestotsedit?: Maybe<Scalars['Float']['output']>;
  salestradedupl?: Maybe<Scalars['Float']['output']>;
  screditdsrid?: Maybe<Scalars['Float']['output']>;
  setorderstransformed?: Maybe<Scalars['Float']['output']>;
  sextradim?: Maybe<Scalars['Float']['output']>;
  showperwarningonchange?: Maybe<Scalars['Float']['output']>;
  showwarningondiffstoids?: Maybe<Scalars['Float']['output']>;
  slsdsrid?: Maybe<Scalars['Float']['output']>;
  specpercust?: Maybe<Scalars['Float']['output']>;
  srcdiscount?: Maybe<Scalars['Float']['output']>;
  srcposition?: Maybe<Scalars['Float']['output']>;
  srvdsrid?: Maybe<Scalars['Float']['output']>;
  sstockcreditdsrid?: Maybe<Scalars['Float']['output']>;
  sumcolorsize?: Maybe<Scalars['Float']['output']>;
  supdiscount?: Maybe<Scalars['Float']['output']>;
  supposition?: Maybe<Scalars['Float']['output']>;
  syncordqtys?: Maybe<Scalars['Float']['output']>;
  thirdstorecheckmode?: Maybe<Scalars['Float']['output']>;
  tied1?: Maybe<Scalars['String']['output']>;
  tied2?: Maybe<Scalars['String']['output']>;
  tied3?: Maybe<Scalars['String']['output']>;
  tied4?: Maybe<Scalars['String']['output']>;
  transcomp?: Maybe<Scalars['Float']['output']>;
  transformstockcheckmode?: Maybe<Scalars['Float']['output']>;
  varcomtrades?: Maybe<Varcomtrades>;
  varcomtrades2?: Maybe<Varcomtrades>;
  varcomtrades3?: Maybe<Varcomtrades>;
  varcomtrades4?: Maybe<Varcomtrades>;
  varcomtrades5?: Maybe<Varcomtrades>;
  vctdsrid?: Maybe<Scalars['Float']['output']>;
  warrantyvatcategory?: Maybe<Scalars['Float']['output']>;
  wsdsrid?: Maybe<Scalars['Float']['output']>;
};

export type Serviceparams = {
  autolength?: Maybe<Scalars['Float']['output']>;
  calccarprice?: Maybe<Scalars['Float']['output']>;
  campaignsliveupdate?: Maybe<Scalars['Float']['output']>;
  carcodemask?: Maybe<Scalars['String']['output']>;
  ccardprice?: Maybe<Scalars['Float']['output']>;
  ccardpricepc?: Maybe<Scalars['Float']['output']>;
  checkmfcexpdate?: Maybe<Scalars['Float']['output']>;
  cntidprovideservices?: Maybe<Scalars['Float']['output']>;
  cntidreceiptservices?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  costperhour?: Maybe<Scalars['Float']['output']>;
  crsid?: Maybe<Scalars['Float']['output']>;
  cusautolength?: Maybe<Scalars['Float']['output']>;
  cuspaddchar?: Maybe<Scalars['String']['output']>;
  cusprecode?: Maybe<Scalars['String']['output']>;
  delimiter?: Maybe<Scalars['String']['output']>;
  deprcoef?: Maybe<Scalars['Float']['output']>;
  dlrid?: Maybe<Scalars['Float']['output']>;
  expvalue?: Maybe<Scalars['Float']['output']>;
  guatime?: Maybe<Scalars['Float']['output']>;
  invintperid?: Maybe<Scalars['Float']['output']>;
  itemfromsnnoguar?: Maybe<Scalars['Float']['output']>;
  keepplaisioatevaluation?: Maybe<Scalars['Float']['output']>;
  loadfrmlf?: Maybe<Scalars['Float']['output']>;
  manualcarprice?: Maybe<Scalars['Float']['output']>;
  masscardinvoicing?: Maybe<Scalars['Float']['output']>;
  maxvalue?: Maybe<Scalars['Float']['output']>;
  mfcdelbehav?: Maybe<Scalars['Float']['output']>;
  mfcdelinvbehav?: Maybe<Scalars['Float']['output']>;
  mfcdsrid?: Maybe<Scalars['Float']['output']>;
  mlcdsrid?: Maybe<Scalars['Float']['output']>;
  mlfid?: Maybe<Scalars['Float']['output']>;
  mlfperite?: Maybe<Scalars['Float']['output']>;
  mlfsubsrcs?: Maybe<Scalars['Float']['output']>;
  mlssrdid?: Maybe<Scalars['Float']['output']>;
  modelcodemask?: Maybe<Scalars['String']['output']>;
  mu1?: Maybe<Scalars['Float']['output']>;
  numperguar?: Maybe<Scalars['Float']['output']>;
  orderdsrid?: Maybe<Scalars['Float']['output']>;
  paddchar?: Maybe<Scalars['String']['output']>;
  pdistatus?: Maybe<Scalars['Float']['output']>;
  percmaxvalue?: Maybe<Scalars['Float']['output']>;
  precode?: Maybe<Scalars['String']['output']>;
  pricefrommaster?: Maybe<Scalars['Float']['output']>;
  priceorder?: Maybe<Scalars['Float']['output']>;
  readystatus?: Maybe<Scalars['Float']['output']>;
  recspareqty?: Maybe<Scalars['Float']['output']>;
  recsrdid?: Maybe<Scalars['String']['output']>;
  rtlfpamode?: Maybe<Scalars['Float']['output']>;
  sernumcodemask?: Maybe<Scalars['String']['output']>;
  servicestoid?: Maybe<Scalars['Float']['output']>;
  shipsrdid?: Maybe<Scalars['String']['output']>;
  sparebarcodemode?: Maybe<Scalars['Float']['output']>;
  sparediscount?: Maybe<Scalars['Float']['output']>;
  sparestoid?: Maybe<Scalars['Float']['output']>;
  srcgift?: Maybe<Scalars['Float']['output']>;
  srcperite?: Maybe<Scalars['Float']['output']>;
  srcprctype?: Maybe<Scalars['Float']['output']>;
  srcsrdid?: Maybe<Scalars['Float']['output']>;
  srcvirtualinv?: Maybe<Scalars['Float']['output']>;
  srvautolength?: Maybe<Scalars['Float']['output']>;
  srvcodemask?: Maybe<Scalars['String']['output']>;
  srvcodememo?: Maybe<Scalars['String']['output']>;
  srvcodemode?: Maybe<Scalars['Float']['output']>;
  srvcodenum?: Maybe<Scalars['Float']['output']>;
  srvconautolength?: Maybe<Scalars['Float']['output']>;
  srvconcodemask?: Maybe<Scalars['String']['output']>;
  srvconcodememo?: Maybe<Scalars['String']['output']>;
  srvconcodemode?: Maybe<Scalars['Float']['output']>;
  srvcondelimiter?: Maybe<Scalars['String']['output']>;
  srvcondsrid?: Maybe<Scalars['Float']['output']>;
  srvconpaddchar?: Maybe<Scalars['String']['output']>;
  srvconservice?: Maybe<Scalars['Float']['output']>;
  srvconvalidatesum?: Maybe<Scalars['Float']['output']>;
  srvpaddchar?: Maybe<Scalars['String']['output']>;
  stdcost?: Maybe<Scalars['Float']['output']>;
  stdcosttype?: Maybe<Scalars['Float']['output']>;
  stockcheckaction?: Maybe<Scalars['Float']['output']>;
  stockcheckmode?: Maybe<Scalars['Float']['output']>;
  surid?: Maybe<Scalars['Float']['output']>;
  techschedule?: Maybe<Scalars['Float']['output']>;
  tecremarksstlfield?: Maybe<Scalars['Float']['output']>;
  tiedmode?: Maybe<Scalars['Float']['output']>;
  tiedspare?: Maybe<Scalars['Float']['output']>;
  transcomp?: Maybe<Scalars['Float']['output']>;
  usecampaigns?: Maybe<Scalars['Float']['output']>;
  usecostperhour?: Maybe<Scalars['Float']['output']>;
  usemaintenancecontracts?: Maybe<Scalars['Float']['output']>;
  useremsn?: Maybe<Scalars['Float']['output']>;
  virtualinv?: Maybe<Scalars['Float']['output']>;
  vtcid?: Maybe<Scalars['Float']['output']>;
  whsmlssrdid?: Maybe<Scalars['Float']['output']>;
  whssrcsrdid?: Maybe<Scalars['Float']['output']>;
  workpcent?: Maybe<Scalars['Float']['output']>;
};

export type Shipcause = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  fuelcause?: Maybe<Scalars['Float']['output']>;
  mydatacode?: Maybe<Scalars['Float']['output']>;
  storetrades?: Maybe<Array<Storetrade>>;
};

export type Shipvia = {
  codeid?: Maybe<Scalars['Float']['output']>;
  customers?: Maybe<Array<Customer>>;
  descr?: Maybe<Scalars['String']['output']>;
  edicode?: Maybe<Scalars['String']['output']>;
  fuelvia?: Maybe<Scalars['Float']['output']>;
  intrastatcode?: Maybe<Scalars['String']['output']>;
  storetrades?: Maybe<Array<Storetrade>>;
  suppliers?: Maybe<Array<Supplier>>;
};

export type Sizelist = {
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  materials?: Maybe<Array<Material>>;
  materials2?: Maybe<Array<Material>>;
  materials3?: Maybe<Array<Material>>;
  size1?: Maybe<Scalars['String']['output']>;
  size2?: Maybe<Scalars['String']['output']>;
  size3?: Maybe<Scalars['String']['output']>;
  size4?: Maybe<Scalars['String']['output']>;
  size5?: Maybe<Scalars['String']['output']>;
  size6?: Maybe<Scalars['String']['output']>;
  size7?: Maybe<Scalars['String']['output']>;
  size8?: Maybe<Scalars['String']['output']>;
  size9?: Maybe<Scalars['String']['output']>;
  size10?: Maybe<Scalars['String']['output']>;
  size11?: Maybe<Scalars['String']['output']>;
  size12?: Maybe<Scalars['String']['output']>;
  size13?: Maybe<Scalars['String']['output']>;
  size14?: Maybe<Scalars['String']['output']>;
  size15?: Maybe<Scalars['String']['output']>;
  size16?: Maybe<Scalars['String']['output']>;
  size17?: Maybe<Scalars['String']['output']>;
  size18?: Maybe<Scalars['String']['output']>;
  size19?: Maybe<Scalars['String']['output']>;
  size20?: Maybe<Scalars['String']['output']>;
};

export type SortOrder =
  | 'ASC'
  | 'DESC';

export type Speccolorsize = {
  alterite?: Maybe<Material>;
  ccolorcode?: Maybe<Scalars['String']['output']>;
  cite?: Maybe<Material>;
  cqty?: Maybe<Scalars['Float']['output']>;
  csize?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  pcolorcode?: Maybe<Scalars['String']['output']>;
  pite?: Maybe<Material>;
  pqty?: Maybe<Scalars['Float']['output']>;
  psize?: Maybe<Scalars['Float']['output']>;
  specificationlines?: Maybe<Specificationlines>;
};

export type Specification = {
  braid?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  convcoef?: Maybe<Scalars['Float']['output']>;
  cus?: Maybe<Customer>;
  descr?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  fromdate?: Maybe<Scalars['Date']['output']>;
  greids?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  pccoef?: Maybe<Scalars['Float']['output']>;
  pccoef1?: Maybe<Scalars['Float']['output']>;
  pccoef2?: Maybe<Scalars['Float']['output']>;
  pccoef3?: Maybe<Scalars['Float']['output']>;
  pccoef4?: Maybe<Scalars['Float']['output']>;
  pccoef5?: Maybe<Scalars['Float']['output']>;
  phasegroup?: Maybe<Phasegroup>;
  phsgroupid?: Maybe<Scalars['Float']['output']>;
  primaryqty?: Maybe<Scalars['Float']['output']>;
  prodtime?: Maybe<Scalars['Float']['output']>;
  prodtimemu?: Maybe<Scalars['Float']['output']>;
  prodtimesetup?: Maybe<Scalars['Float']['output']>;
  prodtimewait?: Maybe<Scalars['Float']['output']>;
  reloadqty?: Maybe<Scalars['Float']['output']>;
  reloadtime?: Maybe<Scalars['Float']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  secondaryqty?: Maybe<Scalars['Float']['output']>;
  specificationlines?: Maybe<Array<Specificationlines>>;
  specificationlines2?: Maybe<Array<Specificationlines>>;
  specresources?: Maybe<Array<Specresource>>;
  storetradelines?: Maybe<Array<Storetradelines>>;
  storetrades?: Maybe<Array<Storetrade>>;
  todate?: Maybe<Scalars['Date']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  waste?: Maybe<Scalars['Float']['output']>;
};

export type Specificationlines = {
  colortmp?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  ite?: Maybe<Material>;
  linenum?: Maybe<Scalars['Float']['output']>;
  linetype?: Maybe<Scalars['Float']['output']>;
  pccoef?: Maybe<Scalars['Float']['output']>;
  primaryqty?: Maybe<Scalars['Float']['output']>;
  qtytmp?: Maybe<Scalars['Float']['output']>;
  qtytype?: Maybe<Scalars['Float']['output']>;
  relspc?: Maybe<Specification>;
  secondaryqty?: Maybe<Scalars['Float']['output']>;
  sizetmp?: Maybe<Scalars['Float']['output']>;
  spc?: Maybe<Specification>;
  spcid?: Maybe<Scalars['Float']['output']>;
  speccolorsizes?: Maybe<Array<Speccolorsize>>;
  waste?: Maybe<Scalars['Float']['output']>;
  wastesetup?: Maybe<Scalars['Float']['output']>;
  wastetype?: Maybe<Scalars['Float']['output']>;
};

export type Specresource = {
  calctype?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  modifiable?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  phgid?: Maybe<Scalars['Float']['output']>;
  phsid?: Maybe<Scalars['Float']['output']>;
  resamount?: Maybe<Scalars['Float']['output']>;
  resid?: Maybe<Scalars['Float']['output']>;
  reskind?: Maybe<Scalars['Float']['output']>;
  resvalue?: Maybe<Scalars['Float']['output']>;
  spc?: Maybe<Specification>;
  spcid?: Maybe<Scalars['Float']['output']>;
};

export type Spsurcharges = {
  atype?: Maybe<Scalars['Float']['output']>;
  calcmode?: Maybe<Scalars['Float']['output']>;
  changemode?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  condexpvalue?: Maybe<Scalars['String']['output']>;
  debitmode?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  efkmode?: Maybe<Scalars['Float']['output']>;
  expensesanalyses?: Maybe<Array<Expensesanalysis>>;
  expvalue?: Maybe<Scalars['Float']['output']>;
  formexpvalue?: Maybe<Scalars['String']['output']>;
  fpamode?: Maybe<Scalars['Float']['output']>;
  glpurseg?: Maybe<Scalars['String']['output']>;
  glsalesseg?: Maybe<Scalars['String']['output']>;
  includevat?: Maybe<Scalars['Float']['output']>;
  intrastatmode?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  isthirdpartysales?: Maybe<Scalars['Float']['output']>;
  iswithholding?: Maybe<Scalars['Float']['output']>;
  itemcostmode?: Maybe<Scalars['Float']['output']>;
  keepvatstatus?: Maybe<Scalars['Float']['output']>;
  kepyomode?: Maybe<Scalars['Float']['output']>;
  materials?: Maybe<Array<Material>>;
  materials2?: Maybe<Array<Material>>;
  materials3?: Maybe<Array<Material>>;
  materials4?: Maybe<Array<Material>>;
  materials5?: Maybe<Array<Material>>;
  mydatacatid?: Maybe<Scalars['Float']['output']>;
  mydatacode?: Maybe<Scalars['Float']['output']>;
  mydataexpclasscat?: Maybe<Scalars['String']['output']>;
  mydataexpclasstype?: Maybe<Scalars['String']['output']>;
  mydataincclasscat?: Maybe<Scalars['String']['output']>;
  mydataincclasstype?: Maybe<Scalars['String']['output']>;
  rlmode?: Maybe<Scalars['Float']['output']>;
  sourcetype?: Maybe<Scalars['Float']['output']>;
  stockmode?: Maybe<Scalars['Float']['output']>;
  taxfreeid?: Maybe<Scalars['Float']['output']>;
  turnovermode?: Maybe<Scalars['Float']['output']>;
  usedbyitems?: Maybe<Scalars['Float']['output']>;
  vatpurseg?: Maybe<Scalars['String']['output']>;
  vatsalesseg?: Maybe<Scalars['String']['output']>;
  vtc?: Maybe<Vatcategory>;
};

export type Status = {
  coils: Array<Coils>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nameGr?: Maybe<Scalars['String']['output']>;
  nameGr2?: Maybe<Scalars['String']['output']>;
  nameGrp?: Maybe<Scalars['String']['output']>;
  selection1?: Maybe<Scalars['Int']['output']>;
  selection2?: Maybe<Scalars['Int']['output']>;
  selection3?: Maybe<Scalars['Int']['output']>;
  selection4?: Maybe<Scalars['Int']['output']>;
  selection5?: Maybe<Scalars['Int']['output']>;
};

export type StatusType = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nameGr?: Maybe<Scalars['String']['output']>;
  nameGr2?: Maybe<Scalars['String']['output']>;
  nameGrp?: Maybe<Scalars['String']['output']>;
  selection1?: Maybe<Scalars['Int']['output']>;
  selection2?: Maybe<Scalars['Int']['output']>;
  selection3?: Maybe<Scalars['Int']['output']>;
  selection4?: Maybe<Scalars['Int']['output']>;
  selection5?: Maybe<Scalars['Int']['output']>;
};

export type Storagebin = {
  code?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
  store?: Maybe<Store>;
  storetradelines?: Maybe<Array<Storetradelines>>;
};

export type Store = {
  accmask?: Maybe<Scalars['String']['output']>;
  braid?: Maybe<Scalars['Float']['output']>;
  branches?: Maybe<Array<Branch>>;
  branches2?: Maybe<Array<Branch>>;
  branches3?: Maybe<Array<Branch>>;
  city?: Maybe<Scalars['String']['output']>;
  cnt?: Maybe<Country>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  fax?: Maybe<Scalars['String']['output']>;
  gln?: Maybe<Scalars['String']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  isthirdstore?: Maybe<Scalars['Float']['output']>;
  mydataclassificationother?: Maybe<Scalars['Float']['output']>;
  mydataclassificationsetupcode?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone1?: Maybe<Scalars['String']['output']>;
  phone2?: Maybe<Scalars['String']['output']>;
  rawmaterialstoid?: Maybe<Scalars['Float']['output']>;
  shortcut?: Maybe<Scalars['String']['output']>;
  storagebins?: Maybe<Array<Storagebin>>;
  storetradelines?: Maybe<Array<Storetradelines>>;
  storetradelines2?: Maybe<Array<Storetradelines>>;
  storetrades?: Maybe<Array<Storetrade>>;
  storetrades2?: Maybe<Array<Storetrade>>;
  street?: Maybe<Scalars['String']['output']>;
  surface?: Maybe<Scalars['Float']['output']>;
  transporters?: Maybe<Scalars['String']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type Storebalancesheet = {
  billedinpqty?: Maybe<Scalars['Float']['output']>;
  billedoutqty?: Maybe<Scalars['Float']['output']>;
  calcdate?: Maybe<Scalars['Date']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  consumptionqty?: Maybe<Scalars['Float']['output']>;
  consumptionvalue?: Maybe<Scalars['Float']['output']>;
  costaccingrvalue?: Maybe<Scalars['Float']['output']>;
  costacclbrvalue?: Maybe<Scalars['Float']['output']>;
  costaccvhdvalue?: Maybe<Scalars['Float']['output']>;
  costvalue?: Maybe<Scalars['Float']['output']>;
  exportprqty?: Maybe<Scalars['Float']['output']>;
  exportsecqty?: Maybe<Scalars['Float']['output']>;
  exportthirdqty?: Maybe<Scalars['Float']['output']>;
  exportvalue?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  importprqty?: Maybe<Scalars['Float']['output']>;
  importsecqty?: Maybe<Scalars['Float']['output']>;
  importvalue?: Maybe<Scalars['Float']['output']>;
  ingredientvalue?: Maybe<Scalars['Float']['output']>;
  laborvalue?: Maybe<Scalars['Float']['output']>;
  master?: Maybe<Material>;
  masterid?: Maybe<Scalars['Float']['output']>;
  overheadvalue?: Maybe<Scalars['Float']['output']>;
  productionqty?: Maybe<Scalars['Float']['output']>;
  productionvalue?: Maybe<Scalars['Float']['output']>;
  purchasesqty?: Maybe<Scalars['Float']['output']>;
  purchasesvalue?: Maybe<Scalars['Float']['output']>;
  salescost?: Maybe<Scalars['Float']['output']>;
  salesqty?: Maybe<Scalars['Float']['output']>;
  salesvalue?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
  taxfreeqty?: Maybe<Scalars['Float']['output']>;
  thirdqty?: Maybe<Scalars['Float']['output']>;
  value1?: Maybe<Scalars['Float']['output']>;
  value2?: Maybe<Scalars['Float']['output']>;
  value3?: Maybe<Scalars['Float']['output']>;
  value4?: Maybe<Scalars['Float']['output']>;
  value5?: Maybe<Scalars['Float']['output']>;
  value6?: Maybe<Scalars['Float']['output']>;
  value7?: Maybe<Scalars['Float']['output']>;
  value8?: Maybe<Scalars['Float']['output']>;
  value9?: Maybe<Scalars['Float']['output']>;
  value10?: Maybe<Scalars['Float']['output']>;
  value11?: Maybe<Scalars['Float']['output']>;
  value12?: Maybe<Scalars['Float']['output']>;
  value13?: Maybe<Scalars['Float']['output']>;
  value14?: Maybe<Scalars['Float']['output']>;
  value15?: Maybe<Scalars['Float']['output']>;
  value16?: Maybe<Scalars['Float']['output']>;
};

export type Storecolorsize = {
  colineno?: Maybe<Scalars['Float']['output']>;
  colorcode?: Maybe<Scalars['String']['output']>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  itecolor?: Maybe<Itecolor>;
  price1?: Maybe<Scalars['Float']['output']>;
  price2?: Maybe<Scalars['Float']['output']>;
  price3?: Maybe<Scalars['Float']['output']>;
  price4?: Maybe<Scalars['Float']['output']>;
  price5?: Maybe<Scalars['Float']['output']>;
  price6?: Maybe<Scalars['Float']['output']>;
  price7?: Maybe<Scalars['Float']['output']>;
  price8?: Maybe<Scalars['Float']['output']>;
  price9?: Maybe<Scalars['Float']['output']>;
  price10?: Maybe<Scalars['Float']['output']>;
  price11?: Maybe<Scalars['Float']['output']>;
  price12?: Maybe<Scalars['Float']['output']>;
  price13?: Maybe<Scalars['Float']['output']>;
  price14?: Maybe<Scalars['Float']['output']>;
  price15?: Maybe<Scalars['Float']['output']>;
  price16?: Maybe<Scalars['Float']['output']>;
  price17?: Maybe<Scalars['Float']['output']>;
  price18?: Maybe<Scalars['Float']['output']>;
  price19?: Maybe<Scalars['Float']['output']>;
  price20?: Maybe<Scalars['Float']['output']>;
  size1?: Maybe<Scalars['Float']['output']>;
  size2?: Maybe<Scalars['Float']['output']>;
  size3?: Maybe<Scalars['Float']['output']>;
  size4?: Maybe<Scalars['Float']['output']>;
  size5?: Maybe<Scalars['Float']['output']>;
  size6?: Maybe<Scalars['Float']['output']>;
  size7?: Maybe<Scalars['Float']['output']>;
  size8?: Maybe<Scalars['Float']['output']>;
  size9?: Maybe<Scalars['Float']['output']>;
  size10?: Maybe<Scalars['Float']['output']>;
  size11?: Maybe<Scalars['Float']['output']>;
  size12?: Maybe<Scalars['Float']['output']>;
  size13?: Maybe<Scalars['Float']['output']>;
  size14?: Maybe<Scalars['Float']['output']>;
  size15?: Maybe<Scalars['Float']['output']>;
  size16?: Maybe<Scalars['Float']['output']>;
  size17?: Maybe<Scalars['Float']['output']>;
  size18?: Maybe<Scalars['Float']['output']>;
  size19?: Maybe<Scalars['Float']['output']>;
  size20?: Maybe<Scalars['Float']['output']>;
  stlid?: Maybe<Scalars['Float']['output']>;
};

export type Storefindata = {
  comid?: Maybe<Scalars['Float']['output']>;
  lastexportdate?: Maybe<Scalars['Date']['output']>;
  lastimportdate?: Maybe<Scalars['Date']['output']>;
  master?: Maybe<Material>;
  masterid?: Maybe<Scalars['Float']['output']>;
  primaryqty?: Maybe<Scalars['Float']['output']>;
  prospqty?: Maybe<Scalars['Float']['output']>;
  prospqty1?: Maybe<Scalars['Float']['output']>;
  prospqty2?: Maybe<Scalars['Float']['output']>;
  prospqty3?: Maybe<Scalars['Float']['output']>;
  prospqty4?: Maybe<Scalars['Float']['output']>;
  prospsecqty?: Maybe<Scalars['Float']['output']>;
  secondaryqty?: Maybe<Scalars['Float']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
  tiedqty?: Maybe<Scalars['Float']['output']>;
  tiedqty1?: Maybe<Scalars['Float']['output']>;
  tiedqty2?: Maybe<Scalars['Float']['output']>;
  tiedqty3?: Maybe<Scalars['Float']['output']>;
  tiedqty4?: Maybe<Scalars['Float']['output']>;
  tiedsecqty?: Maybe<Scalars['Float']['output']>;
  value1?: Maybe<Scalars['Float']['output']>;
  value2?: Maybe<Scalars['Float']['output']>;
  value3?: Maybe<Scalars['Float']['output']>;
  value4?: Maybe<Scalars['Float']['output']>;
  value5?: Maybe<Scalars['Float']['output']>;
  value6?: Maybe<Scalars['Float']['output']>;
  value7?: Maybe<Scalars['Float']['output']>;
  value8?: Maybe<Scalars['Float']['output']>;
  value9?: Maybe<Scalars['Float']['output']>;
  value10?: Maybe<Scalars['Float']['output']>;
  value11?: Maybe<Scalars['Float']['output']>;
  value12?: Maybe<Scalars['Float']['output']>;
  value13?: Maybe<Scalars['Float']['output']>;
  value14?: Maybe<Scalars['Float']['output']>;
  value15?: Maybe<Scalars['Float']['output']>;
  value16?: Maybe<Scalars['Float']['output']>;
};

export type Storetrade = {
  arjid?: Maybe<Scalars['Float']['output']>;
  asbid?: Maybe<Scalars['Float']['output']>;
  billtoaddid?: Maybe<Scalars['Float']['output']>;
  billtoperid?: Maybe<Scalars['Float']['output']>;
  bincode?: Maybe<Scalars['String']['output']>;
  binseccode?: Maybe<Scalars['String']['output']>;
  brasecid?: Maybe<Scalars['Float']['output']>;
  carrier?: Maybe<Carrier>;
  cnt?: Maybe<Country>;
  contactphone?: Maybe<Scalars['String']['output']>;
  cprid?: Maybe<Scalars['Float']['output']>;
  cusfullname?: Maybe<Scalars['String']['output']>;
  cushomecity?: Maybe<Scalars['String']['output']>;
  cushomestreet?: Maybe<Scalars['String']['output']>;
  cushomezipcode?: Maybe<Scalars['String']['output']>;
  cusidentitynum?: Maybe<Scalars['String']['output']>;
  cusissuecntid?: Maybe<Scalars['Float']['output']>;
  custftrid?: Maybe<Scalars['Float']['output']>;
  customcode?: Maybe<Scalars['String']['output']>;
  dczid?: Maybe<Scalars['Float']['output']>;
  deliverydate?: Maybe<Scalars['Date']['output']>;
  deliverytime?: Maybe<Scalars['Date']['output']>;
  depositvalue?: Maybe<Scalars['Float']['output']>;
  dispatchdate?: Maybe<Scalars['Date']['output']>;
  dkid?: Maybe<Scalars['Float']['output']>;
  dlvtypeid?: Maybe<Scalars['Float']['output']>;
  expvalue1?: Maybe<Scalars['Float']['output']>;
  expvalue2?: Maybe<Scalars['Float']['output']>;
  fdtintcode?: Maybe<Scalars['String']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fttid?: Maybe<Scalars['Float']['output']>;
  geo?: Maybe<Geogrpos>;
  greids?: Maybe<Scalars['String']['output']>;
  grossdiscount?: Maybe<Scalars['Float']['output']>;
  info_39A?: Maybe<Scalars['String']['output']>;
  intexpenses?: Maybe<Scalars['Float']['output']>;
  intlexpenses?: Maybe<Scalars['Float']['output']>;
  intoutexpenses?: Maybe<Scalars['Float']['output']>;
  intoutlexpenses?: Maybe<Scalars['Float']['output']>;
  intrastatdate?: Maybe<Scalars['Date']['output']>;
  intrastatid?: Maybe<Scalars['Float']['output']>;
  intrastatmode?: Maybe<Scalars['Float']['output']>;
  inttriangle?: Maybe<Scalars['Float']['output']>;
  isreplacement?: Maybe<Scalars['Float']['output']>;
  lcustomvatvalue?: Maybe<Scalars['Float']['output']>;
  ledifactrate?: Maybe<Scalars['Float']['output']>;
  lnetamount?: Maybe<Scalars['Float']['output']>;
  lotcode?: Maybe<Scalars['String']['output']>;
  lotexpiredate?: Maybe<Scalars['Date']['output']>;
  lvaldisc?: Maybe<Scalars['Float']['output']>;
  modvat?: Maybe<Scalars['Float']['output']>;
  mpsid?: Maybe<Scalars['Float']['output']>;
  netamount?: Maybe<Scalars['Float']['output']>;
  ordbyaddid?: Maybe<Scalars['Float']['output']>;
  ordbyperid?: Maybe<Scalars['Float']['output']>;
  par?: Maybe<Partition>;
  pccoef?: Maybe<Scalars['Float']['output']>;
  pccoef1?: Maybe<Scalars['Float']['output']>;
  pccoef2?: Maybe<Scalars['Float']['output']>;
  pccoef3?: Maybe<Scalars['Float']['output']>;
  pccoef4?: Maybe<Scalars['Float']['output']>;
  pccoef5?: Maybe<Scalars['Float']['output']>;
  pestuploadstatus?: Maybe<Scalars['Float']['output']>;
  phasegroup?: Maybe<Phasegroup>;
  prcdisc?: Maybe<Scalars['Float']['output']>;
  prcdisc1?: Maybe<Scalars['Float']['output']>;
  prcdisc2?: Maybe<Scalars['Float']['output']>;
  prdftrid?: Maybe<Scalars['Float']['output']>;
  prevtrades?: Maybe<Scalars['String']['output']>;
  prpolicystr?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Float']['output']>;
  qty2?: Maybe<Scalars['Float']['output']>;
  reprperid?: Maybe<Scalars['Float']['output']>;
  retpayPrpolicystr?: Maybe<Scalars['String']['output']>;
  retqtyPrpolicystr?: Maybe<Scalars['String']['output']>;
  route?: Maybe<Route>;
  salescost?: Maybe<Scalars['Float']['output']>;
  scnid?: Maybe<Scalars['Float']['output']>;
  secjustification?: Maybe<Scalars['String']['output']>;
  shipaddress?: Maybe<Scalars['String']['output']>;
  shiparea?: Maybe<Scalars['String']['output']>;
  shipcause?: Maybe<Shipcause>;
  shipcity?: Maybe<Scalars['String']['output']>;
  shipzipcode?: Maybe<Scalars['String']['output']>;
  shptoaddid?: Maybe<Scalars['Float']['output']>;
  shptoperid?: Maybe<Scalars['Float']['output']>;
  shv?: Maybe<Shipvia>;
  shvintcode?: Maybe<Scalars['String']['output']>;
  spc?: Maybe<Specification>;
  status?: Maybe<Scalars['Float']['output']>;
  store?: Maybe<Store>;
  store2?: Maybe<Store>;
  stouserid?: Maybe<Scalars['Float']['output']>;
  taxagentperid?: Maybe<Scalars['Float']['output']>;
  taxfreeid?: Maybe<Scalars['Float']['output']>;
  tnetamount?: Maybe<Scalars['Float']['output']>;
  transportation?: Maybe<Transportation>;
  tvaldisc?: Maybe<Scalars['Float']['output']>;
  updatedest?: Maybe<Scalars['Float']['output']>;
  valdisc?: Maybe<Scalars['Float']['output']>;
  valdisc1?: Maybe<Scalars['Float']['output']>;
  valdisc2?: Maybe<Scalars['Float']['output']>;
  vatstatus?: Maybe<Scalars['Float']['output']>;
  viesmode?: Maybe<Scalars['Float']['output']>;
  waste?: Maybe<Scalars['Float']['output']>;
  yaatid?: Maybe<Scalars['Float']['output']>;
};

export type Storetradelines = {
  arIscanceled?: Maybe<Scalars['Float']['output']>;
  binseccode?: Maybe<Scalars['String']['output']>;
  bunits?: Maybe<Bunits>;
  bunits2?: Maybe<Bunits>;
  ccoid?: Maybe<Scalars['Float']['output']>;
  cmpid?: Maybe<Scalars['Float']['output']>;
  compmode?: Maybe<Scalars['Float']['output']>;
  cpvcategory?: Maybe<Scalars['String']['output']>;
  customefkvalue?: Maybe<Scalars['Float']['output']>;
  deliveredprimaryqty?: Maybe<Scalars['Float']['output']>;
  deliveredqty?: Maybe<Scalars['Float']['output']>;
  deliveredsecondaryqty?: Maybe<Scalars['Float']['output']>;
  deliverydate?: Maybe<Scalars['Date']['output']>;
  deliverytime?: Maybe<Scalars['Date']['output']>;
  dim1?: Maybe<Scalars['Float']['output']>;
  dim2?: Maybe<Scalars['Float']['output']>;
  dim3?: Maybe<Scalars['Float']['output']>;
  efkvalue?: Maybe<Scalars['Float']['output']>;
  extqty?: Maybe<Scalars['Float']['output']>;
  extstr1?: Maybe<Scalars['String']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  giftqty?: Maybe<Scalars['Float']['output']>;
  helpitemlink?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  intvatamount?: Maybe<Scalars['Float']['output']>;
  iqcid?: Maybe<Scalars['Float']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  itemlinevalue?: Maybe<Scalars['Float']['output']>;
  itemlinevaluefull?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  linetype?: Maybe<Scalars['Float']['output']>;
  linevalue?: Maybe<Scalars['Float']['output']>;
  litemlinevalue?: Maybe<Scalars['Float']['output']>;
  llinevalue?: Maybe<Scalars['Float']['output']>;
  lnetlinevalue?: Maybe<Scalars['Float']['output']>;
  lotcode?: Maybe<Scalars['String']['output']>;
  lvaldisc1?: Maybe<Scalars['Float']['output']>;
  lvaldisc2?: Maybe<Scalars['Float']['output']>;
  lvatamount?: Maybe<Scalars['Float']['output']>;
  mlsid?: Maybe<Scalars['Float']['output']>;
  muid?: Maybe<Scalars['Float']['output']>;
  mumode?: Maybe<Scalars['Float']['output']>;
  netlinevalue?: Maybe<Scalars['Float']['output']>;
  numusr1?: Maybe<Scalars['Float']['output']>;
  numusr2?: Maybe<Scalars['Float']['output']>;
  numusr3?: Maybe<Scalars['Float']['output']>;
  origincntid?: Maybe<Scalars['Float']['output']>;
  otherfiscalyear?: Maybe<Scalars['Float']['output']>;
  par?: Maybe<Partition>;
  pccoef?: Maybe<Scalars['Float']['output']>;
  pestcauseid?: Maybe<Scalars['Float']['output']>;
  pestcontainerqty?: Maybe<Scalars['Float']['output']>;
  pestcropid?: Maybe<Scalars['Float']['output']>;
  pestdimosid?: Maybe<Scalars['Float']['output']>;
  pestdrugid?: Maybe<Scalars['Float']['output']>;
  pestperid?: Maybe<Scalars['Float']['output']>;
  pestunitid?: Maybe<Scalars['Float']['output']>;
  prcdisc1?: Maybe<Scalars['Float']['output']>;
  prcdisc2?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  primaryqty?: Maybe<Scalars['Float']['output']>;
  processgroup?: Maybe<Processgroup>;
  prpolicystr?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['Float']['output']>;
  recycleprice?: Maybe<Scalars['Float']['output']>;
  recyclevalue?: Maybe<Scalars['Float']['output']>;
  recyclevat?: Maybe<Scalars['Float']['output']>;
  relstlid?: Maybe<Scalars['Float']['output']>;
  salescost?: Maybe<Scalars['Float']['output']>;
  secjustification?: Maybe<Scalars['String']['output']>;
  secondaryqty?: Maybe<Scalars['Float']['output']>;
  selectbarcode?: Maybe<Scalars['String']['output']>;
  smnid?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  spc?: Maybe<Specification>;
  stodate?: Maybe<Scalars['Date']['output']>;
  storagebin?: Maybe<Storagebin>;
  store?: Maybe<Store>;
  store2?: Maybe<Store>;
  storenewpriqty?: Maybe<Scalars['Float']['output']>;
  storenewsecqty?: Maybe<Scalars['Float']['output']>;
  supplieritecode?: Maybe<Scalars['String']['output']>;
  valdisc1?: Maybe<Scalars['Float']['output']>;
  valdisc2?: Maybe<Scalars['Float']['output']>;
  vatamount?: Maybe<Scalars['Float']['output']>;
  vatamountfull?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  vtcid?: Maybe<Scalars['Float']['output']>;
  waste?: Maybe<Scalars['Float']['output']>;
  wastesetup?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  zccolorcode1?: Maybe<Scalars['String']['output']>;
  zccolorcode2?: Maybe<Scalars['String']['output']>;
  zcflineid?: Maybe<Scalars['Float']['output']>;
  zciteid1?: Maybe<Scalars['Float']['output']>;
  zciteid2?: Maybe<Scalars['Float']['output']>;
  zextshape?: Maybe<Scalars['String']['output']>;
  zintshape?: Maybe<Scalars['String']['output']>;
  zpftrid?: Maybe<Scalars['Float']['output']>;
  zstatus?: Maybe<Scalars['Float']['output']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilterInput = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  pporderUpdated: Pporders;
  pporderlineStatusChanged: Pporderlines2;
  recipeAdded: Recipe;
};

export type Substitute = {
  colorcode?: Maybe<Scalars['String']['output']>;
  isean13?: Maybe<Scalars['Float']['output']>;
  ite?: Maybe<Material>;
  iteid?: Maybe<Scalars['Float']['output']>;
  masterqty?: Maybe<Scalars['Float']['output']>;
  sizepos?: Maybe<Scalars['Float']['output']>;
  substiteid?: Maybe<Scalars['Float']['output']>;
  substitutecode?: Maybe<Scalars['String']['output']>;
  substitutedescr?: Maybe<Scalars['String']['output']>;
  substqty?: Maybe<Scalars['Float']['output']>;
};

export type Suppaddress = {
  carid?: Maybe<Scalars['Float']['output']>;
  cdoyid?: Maybe<Scalars['Float']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cnt?: Maybe<Country>;
  code?: Maybe<Scalars['String']['output']>;
  colidsalesman?: Maybe<Scalars['Float']['output']>;
  contactperson?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dipethecode?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  expvalue1?: Maybe<Scalars['Float']['output']>;
  expvalue2?: Maybe<Scalars['Float']['output']>;
  faxnumber?: Maybe<Scalars['String']['output']>;
  fpastatus?: Maybe<Scalars['Float']['output']>;
  geo?: Maybe<Geogrpos>;
  gln?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  per?: Maybe<Supplier>;
  phone1?: Maybe<Scalars['String']['output']>;
  phone2?: Maybe<Scalars['String']['output']>;
  ptrid?: Maybe<Scalars['Float']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  rotid?: Maybe<Scalars['Float']['output']>;
  shvid?: Maybe<Scalars['Float']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  taxfreeid?: Maybe<Scalars['Float']['output']>;
  telex?: Maybe<Scalars['String']['output']>;
  trsid?: Maybe<Scalars['Float']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type Supparams = {
  accountmaskdef?: Maybe<Scalars['String']['output']>;
  autolength?: Maybe<Scalars['Float']['output']>;
  bankaccsuptrddupl?: Maybe<Scalars['Float']['output']>;
  banksupdsrid?: Maybe<Scalars['Float']['output']>;
  cntiddef?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  curiddef?: Maybe<Scalars['Float']['output']>;
  delimeter?: Maybe<Scalars['String']['output']>;
  equivcheckmode?: Maybe<Scalars['Float']['output']>;
  equivminusid?: Maybe<Scalars['Float']['output']>;
  equivmndsrid?: Maybe<Scalars['Float']['output']>;
  equivpldsrid?: Maybe<Scalars['Float']['output']>;
  equivplusid?: Maybe<Scalars['Float']['output']>;
  fpastatusdef?: Maybe<Scalars['Float']['output']>;
  geoiddef?: Maybe<Scalars['Float']['output']>;
  nosyncrelsup?: Maybe<Scalars['Float']['output']>;
  ocpiddef?: Maybe<Scalars['Float']['output']>;
  omodedef?: Maybe<Scalars['Float']['output']>;
  paddchar?: Maybe<Scalars['String']['output']>;
  ptriddef?: Maybe<Scalars['Float']['output']>;
  searchshowremain?: Maybe<Scalars['Float']['output']>;
  shviddef?: Maybe<Scalars['Float']['output']>;
  supfintrddupl?: Maybe<Scalars['Float']['output']>;
  supfundtrddupl?: Maybe<Scalars['Float']['output']>;
  supmaturecoef0?: Maybe<Scalars['Float']['output']>;
  supmaturecoef1?: Maybe<Scalars['Float']['output']>;
  supmaturecoef2?: Maybe<Scalars['Float']['output']>;
  supmaturecoef3?: Maybe<Scalars['Float']['output']>;
  supmaturecoef4?: Maybe<Scalars['Float']['output']>;
  supmaturecoef5?: Maybe<Scalars['Float']['output']>;
  supmaturecoef6?: Maybe<Scalars['Float']['output']>;
  supmaturecoef7?: Maybe<Scalars['Float']['output']>;
  supmaturecoef8?: Maybe<Scalars['Float']['output']>;
  supmaturecoef9?: Maybe<Scalars['Float']['output']>;
  supmaturecoef10?: Maybe<Scalars['Float']['output']>;
  supmaturecoef11?: Maybe<Scalars['Float']['output']>;
  supmaturecoef12?: Maybe<Scalars['Float']['output']>;
  supmaturecoef13?: Maybe<Scalars['Float']['output']>;
  supmaturecoef14?: Maybe<Scalars['Float']['output']>;
  supmaturecoef15?: Maybe<Scalars['Float']['output']>;
  supmaturecoef100?: Maybe<Scalars['Float']['output']>;
  supmaturedescr1?: Maybe<Scalars['String']['output']>;
  supmaturedescr2?: Maybe<Scalars['String']['output']>;
  supmaturedescr3?: Maybe<Scalars['String']['output']>;
  supmaturedescr4?: Maybe<Scalars['String']['output']>;
  supmaturedescr5?: Maybe<Scalars['String']['output']>;
  supmaturedescr6?: Maybe<Scalars['String']['output']>;
  supmaturedescr7?: Maybe<Scalars['String']['output']>;
  supmaturedescr8?: Maybe<Scalars['String']['output']>;
  supmaturedescr9?: Maybe<Scalars['String']['output']>;
  supmaturedescr10?: Maybe<Scalars['String']['output']>;
  supmaturedescr11?: Maybe<Scalars['String']['output']>;
  supmaturedescr12?: Maybe<Scalars['String']['output']>;
  supmaturedescr13?: Maybe<Scalars['String']['output']>;
  supmaturedescr14?: Maybe<Scalars['String']['output']>;
  supmaturedescr15?: Maybe<Scalars['String']['output']>;
  supmaturefrom1?: Maybe<Scalars['Float']['output']>;
  supmaturefrom2?: Maybe<Scalars['Float']['output']>;
  supmaturefrom3?: Maybe<Scalars['Float']['output']>;
  supmaturefrom4?: Maybe<Scalars['Float']['output']>;
  supmaturefrom5?: Maybe<Scalars['Float']['output']>;
  supmaturefrom6?: Maybe<Scalars['Float']['output']>;
  supmaturefrom7?: Maybe<Scalars['Float']['output']>;
  supmaturefrom8?: Maybe<Scalars['Float']['output']>;
  supmaturefrom9?: Maybe<Scalars['Float']['output']>;
  supmaturefrom10?: Maybe<Scalars['Float']['output']>;
  supmaturefrom11?: Maybe<Scalars['Float']['output']>;
  supmaturefrom12?: Maybe<Scalars['Float']['output']>;
  supmaturefrom13?: Maybe<Scalars['Float']['output']>;
  supmaturefrom14?: Maybe<Scalars['Float']['output']>;
  supmaturefrom15?: Maybe<Scalars['Float']['output']>;
  supmatureto1?: Maybe<Scalars['Float']['output']>;
  supmatureto2?: Maybe<Scalars['Float']['output']>;
  supmatureto3?: Maybe<Scalars['Float']['output']>;
  supmatureto4?: Maybe<Scalars['Float']['output']>;
  supmatureto5?: Maybe<Scalars['Float']['output']>;
  supmatureto6?: Maybe<Scalars['Float']['output']>;
  supmatureto7?: Maybe<Scalars['Float']['output']>;
  supmatureto8?: Maybe<Scalars['Float']['output']>;
  supmatureto9?: Maybe<Scalars['Float']['output']>;
  supmatureto10?: Maybe<Scalars['Float']['output']>;
  supmatureto11?: Maybe<Scalars['Float']['output']>;
  supmatureto12?: Maybe<Scalars['Float']['output']>;
  supmatureto13?: Maybe<Scalars['Float']['output']>;
  supmatureto14?: Maybe<Scalars['Float']['output']>;
  supmatureto15?: Maybe<Scalars['Float']['output']>;
  supocpids?: Maybe<Scalars['String']['output']>;
  suppliercodemask?: Maybe<Scalars['String']['output']>;
  suppliercodememo?: Maybe<Scalars['String']['output']>;
  suppliercodemode?: Maybe<Scalars['Float']['output']>;
  supsuptrddupl?: Maybe<Scalars['Float']['output']>;
  svdsrid?: Maybe<Scalars['Float']['output']>;
  title1?: Maybe<Scalars['String']['output']>;
  title2?: Maybe<Scalars['String']['output']>;
  title3?: Maybe<Scalars['String']['output']>;
  title4?: Maybe<Scalars['String']['output']>;
  title5?: Maybe<Scalars['String']['output']>;
  title6?: Maybe<Scalars['String']['output']>;
  title7?: Maybe<Scalars['String']['output']>;
  title8?: Maybe<Scalars['String']['output']>;
  title9?: Maybe<Scalars['String']['output']>;
  title10?: Maybe<Scalars['String']['output']>;
  title11?: Maybe<Scalars['String']['output']>;
  title12?: Maybe<Scalars['String']['output']>;
  title13?: Maybe<Scalars['String']['output']>;
  title14?: Maybe<Scalars['String']['output']>;
  title15?: Maybe<Scalars['String']['output']>;
  title16?: Maybe<Scalars['String']['output']>;
};

export type Suppbalancesheet = {
  comid?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  lperiodcredit?: Maybe<Scalars['Float']['output']>;
  lperioddebit?: Maybe<Scalars['Float']['output']>;
  lperiodturnover?: Maybe<Scalars['Float']['output']>;
  master?: Maybe<Supplier>;
  masterid?: Maybe<Scalars['Float']['output']>;
  masterperiodcredit?: Maybe<Scalars['Float']['output']>;
  masterperioddebit?: Maybe<Scalars['Float']['output']>;
  masterperiodturnover?: Maybe<Scalars['Float']['output']>;
  value5?: Maybe<Scalars['Float']['output']>;
  value6?: Maybe<Scalars['Float']['output']>;
  value7?: Maybe<Scalars['Float']['output']>;
  value8?: Maybe<Scalars['Float']['output']>;
  value9?: Maybe<Scalars['Float']['output']>;
  value10?: Maybe<Scalars['Float']['output']>;
  value11?: Maybe<Scalars['Float']['output']>;
  value12?: Maybe<Scalars['Float']['output']>;
  value13?: Maybe<Scalars['Float']['output']>;
  value14?: Maybe<Scalars['Float']['output']>;
  value15?: Maybe<Scalars['Float']['output']>;
  value16?: Maybe<Scalars['Float']['output']>;
  value17?: Maybe<Scalars['Float']['output']>;
  value18?: Maybe<Scalars['Float']['output']>;
  value19?: Maybe<Scalars['Float']['output']>;
  value20?: Maybe<Scalars['Float']['output']>;
};

export type Suppbankaccount = {
  accountnum?: Maybe<Scalars['String']['output']>;
  beneficiary?: Maybe<Scalars['String']['output']>;
  bnk?: Maybe<Bank>;
  iban?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  per?: Maybe<Supplier>;
  remarks?: Maybe<Scalars['String']['output']>;
  suptradelines?: Maybe<Array<Suptradelines>>;
};

export type Suppfindata = {
  calcdate?: Maybe<Scalars['Date']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  curfyeidmeanpaytime?: Maybe<Scalars['Float']['output']>;
  lastcreditdate?: Maybe<Scalars['Date']['output']>;
  lastdebitdate?: Maybe<Scalars['Date']['output']>;
  lgenindefinitebalance?: Maybe<Scalars['Float']['output']>;
  lmasterbalance?: Maybe<Scalars['Float']['output']>;
  lselfindefinitebalance?: Maybe<Scalars['Float']['output']>;
  master?: Maybe<Supplier>;
  masterbalance?: Maybe<Scalars['Float']['output']>;
  masterid?: Maybe<Scalars['Float']['output']>;
  meanduetime?: Maybe<Scalars['Float']['output']>;
  meanpaymenttime?: Maybe<Scalars['Float']['output']>;
  upddate?: Maybe<Scalars['Date']['output']>;
  value5?: Maybe<Scalars['Float']['output']>;
  value6?: Maybe<Scalars['Float']['output']>;
  value7?: Maybe<Scalars['Float']['output']>;
  value8?: Maybe<Scalars['Float']['output']>;
  value9?: Maybe<Scalars['Float']['output']>;
  value10?: Maybe<Scalars['Float']['output']>;
  value11?: Maybe<Scalars['Float']['output']>;
  value12?: Maybe<Scalars['Float']['output']>;
  value13?: Maybe<Scalars['Float']['output']>;
  value14?: Maybe<Scalars['Float']['output']>;
  value15?: Maybe<Scalars['Float']['output']>;
  value16?: Maybe<Scalars['Float']['output']>;
  value17?: Maybe<Scalars['Float']['output']>;
  value18?: Maybe<Scalars['Float']['output']>;
  value19?: Maybe<Scalars['Float']['output']>;
  value20?: Maybe<Scalars['Float']['output']>;
};

export type Supplier = {
  abcmask?: Maybe<Scalars['String']['output']>;
  accmask?: Maybe<Scalars['String']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  afmstate?: Maybe<Scalars['Float']['output']>;
  afmstatecheckdate?: Maybe<Scalars['Date']['output']>;
  afmstateexcludecheck?: Maybe<Scalars['Float']['output']>;
  alarm?: Maybe<Scalars['Float']['output']>;
  autoemail?: Maybe<Scalars['String']['output']>;
  autoemailenabled?: Maybe<Scalars['Float']['output']>;
  autoemailsendto?: Maybe<Scalars['Float']['output']>;
  busid?: Maybe<Scalars['Float']['output']>;
  carid?: Maybe<Scalars['Float']['output']>;
  carrier?: Maybe<Scalars['String']['output']>;
  city1?: Maybe<Scalars['String']['output']>;
  city2?: Maybe<Scalars['String']['output']>;
  closingdate?: Maybe<Scalars['Date']['output']>;
  cnt?: Maybe<Country>;
  code?: Maybe<Scalars['String']['output']>;
  com?: Maybe<Company>;
  comedicode?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  consentdate?: Maybe<Scalars['Date']['output']>;
  cur?: Maybe<Currency>;
  defaultdiscount?: Maybe<Scalars['Float']['output']>;
  dipethe?: Maybe<Scalars['String']['output']>;
  district1?: Maybe<Scalars['String']['output']>;
  district2?: Maybe<Scalars['String']['output']>;
  dlvtype?: Maybe<Deliverytype>;
  doy?: Maybe<Doy>;
  edicode?: Maybe<Scalars['String']['output']>;
  einvbarcode?: Maybe<Scalars['Float']['output']>;
  einveqitecode?: Maybe<Scalars['Float']['output']>;
  einvoicecansend?: Maybe<Scalars['Float']['output']>;
  einvoicesendmethod?: Maybe<Scalars['Float']['output']>;
  einvoicetags?: Maybe<Scalars['String']['output']>;
  einvoiceupload?: Maybe<Scalars['Float']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  entrydate?: Maybe<Scalars['Date']['output']>;
  expvalue1?: Maybe<Scalars['Float']['output']>;
  expvalue2?: Maybe<Scalars['Float']['output']>;
  fathername?: Maybe<Scalars['String']['output']>;
  fax1?: Maybe<Scalars['String']['output']>;
  fax2?: Maybe<Scalars['String']['output']>;
  fintrades?: Maybe<Array<Fintrade>>;
  flddate1?: Maybe<Scalars['Date']['output']>;
  flddate2?: Maybe<Scalars['Date']['output']>;
  flddate3?: Maybe<Scalars['Date']['output']>;
  fldfloat1?: Maybe<Scalars['Float']['output']>;
  fldfloat2?: Maybe<Scalars['Float']['output']>;
  fldfloat3?: Maybe<Scalars['Float']['output']>;
  fldfloat4?: Maybe<Scalars['Float']['output']>;
  fldfloat5?: Maybe<Scalars['Float']['output']>;
  fldfloat6?: Maybe<Scalars['Float']['output']>;
  fldstring1?: Maybe<Scalars['String']['output']>;
  fldstring2?: Maybe<Scalars['String']['output']>;
  fldstring3?: Maybe<Scalars['String']['output']>;
  fldstring4?: Maybe<Scalars['String']['output']>;
  fldstring5?: Maybe<Scalars['String']['output']>;
  fldstring6?: Maybe<Scalars['String']['output']>;
  fltid1?: Maybe<Scalars['Float']['output']>;
  fltid2?: Maybe<Scalars['Float']['output']>;
  fltid3?: Maybe<Scalars['Float']['output']>;
  fpastatus?: Maybe<Scalars['Float']['output']>;
  geo?: Maybe<Geogrpos>;
  gln?: Maybe<Scalars['String']['output']>;
  grp?: Maybe<Pgroup>;
  id: Scalars['Float']['output'];
  identitynum?: Maybe<Scalars['String']['output']>;
  involvessv?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  isfarmer?: Maybe<Scalars['Float']['output']>;
  isgdpr?: Maybe<Scalars['Float']['output']>;
  issuecntid?: Maybe<Scalars['Float']['output']>;
  itemsups?: Maybe<Array<Itemsup>>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  lastupddate?: Maybe<Scalars['Date']['output']>;
  legalf?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  npgid?: Maybe<Scalars['Float']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  ocp?: Maybe<Occupation>;
  omode?: Maybe<Scalars['Float']['output']>;
  paymentterms?: Maybe<Paymentterms>;
  per?: Maybe<Customer>;
  phone11?: Maybe<Scalars['String']['output']>;
  phone12?: Maybe<Scalars['String']['output']>;
  phone21?: Maybe<Scalars['String']['output']>;
  phone22?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  resid?: Maybe<Scalars['Float']['output']>;
  scnid?: Maybe<Scalars['Float']['output']>;
  shv?: Maybe<Shipvia>;
  startdate?: Maybe<Scalars['Date']['output']>;
  stoid?: Maybe<Scalars['Float']['output']>;
  street1?: Maybe<Scalars['String']['output']>;
  street2?: Maybe<Scalars['String']['output']>;
  subcontractor?: Maybe<Scalars['Float']['output']>;
  supcustcode?: Maybe<Scalars['String']['output']>;
  suppaddresses?: Maybe<Array<Suppaddress>>;
  suppbalancesheets?: Maybe<Array<Suppbalancesheet>>;
  suppbankaccounts?: Maybe<Array<Suppbankaccount>>;
  suppfindata?: Maybe<Suppfindata>;
  suppliertrans?: Maybe<Array<Suppliertrans>>;
  suppresppeople?: Maybe<Array<Supprespperson>>;
  suptradelines?: Maybe<Array<Suptradelines>>;
  taxfreeid?: Maybe<Scalars['Float']['output']>;
  telex1?: Maybe<Scalars['String']['output']>;
  telex2?: Maybe<Scalars['String']['output']>;
  warning?: Maybe<Scalars['String']['output']>;
  webpage?: Maybe<Scalars['String']['output']>;
  zipcode1?: Maybe<Scalars['String']['output']>;
  zipcode2?: Maybe<Scalars['String']['output']>;
};

export type Suppliertrans = {
  addid?: Maybe<Scalars['Float']['output']>;
  braid?: Maybe<Scalars['Float']['output']>;
  busid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  creditupd?: Maybe<Scalars['Float']['output']>;
  curid?: Maybe<Scalars['Float']['output']>;
  debitupd?: Maybe<Scalars['Float']['output']>;
  doccode?: Maybe<Scalars['String']['output']>;
  expiredate?: Maybe<Scalars['Date']['output']>;
  extravalue1?: Maybe<Scalars['Float']['output']>;
  extravalue2?: Maybe<Scalars['Float']['output']>;
  extravalue3?: Maybe<Scalars['Float']['output']>;
  extravalue4?: Maybe<Scalars['Float']['output']>;
  fdtid?: Maybe<Scalars['Float']['output']>;
  fipid?: Maybe<Scalars['Float']['output']>;
  flag5?: Maybe<Scalars['Float']['output']>;
  flag6?: Maybe<Scalars['Float']['output']>;
  flag7?: Maybe<Scalars['Float']['output']>;
  flag8?: Maybe<Scalars['Float']['output']>;
  flag9?: Maybe<Scalars['Float']['output']>;
  flag10?: Maybe<Scalars['Float']['output']>;
  flag11?: Maybe<Scalars['Float']['output']>;
  flag12?: Maybe<Scalars['Float']['output']>;
  flag13?: Maybe<Scalars['Float']['output']>;
  flag14?: Maybe<Scalars['Float']['output']>;
  flag15?: Maybe<Scalars['Float']['output']>;
  flag16?: Maybe<Scalars['Float']['output']>;
  flag17?: Maybe<Scalars['Float']['output']>;
  flag18?: Maybe<Scalars['Float']['output']>;
  flag19?: Maybe<Scalars['Float']['output']>;
  flag20?: Maybe<Scalars['Float']['output']>;
  ftdid?: Maybe<Scalars['Float']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  isopening?: Maybe<Scalars['Float']['output']>;
  justification?: Maybe<Scalars['String']['output']>;
  ltrnvalue?: Maybe<Scalars['Float']['output']>;
  lturnover?: Maybe<Scalars['Float']['output']>;
  oldltrnvalue?: Maybe<Scalars['Float']['output']>;
  openamount?: Maybe<Scalars['Float']['output']>;
  openitemtype?: Maybe<Scalars['Float']['output']>;
  per?: Maybe<Supplier>;
  perid?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  suptrntype?: Maybe<Suptrntype>;
  tnacode?: Maybe<Scalars['String']['output']>;
  tradecode?: Maybe<Scalars['String']['output']>;
  trndate?: Maybe<Scalars['Date']['output']>;
  trnvalue?: Maybe<Scalars['Float']['output']>;
  ttrnvalue?: Maybe<Scalars['Float']['output']>;
  tturnover?: Maybe<Scalars['Float']['output']>;
  turnover?: Maybe<Scalars['Float']['output']>;
  turnoverupd?: Maybe<Scalars['Float']['output']>;
};

export type Supprespperson = {
  consentdate?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  mobile?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  per?: Maybe<Supplier>;
  privatephone?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
};

export type Suptradelines = {
  addid?: Maybe<Scalars['Float']['output']>;
  ban?: Maybe<Suppbankaccount>;
  bntrnid?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  diffexchval?: Maybe<Scalars['Float']['output']>;
  epaycode?: Maybe<Scalars['String']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  ftrpaidid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  justification?: Maybe<Scalars['String']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  linevalue?: Maybe<Scalars['Float']['output']>;
  llinevalue?: Maybe<Scalars['Float']['output']>;
  perlinevalue?: Maybe<Scalars['Float']['output']>;
  perrate?: Maybe<Scalars['Float']['output']>;
  refcode?: Maybe<Scalars['String']['output']>;
  sodata?: Maybe<Scalars['String']['output']>;
  sorefstatus?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<Scalars['Float']['output']>;
  sup?: Maybe<Supplier>;
  supid?: Maybe<Scalars['Float']['output']>;
  ttrpaidid?: Maybe<Scalars['Float']['output']>;
};

export type Suptrntype = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  creditupd?: Maybe<Scalars['Float']['output']>;
  debitupd?: Maybe<Scalars['Float']['output']>;
  defaultjustification?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  finbankdoctypes?: Maybe<Array<Finbankdoctype>>;
  fincustdoctypes?: Maybe<Array<Fincustdoctype>>;
  finsupdoctypes?: Maybe<Array<Finsupdoctype>>;
  flag5?: Maybe<Scalars['Float']['output']>;
  flag6?: Maybe<Scalars['Float']['output']>;
  flag7?: Maybe<Scalars['Float']['output']>;
  flag8?: Maybe<Scalars['Float']['output']>;
  flag9?: Maybe<Scalars['Float']['output']>;
  flag10?: Maybe<Scalars['Float']['output']>;
  flag11?: Maybe<Scalars['Float']['output']>;
  flag12?: Maybe<Scalars['Float']['output']>;
  flag13?: Maybe<Scalars['Float']['output']>;
  flag14?: Maybe<Scalars['Float']['output']>;
  flag15?: Maybe<Scalars['Float']['output']>;
  flag16?: Maybe<Scalars['Float']['output']>;
  flag17?: Maybe<Scalars['Float']['output']>;
  flag18?: Maybe<Scalars['Float']['output']>;
  flag19?: Maybe<Scalars['Float']['output']>;
  flag20?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  opening?: Maybe<Scalars['Float']['output']>;
  suppliertrans?: Maybe<Array<Suppliertrans>>;
  turnoverupd?: Maybe<Scalars['Float']['output']>;
  upddatemode?: Maybe<Scalars['Float']['output']>;
};

export type Sxaccountant = {
  aadepwd?: Maybe<Scalars['String']['output']>;
  aadesusername?: Maybe<Scalars['String']['output']>;
  accofficeafm?: Maybe<Scalars['String']['output']>;
  accofficename?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  adt?: Maybe<Scalars['String']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  doy?: Maybe<Doy>;
  email?: Maybe<Scalars['String']['output']>;
  intrastatpwd?: Maybe<Scalars['String']['output']>;
  intrastatusername?: Maybe<Scalars['String']['output']>;
  licensecategory?: Maybe<Scalars['Float']['output']>;
  licensenum?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  startdate?: Maybe<Scalars['Date']['output']>;
  startdoy?: Maybe<Doy>;
  surname?: Maybe<Scalars['String']['output']>;
  sxcontractors?: Maybe<Array<Sxcontractor>>;
  taxispwd?: Maybe<Scalars['String']['output']>;
  taxisusername?: Maybe<Scalars['String']['output']>;
  tk?: Maybe<Scalars['String']['output']>;
};

export type Sxcompanyext = {
  basekad?: Maybe<Scalars['Float']['output']>;
  books?: Maybe<Scalars['Float']['output']>;
  closingdate?: Maybe<Scalars['Date']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  companykind?: Maybe<Scalars['Float']['output']>;
  custindividuallimit?: Maybe<Scalars['Float']['output']>;
  custlimit?: Maybe<Scalars['Float']['output']>;
  forcedvatstatus?: Maybe<Scalars['Float']['output']>;
  frontier?: Maybe<Scalars['Float']['output']>;
  hidezero?: Maybe<Scalars['Float']['output']>;
  incomekad?: Maybe<Scalars['Float']['output']>;
  ineuropetrade?: Maybe<Scalars['Float']['output']>;
  mainactivity?: Maybe<Scalars['Float']['output']>;
  mapurcoef?: Maybe<Scalars['Float']['output']>;
  masalcoef?: Maybe<Scalars['Float']['output']>;
  municipality?: Maybe<Scalars['String']['output']>;
  oakad?: Maybe<Scalars['Float']['output']>;
  oakad2?: Maybe<Scalars['Float']['output']>;
  oapurcoef?: Maybe<Scalars['Float']['output']>;
  oapurcoef2?: Maybe<Scalars['Float']['output']>;
  oasalcoef?: Maybe<Scalars['Float']['output']>;
  oasalcoef2?: Maybe<Scalars['Float']['output']>;
  otheractivity?: Maybe<Scalars['Float']['output']>;
  otheractivity2?: Maybe<Scalars['Float']['output']>;
  owneradt?: Maybe<Scalars['String']['output']>;
  owneradttype?: Maybe<Scalars['Float']['output']>;
  ownerfirst?: Maybe<Scalars['String']['output']>;
  ownerlast?: Maybe<Scalars['String']['output']>;
  ownerrelativename?: Maybe<Scalars['String']['output']>;
  partners?: Maybe<Scalars['Float']['output']>;
  repaddress?: Maybe<Scalars['String']['output']>;
  repadt?: Maybe<Scalars['String']['output']>;
  repadtkind?: Maybe<Scalars['Float']['output']>;
  repafm?: Maybe<Scalars['String']['output']>;
  repcity?: Maybe<Scalars['String']['output']>;
  repdoy?: Maybe<Scalars['Float']['output']>;
  repfirst?: Maybe<Scalars['String']['output']>;
  replast?: Maybe<Scalars['String']['output']>;
  repmunicipality?: Maybe<Scalars['String']['output']>;
  reprelativename?: Maybe<Scalars['String']['output']>;
  reptaxispwd?: Maybe<Scalars['String']['output']>;
  reptaxisusername?: Maybe<Scalars['String']['output']>;
  repzipcode?: Maybe<Scalars['String']['output']>;
  sapurcoef?: Maybe<Scalars['Float']['output']>;
  sasalcoef?: Maybe<Scalars['Float']['output']>;
  secactivity?: Maybe<Scalars['Float']['output']>;
  socialsecnumber?: Maybe<Scalars['String']['output']>;
  specialexpensepaymentlimit?: Maybe<Scalars['Float']['output']>;
  specialpaymentlimit?: Maybe<Scalars['Float']['output']>;
  spouseaddress?: Maybe<Scalars['String']['output']>;
  spouseadt?: Maybe<Scalars['String']['output']>;
  spouseafm?: Maybe<Scalars['String']['output']>;
  spousecity?: Maybe<Scalars['String']['output']>;
  spousedoy?: Maybe<Scalars['Float']['output']>;
  spousefirst?: Maybe<Scalars['String']['output']>;
  spouselast?: Maybe<Scalars['String']['output']>;
  spousezipcode?: Maybe<Scalars['String']['output']>;
  strdocseries?: Maybe<Scalars['String']['output']>;
  supfarmerlimit?: Maybe<Scalars['Float']['output']>;
  suplimit?: Maybe<Scalars['Float']['output']>;
  usegeneraldoc?: Maybe<Scalars['Float']['output']>;
};

export type Sxcontractor = {
  aa?: Maybe<Scalars['Float']['output']>;
  activity?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  adtnumber?: Maybe<Scalars['String']['output']>;
  aefoldernumber?: Maybe<Scalars['String']['output']>;
  afm?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  compdescr?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  diplotypodate?: Maybe<Scalars['Date']['output']>;
  diplotypodescr?: Maybe<Scalars['String']['output']>;
  doycodeid?: Maybe<Scalars['Float']['output']>;
  extrataxvalue?: Maybe<Scalars['Float']['output']>;
  fathername?: Maybe<Scalars['String']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  givedate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Float']['output'];
  islocked?: Maybe<Scalars['Float']['output']>;
  kind?: Maybe<Scalars['Float']['output']>;
  origintype?: Maybe<Scalars['Float']['output']>;
  perfromdate?: Maybe<Scalars['Date']['output']>;
  permonth?: Maybe<Scalars['Float']['output']>;
  pertodate?: Maybe<Scalars['Date']['output']>;
  phone1?: Maybe<Scalars['String']['output']>;
  repaddress?: Maybe<Scalars['String']['output']>;
  repadt?: Maybe<Scalars['String']['output']>;
  repafm?: Maybe<Scalars['String']['output']>;
  repfathername?: Maybe<Scalars['String']['output']>;
  repname?: Maybe<Scalars['String']['output']>;
  repphone1?: Maybe<Scalars['String']['output']>;
  repsurname?: Maybe<Scalars['String']['output']>;
  sumtaxvalue?: Maybe<Scalars['Float']['output']>;
  sxaccountantcode?: Maybe<Sxaccountant>;
  sxkadid?: Maybe<Scalars['Float']['output']>;
  taxvalue1?: Maybe<Scalars['Float']['output']>;
  taxvalue2?: Maybe<Scalars['Float']['output']>;
  value1?: Maybe<Scalars['Float']['output']>;
  value2?: Maybe<Scalars['Float']['output']>;
};

export type Sxpcoefcategory = {
  codeid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  isofficial?: Maybe<Scalars['Float']['output']>;
  sxprofitcoefs?: Maybe<Array<Sxprofitcoef>>;
};

export type Sxpcoefhist = {
  comments?: Maybe<Scalars['String']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  purcoef?: Maybe<Scalars['Float']['output']>;
  salcoef?: Maybe<Scalars['Float']['output']>;
  sxprofitcoefsalcode?: Maybe<Scalars['String']['output']>;
  sxprofitcoefsalcode2?: Maybe<Sxprofitcoef>;
};

export type Sxprofitcoef = {
  comments?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  isofficial?: Maybe<Scalars['Float']['output']>;
  purcode?: Maybe<Scalars['String']['output']>;
  purcoef?: Maybe<Scalars['Float']['output']>;
  purdescr?: Maybe<Scalars['String']['output']>;
  salcode?: Maybe<Scalars['String']['output']>;
  salcoef?: Maybe<Scalars['Float']['output']>;
  stopdate?: Maybe<Scalars['Date']['output']>;
  sxpcoefcategory?: Maybe<Sxpcoefcategory>;
  sxpcoefhists?: Maybe<Array<Sxpcoefhist>>;
};

export type Tasktrn = {
  actid?: Maybe<Scalars['Float']['output']>;
  actstatus?: Maybe<Scalars['Float']['output']>;
  asap?: Maybe<Scalars['Float']['output']>;
  assignedusrid?: Maybe<Scalars['Float']['output']>;
  bckgexec?: Maybe<Scalars['Float']['output']>;
  creationdate?: Maybe<Scalars['Date']['output']>;
  creationtime?: Maybe<Scalars['Date']['output']>;
  duedate?: Maybe<Scalars['Date']['output']>;
  emailmsg?: Maybe<Scalars['String']['output']>;
  evainfo?: Maybe<Scalars['Float']['output']>;
  fnames?: Maybe<Scalars['String']['output']>;
  fromusrid?: Maybe<Scalars['Float']['output']>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  ftrtradecode?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  messread?: Maybe<Scalars['Float']['output']>;
  parenttasid?: Maybe<Scalars['Float']['output']>;
  performdate?: Maybe<Scalars['Date']['output']>;
  priority?: Maybe<Scalars['Float']['output']>;
  reminder?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  taskcategory?: Maybe<Scalars['Float']['output']>;
  taspriority?: Maybe<Scalars['Float']['output']>;
  usepriority?: Maybe<Scalars['Float']['output']>;
  usgid?: Maybe<Scalars['Float']['output']>;
  usgids?: Maybe<Scalars['String']['output']>;
  usrid?: Maybe<Scalars['Float']['output']>;
  usrids?: Maybe<Scalars['String']['output']>;
  utask?: Maybe<Utask>;
  utorder?: Maybe<Scalars['Float']['output']>;
};

export type Taxdevcfg = {
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  comport?: Maybe<Scalars['Float']['output']>;
  custscr?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  devicetype?: Maybe<Scalars['Float']['output']>;
  devptrid1?: Maybe<Scalars['Float']['output']>;
  devptrid2?: Maybe<Scalars['Float']['output']>;
  devptrid3?: Maybe<Scalars['Float']['output']>;
  devptrid4?: Maybe<Scalars['Float']['output']>;
  devptrid5?: Maybe<Scalars['Float']['output']>;
  devptrid6?: Maybe<Scalars['Float']['output']>;
  devptrid7?: Maybe<Scalars['Float']['output']>;
  devptrid8?: Maybe<Scalars['Float']['output']>;
  devptrid9?: Maybe<Scalars['Float']['output']>;
  devptrid10?: Maybe<Scalars['Float']['output']>;
  drawer?: Maybe<Scalars['Float']['output']>;
  fttids1?: Maybe<Scalars['String']['output']>;
  fttids2?: Maybe<Scalars['String']['output']>;
  fttids3?: Maybe<Scalars['String']['output']>;
  fttids4?: Maybe<Scalars['String']['output']>;
  fttids5?: Maybe<Scalars['String']['output']>;
  fttids6?: Maybe<Scalars['String']['output']>;
  fttids7?: Maybe<Scalars['String']['output']>;
  fttids8?: Maybe<Scalars['String']['output']>;
  fttids9?: Maybe<Scalars['String']['output']>;
  fttids10?: Maybe<Scalars['String']['output']>;
  printtemplates?: Maybe<Array<Printtemplate>>;
  scrcomport?: Maybe<Scalars['Float']['output']>;
  vtcid1?: Maybe<Scalars['Float']['output']>;
  vtcid2?: Maybe<Scalars['Float']['output']>;
  vtcid3?: Maybe<Scalars['Float']['output']>;
  vtcid4?: Maybe<Scalars['Float']['output']>;
  vtcid5?: Maybe<Scalars['Float']['output']>;
};

export type Taxfee = {
  code?: Maybe<Scalars['Float']['output']>;
  coef?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  stopdate?: Maybe<Scalars['Date']['output']>;
  taxfeehists?: Maybe<Array<Taxfeehist>>;
};

export type Taxfeehist = {
  code?: Maybe<Scalars['Float']['output']>;
  coef?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  fyeid?: Maybe<Scalars['Float']['output']>;
  taxfee?: Maybe<Taxfee>;
};

export type Taxfreejustification = {
  artnumber?: Maybe<Scalars['String']['output']>;
  bankaccounts?: Maybe<Array<Bankaccount>>;
  banks?: Maybe<Array<Bank>>;
  codeid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  discountoption?: Maybe<Scalars['Float']['output']>;
  mydatacode?: Maybe<Scalars['Float']['output']>;
};

export type Transportation = {
  carrierid?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  shortcut?: Maybe<Scalars['String']['output']>;
  storetrades?: Maybe<Array<Storetrade>>;
  str1?: Maybe<Scalars['String']['output']>;
  str2?: Maybe<Scalars['String']['output']>;
  str3?: Maybe<Scalars['String']['output']>;
  val1?: Maybe<Scalars['Float']['output']>;
  val2?: Maybe<Scalars['Float']['output']>;
  val3?: Maybe<Scalars['Float']['output']>;
  val4?: Maybe<Scalars['Float']['output']>;
  val5?: Maybe<Scalars['Float']['output']>;
  val6?: Maybe<Scalars['Float']['output']>;
  val7?: Maybe<Scalars['Float']['output']>;
  val8?: Maybe<Scalars['Float']['output']>;
  val9?: Maybe<Scalars['Float']['output']>;
  val10?: Maybe<Scalars['Float']['output']>;
  val11?: Maybe<Scalars['Float']['output']>;
  val12?: Maybe<Scalars['Float']['output']>;
  val13?: Maybe<Scalars['Float']['output']>;
  val14?: Maybe<Scalars['Float']['output']>;
  val15?: Maybe<Scalars['Float']['output']>;
  val16?: Maybe<Scalars['Float']['output']>;
  val17?: Maybe<Scalars['Float']['output']>;
  val18?: Maybe<Scalars['Float']['output']>;
  val19?: Maybe<Scalars['Float']['output']>;
  val20?: Maybe<Scalars['Float']['output']>;
};

export type UpdateCoilInput = {
  coilno?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  commentsPanel?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  createDate?: InputMaybe<Scalars['Date']['input']>;
  currWeight?: InputMaybe<Scalars['Float']['input']>;
  cutComment?: InputMaybe<Scalars['String']['input']>;
  delDate?: InputMaybe<Scalars['Date']['input']>;
  initWeight?: InputMaybe<Scalars['Float']['input']>;
  loc?: InputMaybe<Scalars['Int']['input']>;
  openstatus?: InputMaybe<Scalars['String']['input']>;
  prodComment?: InputMaybe<Scalars['String']['input']>;
  statusId?: InputMaybe<Scalars['Int']['input']>;
  supplier?: InputMaybe<Scalars['String']['input']>;
  thickness?: InputMaybe<Scalars['Float']['input']>;
  upDate?: InputMaybe<Scalars['Date']['input']>;
  widthCoil?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateOneCoilInput = {
  id: Scalars['Int']['input'];
  update: UpdateCoilInput;
};

export type UpdatePauseDetailsInput = {
  id: Scalars['Int']['input'];
  pausecomment?: InputMaybe<Scalars['String']['input']>;
  pauseduration?: InputMaybe<Scalars['Int']['input']>;
  pauseenddate?: InputMaybe<Scalars['Date']['input']>;
  pausestartdate?: InputMaybe<Scalars['Date']['input']>;
  pporderid: Scalars['Int']['input'];
};

export type UpdatePporderInput = {
  id: Scalars['Int']['input'];
  update: UpdatePpordersInput;
};

export type UpdatePporderlineStatusInput = {
  id: Scalars['Int']['input'];
  status: Scalars['Int']['input'];
};

export type UpdatePpordersInput = {
  createDate?: InputMaybe<Scalars['Date']['input']>;
  estDateOfProd?: InputMaybe<Scalars['Date']['input']>;
  estFinishDate?: InputMaybe<Scalars['Date']['input']>;
  estStartDate?: InputMaybe<Scalars['Date']['input']>;
  finishDate?: InputMaybe<Scalars['Date']['input']>;
  finishDateDatetime?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  offtimeduration?: InputMaybe<Scalars['Int']['input']>;
  offtimeenddate?: InputMaybe<Scalars['Date']['input']>;
  offtimestartdate?: InputMaybe<Scalars['Date']['input']>;
  panelcode?: InputMaybe<Scalars['String']['input']>;
  pauseduration?: InputMaybe<Scalars['Int']['input']>;
  pauseenddate?: InputMaybe<Scalars['Date']['input']>;
  pausestartdate?: InputMaybe<Scalars['Date']['input']>;
  pporderno?: InputMaybe<Scalars['String']['input']>;
  previd?: InputMaybe<Scalars['Int']['input']>;
  prevpanelcode?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  startDateDatetime?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateWorkingHoursInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  endHour?: InputMaybe<Scalars['Int']['input']>;
  endMinute?: InputMaybe<Scalars['Int']['input']>;
  isWorkingDay?: InputMaybe<Scalars['Boolean']['input']>;
  startHour?: InputMaybe<Scalars['Int']['input']>;
  startMinute?: InputMaybe<Scalars['Int']['input']>;
};

export type Userjournal = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  title?: Maybe<Scalars['String']['output']>;
  userjournallines?: Maybe<Array<Userjournallines>>;
};

export type Userjournallines = {
  acceventtype?: Maybe<Acceventtype>;
  aetid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Userjournal>;
  usjid?: Maybe<Scalars['Float']['output']>;
};

export type Userlogininfo = {
  braid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  usr?: Maybe<Puser>;
  usrid?: Maybe<Scalars['Float']['output']>;
};

export type Users = {
  allowedLocations?: Maybe<Array<Location>>;
  atlaname?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  name2?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  usersLocationAccess: Array<UsersLocationAccess>;
};

export type UsersLocationAccess = {
  isActive: Scalars['Boolean']['output'];
  location?: Maybe<Location>;
  locationId: Scalars['Int']['output'];
  user: Users;
  userId: Scalars['String']['output'];
};

export type Usershortcuts = {
  actid?: Maybe<Scalars['Float']['output']>;
  ushortcut?: Maybe<Scalars['Float']['output']>;
  usr?: Maybe<Puser>;
  usrid?: Maybe<Scalars['Float']['output']>;
};

export type Uservardocforms = {
  codeid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dfm?: Maybe<Docforms>;
  dfmid?: Maybe<Scalars['Float']['output']>;
};

export type Uservardocformsmessages = {
  codeid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dfm?: Maybe<Docforms>;
  dfmid?: Maybe<Scalars['Float']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type Utask = {
  affectscurrentactivity?: Maybe<Scalars['Float']['output']>;
  affectsrelativeactivity?: Maybe<Scalars['Float']['output']>;
  asap?: Maybe<Scalars['Float']['output']>;
  assignonlynotassigned?: Maybe<Scalars['Float']['output']>;
  atpid?: Maybe<Scalars['Float']['output']>;
  attachformat?: Maybe<Scalars['Float']['output']>;
  automaticselectionactivities?: Maybe<Scalars['Float']['output']>;
  bckgexec?: Maybe<Scalars['Float']['output']>;
  beginningamount?: Maybe<Scalars['Float']['output']>;
  beginningdate?: Maybe<Scalars['Date']['output']>;
  beginningtype?: Maybe<Scalars['Float']['output']>;
  categoryoffset?: Maybe<Scalars['Float']['output']>;
  changeactivitieswithoutstatus?: Maybe<Scalars['Float']['output']>;
  channel?: Maybe<Scalars['String']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  colidsalesman?: Maybe<Scalars['Float']['output']>;
  colidsalesmantype?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  conditions?: Maybe<Scalars['String']['output']>;
  conditionsexec?: Maybe<Scalars['String']['output']>;
  copymoverelactivity?: Maybe<Scalars['Float']['output']>;
  createmainconid?: Maybe<Scalars['Float']['output']>;
  crmactivitypermaterialcheck?: Maybe<Scalars['Float']['output']>;
  crmcmpid?: Maybe<Scalars['Float']['output']>;
  crmcommentscmtid?: Maybe<Scalars['Float']['output']>;
  crmcommentscontent?: Maybe<Scalars['String']['output']>;
  crmcommentsdescr?: Maybe<Scalars['String']['output']>;
  crmcommentsuse?: Maybe<Scalars['Float']['output']>;
  crmcusid?: Maybe<Scalars['Float']['output']>;
  crmdescr?: Maybe<Scalars['String']['output']>;
  crmjustificationcmtid?: Maybe<Scalars['Float']['output']>;
  crmjustificationdescr?: Maybe<Scalars['String']['output']>;
  crmjustificationuse?: Maybe<Scalars['Float']['output']>;
  crmoffercheck?: Maybe<Scalars['Float']['output']>;
  crmopportunitycheck?: Maybe<Scalars['Float']['output']>;
  crmpriority?: Maybe<Scalars['Float']['output']>;
  crmsecjustificationcmtid?: Maybe<Scalars['Float']['output']>;
  crmsecjustificationdescr?: Maybe<Scalars['String']['output']>;
  crmsecjustificationuse?: Maybe<Scalars['Float']['output']>;
  crmshortdescr?: Maybe<Scalars['String']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  destdsrid?: Maybe<Scalars['Float']['output']>;
  domaintype?: Maybe<Scalars['Float']['output']>;
  drafttype?: Maybe<Scalars['Float']['output']>;
  emailmsg?: Maybe<Scalars['String']['output']>;
  emailtitle?: Maybe<Scalars['String']['output']>;
  evainfo?: Maybe<Scalars['Float']['output']>;
  forecastedbeginning?: Maybe<Scalars['Date']['output']>;
  frmtype?: Maybe<Scalars['Float']['output']>;
  ftrcategory?: Maybe<Scalars['Float']['output']>;
  grpidlogin?: Maybe<Scalars['Float']['output']>;
  hasemail?: Maybe<Scalars['Float']['output']>;
  insuser?: Maybe<Scalars['String']['output']>;
  isftrcusid?: Maybe<Scalars['Float']['output']>;
  mailrecipientsbcc?: Maybe<Scalars['String']['output']>;
  mailrecipientscc?: Maybe<Scalars['String']['output']>;
  newstaid?: Maybe<Scalars['Float']['output']>;
  numofcopies?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  parenttasid?: Maybe<Scalars['Float']['output']>;
  peruser?: Maybe<Scalars['Float']['output']>;
  printername?: Maybe<Scalars['String']['output']>;
  printperpost?: Maybe<Scalars['Float']['output']>;
  priority?: Maybe<Scalars['Float']['output']>;
  procid?: Maybe<Scalars['Float']['output']>;
  progrscriptcode?: Maybe<Scalars['String']['output']>;
  progrscriptfunction?: Maybe<Scalars['String']['output']>;
  progrscriptparams?: Maybe<Scalars['String']['output']>;
  prtid?: Maybe<Scalars['Float']['output']>;
  prtorientation?: Maybe<Scalars['Float']['output']>;
  prttype?: Maybe<Scalars['Float']['output']>;
  reminder?: Maybe<Scalars['String']['output']>;
  reminderamount?: Maybe<Scalars['Float']['output']>;
  reminderdate?: Maybe<Scalars['Date']['output']>;
  remindertype?: Maybe<Scalars['Float']['output']>;
  rptexportfile?: Maybe<Scalars['Float']['output']>;
  rptid?: Maybe<Scalars['Float']['output']>;
  rptprms?: Maybe<Scalars['String']['output']>;
  rptprms2?: Maybe<Scalars['String']['output']>;
  sendemail?: Maybe<Scalars['Float']['output']>;
  setasprinted?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  taskcategory?: Maybe<Scalars['Float']['output']>;
  tasktrns?: Maybe<Array<Tasktrn>>;
  taspriority?: Maybe<Scalars['Float']['output']>;
  togrpid?: Maybe<Scalars['Float']['output']>;
  tousrid?: Maybe<Scalars['Float']['output']>;
  usepriority?: Maybe<Scalars['Float']['output']>;
  usermessage?: Maybe<Scalars['Float']['output']>;
  usgid?: Maybe<Scalars['Float']['output']>;
  usgids?: Maybe<Scalars['String']['output']>;
  usrid?: Maybe<Scalars['Float']['output']>;
  usridlogin?: Maybe<Scalars['Float']['output']>;
  usrids?: Maybe<Scalars['String']['output']>;
  utorder?: Maybe<Scalars['Float']['output']>;
};

export type Valfndbnktrn = {
  billtrntype?: Maybe<Billtrntype>;
  comid?: Maybe<Scalars['Float']['output']>;
  fdtid?: Maybe<Scalars['Float']['output']>;
  fundstrntype?: Maybe<Fundstrntype>;
  gusid?: Maybe<Scalars['Float']['output']>;
  linedomain?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Finbankdoctype>;
};

export type Valfndcusttrn = {
  billtrntype?: Maybe<Billtrntype>;
  comid?: Maybe<Scalars['Float']['output']>;
  fdtid?: Maybe<Scalars['Float']['output']>;
  fundstrntype?: Maybe<Fundstrntype>;
  gusid?: Maybe<Scalars['Float']['output']>;
  linedomain?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Fincustdoctype>;
};

export type Valfndsuptrn = {
  billtrntype?: Maybe<Billtrntype>;
  comid?: Maybe<Scalars['Float']['output']>;
  fdtid?: Maybe<Scalars['Float']['output']>;
  fundstrntype?: Maybe<Fundstrntype>;
  gusid?: Maybe<Scalars['Float']['output']>;
  linedomain?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Finsupdoctype>;
};

export type Varcomtemplate = {
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dsrid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  perid?: Maybe<Scalars['Float']['output']>;
  sourcetype?: Maybe<Scalars['Float']['output']>;
  varcomtemplines?: Maybe<Array<Varcomtemplines>>;
};

export type Varcomtemplines = {
  calcformula?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  linenum?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Varcomtemplate>;
  varcomtrades?: Maybe<Varcomtrades>;
};

export type Varcomtrades = {
  accmask?: Maybe<Scalars['String']['output']>;
  accommodationfee?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  com?: Maybe<Company>;
  comid?: Maybe<Scalars['Float']['output']>;
  comtradelines?: Maybe<Array<Comtradelines>>;
  creditupd?: Maybe<Scalars['Float']['output']>;
  debitupd?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  groupvalue?: Maybe<Scalars['Float']['output']>;
  intrmode?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  kadid?: Maybe<Scalars['Float']['output']>;
  kepyoupd?: Maybe<Scalars['Float']['output']>;
  lastmodified?: Maybe<Scalars['Date']['output']>;
  mydatacatid?: Maybe<Scalars['Float']['output']>;
  mydataclassificationsetupcode?: Maybe<Scalars['String']['output']>;
  mydatacode?: Maybe<Scalars['Float']['output']>;
  salesparams?: Maybe<Array<Salesparams>>;
  salesparams2?: Maybe<Array<Salesparams>>;
  salesparams3?: Maybe<Array<Salesparams>>;
  salesparams4?: Maybe<Array<Salesparams>>;
  salesparams5?: Maybe<Array<Salesparams>>;
  sourcetype?: Maybe<Scalars['Float']['output']>;
  subjecttovat?: Maybe<Scalars['Float']['output']>;
  taxfreeid?: Maybe<Scalars['Float']['output']>;
  taxkind?: Maybe<Scalars['Float']['output']>;
  turnoverupd?: Maybe<Scalars['Float']['output']>;
  varcomtemplines?: Maybe<Array<Varcomtemplines>>;
  vatdeduction?: Maybe<Scalars['Float']['output']>;
  vatvctid?: Maybe<Scalars['Float']['output']>;
  vtc?: Maybe<Vatcategory>;
  warning?: Maybe<Scalars['String']['output']>;
};

export type Vardocforms = {
  codeid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  dfmid?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  link?: Maybe<Docforms>;
  teamelpid?: Maybe<Scalars['Float']['output']>;
  vardocformslines?: Maybe<Array<Vardocformslines>>;
  vardocformslines2?: Maybe<Array<Vardocformslines>>;
  vardocformslines3?: Maybe<Array<Vardocformslines>>;
};

export type Vardocformslines = {
  acccode?: Maybe<Scalars['String']['output']>;
  calcdatasource?: Maybe<Scalars['Float']['output']>;
  coef?: Maybe<Scalars['Float']['output']>;
  concategory?: Maybe<Scalars['String']['output']>;
  docform?: Maybe<Docforms>;
  fromacccode?: Maybe<Scalars['String']['output']>;
  grade?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Vardocforms>;
  linkid?: Maybe<Scalars['Float']['output']>;
  nolastfip?: Maybe<Scalars['Float']['output']>;
  ordernum?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['String']['output']>;
  signmode?: Maybe<Scalars['Float']['output']>;
  taxcategory?: Maybe<Scalars['String']['output']>;
  toacccode?: Maybe<Scalars['String']['output']>;
  updmode?: Maybe<Scalars['Float']['output']>;
  varcomcategory?: Maybe<Scalars['String']['output']>;
  vardocform?: Maybe<Vardocforms>;
  vardocformidtotals?: Maybe<Vardocforms>;
  withownsign?: Maybe<Scalars['Float']['output']>;
};

export type Vatanalysis = {
  comid?: Maybe<Scalars['Float']['output']>;
  ftr?: Maybe<Fintrade>;
  ftrid?: Maybe<Scalars['Float']['output']>;
  lsubjecttovalue?: Maybe<Scalars['Float']['output']>;
  lvtcvalue?: Maybe<Scalars['Float']['output']>;
  subjecttovalue?: Maybe<Scalars['Float']['output']>;
  vtcid?: Maybe<Scalars['Float']['output']>;
  vtcvalue?: Maybe<Scalars['Float']['output']>;
};

export type Vatcategory = {
  accounts?: Maybe<Array<Account>>;
  assets?: Maybe<Array<Asset>>;
  catid?: Maybe<Scalars['Float']['output']>;
  codeid?: Maybe<Scalars['Float']['output']>;
  comtradelines?: Maybe<Array<Comtradelines>>;
  depricedassets?: Maybe<Array<Depricedasset>>;
  id: Scalars['Float']['output'];
  isactive?: Maybe<Scalars['Float']['output']>;
  isforabroadsales?: Maybe<Scalars['Float']['output']>;
  materials?: Maybe<Array<Material>>;
  mydatacode?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
  pwidth?: Maybe<Scalars['Float']['output']>;
  spsurcharges?: Maybe<Array<Spsurcharges>>;
  varcomtrades?: Maybe<Array<Varcomtrades>>;
  vatdescr?: Maybe<Scalars['String']['output']>;
  vatgls?: Maybe<Array<Vatgl>>;
  vatkind?: Maybe<Scalars['Float']['output']>;
  vatstatus?: Maybe<Vatstatus>;
  vatstatuses?: Maybe<Array<Vatstatus>>;
};

export type Vatgl = {
  comid?: Maybe<Scalars['Float']['output']>;
  glaccount000?: Maybe<Scalars['String']['output']>;
  glaccount001?: Maybe<Scalars['String']['output']>;
  glaccount002?: Maybe<Scalars['String']['output']>;
  glaccount003?: Maybe<Scalars['String']['output']>;
  glaccount010?: Maybe<Scalars['String']['output']>;
  glaccount011?: Maybe<Scalars['String']['output']>;
  glaccount012?: Maybe<Scalars['String']['output']>;
  glaccount013?: Maybe<Scalars['String']['output']>;
  glaccount020?: Maybe<Scalars['String']['output']>;
  glaccount021?: Maybe<Scalars['String']['output']>;
  glaccount022?: Maybe<Scalars['String']['output']>;
  glaccount023?: Maybe<Scalars['String']['output']>;
  glaccount030?: Maybe<Scalars['String']['output']>;
  glaccount031?: Maybe<Scalars['String']['output']>;
  glaccount032?: Maybe<Scalars['String']['output']>;
  glaccount033?: Maybe<Scalars['String']['output']>;
  glaccount040?: Maybe<Scalars['String']['output']>;
  glaccount041?: Maybe<Scalars['String']['output']>;
  glaccount042?: Maybe<Scalars['String']['output']>;
  glaccount043?: Maybe<Scalars['String']['output']>;
  glaccount050?: Maybe<Scalars['String']['output']>;
  glaccount051?: Maybe<Scalars['String']['output']>;
  glaccount052?: Maybe<Scalars['String']['output']>;
  glaccount053?: Maybe<Scalars['String']['output']>;
  glaccount060?: Maybe<Scalars['String']['output']>;
  glaccount061?: Maybe<Scalars['String']['output']>;
  glaccount062?: Maybe<Scalars['String']['output']>;
  glaccount063?: Maybe<Scalars['String']['output']>;
  glaccount070?: Maybe<Scalars['String']['output']>;
  glaccount071?: Maybe<Scalars['String']['output']>;
  glaccount072?: Maybe<Scalars['String']['output']>;
  glaccount073?: Maybe<Scalars['String']['output']>;
  glaccount080?: Maybe<Scalars['String']['output']>;
  glaccount081?: Maybe<Scalars['String']['output']>;
  glaccount082?: Maybe<Scalars['String']['output']>;
  glaccount083?: Maybe<Scalars['String']['output']>;
  glaccount090?: Maybe<Scalars['String']['output']>;
  glaccount091?: Maybe<Scalars['String']['output']>;
  glaccount092?: Maybe<Scalars['String']['output']>;
  glaccount093?: Maybe<Scalars['String']['output']>;
  glaccount100?: Maybe<Scalars['String']['output']>;
  glaccount101?: Maybe<Scalars['String']['output']>;
  glaccount102?: Maybe<Scalars['String']['output']>;
  glaccount103?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Vatcategory>;
  vtcid?: Maybe<Scalars['Float']['output']>;
};

export type Vatstatus = {
  vtn?: Maybe<Vatcategory>;
  vtnid?: Maybe<Scalars['Float']['output']>;
  vts?: Maybe<Vatcategory>;
  vtssecid?: Maybe<Scalars['Float']['output']>;
};

export type Viesperiod = {
  codeid?: Maybe<Scalars['Float']['output']>;
  comid?: Maybe<Scalars['Float']['output']>;
  descr?: Maybe<Scalars['String']['output']>;
  fiscperiod?: Maybe<Fiscperiod>;
  fiscperiod2?: Maybe<Fiscperiod>;
  fyeid?: Maybe<Scalars['Float']['output']>;
};

export type Webaccount = {
  accessok?: Maybe<Scalars['Float']['output']>;
  accid?: Maybe<Scalars['Float']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['Float']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cntid?: Maybe<Scalars['Float']['output']>;
  dataparam?: Maybe<Scalars['Float']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailconfr?: Maybe<Scalars['Float']['output']>;
  finaldate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Float']['output'];
  insdate?: Maybe<Scalars['Date']['output']>;
  insuser?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  lastsync?: Maybe<Scalars['Date']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone1?: Maybe<Scalars['String']['output']>;
  phone2?: Maybe<Scalars['String']['output']>;
  scrvalidate?: Maybe<Scalars['Float']['output']>;
  tempkey?: Maybe<Scalars['String']['output']>;
  updcount?: Maybe<Scalars['Float']['output']>;
  upddate?: Maybe<Scalars['Date']['output']>;
  upduser?: Maybe<Scalars['Float']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  webaccountlns?: Maybe<Array<Webaccountlns>>;
  webgroup?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type Webaccountlns = {
  blocked?: Maybe<Scalars['Float']['output']>;
  exptime?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  lbranch?: Maybe<Scalars['Float']['output']>;
  lcompany?: Maybe<Scalars['Float']['output']>;
  linenum?: Maybe<Scalars['Float']['output']>;
  luser?: Maybe<Scalars['Float']['output']>;
  sodata?: Maybe<Scalars['String']['output']>;
  sodtype?: Maybe<Scalars['Float']['output']>;
  webacc?: Maybe<Webaccount>;
  webgroup?: Maybe<Scalars['String']['output']>;
  websrv?: Maybe<Webservice>;
  xsecurity?: Maybe<Scalars['Float']['output']>;
};

export type Webcustomer = {
  allowedconnections?: Maybe<Scalars['Float']['output']>;
  cus?: Maybe<Customer>;
  cusid: Scalars['Float']['output'];
  needapproval?: Maybe<Scalars['Float']['output']>;
  placeorders?: Maybe<Scalars['Float']['output']>;
  restrictionmsg?: Maybe<Scalars['String']['output']>;
  showmsg?: Maybe<Scalars['Float']['output']>;
  welcomemsg?: Maybe<Scalars['String']['output']>;
};

export type Webservice = {
  codeid?: Maybe<Scalars['Float']['output']>;
  isactive?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  webaccountlns?: Maybe<Array<Webaccountlns>>;
};

export type WorkingHours = {
  date: Scalars['String']['output'];
  endHour: Scalars['Int']['output'];
  endMinute: Scalars['Int']['output'];
  isWorkingDay: Scalars['Boolean']['output'];
  startHour: Scalars['Int']['output'];
  startMinute: Scalars['Int']['output'];
};

/** The status of a coil (Open or Closed). */
export type Openstatus =
  | 'CLOSED'
  | 'OPEN';

export type OpenstatusFilterInput = {
  eq?: InputMaybe<Openstatus>;
  in?: InputMaybe<Array<Openstatus>>;
};

export type PporderlineStatusChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PporderlineStatusChangedSubscription = { pporderlineStatusChanged: { id: number, status?: number | null, pporders?: { id: number, pporderno?: string | null } | null } };

export type PporderUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PporderUpdatedSubscription = { pporderUpdated: { id: number, status?: number | null, panelcode?: string | null, pporderno?: string | null, estStartDate?: any | null, estFinishDate?: any | null, offtimeduration?: number | null, offtimestartdate?: any | null, offtimeenddate?: any | null, pauseduration?: number | null, pausestartdate?: any | null, pauseenddate?: any | null } };

export type UpdatePauseDetailsMutationVariables = Exact<{
  input: UpdatePauseDetailsInput;
}>;


export type UpdatePauseDetailsMutation = { updatePauseDetails: { id: string, pporderid: number, pausestartdate: any, pauseenddate?: any | null, pauseduration?: number | null, pausecomment?: string | null } };

export type CreateCompletePauseMutationVariables = Exact<{
  input: CreateCompletePauseInput;
}>;


export type CreateCompletePauseMutation = { createCompletePause: { id: string, pporderid: number, pausestartdate: any, pauseenddate?: any | null, pauseduration?: number | null, pausecomment?: string | null } };

export type DeleteMachinePauseMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteMachinePauseMutation = { deleteMachinePause: boolean };

export type UpdatePporderMutationVariables = Exact<{
  input: UpdatePporderInput;
}>;


export type UpdatePporderMutation = { updatePporder: { pporderno?: string | null, id: number, status?: number | null, startDateDatetime?: any | null, finishDateDatetime?: any | null, estStartDate?: any | null, estFinishDate?: any | null, previd?: number | null, prevpanelcode?: string | null, offtimeduration?: number | null, offtimestartdate?: any | null, offtimeenddate?: any | null, pauses?: Array<{ id: string, pausestartdate: any, pauseenddate?: any | null, pauseduration?: number | null, pausecomment?: string | null }> | null, pporderlines: Array<{ status?: number | null, upDate?: any | null }> } };

export type GetPpOrdersListQueryVariables = Exact<{
  filter?: InputMaybe<PpordersFilterInput>;
}>;


export type GetPpOrdersListQuery = { pporders: Array<{ id: number, pporderno?: string | null, panelcode?: string | null, status?: number | null, startDateDatetime?: any | null, finishDateDatetime?: any | null, estDateOfProdDatetime?: any | null, createDate?: any | null, estStartDate?: any | null, estFinishDate?: any | null, previd?: number | null, prevpanelcode?: string | null, offtimeduration?: number | null, offtimestartdate?: any | null, offtimeenddate?: any | null, pauses?: Array<{ id: string, pausestartdate: any, pauseenddate?: any | null, pauseduration?: number | null, pausecomment?: string | null }> | null, groupIn?: Array<{ cin?: string | null, thickin?: string | null, moldin?: string | null, cout?: string | null, thickout?: string | null, moldout?: string | null, totalTtm?: number | null }> | null }> };

export type GetPpOrdersQueryVariables = Exact<{
  filter?: InputMaybe<PpordersFilterInput>;
}>;


export type GetPpOrdersQuery = { pporders: Array<{ id: number, pporderno?: string | null, panelcode?: string | null, status?: number | null, startDateDatetime?: any | null, finishDateDatetime?: any | null, estDateOfProdDatetime?: any | null, createDate?: any | null, estStartDate?: any | null, estFinishDate?: any | null, previd?: number | null, prevpanelcode?: string | null, offtimeduration?: number | null, offtimestartdate?: any | null, offtimeenddate?: any | null, pauses?: Array<{ id: string, pausestartdate: any, pauseenddate?: any | null, pauseduration?: number | null, pausecomment?: string | null }> | null }> };

export type GetMasterlengthQueryVariables = Exact<{
  filter?: InputMaybe<MasterlengthFilterInput>;
}>;


export type GetMasterlengthQuery = { masterlengths: Array<{ pporderno: string, id: number, code: string, startDateDatetime?: any | null, finishDateDatetime?: any | null, totalMeter?: number | null, status?: number | null, time?: number | null, previd?: number | null, prevpanelcode?: string | null, offtimeduration?: number | null, offtimestartdate?: any | null, offtimeenddate?: any | null }> };

export type GetPpOrderLinestopporderQueryVariables = Exact<{
  filter?: InputMaybe<Pporderlines2FilterInput>;
}>;


export type GetPpOrderLinestopporderQuery = { pporderlines2: { totalCount: number, nodes: Array<{ id: number, pporderno?: string | null, panelcode?: string | null, status?: number | null, custporderno?: string | null, upDate?: any | null, prodOrdersView?: { isCanceled?: boolean | null, time?: number | null, speed?: number | null, ttm?: number | null, cin?: string | null, cout?: string | null, moldin?: string | null, moldout?: string | null, count?: number | null } | null, pporders?: { id: number, pporderno?: string | null, panelcode?: string | null, startDateDatetime?: any | null, finishDateDatetime?: any | null } | null }> } };

export type PpOrderLine2QueryVariables = Exact<{
  filter?: InputMaybe<Pporderlines2FilterInput>;
  sorting?: InputMaybe<Array<Pporderlines2SortInput> | Pporderlines2SortInput>;
  paging?: InputMaybe<OffsetPaging>;
}>;


export type PpOrderLine2Query = { pporderlines2: { totalCount: number, nodes: Array<{ id: number, pporderno?: string | null, custporderno?: string | null, prodDate?: any | null, upDate?: any | null, status?: number | null, isCanceled?: number | null, panelcode?: string | null, tradecode?: string | null, prodOrdersView?: { cin?: string | null, cout?: string | null, moldin?: string | null, moldout?: string | null, thickin?: string | null, thickout?: string | null, count?: number | null, time?: number | null, speed?: number | null, ttm?: number | null } | null, pporders?: { status?: number | null } | null }> } };

export type GetCoilQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCoilQuery = { coil?: { id: number, comments?: string | null, thickness?: number | null, loc?: number | null, cutComment?: string | null, commentsPanel?: string | null, prodComment?: string | null } | null };

export type UpdateOneCoilMutationVariables = Exact<{
  input: UpdateOneCoilInput;
}>;


export type UpdateOneCoilMutation = { updateOneCoil: { id: number, comments?: string | null, thickness?: number | null } };

export type GetAllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLocationsQuery = { locations: Array<{ shortname?: string | null, whgroup?: string | null, atlaid?: number | null, atlaname?: string | null, comid?: number | null }> };

export type UserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserQuery = { user?: { userId: string, role?: string | null, name?: string | null, id?: number | null, password: string, email?: string | null, phone?: string | null, atlaname?: string | null, name2?: string | null } | null };

export type GetexpectedCoilsQueryVariables = Exact<{
  filter?: InputMaybe<CoilsFilterInput>;
  sorting?: InputMaybe<Array<CoilsSortInput> | CoilsSortInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetexpectedCoilsQuery = { expectedCoils: { totalCount: number, nodes: Array<{ id: number, coilno?: string | null, comments?: string | null, color?: string | null, loc?: number | null, upDate?: any | null, thickness?: number | null, widthCoil?: number | null, currWeight?: number | null, openstatus?: string | null, supplier?: string | null, company?: string | null, status: { id: number, name: string } }> } };

export type CoilColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type CoilColorsQuery = { coilColors: Array<{ id: number, code: string, name?: string | null, hexcode?: string | null }> };

export type GetAvailableCoilsQueryVariables = Exact<{
  filter?: InputMaybe<CoilsFilterInput>;
  sorting?: InputMaybe<Array<CoilsSortInput> | CoilsSortInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAvailableCoilsQuery = { availableCoils: { totalCount: number, nodes: Array<{ id: number, coilno?: string | null, comments?: string | null, color?: string | null, loc?: number | null, upDate?: any | null, thickness?: number | null, widthCoil?: number | null, currWeight?: number | null, openstatus?: string | null, supplier?: string | null, company?: string | null, status: { id: number, name: string } }> } };

export type CoilShowQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CoilShowQuery = { coil?: { id: number, coilno?: string | null, color?: string | null, sheetType?: string | null, coating?: string | null, coathick?: string | null, paintType?: string | null, steelGrade?: string | null, createDate?: any | null, delDate?: any | null, upDate?: any | null, gaugeThickness?: string | null, thickness?: number | null, widthCoil?: number | null, initWeight?: number | null, weight?: number | null, currWeight?: number | null, grossWeight?: number | null, wastage?: number | null, loc?: number | null, currLength?: number | null, comments?: string | null, commentsPanel?: string | null, supplier?: string | null, openstatus?: string | null, innerdiameter?: number | null, quality?: number | null, supcoilId?: string | null, customer?: string | null, orderDate?: any | null, corderid?: string | null, loadDate?: any | null, tporderId?: string | null, tporderSort?: number | null, classification?: string | null, painted?: string | null, heatno?: string | null, cutWastage?: number | null, nomthickness?: string | null, price?: number | null, cutComment?: string | null, surfaceType?: string | null, loaderid?: string | null, donkey?: number | null, dateofDes34?: any | null, dcustomer?: string | null, prodDate?: any | null, datediff?: number | null, datediffnow?: number | null, tempStatus?: number | null, property?: number | null, slitrange?: string | null, slithick?: string | null, locTrans?: number | null, dateTrans?: any | null, customs?: number | null, currLengthAgr?: number | null, currLengthPol?: number | null, currLengthAlu?: number | null, currLengthAlup?: number | null, currLengthPap?: number | null, currLengthAlue?: number | null, currLengthBit?: number | null, currLengthSto?: number | null, anVcoated?: number | null, prodComment?: string | null, documents?: string | null, vesselName?: string | null, dischargePort?: string | null, productCode?: string | null, dcustomerName?: string | null, cnomthickness?: string | null, tnomthickness?: string | null, ptradecode?: string | null, clength?: number | null, dateDiffDelNow?: number | null, dateDiffCutNow?: number | null, dateDiffCutProd?: number | null, dateDiffCutSales?: number | null, dateDiffDelPaint?: number | null, dateDiffDelSales?: number | null, dateDiffDelCut?: number | null, company?: string | null, status: { name: string } } | null };

export type GetDailyWorkingHoursQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;


export type GetDailyWorkingHoursQuery = { workingHours?: { date: string, startHour: number, startMinute: number, endHour: number, endMinute: number, isWorkingDay: boolean } | null };

export type GetWorkingHoursQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkingHoursQuery = { workingHoursAll: Array<{ date: string, startHour: number, startMinute: number, endHour: number, endMinute: number, isWorkingDay: boolean }> };

export type UpdateDailyWorkingHoursMutationVariables = Exact<{
  date: Scalars['String']['input'];
  update: UpdateWorkingHoursInput;
}>;


export type UpdateDailyWorkingHoursMutation = { updateWorkingHours: { date: string, startHour: number, startMinute: number, endHour: number, endMinute: number, isWorkingDay: boolean } };


export const PporderlineStatusChangedDocument = gql`
    subscription PporderlineStatusChanged {
  pporderlineStatusChanged {
    id
    status
    pporders {
      id
      pporderno
    }
  }
}
    `;

/**
 * __usePporderlineStatusChangedSubscription__
 *
 * To run a query within a React component, call `usePporderlineStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePporderlineStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePporderlineStatusChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePporderlineStatusChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PporderlineStatusChangedSubscription, PporderlineStatusChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PporderlineStatusChangedSubscription, PporderlineStatusChangedSubscriptionVariables>(PporderlineStatusChangedDocument, options);
      }
export type PporderlineStatusChangedSubscriptionHookResult = ReturnType<typeof usePporderlineStatusChangedSubscription>;
export type PporderlineStatusChangedSubscriptionResult = Apollo.SubscriptionResult<PporderlineStatusChangedSubscription>;
export const PporderUpdatedDocument = gql`
    subscription PporderUpdated {
  pporderUpdated {
    id
    status
    panelcode
    pporderno
    estStartDate
    estFinishDate
    offtimeduration
    offtimestartdate
    offtimeenddate
    pauseduration
    pausestartdate
    pauseenddate
  }
}
    `;

/**
 * __usePporderUpdatedSubscription__
 *
 * To run a query within a React component, call `usePporderUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePporderUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePporderUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePporderUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PporderUpdatedSubscription, PporderUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PporderUpdatedSubscription, PporderUpdatedSubscriptionVariables>(PporderUpdatedDocument, options);
      }
export type PporderUpdatedSubscriptionHookResult = ReturnType<typeof usePporderUpdatedSubscription>;
export type PporderUpdatedSubscriptionResult = Apollo.SubscriptionResult<PporderUpdatedSubscription>;
export const UpdatePauseDetailsDocument = gql`
    mutation UpdatePauseDetails($input: UpdatePauseDetailsInput!) {
  updatePauseDetails(input: $input) {
    id
    pporderid
    pausestartdate
    pauseenddate
    pauseduration
    pausecomment
  }
}
    `;
export type UpdatePauseDetailsMutationFn = Apollo.MutationFunction<UpdatePauseDetailsMutation, UpdatePauseDetailsMutationVariables>;

/**
 * __useUpdatePauseDetailsMutation__
 *
 * To run a mutation, you first call `useUpdatePauseDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePauseDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePauseDetailsMutation, { data, loading, error }] = useUpdatePauseDetailsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePauseDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePauseDetailsMutation, UpdatePauseDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePauseDetailsMutation, UpdatePauseDetailsMutationVariables>(UpdatePauseDetailsDocument, options);
      }
export type UpdatePauseDetailsMutationHookResult = ReturnType<typeof useUpdatePauseDetailsMutation>;
export type UpdatePauseDetailsMutationResult = Apollo.MutationResult<UpdatePauseDetailsMutation>;
export type UpdatePauseDetailsMutationOptions = Apollo.BaseMutationOptions<UpdatePauseDetailsMutation, UpdatePauseDetailsMutationVariables>;
export const CreateCompletePauseDocument = gql`
    mutation CreateCompletePause($input: CreateCompletePauseInput!) {
  createCompletePause(input: $input) {
    id
    pporderid
    pausestartdate
    pauseenddate
    pauseduration
    pausecomment
  }
}
    `;
export type CreateCompletePauseMutationFn = Apollo.MutationFunction<CreateCompletePauseMutation, CreateCompletePauseMutationVariables>;

/**
 * __useCreateCompletePauseMutation__
 *
 * To run a mutation, you first call `useCreateCompletePauseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompletePauseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompletePauseMutation, { data, loading, error }] = useCreateCompletePauseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompletePauseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompletePauseMutation, CreateCompletePauseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompletePauseMutation, CreateCompletePauseMutationVariables>(CreateCompletePauseDocument, options);
      }
export type CreateCompletePauseMutationHookResult = ReturnType<typeof useCreateCompletePauseMutation>;
export type CreateCompletePauseMutationResult = Apollo.MutationResult<CreateCompletePauseMutation>;
export type CreateCompletePauseMutationOptions = Apollo.BaseMutationOptions<CreateCompletePauseMutation, CreateCompletePauseMutationVariables>;
export const DeleteMachinePauseDocument = gql`
    mutation DeleteMachinePause($id: Int!) {
  deleteMachinePause(id: $id)
}
    `;
export type DeleteMachinePauseMutationFn = Apollo.MutationFunction<DeleteMachinePauseMutation, DeleteMachinePauseMutationVariables>;

/**
 * __useDeleteMachinePauseMutation__
 *
 * To run a mutation, you first call `useDeleteMachinePauseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMachinePauseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMachinePauseMutation, { data, loading, error }] = useDeleteMachinePauseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMachinePauseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMachinePauseMutation, DeleteMachinePauseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMachinePauseMutation, DeleteMachinePauseMutationVariables>(DeleteMachinePauseDocument, options);
      }
export type DeleteMachinePauseMutationHookResult = ReturnType<typeof useDeleteMachinePauseMutation>;
export type DeleteMachinePauseMutationResult = Apollo.MutationResult<DeleteMachinePauseMutation>;
export type DeleteMachinePauseMutationOptions = Apollo.BaseMutationOptions<DeleteMachinePauseMutation, DeleteMachinePauseMutationVariables>;
export const UpdatePporderDocument = gql`
    mutation updatePporder($input: UpdatePporderInput!) {
  updatePporder(input: $input) {
    pporderno
    id
    status
    startDateDatetime
    finishDateDatetime
    estStartDate
    estFinishDate
    previd
    prevpanelcode
    offtimeduration
    offtimestartdate
    offtimeenddate
    pauses {
      id
      pausestartdate
      pauseenddate
      pauseduration
      pausecomment
    }
    pporderlines {
      status
      upDate
    }
  }
}
    `;
export type UpdatePporderMutationFn = Apollo.MutationFunction<UpdatePporderMutation, UpdatePporderMutationVariables>;

/**
 * __useUpdatePporderMutation__
 *
 * To run a mutation, you first call `useUpdatePporderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePporderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePporderMutation, { data, loading, error }] = useUpdatePporderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePporderMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePporderMutation, UpdatePporderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePporderMutation, UpdatePporderMutationVariables>(UpdatePporderDocument, options);
      }
export type UpdatePporderMutationHookResult = ReturnType<typeof useUpdatePporderMutation>;
export type UpdatePporderMutationResult = Apollo.MutationResult<UpdatePporderMutation>;
export type UpdatePporderMutationOptions = Apollo.BaseMutationOptions<UpdatePporderMutation, UpdatePporderMutationVariables>;
export const GetPpOrdersListDocument = gql`
    query GetPpOrdersList($filter: PpordersFilterInput) {
  pporders(filter: $filter) {
    id
    pporderno
    panelcode
    status
    startDateDatetime
    finishDateDatetime
    estDateOfProdDatetime
    createDate
    estStartDate
    estFinishDate
    previd
    prevpanelcode
    offtimeduration
    offtimestartdate
    offtimeenddate
    pauses {
      id
      pausestartdate
      pauseenddate
      pauseduration
      pausecomment
    }
    groupIn {
      cin
      thickin
      moldin
      cout
      thickout
      moldout
      totalTtm
    }
  }
}
    `;

/**
 * __useGetPpOrdersListQuery__
 *
 * To run a query within a React component, call `useGetPpOrdersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPpOrdersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPpOrdersListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPpOrdersListQuery(baseOptions?: Apollo.QueryHookOptions<GetPpOrdersListQuery, GetPpOrdersListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPpOrdersListQuery, GetPpOrdersListQueryVariables>(GetPpOrdersListDocument, options);
      }
export function useGetPpOrdersListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPpOrdersListQuery, GetPpOrdersListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPpOrdersListQuery, GetPpOrdersListQueryVariables>(GetPpOrdersListDocument, options);
        }
export function useGetPpOrdersListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPpOrdersListQuery, GetPpOrdersListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPpOrdersListQuery, GetPpOrdersListQueryVariables>(GetPpOrdersListDocument, options);
        }
export type GetPpOrdersListQueryHookResult = ReturnType<typeof useGetPpOrdersListQuery>;
export type GetPpOrdersListLazyQueryHookResult = ReturnType<typeof useGetPpOrdersListLazyQuery>;
export type GetPpOrdersListSuspenseQueryHookResult = ReturnType<typeof useGetPpOrdersListSuspenseQuery>;
export type GetPpOrdersListQueryResult = Apollo.QueryResult<GetPpOrdersListQuery, GetPpOrdersListQueryVariables>;
export const GetPpOrdersDocument = gql`
    query GetPpOrders($filter: PpordersFilterInput) {
  pporders(filter: $filter) {
    id
    pporderno
    panelcode
    status
    startDateDatetime
    finishDateDatetime
    estDateOfProdDatetime
    createDate
    estStartDate
    estFinishDate
    previd
    prevpanelcode
    offtimeduration
    offtimestartdate
    offtimeenddate
    pauses {
      id
      pausestartdate
      pauseenddate
      pauseduration
      pausecomment
    }
  }
}
    `;

/**
 * __useGetPpOrdersQuery__
 *
 * To run a query within a React component, call `useGetPpOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPpOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPpOrdersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPpOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetPpOrdersQuery, GetPpOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPpOrdersQuery, GetPpOrdersQueryVariables>(GetPpOrdersDocument, options);
      }
export function useGetPpOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPpOrdersQuery, GetPpOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPpOrdersQuery, GetPpOrdersQueryVariables>(GetPpOrdersDocument, options);
        }
export function useGetPpOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPpOrdersQuery, GetPpOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPpOrdersQuery, GetPpOrdersQueryVariables>(GetPpOrdersDocument, options);
        }
export type GetPpOrdersQueryHookResult = ReturnType<typeof useGetPpOrdersQuery>;
export type GetPpOrdersLazyQueryHookResult = ReturnType<typeof useGetPpOrdersLazyQuery>;
export type GetPpOrdersSuspenseQueryHookResult = ReturnType<typeof useGetPpOrdersSuspenseQuery>;
export type GetPpOrdersQueryResult = Apollo.QueryResult<GetPpOrdersQuery, GetPpOrdersQueryVariables>;
export const GetMasterlengthDocument = gql`
    query GetMasterlength($filter: MasterlengthFilterInput) {
  masterlengths(filter: $filter) {
    pporderno
    id
    code
    startDateDatetime
    finishDateDatetime
    totalMeter
    status
    time
    previd
    prevpanelcode
    offtimeduration
    offtimestartdate
    offtimeenddate
  }
}
    `;

/**
 * __useGetMasterlengthQuery__
 *
 * To run a query within a React component, call `useGetMasterlengthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMasterlengthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMasterlengthQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetMasterlengthQuery(baseOptions?: Apollo.QueryHookOptions<GetMasterlengthQuery, GetMasterlengthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMasterlengthQuery, GetMasterlengthQueryVariables>(GetMasterlengthDocument, options);
      }
export function useGetMasterlengthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMasterlengthQuery, GetMasterlengthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMasterlengthQuery, GetMasterlengthQueryVariables>(GetMasterlengthDocument, options);
        }
export function useGetMasterlengthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMasterlengthQuery, GetMasterlengthQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMasterlengthQuery, GetMasterlengthQueryVariables>(GetMasterlengthDocument, options);
        }
export type GetMasterlengthQueryHookResult = ReturnType<typeof useGetMasterlengthQuery>;
export type GetMasterlengthLazyQueryHookResult = ReturnType<typeof useGetMasterlengthLazyQuery>;
export type GetMasterlengthSuspenseQueryHookResult = ReturnType<typeof useGetMasterlengthSuspenseQuery>;
export type GetMasterlengthQueryResult = Apollo.QueryResult<GetMasterlengthQuery, GetMasterlengthQueryVariables>;
export const GetPpOrderLinestopporderDocument = gql`
    query GetPpOrderLINESTOPPORDER($filter: Pporderlines2FilterInput) {
  pporderlines2(filter: $filter) {
    nodes {
      id
      pporderno
      panelcode
      status
      custporderno
      upDate
      status
      prodOrdersView {
        isCanceled
        time
        speed
        ttm
        cin
        cout
        moldin
        moldout
        count
      }
      pporders {
        id
        pporderno
        panelcode
        startDateDatetime
        finishDateDatetime
      }
    }
    totalCount
  }
}
    `;

/**
 * __useGetPpOrderLinestopporderQuery__
 *
 * To run a query within a React component, call `useGetPpOrderLinestopporderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPpOrderLinestopporderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPpOrderLinestopporderQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPpOrderLinestopporderQuery(baseOptions?: Apollo.QueryHookOptions<GetPpOrderLinestopporderQuery, GetPpOrderLinestopporderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPpOrderLinestopporderQuery, GetPpOrderLinestopporderQueryVariables>(GetPpOrderLinestopporderDocument, options);
      }
export function useGetPpOrderLinestopporderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPpOrderLinestopporderQuery, GetPpOrderLinestopporderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPpOrderLinestopporderQuery, GetPpOrderLinestopporderQueryVariables>(GetPpOrderLinestopporderDocument, options);
        }
export function useGetPpOrderLinestopporderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPpOrderLinestopporderQuery, GetPpOrderLinestopporderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPpOrderLinestopporderQuery, GetPpOrderLinestopporderQueryVariables>(GetPpOrderLinestopporderDocument, options);
        }
export type GetPpOrderLinestopporderQueryHookResult = ReturnType<typeof useGetPpOrderLinestopporderQuery>;
export type GetPpOrderLinestopporderLazyQueryHookResult = ReturnType<typeof useGetPpOrderLinestopporderLazyQuery>;
export type GetPpOrderLinestopporderSuspenseQueryHookResult = ReturnType<typeof useGetPpOrderLinestopporderSuspenseQuery>;
export type GetPpOrderLinestopporderQueryResult = Apollo.QueryResult<GetPpOrderLinestopporderQuery, GetPpOrderLinestopporderQueryVariables>;
export const PpOrderLine2Document = gql`
    query PpOrderLine2($filter: Pporderlines2FilterInput, $sorting: [Pporderlines2SortInput!], $paging: OffsetPaging) {
  pporderlines2(filter: $filter, sorting: $sorting, paging: $paging) {
    nodes {
      id
      pporderno
      custporderno
      prodDate
      upDate
      status
      isCanceled
      panelcode
      tradecode
      prodOrdersView {
        cin
        cout
        moldin
        moldout
        thickin
        thickout
        count
        time
        speed
        ttm
      }
      pporders {
        status
      }
    }
    totalCount
  }
}
    `;

/**
 * __usePpOrderLine2Query__
 *
 * To run a query within a React component, call `usePpOrderLine2Query` and pass it any options that fit your needs.
 * When your component renders, `usePpOrderLine2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePpOrderLine2Query({
 *   variables: {
 *      filter: // value for 'filter'
 *      sorting: // value for 'sorting'
 *      paging: // value for 'paging'
 *   },
 * });
 */
export function usePpOrderLine2Query(baseOptions?: Apollo.QueryHookOptions<PpOrderLine2Query, PpOrderLine2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PpOrderLine2Query, PpOrderLine2QueryVariables>(PpOrderLine2Document, options);
      }
export function usePpOrderLine2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PpOrderLine2Query, PpOrderLine2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PpOrderLine2Query, PpOrderLine2QueryVariables>(PpOrderLine2Document, options);
        }
export function usePpOrderLine2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PpOrderLine2Query, PpOrderLine2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PpOrderLine2Query, PpOrderLine2QueryVariables>(PpOrderLine2Document, options);
        }
export type PpOrderLine2QueryHookResult = ReturnType<typeof usePpOrderLine2Query>;
export type PpOrderLine2LazyQueryHookResult = ReturnType<typeof usePpOrderLine2LazyQuery>;
export type PpOrderLine2SuspenseQueryHookResult = ReturnType<typeof usePpOrderLine2SuspenseQuery>;
export type PpOrderLine2QueryResult = Apollo.QueryResult<PpOrderLine2Query, PpOrderLine2QueryVariables>;
export const GetCoilDocument = gql`
    query GetCoil($id: Int!) {
  coil(id: $id) {
    id
    comments
    thickness
    loc
    cutComment
    commentsPanel
    prodComment
  }
}
    `;

/**
 * __useGetCoilQuery__
 *
 * To run a query within a React component, call `useGetCoilQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoilQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoilQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCoilQuery(baseOptions: Apollo.QueryHookOptions<GetCoilQuery, GetCoilQueryVariables> & ({ variables: GetCoilQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoilQuery, GetCoilQueryVariables>(GetCoilDocument, options);
      }
export function useGetCoilLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoilQuery, GetCoilQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoilQuery, GetCoilQueryVariables>(GetCoilDocument, options);
        }
export function useGetCoilSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCoilQuery, GetCoilQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCoilQuery, GetCoilQueryVariables>(GetCoilDocument, options);
        }
export type GetCoilQueryHookResult = ReturnType<typeof useGetCoilQuery>;
export type GetCoilLazyQueryHookResult = ReturnType<typeof useGetCoilLazyQuery>;
export type GetCoilSuspenseQueryHookResult = ReturnType<typeof useGetCoilSuspenseQuery>;
export type GetCoilQueryResult = Apollo.QueryResult<GetCoilQuery, GetCoilQueryVariables>;
export const UpdateOneCoilDocument = gql`
    mutation updateOneCoil($input: UpdateOneCoilInput!) {
  updateOneCoil(input: $input) {
    id
    comments
    thickness
  }
}
    `;
export type UpdateOneCoilMutationFn = Apollo.MutationFunction<UpdateOneCoilMutation, UpdateOneCoilMutationVariables>;

/**
 * __useUpdateOneCoilMutation__
 *
 * To run a mutation, you first call `useUpdateOneCoilMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneCoilMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneCoilMutation, { data, loading, error }] = useUpdateOneCoilMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOneCoilMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneCoilMutation, UpdateOneCoilMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneCoilMutation, UpdateOneCoilMutationVariables>(UpdateOneCoilDocument, options);
      }
export type UpdateOneCoilMutationHookResult = ReturnType<typeof useUpdateOneCoilMutation>;
export type UpdateOneCoilMutationResult = Apollo.MutationResult<UpdateOneCoilMutation>;
export type UpdateOneCoilMutationOptions = Apollo.BaseMutationOptions<UpdateOneCoilMutation, UpdateOneCoilMutationVariables>;
export const GetAllLocationsDocument = gql`
    query GetAllLocations {
  locations {
    shortname
    whgroup
    atlaid
    atlaname
    comid
  }
}
    `;

/**
 * __useGetAllLocationsQuery__
 *
 * To run a query within a React component, call `useGetAllLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllLocationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllLocationsQuery, GetAllLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllLocationsQuery, GetAllLocationsQueryVariables>(GetAllLocationsDocument, options);
      }
export function useGetAllLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLocationsQuery, GetAllLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllLocationsQuery, GetAllLocationsQueryVariables>(GetAllLocationsDocument, options);
        }
export function useGetAllLocationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllLocationsQuery, GetAllLocationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllLocationsQuery, GetAllLocationsQueryVariables>(GetAllLocationsDocument, options);
        }
export type GetAllLocationsQueryHookResult = ReturnType<typeof useGetAllLocationsQuery>;
export type GetAllLocationsLazyQueryHookResult = ReturnType<typeof useGetAllLocationsLazyQuery>;
export type GetAllLocationsSuspenseQueryHookResult = ReturnType<typeof useGetAllLocationsSuspenseQuery>;
export type GetAllLocationsQueryResult = Apollo.QueryResult<GetAllLocationsQuery, GetAllLocationsQueryVariables>;
export const UserDocument = gql`
    query User($userId: String!) {
  user(userId: $userId) {
    userId
    role
    name
    id
    password
    email
    phone
    atlaname
    name2
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const GetexpectedCoilsDocument = gql`
    query GetexpectedCoils($filter: CoilsFilterInput, $sorting: [CoilsSortInput!], $limit: Int, $offset: Int) {
  expectedCoils(
    filter: $filter
    sorting: $sorting
    limit: $limit
    offset: $offset
  ) {
    nodes {
      id
      coilno
      comments
      color
      loc
      upDate
      thickness
      widthCoil
      currWeight
      openstatus
      supplier
      company
      status {
        id
        name
      }
    }
    totalCount
  }
}
    `;

/**
 * __useGetexpectedCoilsQuery__
 *
 * To run a query within a React component, call `useGetexpectedCoilsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetexpectedCoilsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetexpectedCoilsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sorting: // value for 'sorting'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetexpectedCoilsQuery(baseOptions?: Apollo.QueryHookOptions<GetexpectedCoilsQuery, GetexpectedCoilsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetexpectedCoilsQuery, GetexpectedCoilsQueryVariables>(GetexpectedCoilsDocument, options);
      }
export function useGetexpectedCoilsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetexpectedCoilsQuery, GetexpectedCoilsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetexpectedCoilsQuery, GetexpectedCoilsQueryVariables>(GetexpectedCoilsDocument, options);
        }
export function useGetexpectedCoilsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetexpectedCoilsQuery, GetexpectedCoilsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetexpectedCoilsQuery, GetexpectedCoilsQueryVariables>(GetexpectedCoilsDocument, options);
        }
export type GetexpectedCoilsQueryHookResult = ReturnType<typeof useGetexpectedCoilsQuery>;
export type GetexpectedCoilsLazyQueryHookResult = ReturnType<typeof useGetexpectedCoilsLazyQuery>;
export type GetexpectedCoilsSuspenseQueryHookResult = ReturnType<typeof useGetexpectedCoilsSuspenseQuery>;
export type GetexpectedCoilsQueryResult = Apollo.QueryResult<GetexpectedCoilsQuery, GetexpectedCoilsQueryVariables>;
export const CoilColorsDocument = gql`
    query coilColors {
  coilColors {
    id
    code
    name
    hexcode
  }
}
    `;

/**
 * __useCoilColorsQuery__
 *
 * To run a query within a React component, call `useCoilColorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoilColorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoilColorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCoilColorsQuery(baseOptions?: Apollo.QueryHookOptions<CoilColorsQuery, CoilColorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoilColorsQuery, CoilColorsQueryVariables>(CoilColorsDocument, options);
      }
export function useCoilColorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoilColorsQuery, CoilColorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoilColorsQuery, CoilColorsQueryVariables>(CoilColorsDocument, options);
        }
export function useCoilColorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CoilColorsQuery, CoilColorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CoilColorsQuery, CoilColorsQueryVariables>(CoilColorsDocument, options);
        }
export type CoilColorsQueryHookResult = ReturnType<typeof useCoilColorsQuery>;
export type CoilColorsLazyQueryHookResult = ReturnType<typeof useCoilColorsLazyQuery>;
export type CoilColorsSuspenseQueryHookResult = ReturnType<typeof useCoilColorsSuspenseQuery>;
export type CoilColorsQueryResult = Apollo.QueryResult<CoilColorsQuery, CoilColorsQueryVariables>;
export const GetAvailableCoilsDocument = gql`
    query GetAvailableCoils($filter: CoilsFilterInput, $sorting: [CoilsSortInput!], $limit: Int, $offset: Int) {
  availableCoils(
    filter: $filter
    sorting: $sorting
    limit: $limit
    offset: $offset
  ) {
    nodes {
      id
      coilno
      comments
      color
      loc
      upDate
      thickness
      widthCoil
      currWeight
      openstatus
      supplier
      company
      status {
        id
        name
      }
    }
    totalCount
  }
}
    `;

/**
 * __useGetAvailableCoilsQuery__
 *
 * To run a query within a React component, call `useGetAvailableCoilsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableCoilsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableCoilsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sorting: // value for 'sorting'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetAvailableCoilsQuery(baseOptions?: Apollo.QueryHookOptions<GetAvailableCoilsQuery, GetAvailableCoilsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvailableCoilsQuery, GetAvailableCoilsQueryVariables>(GetAvailableCoilsDocument, options);
      }
export function useGetAvailableCoilsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableCoilsQuery, GetAvailableCoilsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvailableCoilsQuery, GetAvailableCoilsQueryVariables>(GetAvailableCoilsDocument, options);
        }
export function useGetAvailableCoilsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAvailableCoilsQuery, GetAvailableCoilsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAvailableCoilsQuery, GetAvailableCoilsQueryVariables>(GetAvailableCoilsDocument, options);
        }
export type GetAvailableCoilsQueryHookResult = ReturnType<typeof useGetAvailableCoilsQuery>;
export type GetAvailableCoilsLazyQueryHookResult = ReturnType<typeof useGetAvailableCoilsLazyQuery>;
export type GetAvailableCoilsSuspenseQueryHookResult = ReturnType<typeof useGetAvailableCoilsSuspenseQuery>;
export type GetAvailableCoilsQueryResult = Apollo.QueryResult<GetAvailableCoilsQuery, GetAvailableCoilsQueryVariables>;
export const CoilShowDocument = gql`
    query CoilShow($id: Int!) {
  coil(id: $id) {
    id
    coilno
    color
    sheetType
    coating
    coathick
    paintType
    steelGrade
    createDate
    delDate
    upDate
    gaugeThickness
    thickness
    widthCoil
    initWeight
    weight
    currWeight
    grossWeight
    wastage
    status {
      name
    }
    loc
    currLength
    comments
    commentsPanel
    supplier
    openstatus
    innerdiameter
    quality
    supcoilId
    customer
    orderDate
    corderid
    loadDate
    tporderId
    tporderSort
    classification
    painted
    heatno
    cutWastage
    nomthickness
    price
    cutComment
    surfaceType
    loaderid
    donkey
    dateofDes34
    dcustomer
    prodDate
    datediff
    datediffnow
    tempStatus
    property
    slitrange
    slithick
    locTrans
    dateTrans
    customs
    currLengthAgr
    currLengthPol
    currLengthAlu
    currLengthAlup
    currLengthPap
    currLengthAlue
    currLengthBit
    currLengthSto
    anVcoated
    prodComment
    documents
    vesselName
    dischargePort
    productCode
    dcustomerName
    cnomthickness
    tnomthickness
    ptradecode
    clength
    dateDiffDelNow
    dateDiffCutNow
    dateDiffCutProd
    dateDiffCutSales
    dateDiffDelPaint
    dateDiffDelSales
    dateDiffDelCut
    company
  }
}
    `;

/**
 * __useCoilShowQuery__
 *
 * To run a query within a React component, call `useCoilShowQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoilShowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoilShowQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCoilShowQuery(baseOptions: Apollo.QueryHookOptions<CoilShowQuery, CoilShowQueryVariables> & ({ variables: CoilShowQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoilShowQuery, CoilShowQueryVariables>(CoilShowDocument, options);
      }
export function useCoilShowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoilShowQuery, CoilShowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoilShowQuery, CoilShowQueryVariables>(CoilShowDocument, options);
        }
export function useCoilShowSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CoilShowQuery, CoilShowQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CoilShowQuery, CoilShowQueryVariables>(CoilShowDocument, options);
        }
export type CoilShowQueryHookResult = ReturnType<typeof useCoilShowQuery>;
export type CoilShowLazyQueryHookResult = ReturnType<typeof useCoilShowLazyQuery>;
export type CoilShowSuspenseQueryHookResult = ReturnType<typeof useCoilShowSuspenseQuery>;
export type CoilShowQueryResult = Apollo.QueryResult<CoilShowQuery, CoilShowQueryVariables>;
export const GetDailyWorkingHoursDocument = gql`
    query GetDailyWorkingHours($date: String!) {
  workingHours(date: $date) {
    date
    startHour
    startMinute
    endHour
    endMinute
    isWorkingDay
  }
}
    `;

/**
 * __useGetDailyWorkingHoursQuery__
 *
 * To run a query within a React component, call `useGetDailyWorkingHoursQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDailyWorkingHoursQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDailyWorkingHoursQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetDailyWorkingHoursQuery(baseOptions: Apollo.QueryHookOptions<GetDailyWorkingHoursQuery, GetDailyWorkingHoursQueryVariables> & ({ variables: GetDailyWorkingHoursQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDailyWorkingHoursQuery, GetDailyWorkingHoursQueryVariables>(GetDailyWorkingHoursDocument, options);
      }
export function useGetDailyWorkingHoursLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDailyWorkingHoursQuery, GetDailyWorkingHoursQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDailyWorkingHoursQuery, GetDailyWorkingHoursQueryVariables>(GetDailyWorkingHoursDocument, options);
        }
export function useGetDailyWorkingHoursSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDailyWorkingHoursQuery, GetDailyWorkingHoursQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDailyWorkingHoursQuery, GetDailyWorkingHoursQueryVariables>(GetDailyWorkingHoursDocument, options);
        }
export type GetDailyWorkingHoursQueryHookResult = ReturnType<typeof useGetDailyWorkingHoursQuery>;
export type GetDailyWorkingHoursLazyQueryHookResult = ReturnType<typeof useGetDailyWorkingHoursLazyQuery>;
export type GetDailyWorkingHoursSuspenseQueryHookResult = ReturnType<typeof useGetDailyWorkingHoursSuspenseQuery>;
export type GetDailyWorkingHoursQueryResult = Apollo.QueryResult<GetDailyWorkingHoursQuery, GetDailyWorkingHoursQueryVariables>;
export const GetWorkingHoursDocument = gql`
    query GetWorkingHours {
  workingHoursAll {
    date
    startHour
    startMinute
    endHour
    endMinute
    isWorkingDay
  }
}
    `;

/**
 * __useGetWorkingHoursQuery__
 *
 * To run a query within a React component, call `useGetWorkingHoursQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingHoursQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingHoursQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWorkingHoursQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkingHoursQuery, GetWorkingHoursQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingHoursQuery, GetWorkingHoursQueryVariables>(GetWorkingHoursDocument, options);
      }
export function useGetWorkingHoursLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingHoursQuery, GetWorkingHoursQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingHoursQuery, GetWorkingHoursQueryVariables>(GetWorkingHoursDocument, options);
        }
export function useGetWorkingHoursSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkingHoursQuery, GetWorkingHoursQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkingHoursQuery, GetWorkingHoursQueryVariables>(GetWorkingHoursDocument, options);
        }
export type GetWorkingHoursQueryHookResult = ReturnType<typeof useGetWorkingHoursQuery>;
export type GetWorkingHoursLazyQueryHookResult = ReturnType<typeof useGetWorkingHoursLazyQuery>;
export type GetWorkingHoursSuspenseQueryHookResult = ReturnType<typeof useGetWorkingHoursSuspenseQuery>;
export type GetWorkingHoursQueryResult = Apollo.QueryResult<GetWorkingHoursQuery, GetWorkingHoursQueryVariables>;
export const UpdateDailyWorkingHoursDocument = gql`
    mutation UpdateDailyWorkingHours($date: String!, $update: UpdateWorkingHoursInput!) {
  updateWorkingHours(date: $date, update: $update) {
    date
    startHour
    startMinute
    endHour
    endMinute
    isWorkingDay
  }
}
    `;
export type UpdateDailyWorkingHoursMutationFn = Apollo.MutationFunction<UpdateDailyWorkingHoursMutation, UpdateDailyWorkingHoursMutationVariables>;

/**
 * __useUpdateDailyWorkingHoursMutation__
 *
 * To run a mutation, you first call `useUpdateDailyWorkingHoursMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDailyWorkingHoursMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDailyWorkingHoursMutation, { data, loading, error }] = useUpdateDailyWorkingHoursMutation({
 *   variables: {
 *      date: // value for 'date'
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpdateDailyWorkingHoursMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDailyWorkingHoursMutation, UpdateDailyWorkingHoursMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDailyWorkingHoursMutation, UpdateDailyWorkingHoursMutationVariables>(UpdateDailyWorkingHoursDocument, options);
      }
export type UpdateDailyWorkingHoursMutationHookResult = ReturnType<typeof useUpdateDailyWorkingHoursMutation>;
export type UpdateDailyWorkingHoursMutationResult = Apollo.MutationResult<UpdateDailyWorkingHoursMutation>;
export type UpdateDailyWorkingHoursMutationOptions = Apollo.BaseMutationOptions<UpdateDailyWorkingHoursMutation, UpdateDailyWorkingHoursMutationVariables>;