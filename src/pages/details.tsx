import { useParams } from "react-router-dom";
import { useGetItem } from "../hooks/swapi";
import { PeopleDetails } from "../Components/PeopleDetails";
import { FilmDetails } from "../Components/FilmDetails";

export const DetailsPage = () => {
  const { type, id } = useParams();

  const { data, isFetched } = useGetItem(type + "/" + id);

  if (isFetched && type === "films") {
    return <FilmDetails data={data} />;
  }

  if (isFetched && type === "people") {
    return <PeopleDetails data={data} />;
  }
};
