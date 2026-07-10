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
    <div className="max-w-6xl mx-auto flex items-start gap-8">
      <div className="w-[360px] bg-white rounded shadow p-6">
        <h2 className="font-semibold text-gray-700 mb-4">
          What are you searching for?
        </h2>

        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="people"
              checked={isResourcePeople}
              onChange={(e) => setResource(e.target.value)}
            />
            <span>People</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="films"
              checked={isResourceFilm}
              onChange={(e) => setResource(e.target.value)}
            />
            <span>Movies</span>
          </label>
        </div>
        <input
          className="w-full border border-gray-400 rounded px-3 py-2 mb-5 outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full transition">
          {people.isFetching || films.isFetching ? "SEARCHING..." : "SEARCH"}
        </button>
      </div>

      <div className="flex-1 bg-white rounded shadow p-6 min-h-[500px]">
        <h2 className="text-2xl font-bold mb-3">Results</h2>

        <div className="h-full w-full flex flex-col items-center justify-center text-center text-gray-400">
          {(resource == "" ||
            (isResourceFilm && films.data?.length == 0) ||
            (isResourcePeople && people.data?.length == 0)) && (
            <>
              <p className="font-semibold">There are zero matches.</p>

              <p>Use the form to search for People or Movies.</p>
            </>
          )}

          {isResourceFilm && (
            <ListFilms data={films.data ?? []} search={search} />
          )}
          {isResourcePeople && (
            <ListPeople data={people.data ?? []} search={search} />
          )}
        </div>
      </div>
    </div>
  );
};
