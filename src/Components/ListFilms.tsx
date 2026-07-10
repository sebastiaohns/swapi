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
    <div
      key={item.uid}
      className="flex items-center justify-between w-full border-b border-gray-200 py-4"
    >
      <span className="font-semibold text-gray-800">
        {item.properties.title}
      </span>
      <button
        className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-6 py-2 rounded-full transition"
        onClick={() =>
          navigate(`details/${item.properties.url.split("/api/")[1]}`)
        }
      >
        SEE DETAILS
      </button>
    </div>
  ));
};
