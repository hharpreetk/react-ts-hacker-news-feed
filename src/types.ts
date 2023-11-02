type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
};

type Stories = Array<Story>;

export { Story, Stories };
