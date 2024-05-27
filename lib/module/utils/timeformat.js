import { format } from "date-fns/format";
export const timeFormat = time => {
  if (!time) {
    return null;
  }
  const formattedTime = format(new Date(time || ""), "yyyy-MM-dd");
  return formattedTime;
};
//# sourceMappingURL=timeformat.js.map