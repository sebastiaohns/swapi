import type { PersonDetailsType } from "../schemas/people";
import { useGetItems } from "../hooks/swapi";
import { useNavigate } from "react-router-dom";

export const PeopleDetails = ({ data }: { data: PersonDetailsType }) => {
  const navigate = useNavigate();

  const { data: characterMovies = [], isFetching } = useGetItems(
    (data?.films ?? []).map((url: string) => url.split("/api/")[1]),
  );

  return (
    <div className="bg-white rounded shadow p-8 min-h-[500px] flex flex-col">
      <h1 className="text-3xl font-bold mb-10">{data.name}</h1>
      <div className="grid grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4">
            Details
          </h2>
          <ul className="space-y-1 text-gray-700">
            <li>Birth year: {data.birth_year}</li>
            <li>Gender: {data.gender}</li>
            <li>Eye color: {data.eye_color}</li>
            <li>Hair color: {data.hair_color}</li>
            <li>Height: {data.height}</li>
            <li>Mass: {data.mass}</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4">
            Movies
          </h2>
          {isFetching ? (
            "Loading..."
          ) : (
            <ul className="flex flex-wrap">
              {characterMovies?.map((item, index) => (
                <li key={index}>
                  <a
                    onClick={() =>
                      navigate(`/details/${item.url.split("/api/")[1]}`)
                    }
                    className="text-blue-500 hover:underline"
                  >
                    {item.title}
                    {index < characterMovies.length - 1 && ", "}
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
