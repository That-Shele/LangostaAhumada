import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "../../api/Axios";


const CardAdmin = ({ img, id, desc, name, price }) => {
  const PLATO_DELETE_URL = `/plato/DeletePlato/${id}`;

  const onDelete = () => {
    try {
      Swal.fire({
        title: "Quieres borrar este plato?",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const response = Axios.delete(PLATO_DELETE_URL, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:5173/",
            },
          });
          Swal.fire("Éxito", "Plato eliminado exitosamente", "success");
        }
      });
      
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
  }

    return (
      <div className="p-5 m-2 transition duration-300 bg-white/50 lg:p-6 rounded-3xl hover:scale-110">
        <img
          src={`data:image/png;base64,${img}`}
          alt="No image"
          className="w-60 sm:w-40  lg:w-[240px] mx-auto object-cover rounded-xl"
        />
        <div className="space-y-2">
          <p className="text-lg font-semibold text-center">{name}</p>
          <p>{desc}</p>
          <p className="text-5xl font-semibold">{price}</p>
        </div>
        <Link
          to="/EditPlato"
          state={{ img: img, id: id, desc: desc, name: name, price: price }}
          style={{ display: "contents" }}
        >
          <button className="justify-center w-full py-1 mt-3 mb-1 text-xl text-white duration-200 rounded-lg hover:scale-105 bg-primary/90">
            Editar
          </button>
        </Link>
        <button
          onClick={onDelete}
          className="w-full py-1 mt-3 mb-1 text-lg text-white duration-200 rounded-lg hover:scale-105 bg-slate-900/40"
        >
          Eliminar
        </button>
      </div>
    );
  };

export default CardAdmin;
