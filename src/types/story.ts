type Story = {
  title: string;
  url: string;
  author: string;
  text: string | null;
  points: number;
  created_at: string;
  children: Array<Comment>;
};

type Comment = {
  id: string;
  author: string;
  created_at: string;
  children: Array<Comment>;
  text: string;
  points: number;
};

export { Story, Comment };
