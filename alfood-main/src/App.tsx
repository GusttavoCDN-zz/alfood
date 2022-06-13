import { Routes, Route } from 'react-router-dom';
import AdminRestaurants from './paginas/Admin/restaurants';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurants" element={<AdminRestaurants />} />
    </Routes>
  );
}

export default App;
