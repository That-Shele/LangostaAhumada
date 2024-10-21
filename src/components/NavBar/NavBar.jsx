import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {

  const navigate = useNavigate()
  const [noAuthVisible, setNoAuthVisible] = useState(true);
  const [adminVisible, setAdminVisible] = useState(false);
  const {auth, setAuth} = useAuth();

  const logout = async () => {
    setAuth({});
    navigate("/")
  }
  

  useEffect(() => {
    if(auth.roles === "User") {
      setNoAuthVisible(false)
      setAdminVisible(false)
    }
    else if(auth.roles === "Admin"){
      setAdminVisible(true)
      setNoAuthVisible(false)
    }
    else{
      setNoAuthVisible(true)
      setAdminVisible(false)
    }
  }, [auth])

  return (
    <div className="py-4">
      <div className="container flex items-center justify-between">
        {/*Logo Section*/}
        <div>
          <Link to="/" className="text-lg font-semibold">
            LA LANGOSTA <span className="text-red-500">AHUMADA</span>
          </Link>
        </div>
        {/*Menu Section*/}
        <div className="flex items-center justify-center gap-4">
          <ul className="hidden gap-8 sm:flex">
            {noAuthVisible && (
              <Link
                to="/Login"
                className="p-1 text-white uppercase duration-200 border-black bg-primary hover:border-b-2 hover:bg-transparent hover:text-primary hover:scale-105"
              >
                Iniciar Sesión
              </Link>
            )}
            {!noAuthVisible && (
              <button
                onClick={logout}
                className="p-1 text-white uppercase duration-200 border-black bg-primary hover:border-b-2 hover:bg-transparent hover:text-primary hover:scale-105"
              >
                Cerrar Sesión
              </button>
            )}
            <Link to="/" className="uppercase hover:border-b-2 border-primary">
              Inicio
            </Link>
            <Link
              to="/Pedidos"
              className="uppercase hover:border-b-2 border-primary"
            >
              Pedido
            </Link>
            <Link
              to="/Menu"
              className="uppercase hover:border-b-2 border-primary"
            >
              Menu
            </Link>
            {adminVisible && (
              <Link
                to="/Admin"
                className="p-1 text-white uppercase duration-200 bg-red-700 border-black hover:border-b-2 hover:bg-transparent hover:text-red-700 hover:scale-105"
              >
                Mas opciones...
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
