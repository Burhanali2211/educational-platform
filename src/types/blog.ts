export interface Author {
  name: string;
  title: string;
  avatar?: string | null;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  updatedAt?: string;
  author: Author;
  category: string;
  tags: string[];
  image?: string | null;
  series?: {
    name: string;
    order: number;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
}

export type BlogCategory = string;

export interface BlogSeries {
  name: string;
  description: string;
  category: string;
  posts: Array<{
    title: string;
    slug: string;
    description: string;
  }>;
} 