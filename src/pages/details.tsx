import { useParams } from "react-router-dom";
import { useGetItem } from "../hooks/swapi";
import { PeopleDetails } from "../Components/PeopleDetails";
import { FilmDetails } from "../Components/FilmDetails";

export const DetailsPage = () => {
  const { type, id } = useParams();

  const { data, isFetching, isFetched } = useGetItem(type + "/" + id);

  if (isFetching) {
    return (
      <div className="bg-white rounded shadow p-8 min-h-[500px] flex flex-col">
        <span>Loading...</span>
      </div>
    );
  }

  if (isFetched && type === "films") {
    return <FilmDetails data={data} />;
  }

  if (isFetched && type === "people") {
    return <PeopleDetails data={data} />;
  }
};
