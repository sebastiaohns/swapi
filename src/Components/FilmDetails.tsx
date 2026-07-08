import { useEffect, useState } from "react";
import type { FilmDetailsType } from "../schemas/films";

const emptyDetails = {
  title: "",
  opening_crawl: "",
  characters: [""],
};

interface Character {
  name: string;
  url: string;
}

export const FilmDetails = ({
  details = emptyDetails,
}: {
  details?: FilmDetailsType;
}) => {
  const [characters, setCharacters] = useState<Character[]>();

  useEffect(() => {
    async function getCharacters() {
      try {
        const charactersData = await Promise.all(
          details.characters.map(async (url) => {
            const response = await fetch(url);
            return response.json();
          }),
        );

        setCharacters(
          charactersData.map((character) => {
            return {
              name: character.result.properties.name,
              url: character.result.properties.url,
            };
          }),
        );
      } catch (error) {
        console.log(error);
      }
    }

    getCharacters();
  }, [details.characters]);

  return (
    <>
      <p>{details.title}</p>
      <p>Opening Crawl</p>
      <p>{details.opening_crawl}</p>
      <p>Characters</p>
      {characters?.map((item) => (
        <p>{item.name}</p>
      ))}
    </>
  );
};
