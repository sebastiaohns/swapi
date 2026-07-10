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
    <div key={item.uid}>
      <p>{item.properties.name}</p>
      <button
        onClick={() =>
          navigate(`/details/${item.properties.url.split("/api/")[1]}`)
        }
      >
        see details
      </button>
    </div>
  ));
};
