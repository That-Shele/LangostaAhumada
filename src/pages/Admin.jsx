
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="p-5 m-4 bg-gray-800/50 rounded-3xl lg:p-6">
      <p className="mb-4 text-2xl font-semibold text-center">
        Opciones de Administrador
      </p>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            className="p-3 m-3 text-2xl font-bold text-center lg:text-5xl hover:text-white hover:bg-slate-950 bg-primary/85 rounded-xl"
            to="/PlatosManager"
          >
            Configurar Platillos
          </Link>
          <Link 
            className="p-3 m-3 text-2xl font-bold text-center lg:text-5xl hover:text-white hover:bg-slate-950 bg-primary/85 rounded-xl"
            to="/ListaPedidos"
          >
            Ver los Pedidos
          </Link>
          <Link
            className="p-3 m-3 text-2xl font-bold text-center lg:text-5xl hover:text-white hover:bg-slate-950 bg-primary/85 rounded-xl"
            to="/Usuarios"
          >
            Administrar Usuarios
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Admin
