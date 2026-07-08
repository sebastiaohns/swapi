import type { DataType } from "./common";

export interface FilmProperties {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

export interface FilmDetailsType {
  title: string;
  opening_crawl: string;
  characters: string[];
}

export type FilmType = DataType<FilmProperties>;
