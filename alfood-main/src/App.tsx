import { Routes, Route } from 'react-router-dom';
import AdminHeader from './paginas/Admin/AdminHeader';
import AdminRestaurants from './paginas/Admin/restaurants/AdminRestaurants';
import PlatesForm from './paginas/Admin/Plates/PlatesForm';
import RestaurantForm from './paginas/Admin/restaurants/RestaurantForm';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminPlates from './paginas/Admin/Plates/AdminPlates';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<AdminHeader />}>
        <Route path="restaurants" element={<AdminRestaurants />} />
        <Route path="restaurants/:id" element={<RestaurantForm />} />
        <Route path="restaurants/new" element={<RestaurantForm />} />
        <Route path="pratos" element={<AdminPlates/>} />
        <Route path="pratos/:id" element={<PlatesForm/>} />
        <Route path="pratos/:new" element={<PlatesForm/>} />
      </Route>
    </Routes>
  );
}

export default App;
