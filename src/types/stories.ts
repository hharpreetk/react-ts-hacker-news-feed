type HighlightResult<T> = {
  [K in keyof T]?: {
    value: string;
    matchLevel: "none" | "partial" | "full";
    fullyHighlighted?: boolean;
    matchedWords: string[];
  };
};

type Story = {
  title: string;
  url: string;
  author: string;
  story_text: string | null;
  job_text: string | null;
  _tags: string[];
  _highlightResult: HighlightResult<Story>;
  num_comments: number;
  points: number;
  created_at: string;
  objectID: number;
};

type Stories = Array<Story>;

export { Story, Stories };
