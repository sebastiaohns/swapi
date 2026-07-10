import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { FilmType } from "../schemas/films";

export const ListFilms = ({
  data,
  search,
}: {
  data: FilmType[];
  search: string;
}) => {
  const navigate = useNavigate();

  const filteredFilms = useMemo(() => {
    return data.filter((item: FilmType) =>
      item.properties.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  return filteredFilms.map((item: FilmType) => (
    <div key={item.uid}>
      <p>{item.properties.title}</p>
      <button
        onClick={() =>
          navigate(`details/${item.properties.url.split("/api/")[1]}`)
        }
      >
        see details
      </button>
    </div>
  ));
};
