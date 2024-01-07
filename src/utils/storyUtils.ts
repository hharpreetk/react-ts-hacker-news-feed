import { format } from "timeago.js";

export const getFormattedDate = (dateInput: string): string => {
  return format(new Date(dateInput));
};
