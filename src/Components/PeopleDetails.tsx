import type { PersonDetailsType } from "../schemas/people";
import { useGetItems } from "../hooks/swapi";

export const PeopleDetails = ({ data }: { data: PersonDetailsType }) => {
  const { data: characterMovies = [] } = useGetItems(
    (data?.films ?? []).map((url: string) => url.split("/api/")[1]),
  );

  return (
    <div>
      <p>{data.name}</p>
      <p>Details</p>
      <p>Birth year: {data.birth_year}</p>
      <p>Gender: {data.gender}</p>
      <p>Eye color: {data.eye_color}</p>
      <p>Hair color: {data.hair_color}</p>
      <p>Height: {data.height}</p>
      <p>Mass: {data.mass}</p>
      <p>Movies</p>
      {characterMovies?.map((item, index) => (
        <div key={index}>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};
