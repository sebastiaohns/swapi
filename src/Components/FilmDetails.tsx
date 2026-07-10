import type { FilmDetailsType } from "../schemas/films";
import { useGetItems } from "../hooks/swapi";

export const FilmDetails = ({ data }: { data: FilmDetailsType }) => {
  const { data: movieCharacters = [] } = useGetItems(
    (data?.characters ?? []).map((url: string) => url.split("/api/")[1]),
  );

  return (
    <div>
      <p>{data.title}</p>
      <p>Opening Crawl</p>
      <p>{data.opening_crawl}</p>
      <p>Characters</p>
      {movieCharacters?.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};
