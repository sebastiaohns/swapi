import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { PeopleType } from "../schemas/people";

export const ListPeople = ({
  data,
  search,
}: {
  data: PeopleType[];
  search: string;
}) => {
  const navigate = useNavigate();

  const filteredPeople = useMemo(() => {
    return data.filter((item: PeopleType) =>
      item.properties.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  return filteredPeople.map((item: PeopleType) => (
    <div
      key={item.uid}
      className="flex items-center justify-between w-full border-b border-gray-200 py-4"
    >
      <span className="font-semibold text-gray-800">
        {item.properties.name}
      </span>
      <button
        className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-6 py-2 rounded-full transition"
        onClick={() =>
          navigate(`/details/${item.properties.url.split("/api/")[1]}`)
        }
      >
        SEE DETAILS
      </button>
    </div>
  ));
};
