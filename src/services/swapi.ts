import type { FilmType } from "../schemas/films";
import type { PeopleType } from "../schemas/people";

export async function getPeople(): Promise<PeopleType[]> {
  const res = await fetch("https://www.swapi.tech/api/people/?expanded=true");

  if (!res.ok) {
    throw new Error("Failure while retrieng data");
  }

  const json = await res.json();

  return json.results;
}

export async function getFilms(): Promise<FilmType[]> {
  const res = await fetch("https://www.swapi.tech/api/films/?expanded=true");

  if (!res.ok) {
    throw new Error("Failure while retrieng data");
  }

  const json = await res.json();

  return json.result;
}

export async function getItem(url: string) {
  const res = await fetch(`https://www.swapi.tech/api/${url}`);

  if (!res.ok) {
    throw new Error("Failure while retrieng data");
  }

  const json = await res.json();

  return json.result.properties;
}
