import Search from "./Search/Search.tsx";
import Show from "./Show/Show.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Search />} />
      <Route path={"/pokemon/:name"}element={<Show/>} />
    </Routes>
  );
}

export default App;
