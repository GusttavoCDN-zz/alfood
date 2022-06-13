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
} from '@mui/material';

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

  const renderRestaurants = () => {
    return restaurants?.map((restaurant) => (
      <TableRow key={restaurant.id}>
        <TableCell>{restaurant.nome}</TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRestaurants()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminRestaurants;
