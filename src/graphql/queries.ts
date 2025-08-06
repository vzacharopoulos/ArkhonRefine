




import gql from "graphql-tag";

export const PPORDERLINE_STATUS_CHANGED_SUBSCRIPTION = gql`
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

export const PPORDER_UPDATED_SUBSCRIPTION = gql`
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


export const UPDATE_PAUSE = gql`
mutation UpdatePauseDetails($input: UpdatePauseDetailsInput!) {
  updatePauseDetails(input: $input) {
    id
    pporderid
    pausestartdate
    pauseenddate
    pauseduration
    pausecomment
  }
}`

export const CREATE_COMPLETE_PAUSE = gql`
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


export const DELETE_MACHINE_PAUSE = gql`
  mutation DeleteMachinePause($id: Int!) {
    deleteMachinePause(id: $id)
  }
`;


export const UPDATE_PPORDERS = gql`
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
 pauses  {id
pausestartdate
pauseenddate
pauseduration
pausecomment}
      pporderlines{
      status
      upDate
    }
  }

}`


export const GET_PPORDERS = gql`
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
    pauses
    {id
pausestartdate
pauseenddate
pauseduration
pausecomment}
    
    
  }
}`;

export const GET_FINISHED_PPORDERS = gql`
query GetMasterlength($filter:MasterlengthFilterInput)  {
   masterlengths(filter: $filter){
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
    # pauses {
    #   id
    #   pausestartdate
    #   pauseenddate
    #   pauseduration
    #   pausecomment
    # }
    
}
}`
export const GET_PPORDERLINES_OF_PPORDER = gql`
query GetPpOrderLINESTOPPORDER($filter: Pporderlines2FilterInput) {
  pporderlines2(filter: $filter) {
    id
    pporderno
    panelcode
    status
    custporderno
upDate
    status
    prodOrdersView{
      isCanceled
      time
      speed
      ttm
    }
 
    pporders{
      id
      pporderno
      panelcode
      
      startDateDatetime
      finishDateDatetime
      
    }
  }
}`

export const GET_COIL = gql`
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
}`





export const UPDATE_COIL = gql`
 mutation updateOneCoil($input: UpdateOneCoilInput!) {
  updateOneCoil(input: $input) {
    id
    comments
    thickness
  }
}
`;


export const AllLocations = gql`
  query GetAllLocations{
  locations {


shortname
whgroup
atlaid
atlaname
comid

}
}
  
`;

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

export const GET_EXPECTED_COILS = gql`
  query GetexpectedCoils(
    $filter: CoilsFilterInput
    $sorting: [CoilsSortInput!]
    $limit: Int
    $offset: Int
  ) {
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



export const COILCOLORS = gql`
 query coilColors{
  
    coilColors{
      id
    code
    name
    hexcode
  
  }
}`

export const GET_AVAILABLE_COILS = gql`
  query GetAvailableCoils(
    $filter: CoilsFilterInput
    $sorting: [CoilsSortInput!]
    $limit: Int
    $offset: Int
  ) {
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
        name # Assuming StatusType has a 'name' field you want to fetch
        # You can add other StatusType fields here if needed, e.g., id, nameGr
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

    export const GET_DAILY_WORKING_HOURS = gql`
  query GetDailyWorkingHours($date:String!) {
    workingHours (date:$date){
      date
      startHour
      startMinute
      endHour
      endMinute
      isWorkingDay
    }
  }
`;

    export const GET_WORKING_HOURS = gql`
 query GetWorkingHours{
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

export const UPDATE_DAILY_WORKING_HOURS = gql`
  mutation UpdateDailyWorkingHours($date: String!, $update: UpdateWorkingHoursInput!) {
    updateWorkingHours(  date: $date, update: $update ) {
      date
      startHour
      startMinute
      endHour
      endMinute
      isWorkingDay
    }
  }
`;