import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <h1>Star Wars Explorer</h1>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
