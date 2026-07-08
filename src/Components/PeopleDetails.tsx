import { useEffect, useState } from "react";
import type { PersonDetailsType } from "../schemas/people";

const emptyDetails = {
  name: "",
  birth_year: "",
  gender: "",
  eye_color: "",
  hair_color: "",
  height: "",
  mass: "",
  films: [""],
};

interface Film {
  title: string;
  url: string;
}

export const PeopleDetails = ({
  details = emptyDetails,
}: {
  details?: PersonDetailsType;
}) => {
  const [films, setFilms] = useState<Film[]>();

  useEffect(() => {
    async function getMovies() {
      try {
        const filmsData = await Promise.all(
          details.films.map(async (url) => {
            const response = await fetch(url);
            return response.json();
          }),
        );

        setFilms(
          filmsData.map((film) => {
            return {
              title: film.result.properties.title,
              url: film.result.properties.url,
            };
          }),
        );
      } catch (error) {
        console.log(error);
      }
    }

    getMovies();
  }, [details.films]);

  return (
    <>
      <p>{details.name}</p>
      <p>Details</p>
      <p>Birth year: {details.birth_year}</p>
      <p>Gender: {details.gender}</p>
      <p>Eye color: {details.eye_color}</p>
      <p>Hair color: {details.hair_color}</p>
      <p>Height: {details.height}</p>
      <p>Mass: {details.mass}</p>
      <p>Movies</p>
      {films?.map((item) => (
        <p>{item.title}</p>
      ))}
    </>
  );
};
