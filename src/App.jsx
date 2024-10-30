import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage/HomePage'
import FavoritePage from './pages/FavoritePage/FavoritePage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
