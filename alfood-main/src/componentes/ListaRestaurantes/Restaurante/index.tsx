import axios from 'axios';
import { useEffect, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';

interface RestauranteProps {
  restaurante: IRestaurante;
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  const { id } = restaurante;

  useEffect(() => {
    const fetchData = async () => {
      const URL = `http://localhost:8000/api/v1/restaurantes/${id}/pratos/`;
      const response = await axios.get(URL);
      const data = response.data;
      setPratos(data);
    };
    fetchData();
  }, [id]);

  return (
    <section className={estilos.Restaurante}>
      <div className={estilos.Titulo}>
        <h2>{restaurante.nome}</h2>
      </div>
      <div>
        {pratos?.map((prato) => (
          <Prato prato={prato} key={prato.id} />
        ))}
      </div>
    </section>
  );
};

export default Restaurante;
