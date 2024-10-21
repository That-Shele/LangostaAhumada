import { useRef, useState, useEffect } from "react";
import axios from "../api/Axios";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
const LOGIN_URL = "/login";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { setAuth } = useAuth();
  const correoRef = useRef();
  const errRef = useRef();

  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    correoRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [correo, contra]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ correo, contra }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5173/",
          },
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;
      const roles = response?.data?.type;
      setAuth({ correo, contra, roles, accessToken });
      setCorreo("");
      setContra("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Correo o Contraseña inválidos");
      } else if (err.response?.status === 401) {
        setErrMsg("Sin autorización");
      } else {
        setErrMsg("Login fallido");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section className="flex items-center justify-center h-screen">
        <div className="p-6 shadow-lg w-96 bg-slate-700/35 rounded-xl">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="block text-3xl font-semibold text-center">
            Iniciar Sesión
          </h1>
          <form onSubmit={handleSubmit}>
            <hr className="mt-3" />
            <div className="mt-3">
              <label
                htmlFor="correo"
                className="block mb-2 text-base font-semibold"
              >
                Correo:
              </label>
              <input
                type="text"
                id="correo"
                ref={correoRef}
                autoComplete="off"
                onChange={(e) => setCorreo(e.target.value)}
                value={correo}
                required
                className="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
              />
            </div>

            <div className="mt-3">
              <label
                htmlFor="contra"
                className="block mb-2 text-base font-semibold"
              >
                Contraseña:
              </label>
              <input
                type="password"
                id="contra"
                onChange={(e) => setContra(e.target.value)}
                value={contra}
                required
                className="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
              />
            </div>

            <button disabled={
                !contra ||
                !correo 
                  ? true
                  : false 
            }
            className="w-full py-1 mt-3 mb-1 text-lg text-white duration-200 rounded-lg enabled:hover:scale-105 bg-primary/90 disabled:bg-slate-900/40">
              Iniciar Sesión
            </button>
          </form>
          <div className="">
            <p className="flex items-center mt-3 font-semibold">
              No tienes cuenta?
              <span className="px-2 py-1 text-xl font-semibold text-white duration-200 rounded-2xl line ms-2 bg-primary/70 hover:scale-105">
                <Link to="/Registro">Crea una!</Link>
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
