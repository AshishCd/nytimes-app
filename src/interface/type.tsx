interface IMediaMetadata {
  url: string;
  format: string;
  height: number;
  width: number;
}

export interface IMedia {
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
  approved_for_syndication: number;
  'media-metadata': IMediaMetadata[];
}

export interface IMostViewedArticles {
  uri: string;
  url: string;
  id: number;
  asset_id: number;
  source: string;
  published_date: string;
  updated: string;
  section: string;
  subsection: string;
  nytdsection: string;
  adx_keywords: string;
  column: string | null;
  byline: string;
  type: string;
  title: string;
  abstract: string;
  media: IMedia[];
}

export interface IArticleProps {
  isTypeSidebar: boolean;
  articleData: IMostViewedArticles;
  expandedArticlesId: { [key: number]: boolean };
  toggleShowMore: (id: number) => void;
}

export interface IMostViewedArticlesProps {
  day: number;
  type?: string;
}

export interface IMostViewedArticlesState {
  articles: IMostViewedArticles[];
  loading: boolean;
  error: Error | null;
  expandedArticlesId: { [key: number]: boolean };
}
