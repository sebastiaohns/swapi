import type { DataType } from "./common";

export interface PersonProperties {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface PersonDetailsType {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  films: string[];
}

export type PeopleType = DataType<PersonProperties>;

export const SAMPLE_PEOPLE: PeopleType[] = [
  {
    uid: "1",
    description: "A person within the Star Wars universe",
    properties: {
      created: "2026-07-14T02:00:28.144Z",
      edited: "2026-07-14T02:00:28.144Z",
      name: "Luke Skywalker",
      gender: "male",
      skin_color: "fair",
      hair_color: "blond",
      height: "172",
      eye_color: "blue",
      mass: "77",
      homeworld: "https://www.swapi.tech/api/planets/1",
      birth_year: "19BBY",
      vehicles: ["https://www.swapi.tech/api/vehicles/14"],
      starships: ["https://www.swapi.tech/api/starships/12"],
      films: ["https://www.swapi.tech/api/films/1"],
      url: "https://www.swapi.tech/api/people/1",
      species: [],
    },
  },
];
