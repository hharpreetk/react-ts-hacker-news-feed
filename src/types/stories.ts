type Story = {
  title: string;
  url: string;
  author: string;
  story_text: string | null;
  num_comments: number;
  points: number;
  created_at: string;
  objectID: number;
};

type Stories = Array<Story>;

export { Story, Stories };
