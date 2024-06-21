export interface ArticleList {
  posts: Article[];
  totalCount: number;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  writer: WriterInfo;
}

export interface WriterInfo {
  id: number;
  nickname: string;
}
