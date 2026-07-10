import type { FilmDetailsType } from "../schemas/films";
import { useGetItems } from "../hooks/swapi";
import { useNavigate } from "react-router-dom";

export const FilmDetails = ({ data }: { data: FilmDetailsType }) => {
  const navigate = useNavigate();

  const { data: movieCharacters = [], isFetching } = useGetItems(
    (data?.characters ?? []).map((url: string) => url.split("/api/")[1]),
  );

  return (
    <div className="bg-white rounded shadow p-8 min-h-[500px] flex flex-col">
      <h1 className="text-3xl font-bold mb-10">{data.title}</h1>
      <div className="grid grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4">
            Opening Crawl
          </h2>

          <p>{data.opening_crawl}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4">
            Characters
          </h2>
          {isFetching ? (
            "Loading..."
          ) : (
            <ul className="flex flex-wrap">
              {movieCharacters?.map((item, index) => (
                <li key={index}>
                  <a
                    onClick={() =>
                      navigate(`/details/${item.url.split("/api/")[1]}`)
                    }
                    className="text-blue-500 hover:underline"
                  >
                    {item.name}
                    {index < movieCharacters.length - 1 && ", "}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-6 py-2 rounded-full transition"
            onClick={() => navigate(`/`)}
          >
            BACK TO SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};
