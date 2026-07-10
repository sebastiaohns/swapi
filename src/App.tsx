import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="h-14 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-green-500">SWStarter</h1>
      </header>

      <main className="bg-[#ededed] min-h-[calc(100vh-56px)] p-10">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
