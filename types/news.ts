export interface NewsItem {
  id: number;
  title: string;
  url: string;
  source: {
    title: string;
  };
  published_at: string;
}