import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IconHome, IconStar } from '@tabler/icons-react';

import HomePage from './pages/HomePage/HomePage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import { FloatingDock } from './components/ui/floating-dock';

function App() {
  const dockItems = [
    { title: "Home", href: "/", icon: <IconHome /> },
    { title: "Favorites", href: "/favorite", icon: <IconStar /> },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
      <FloatingDock
        items={dockItems}
        desktopClassName="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded-t-lg"
        mobileClassName="fixed bottom-4 right-4 bg-white shadow-md rounded-full p-2"
      />
    </Router>
  );
}

export default App;
