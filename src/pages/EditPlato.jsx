import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Axios from '../api/Axios';
import { useLocation, useNavigate } from 'react-router-dom';


const EditPlato = () => {
  const navigation = useNavigate();

  const onClose = () => {
    navigation(-1);
  }

  const location = useLocation();
  const {img, id, name, desc, price} = location.state;

  function retrieveData(){ 
    setIdPlato(id);
    setNombrePlato(name);
    setImagen(img);
    setDescricpcion(desc);
    setCosto(price);
    setFirstImg(true);
  }

  const PLATO_EDIT_URL = `/plato/UpdatePlato/${id}`;

  useEffect(() => {
      retrieveData()
  },[]) 
    
  const [nombrePlato, setNombrePlato] = useState("");
  const [descripcion, setDescricpcion] = useState("");
  const [costo, setCosto] = useState(0);
  const [imagen, setImagen] = useState("");
  const [file, setFile] = useState();
  const [idPlato, setIdPlato] = useState(0);
  const [firstImg, setFirstImg] = useState(false);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    convertToBase64(e.target.files[0]);
    setFirstImg(false)
  }

  const convertToBase64 = (img) => {
    const reader = new FileReader();

    reader.readAsDataURL(img);

    reader.onload = () => {
      console.log("called: ", reader);
      setImagen(reader.result.split(",")[1]);
      console.log(reader.result.split(",")[1]);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(
        PLATO_EDIT_URL,
        JSON.stringify({ nombrePlato, descripcion, costo, imagen }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5173/",
          },
        }
      );
      Swal.fire("Éxito", "Plato editado exitosamente", "success");
      setNombrePlato("");
      setDescricpcion("");
      setCosto(0);
      setImagen([]);
      setFile();
      onClose();
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

  return (
    <div className="flex items-center justify-center m-3">
      <div className="w-full p-6 shadow-lg bg-slate-700/35 rounded-xl">
        <h1 className="block text-3xl font-semibold text-center">
          Editar Plato
        </h1>
        <form onSubmit={handleSubmit}>
          <hr className="mt-3" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="mt-3">
              <label
                htmlFor="nombrePlato"
                className="block mb-2 text-base font-semibold"
              >
                Nombre del plato:
              </label>
              <input
                type="text"
                id="correo"
                autoComplete="off"
                onChange={(e) => setNombrePlato(e.target.value)}
                value={nombrePlato}
                required
                className="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
              />
            </div>

            <div className="mt-3">
              <label
                htmlFor="descripcion"
                className="block mb-2 text-base font-semibold"
              >
                Descripción del plato:
              </label>
              <input
                type="text"
                id="descripcion"
                onChange={(e) => setDescricpcion(e.target.value)}
                value={descripcion}
                autoComplete="off"
                required
                className="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
              />
            </div>

            <div className="mt-3">
              <label
                htmlFor="costo"
                className="block mb-2 text-base font-semibold"
              >
                Costo del plato:
              </label>
              <input
                type="number"
                id="costo"
                onChange={(e) => setCosto(e.target.value)}
                value={costo}
                required
                className="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
              />
            </div>

            <div className="mt-3">
              <label
                htmlFor="img"
                className="block mb-2 text-base font-semibold"
              >
                Imágen:
              </label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                id="img"
                onChange={handleChange}
                required={firstImg ? false : true}
                className="w-full px-2 py-1"
              />
              <img
                src={firstImg ? `data:image/png;base64,${img}` : file}
                alt="..."
                className="max-h-64 max-w-64"
              />
            </div>
          </div>
          <button
            disabled={
              !nombrePlato || !descripcion || !costo || !imagen ? true : false
            }
            className="w-full py-1 mt-3 mb-1 text-lg text-white duration-200 rounded-lg enabled:hover:scale-105 bg-primary/90 disabled:bg-slate-900/40"
          >
            Editar Plato
          </button>
          <button
            onClick={onClose}
            className="w-full py-1 mt-3 mb-1 text-lg text-white duration-200 rounded-lg hover:scale-105 bg-slate-900/40"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPlato
