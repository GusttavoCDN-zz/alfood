import React, { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import axios from 'axios';
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

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);

  useEffect(() => {
    async function fetchData() {
      const URL = 'http://localhost:8000/api/v2/restaurantes/';
      const response = await axios.get<IRestaurante[]>(URL);
      const data = response.data;
      setRestaurants(data);
    }
    fetchData();
  }, []);

  async function deleteRestaurant(id: number) {
    const URL = `http://localhost:8000/api/v2/restaurantes/${id}/`;
    await axios.delete(URL);
    const newRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
    setRestaurants(newRestaurants);
  }

  const renderRestaurants = () => {
    return restaurants?.map((restaurant) => (
      <TableRow key={restaurant.id}>
        <TableCell>{restaurant.nome}</TableCell>
        <TableCell>
          <Link to={`/admin/restaurants/${restaurant.id}`}>Editar</Link>
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
            <TableCell>Nome</TableCell>
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
