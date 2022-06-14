import { useEffect, useState } from 'react';
import axios from 'axios';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { IPagination } from '../../interfaces/IPagination';
import { TextField } from '@mui/material';

const ListaRestaurantes = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    IRestaurante[]
  >([]);
  const [restaurant, setRestaurant] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');

  const fetchData = async (page = '') => {
    const URL = page || 'http://localhost:8000/api/v1/restaurantes/';
    const response = await axios.get<IPagination<IRestaurante>>(URL);
    const data = response.data.results;
    setRestaurants([...data]);
    setNextPage(response.data.next);
    setPreviousPage(response.data.previous);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const restaurantesFilteredByName = restaurants.filter(({ nome }) => {
      const name = nome.toLowerCase();
      return name.includes(restaurant);
    });
    setFilteredRestaurants(restaurantesFilteredByName);
  }, [restaurant, restaurants]);

  const showMoreRestaurants = async () => {
    if (nextPage) fetchData(nextPage);
    else fetchData(previousPage);
    setRestaurant('');
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <TextField
        value={restaurant}
        label="Pesquise um Restaurante"
        variant="standard"
        onChange={(event) => setRestaurant(event.target.value)}
      />
      {filteredRestaurants?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      <button onClick={showMoreRestaurants}>
        {nextPage ? 'ver mais' : 'voltar'}
      </button>
    </section>
  );
};

export default ListaRestaurantes;
