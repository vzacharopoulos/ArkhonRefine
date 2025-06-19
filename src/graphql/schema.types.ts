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

export type IntInInput = {
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type Mutation = {
  addRecipe: Recipe;
  login: LoginResponse;
  removeRecipe: Scalars['Boolean']['output'];
  updateOneCoil: Coil;
};


export type MutationAddRecipeArgs = {
  newRecipeData: NewRecipeInput;
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

export type NewRecipeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  ingredients: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Query = {
  allowedLocations: Array<Location>;
  availableCoils: CoilsResponse;
  coil?: Maybe<Coil>;
  coilColor?: Maybe<CoilColorType>;
  coilColors: Array<CoilColorType>;
  coils: CoilsResponse;
  expectedCoils: CoilsResponse;
  location?: Maybe<Location>;
  locations: Array<Location>;
  me: Users;
  recipe: Recipe;
  recipes: Array<Recipe>;
  status?: Maybe<StatusType>;
  statusByName?: Maybe<StatusType>;
  statuses: Array<StatusType>;
  user?: Maybe<Users>;
  users: Array<Users>;
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
  id: Scalars['String']['input'];
};


export type QueryCoilColorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCoilsArgs = {
  filter?: InputMaybe<CoilsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryExpectedCoilsArgs = {
  filter?: InputMaybe<CoilsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Array<CoilsSortInput>>;
};


export type QueryLocationArgs = {
  locationId: Scalars['Int']['input'];
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

/** recipe */
export type Recipe = {
  creationDate: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ingredients: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

/** Specify ascending or descending order */
export type SortOrder =
  | 'ASC'
  | 'DESC';

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

export type StringFilterInput = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  recipeAdded: Recipe;
};

export type UpdateCoilInput = {
  coilno?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  currWeight?: InputMaybe<Scalars['Float']['input']>;
  loc?: InputMaybe<Scalars['Int']['input']>;
  openstatus?: InputMaybe<Scalars['String']['input']>;
  statusId?: InputMaybe<Scalars['Int']['input']>;
  supplier?: InputMaybe<Scalars['String']['input']>;
  thickness?: InputMaybe<Scalars['Float']['input']>;
  upDate?: InputMaybe<Scalars['Date']['input']>;
  widthCoil?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateOneCoilInput = {
  id: Scalars['ID']['input'];
  update: UpdateCoilInput;
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

/** The status of a coil (Open or Closed). */
export type Openstatus =
  | 'CLOSED'
  | 'OPEN';

export type OpenstatusFilterInput = {
  eq?: InputMaybe<Openstatus>;
  in?: InputMaybe<Array<Openstatus>>;
};

export type GetCoilQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCoilQuery = { coil?: { id: number, coilno?: string | null, color?: string | null, thickness?: number | null, comments?: string | null } | null };

export type UpdateOneCoilMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateCoilInput;
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
  id: Scalars['String']['input'];
}>;


export type CoilShowQuery = { coil?: { id: number, coilno?: string | null, color?: string | null, sheetType?: string | null, coating?: string | null, coathick?: string | null, paintType?: string | null, steelGrade?: string | null, createDate?: any | null, delDate?: any | null, upDate?: any | null, gaugeThickness?: string | null, thickness?: number | null, widthCoil?: number | null, initWeight?: number | null, weight?: number | null, currWeight?: number | null, grossWeight?: number | null, wastage?: number | null, loc?: number | null, currLength?: number | null, comments?: string | null, commentsPanel?: string | null, supplier?: string | null, openstatus?: string | null, innerdiameter?: number | null, quality?: number | null, supcoilId?: string | null, customer?: string | null, orderDate?: any | null, corderid?: string | null, loadDate?: any | null, tporderId?: string | null, tporderSort?: number | null, classification?: string | null, painted?: string | null, heatno?: string | null, cutWastage?: number | null, nomthickness?: string | null, price?: number | null, cutComment?: string | null, surfaceType?: string | null, loaderid?: string | null, donkey?: number | null, dateofDes34?: any | null, dcustomer?: string | null, prodDate?: any | null, datediff?: number | null, datediffnow?: number | null, tempStatus?: number | null, property?: number | null, slitrange?: string | null, slithick?: string | null, locTrans?: number | null, dateTrans?: any | null, customs?: number | null, currLengthAgr?: number | null, currLengthPol?: number | null, currLengthAlu?: number | null, currLengthAlup?: number | null, currLengthPap?: number | null, currLengthAlue?: number | null, currLengthBit?: number | null, currLengthSto?: number | null, anVcoated?: number | null, prodComment?: string | null, documents?: string | null, vesselName?: string | null, dischargePort?: string | null, productCode?: string | null, dcustomerName?: string | null, cnomthickness?: string | null, tnomthickness?: string | null, ptradecode?: string | null, clength?: number | null, dateDiffDelNow?: number | null, dateDiffCutNow?: number | null, dateDiffCutProd?: number | null, dateDiffCutSales?: number | null, dateDiffDelPaint?: number | null, dateDiffDelSales?: number | null, dateDiffDelCut?: number | null, company?: string | null, status: { name: string } } | null };


export const GetCoilDocument = gql`
    query GetCoil($id: String!) {
  coil(id: $id) {
    id
    coilno
    color
    thickness
    comments
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
    mutation updateOneCoil($id: ID!, $update: UpdateCoilInput!) {
  updateOneCoil(input: {id: $id, update: $update}) {
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
 *      id: // value for 'id'
 *      update: // value for 'update'
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
    query CoilShow($id: String!) {
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