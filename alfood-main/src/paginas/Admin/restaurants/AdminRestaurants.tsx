import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import http from '../../../http';

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await http.get<IRestaurante[]>('restaurantes/');
      const data = response.data;
      setRestaurants(data);
    }
    fetchData();
  }, []);

  async function deleteRestaurant(id: number) {
    await http.delete(`restaurantes/${id}/`);
    const newRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
    setRestaurants(newRestaurants);
  }

  const renderRestaurants = () => {
    return restaurants?.map((restaurant) => (
      <TableRow key={restaurant.id}>
        <TableCell>{restaurant.nome}</TableCell>
        <TableCell>
          <Link to={`/admin/restaurants/${restaurant.id}`}>[Editar]</Link>
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteRestaurant(restaurant.id)}>
            Excluir
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Restaurante</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRestaurants()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminRestaurants;
