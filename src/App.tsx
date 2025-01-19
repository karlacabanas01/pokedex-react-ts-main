import { Routes, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Listado from "./pages/Listado";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Listado />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
