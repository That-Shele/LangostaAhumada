import { useEffect, useState } from 'react'
import Axios from '../api/Axios';
import CardAdmin from '../components/Card/CardAdmin';
import CreatePlato from '../components/Modals/CreatePlato';
import Swal from 'sweetalert2';
const MENU_URL = "/plato";

const PlatosManager = () => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const PLATO_DELETE_URL = `/plato/DeletePlato/`;

  

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    requestData();
  };

  const onDelete = (id) => {
    try {
      Swal.fire({
        title: "Quieres borrar este plato?",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const response = Axios.delete(PLATO_DELETE_URL + `${id}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:5173/",
            },
          });
          Swal.fire("Éxito", "Plato eliminado exitosamente", "success");
          
        }
      });
      requestData();
    } catch (err) {
      Swal.fire(
        "Error",
        "Hubo un error, revise la consola para más información",
        "error"
      );
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.status === 400) {
        console.log("Campos inválidos");
      } else if (err.response?.status === 401) {
        console.log("Sin autorización");
      } else {
        console.log("Creación fallida");
      }
    }
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
 }, [data])

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
            del={() => onDelete(food.idPlato)}
          />
        ))}
      </div>
    </div>
  );
}

export default PlatosManager
