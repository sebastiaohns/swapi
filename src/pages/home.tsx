import { useState } from "react";
import { useGetFilms, useGetPeople } from "../hooks/swapi";

import { ListFilms } from "../Components/ListFilms";
import { ListPeople } from "../Components/ListPeople";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [resource, setResource] = useState("");

  const isResourceFilm = resource === "films";
  const isResourcePeople = resource === "people";

  const films = useGetFilms(isResourceFilm);
  const people = useGetPeople(isResourcePeople);

  return (
    <div>
      <form>
        <label>
          People
          <input
            type="radio"
            value="people"
            checked={isResourcePeople}
            onChange={(e) => setResource(e.target.value)}
          />
        </label>
        <label>
          Movies
          <input
            type="radio"
            value="films"
            checked={isResourceFilm}
            onChange={(e) => setResource(e.target.value)}
          />
        </label>
        <input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {isResourceFilm && <ListFilms data={films.data ?? []} search={search} />}
      {isResourcePeople && (
        <ListPeople data={people.data ?? []} search={search} />
      )}
    </div>
  );
};
