import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Pedidos from "./pages/Pedidos";
import Login from "./pages/Login";
import Prohibido from "./pages/Prohibido";
import RequireAuth from "./hooks/requireAuth";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Admin from "./pages/Admin";
import PlatosManager from "./pages/PlatosManager";
import EditPlato from "./pages/EditPlato";
import Usuarios from "./pages/Usuarios";
import ListaPedidos from "./pages/ListaPedidos";
import '@fortawesome/fontawesome-free/css/all.min.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Inicio />} />
          <Route path="Login" element={<Login />} />
          <Route path="Prohibido" element={<Prohibido />} />
          <Route path="Registro" element={<Registro/>}/>

          <Route element={<RequireAuth allowedRoles={["User", "Admin"]} />}>
            <Route path="Menu" element={<Menu />} />
            <Route path="Pedidos" element={<Pedidos />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["Admin"]}/>}>
            <Route path="Admin" element={<Admin/>}/>
            <Route path="PlatosManager" element={<PlatosManager/>}/>
            <Route path="EditPlato" element={<EditPlato/>}/>
            <Route path="Usuarios" element={<Usuarios/>}/>
            <Route path="ListaPedidos" element={<ListaPedidos/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
