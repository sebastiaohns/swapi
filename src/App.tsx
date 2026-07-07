import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [resource, setResource] = useState("people");

  useEffect(() => {
    async function swapiRequest() {
      const result = await fetch(`https://www.swapi.tech/api/${resource}/`);

      const data = await result.json();

      setData(data.results);

      console.log(data);
    }

    swapiRequest();
  }, [resource]);

  console.log(resource);

  return (
    <>
      <form>
        <label>
          people
          <input
            type="radio"
            value="people"
            checked={resource === "people"}
            onChange={() => setResource("people")}
          />
        </label>
        <label>
          vehicles
          <input
            type="radio"
            value="vehicles"
            checked={resource === "vehicles"}
            onChange={() => setResource("vehicles")}
          />
        </label>
      </form>
      {data?.map((item: { name: string }) => (
        <p>{item.name}</p>
      ))}
    </>
  );
}

export default App;
