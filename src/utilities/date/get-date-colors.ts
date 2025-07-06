import dayjs from "dayjs";

type DateColors = "success" | "processing" | "error" | "default" | "warning";

//  returns a color based on the date
export const getDateColor = (args: {
  date: string;
  defaultColor?: DateColors;
}): DateColors => {
  const date = dayjs(args.date);
  const today = dayjs();

  if (date.isBefore(today)) {
    return "error";
  }

  if (date.isBefore(today.add(3, "day"))) {
    return "warning";
  }

  // ?? is the nullish coalescing operator. It returns the right-hand side operand when the left-hand side is null or undefined.
  return args.defaultColor ?? "default";
};



export const getlast80days = () =>{
 
  const today = dayjs();
 const  recentDate=today.subtract(80, 'day')
return recentDate
}


export const getworkinghours = (start) =>{
 const date = dayjs(info.date);
  const day = date.day();
  const hour = date.hour();

  const isBusinessDay = day >= 1 && day <= 5;
  const isBusinessHour = hour >= 6 && hour < 22;

  if (!isBusinessDay || !isBusinessHour) {
    alert("You can only drop events during working hours (Mon–Fri, 06:00–22:00)");
    return;
  }
}