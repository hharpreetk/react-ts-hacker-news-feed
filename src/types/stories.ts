type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  created_at: string;
  objectID: number;
};

type Stories = Array<Story>;

export { Story, Stories };
