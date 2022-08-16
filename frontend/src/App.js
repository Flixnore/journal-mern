import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./components/journal/Inputs";
import NavBar from "./pages/NavBar";
import Journal from "./pages/Journal";
import Entries from "./pages/Entries";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><NavBar /><Journal /></>} />
        <Route path="/entries" element={<><NavBar /><Entries /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
