export interface Article {
  title: string;
  source: {
    name: string;
  };
  description: string;
  urlToImage: string;
  url: string;
}

export interface NewsResponse {
  articles: Article[];
}

export interface NewsCardProps {
  article: Article;
}
