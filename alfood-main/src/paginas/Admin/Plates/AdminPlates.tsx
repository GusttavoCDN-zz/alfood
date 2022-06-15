import { useEffect, useState } from 'react';
import {
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
} from '@mui/material';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPlate from '../../../interfaces/IPlate';

const AdminPlates = () => {
  const [plates, setPlates] = useState<IPlate[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await http.get<IPlate[]>('pratos/');
      const data = response.data;
      setPlates(data);
    }
    fetchData();
  }, []);

  async function deleteRestaurant(id: number) {
    await http.delete(`restaurantes/${id}/`);
    const newRestaurants = plates.filter((restaurant) => restaurant.id !== id);
    setPlates(newRestaurants);
  }

  const renderPlates = () => {
    return plates?.map((plate) => (
      <TableRow key={plate.id}>
        <TableCell>{plate.nome}</TableCell>
        <TableCell>{plate.tag}</TableCell>
        <TableCell>
          <a href={plate.imagem} target="_blank" rel="noreferrer">
            [ver imagem]
          </a>
        </TableCell>

        <TableCell>
          <Link to={`/admin/pratos/${plate.id}`}>[Editar]</Link>
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteRestaurant(plate.id)}
          >
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
            <TableCell>Prato</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderPlates()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminPlates;
