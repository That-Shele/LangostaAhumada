import { useEffect, useState } from 'react'
import Axios from '../api/Axios';
import CardAdmin from '../components/Card/CardAdmin';
import CreatePlato from '../components/Modals/CreatePlato';
const MENU_URL = "/plato";

const PlatosManager = () => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    requestData();
  };

 function requestData() {
   Axios.get(MENU_URL, {
     headers: {
       "Access-Control-Allow-Origin": "http://localhost:5173/",
     },
   }).then((res) => setData(res.data));
 }

 useEffect(() => {
    requestData();
 }, [])

  return (
    <div className="p-5 m-4 bg-gray-800/50 rounded-3xl lg:p-6">
      <CreatePlato
        isModalOpen={isModalOpen}
        modalContent={null}
        onClose={closeModal}
      />
      <p className="mb-4 text-2xl font-semibold text-center">
        Menu de platillos
      </p>
      <div className="flex items-center justify-center">
        <button
          className="p-3 m-2 mb-4 text-xl font-semibold bg-primary/85 rounded-xl hover:text-white hover:bg-slate-950"
          onClick={openModal}
        >
          Nuevo Plato
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((food) => (
          <CardAdmin
            key={food.idPlato}
            id={food.idPlato}
            img={food.imagen}
            name={food.nombrePlato}
            desc={food.descripcion}
            price={food.costo}
          />
        ))}
      </div>
    </div>
  );
}

export default PlatosManager
