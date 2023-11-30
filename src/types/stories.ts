type Story = {
  title: string;
  url: string;
  author: string;
  story_text: string | null;
  job_text: string | null;
  comment_text: string | null;
  _tags: string[];
  num_comments: number;
  points: number;
  created_at: string;
  story_title: string;
  story_url: string;
  objectID: number;
};

type Stories = Array<Story>;

export { Story, Stories };
