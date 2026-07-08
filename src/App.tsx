import { useEffect, useMemo, useState } from "react";
import { PeopleDetails } from "./Components/PeopleDetails";
import type {
  PeopleType,
  PersonDetailsType,
  PersonProperties,
} from "./schemas/people";
import type {
  FilmDetailsType,
  FilmProperties,
  FilmType,
} from "./schemas/films";
import { FilmDetails } from "./Components/FilmDetails";

type SearchItem = PeopleType | FilmType;

function getSearchValue(item: SearchItem): string {
  if ("name" in item.properties) {
    return item.properties.name;
  }

  if ("title" in item.properties) {
    return item.properties.title;
  }

  return "";
}

function App() {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState<PersonDetailsType>();
  const [filmDetail, setFilmDetail] = useState<FilmDetailsType>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState("people");

  useEffect(() => {
    async function swapiRequest() {
      try {
        setLoading(true);

        const result = await fetch(
          `https://www.swapi.tech/api/${resource}/?expanded=true`,
        );

        const data = await result.json();

        if (resource === "people") {
          setData(data.results);
        } else {
          setData(data.result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    swapiRequest();
  }, [resource]);

  const filteredSearch = useMemo(() => {
    if (!data.length) return [];

    return data.filter((item) =>
      getSearchValue(item).toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const getPeople = (people: PersonProperties) => {
    const peopleDetails = {
      name: people.name,
      birth_year: people.birth_year,
      gender: people.gender,
      eye_color: people.eye_color,
      hair_color: people.hair_color,
      height: people.height,
      mass: people.mass,
      films: people.films,
    };

    setDetail(peopleDetails);
  };

  const getFilm = (film: FilmProperties) => {
    const filmDetails = {
      title: film.title,
      opening_crawl: film.opening_crawl,
      characters: film.characters,
    };

    setFilmDetail(filmDetails);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form>
        <label>
          People
          <input
            type="radio"
            value="people"
            checked={resource === "people"}
            onChange={(e) => setResource(e.target.value)}
          />
        </label>
        <label>
          Movies
          <input
            type="radio"
            value="films"
            checked={resource === "films"}
            onChange={(e) => setResource(e.target.value)}
          />
        </label>
        <input
          type="text"
          placeholder="Buscar usuário..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {resource === "people" ? (
        <>
          {filteredSearch.map((item: PeopleType) => (
            <>
              <p>{item.properties.name}</p>
              <button onClick={() => getPeople(item.properties)}>
                see details
              </button>
            </>
          ))}
          <PeopleDetails details={detail} />
        </>
      ) : (
        <>
          {filteredSearch.map((item: FilmType) => (
            <>
              <p>{item.properties.title}</p>
              <button onClick={() => getFilm(item.properties)}>
                see details
              </button>
            </>
          ))}
          <FilmDetails details={filmDetail} />
        </>
      )}
    </>
  );
}

export default App;
