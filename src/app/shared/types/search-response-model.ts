import { ISearchItem, IYoutubeItem } from "./search-item.model"

export interface ISearchResponse {
  TODO: string;
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  },
  items: ISearchItem[];
}

export interface IYoutubeResponse {
  "kind": string;
  "etag": string;
  "nextPageToken": string;
  "regionCode": string;
  "pageInfo": {
    "totalResults": number;
    "resultsPerPage": number;
  },
  "items": IYoutubeItem[]
}