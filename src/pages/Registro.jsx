import { useRef, useState, useEffect } from "react";
import axios from "../api/Axios";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MAIL_REGEX = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const REGISTER_URL = "/cliente/CreateCliente";


const Registro = () => {

    const navigate = useNavigate();

    const volver = () => navigate(-1);

const nombreClienteRef = useRef();
const errRef = useRef();

const [nombreCliente, setNombreCliente] = useState("");
const [validName, setValidName] = useState(false);
const [userFocus, setUserFocus] = useState(false);

const [contra, setContra] = useState("");
const [validContra, setValidContra] = useState(false);
const [contraFocus, setContraFocus] = useState(false);

const [matchContra, setMatchContra] = useState("");
const [validMatch, setValidMatch] = useState(false);
const [matchFocus, setMatchFocus] = useState(false);

const [correo, setCorreo] = useState("");
const [validCorreo, setValidCorreo] = useState(false);
const [correoFocus, setCorreoFocus] = useState(false);

const [telefono, setTelefono] = useState("");
const [telefonoFocus, setTelefonoFocus] = useState(false);
const [tipoUsuario, setTipoUsuario] = useState("User");

const [errMsg, setErrMsg] = useState("");

useEffect(() => {
  nombreClienteRef.current.focus();
}, []);

useEffect(() => {
  setValidName(USER_REGEX.test(nombreCliente));
}, [nombreCliente]);

useEffect(() => {
  setValidContra(PWD_REGEX.test(contra));
  setValidMatch(contra === matchContra);
}, [contra, matchContra]);

useEffect(() => {
    setValidCorreo(MAIL_REGEX.test(correo));
}, [correo])

useEffect(() => {
  setErrMsg("");
}, [nombreCliente, contra, matchContra, correo]);

const handleSubmit = async (e) => {
  e.preventDefault();
  // if button enabled with JS hack
  const v1 = USER_REGEX.test(nombreCliente);
  const v2 = PWD_REGEX.test(contra);
  const v3 = MAIL_REGEX.test(correo);
  if (!v1 || !v2 || !v3) {
    setErrMsg("Invalid Entry");
    return;
  }
  try {
    const response = await axios.post(
      REGISTER_URL,
      JSON.stringify({ nombreCliente, telefono, correo, contra, tipoUsuario }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    setContra("");
    setNombreCliente("");
    setCorreo("");
    setTelefono("")
    navigate("/Login", { replace: true });
  } catch (err) {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.status === 409) {
      setErrMsg("Ese usuario ya existe!");
    } else {
      setErrMsg("Registro Fallido");
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
            Registrarse
          </h1>
          <form onSubmit={handleSubmit}>
            <hr className="mt-3" />
            <div className="mt-3">
              <label
                htmlFor="username"
                className="block mb-2 text-base font-semibold"
              >
                Nombre de Usuario:
              </label>
              <input
                type="text"
                id="username"
                ref={nombreClienteRef}
                autoComplete="off"
                onChange={(e) => setNombreCliente(e.target.value)}
                value={nombreCliente}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
              />
              <p
                id="uidnote"
                className={`bg-slate-300/35 text-center font-semibold mt-1 text-sm
                  ${
                    userFocus && nombreCliente && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                    `}
              >
                El nombre debe tener entre 4 y 24 caracteres
                <br />
                Debe iniciar con una letra
                <br />
                Se permiten letras, números, y guiones
              </p>
            </div>

            <div className="mt-3">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-semibold"
              >
                Correo Electrónico:
              </label>
              <input
                type="text"
                id="email"
                autoComplete="off"
                onChange={(e) => setCorreo(e.target.value)}
                value={correo}
                required
                aria-invalid={validCorreo ? "false" : "true"}
                aria-describedby="mailnote"
                onFocus={() => setCorreoFocus(true)}
                onBlur={() => setCorreoFocus(false)}
                className="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
              />
              <p
                id="mailnote"
                className={`bg-slate-300/35 text-center font-semibold mt-1 text-sm
                  ${
                    correoFocus && correo && !validCorreo
                      ? "instructions"
                      : "offscreen"
                  }`}
              >
                El correo no puede iniciar o terminar con un punto.
                <br />
                El correo no puede contener espacios.
                <br />
                El correo no puede contener caracteres especiales.
              </p>
            </div>

            <div className="mt-3">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-semibold"
              >
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setContra(e.target.value)}
                value={contra}
                required
                aria-invalid={validContra ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setContraFocus(true)}
                onBlur={() => setContraFocus(false)}
                className="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
              />
              <p
                id="pwdnote"
                className={`bg-slate-300/35 text-center font-semibold mt-1 text-sm
                  ${
                    contraFocus && !validContra ? "instructions" : "offscreen"
                  }`}
              >
                La contraseña debe tener entre 8 y 24 caracteres
                <br />
                Debe incluir mayúsculas, minúsculas, un número y un caracter
                especial.
                <br />
                Caracteres especiales permitidos:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>

            <div className="mt-3">
              <label
                htmlFor="confirm_pwd"
                className="block mb-2 text-base font-semibold"
              >
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchContra(e.target.value)}
                value={matchContra}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
              />
              <p
                id="confirmnote"
                className={`bg-slate-300/35 text-center font-semibold mt-1 text-sm
                  ${matchFocus && !validMatch ? "instructions" : "offscreen"}`}
              >
                Las contraseñas deben coincidir
              </p>
            </div>

            <div className="mt-3">
              <label
                htmlFor="phone"
                className="block mb-2 text-base font-semibold"
              >
                Teléfono:
              </label>
              <input
                type="text"
                id="phone"
                onChange={(e) => setTelefono(e.target.value)}
                value={telefono}
                required
                onFocus={() => setTelefonoFocus(true)}
                onBlur={() => setTelefonoFocus(false)}
                className="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
              />
            </div>

            <button
              disabled={
                !validName ||
                !validContra ||
                !validMatch ||
                !validCorreo ||
                !telefono
                  ? true
                  : false
              }
              className="w-full py-1 mt-3 mb-1 text-lg text-white duration-200 rounded-lg enabled:hover:scale-105 bg-primary/90 disabled:bg-slate-900/40"
            >
              Crear Cuenta
            </button>
          </form>
          <p className="flex items-center mt-3 font-semibold">
            Ya tienes cuenta?
            <br />
            <span className="px-2 py-1 font-semibold text-white duration-200 text-l rounded-2xl line ms-2 bg-primary/70 hover:scale-105">
              <button onClick={volver}>Inicia Sesión</button>
            </span>
          </p>
        </div>
      </section>
    </>
  );
}

export default Registro

