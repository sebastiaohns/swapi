import { useQuery } from "@tanstack/react-query";
import { getFilms, getItem, getPeople } from "../services/swapi";
import type { FilmType } from "../schemas/films";
import type { PeopleType } from "../schemas/people";

export function useGetPeople(enabled: boolean) {
  return useQuery<PeopleType[]>({
    queryKey: ["people"],
    queryFn: getPeople,
    enabled: enabled,
  });
}

export function useGetFilms(enabled: boolean) {
  return useQuery<FilmType[]>({
    queryKey: ["films"],
    queryFn: getFilms,
    enabled: enabled,
  });
}

export function useGetItem(url: string) {
  return useQuery({
    queryKey: ["item", url],
    queryFn: () => getItem(url),
    enabled: !!url,
  });
}

export function useGetItems(urls: string[]) {
  return useQuery({
    queryKey: ["item", urls],
    queryFn: () => Promise.all(urls.map(getItem)),
    enabled: urls.length > 0,
  });
}
