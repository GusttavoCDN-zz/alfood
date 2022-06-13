import { useEffect, useState } from 'react';
import axios from 'axios';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { IPagination } from '../../interfaces/IPagination';

const ListaRestaurantes = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);
  const [nextPage, setNextPage] = useState('');

  async function fetchData() {
    const URL = nextPage || 'http://localhost:8000/api/v1/restaurantes/';
    const response = await axios.get<IPagination<IRestaurante>>(URL);
    const data = response.data.results;
    setRestaurants([...restaurants, ...data]);
    setNextPage(response.data.next);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const showMoreRestaurants = async () => fetchData();

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurants?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {nextPage && <button onClick={showMoreRestaurants}>ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
