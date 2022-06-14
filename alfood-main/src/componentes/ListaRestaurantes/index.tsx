import { useEffect, useState } from 'react';
import axios from 'axios';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { IPagination } from '../../interfaces/IPagination';

const ListaRestaurantes = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');

  const fetchData = async (page = '') => {
    const URL = page || 'http://localhost:8000/api/v1/restaurantes/';
    const response = await axios.get<IPagination<IRestaurante>>(URL);
    const data = response.data.results;
    setRestaurants([...data]);
    setNextPage(response.data.next);
    setPreviousPage(response.data.previous);
  }
  
  useEffect(() => {
    // const fetchData = async () => {
    //   const URL = 'http://localhost:8000/api/v1/restaurantes/';
    //   const response = await axios.get<IPagination<IRestaurante>>(URL);
    //   const data = response.data.results;
    //   setRestaurants([...data]);
    //   setNextPage(response.data.next);
    //   setPreviousPage(response.data.previous);
    // }

    fetchData();
  }, []);

  const showMoreRestaurants = async () => {
    if (nextPage) fetchData(nextPage);
    else fetchData(previousPage);
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurants?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {nextPage && <button onClick={showMoreRestaurants}>ver mais</button>}
      {previousPage && <button onClick={showMoreRestaurants}>ver menos</button>}
    </section>
  );
};

export default ListaRestaurantes;
