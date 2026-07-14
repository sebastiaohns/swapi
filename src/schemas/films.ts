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

export const SAMPLE_FILMS: FilmType[] = [
  {
    uid: "1",
    description: "It is a dark time for the Rebellion.",
    properties: {
      created: "2026-07-14T02:00:28.148Z",
      edited: "2026-07-14T02:00:28.148Z",
      starships: ["https://www.swapi.tech/api/starships/2"],
      vehicles: ["https://www.swapi.tech/api/vehicles/4"],
      planets: ["https://www.swapi.tech/api/planets/1"],
      producer: "Gary Kurtz, Rick McCallum",
      title: "A New Hope",
      episode_id: 4,
      director: "George Lucas",
      release_date: "1977-05-25",
      opening_crawl: "It is a period of civil war.",
      characters: ["https://www.swapi.tech/api/people/1"],
      species: ["https://www.swapi.tech/api/species/1"],
      url: "https://www.swapi.tech/api/films/1",
    },
  },
];
