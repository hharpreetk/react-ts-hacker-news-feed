import { format } from "timeago.js";
import { Story } from "../types/stories";

export const getFormattedDate = (dateInput: string): string => {
  return format(new Date(dateInput));
};

export const getPointsOrComments = (
  story: Story,
  property: "points" | "num_comments"
): string => {
  const category = story._tags[0];
  const value =
    category === "story" || category === "poll" ? story[property] : null;

  if (value !== null) {
    const label = property === "points" ? "point" : "comment";
    return `${value} ${value === 1 ? label : `${label}s`}`;
  }

  return "";
};
