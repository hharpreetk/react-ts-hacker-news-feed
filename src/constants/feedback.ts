import { ContentOption } from "./options";

export const NO_RESULT_CONTENT_FEEDBACK: Record<string, string> = {
  [ContentOption.Story]: "stories",
  [ContentOption.ShowHN]: "show HN stories",
  [ContentOption.AskHN]: "ask HN stories",
  [ContentOption.LaunchHN]: "launch HN stories",
  [ContentOption.Job]: "jobs",
  [ContentOption.Poll]: "polls",
} as const;
