import { CONTENT_OPTION } from "./options";

export const NO_RESULT_CONTENT_FEEDBACK: Record<string, string> = {
  [CONTENT_OPTION.STORY]: "stories",
  [CONTENT_OPTION.SHOW_HN]: "show HN stories",
  [CONTENT_OPTION.ASK_HN]: "ask HN stories",
  [CONTENT_OPTION.LAUNCH_HN]: "launch HN stories",
  [CONTENT_OPTION.JOB]: "jobs",
  [CONTENT_OPTION.POLL]: "polls",
};
