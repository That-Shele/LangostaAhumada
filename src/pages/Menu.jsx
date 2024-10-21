import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import Axios from "../api/Axios";
const MENU_URL = "/plato";

const Menu = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    Axios.get(MENU_URL, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173/",
      },
    }).then((res) => setData(res.data));
    
  }, []);

  return (
    <div className="p-5 m-4 bg-gray-800/50 rounded-3xl lg:p-6">
      <p className="mb-4 text-2xl font-semibold text-center">
        Menu de platillos
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((food) => (
          <Card
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
};

export default Menu;
