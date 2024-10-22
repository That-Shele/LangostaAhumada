import { Link } from "react-router-dom";

const CardAdmin = ({ img, id, desc, name, price, del }) => {
  
  

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
          onClick={del}
          className="w-full py-1 mt-3 mb-1 text-lg text-white duration-200 rounded-lg hover:scale-105 bg-slate-900/40"
        >
          Eliminar
        </button>
      </div>
    );
  };

export default CardAdmin;
