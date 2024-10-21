import { useEffect, useState } from 'react'
import Axios from '../api/Axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
const USER_URL = "/cliente";

const Usuarios = () => {
    const [data, setData] = useState(null);
    const {auth} = useAuth();

    function requestData() {
      Axios.get(USER_URL, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173/",
        },
      }).then((res) => setData(res.data));
      console.log(data);
    }

    useEffect(() => {
        requestData();
    }, [])

    const USER_DELETE_URL = `/cliente/DeleteCliente/`;
    const USER_EDIT_URL = `/cliente/UpdateCliente/`;

    function onDelete (id) {
      try {
        Swal.fire({
          title: "Quieres borrar este usuario?",
          showCancelButton: true,
          confirmButtonText: "Si",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            const response = Axios.delete(
              USER_DELETE_URL + `${id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "http://localhost:5173/",
                },
              }
            );
            Swal.fire("Éxito", "Usuario eliminado exitosamente", "success");
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
          console.log("Eliminación fallida");
        }
      }
    }

    function onCreate(user){
    try {
        if(user.tipoUsuario === "User"){
            Swal.fire({
                title:"Quieres darle permisos de administrador a este usuario?",
                showCancelButton : true,
                confirmButtonText : "Si",
                cancelButtonText : "Cancelar",

            }).then((result) => {
                if(result.isConfirmed) {
                    const response = Axios.put(
                      USER_EDIT_URL + `${user.idCliente}`,
                      JSON.stringify({
                        nombreCliente: user.nombreCliente,
                        telefono: user.telefono,
                        correo: user.correo,
                        contra: user.contra,
                        tipoUsuario: "Admin",
                      }),
                      {
                        headers: {
                          "Content-Type": "application/json",
                          "Access-Control-Allow-Origin":
                            "http://localhost:5173/",
                        },
                      }
                    );
                    Swal.fire("Éxito", "Admin creado exitosamente!", "success");
                    requestData();
                }
            })
        }
        else{
            Swal.fire({
              title: "Quieres quitarle permisos de administrador a este usuario?",
              showCancelButton: true,
              confirmButtonText: "Si",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                const response = Axios.put(
                  USER_EDIT_URL + `${user.idCliente}`,
                  JSON.stringify({
                    nombreCliente: user.nombreCliente,
                    telefono: user.telefono,
                    correo: user.correo,
                    contra: user.contra,
                    tipoUsuario: "User",
                  }),
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "http://localhost:5173/",
                    },
                  }
                );
                Swal.fire("Éxito", "Admin quitado exitosamente!", "success");
                requestData();
              }
            });
        }
      
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
    <>
      <div className="m-3 overflow-auto rounded-lg shadow md:block">
        <table className="w-full">
          <thead className="border-b-2 border-gray-200 bg-gray-50">
            <tr>
              <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left border-r-2 border-gray-200">
                ID
              </th>
              <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left border-r-2 border-gray-200">
                Nombre
              </th>
              <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left border-r-2 border-gray-200">
                Email
              </th>
              <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left border-r-2 border-gray-200">
                Tipo
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left w-60 md:w-48">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            { data?.map((user) => {
                 return (
                   <tr className="bg-white" key={user.idCliente}>
                     <td className="p-3 text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap">
                       {user.idCliente}
                     </td>
                     <td className="p-3 text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap">
                       {user.nombreCliente}
                     </td>
                     <td className="p-3 text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap">
                       {user.correo}
                     </td>
                     <td className="p-3 text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap">
                       {user.tipoUsuario}
                     </td>
                     <td className="p-3 ">
                       {auth.correo === user.correo ? (
                         <></>
                       ) : user.tipoUsuario === "User" ? (
                         <div className="grid grid-cols-2 gap-3">
                           <button onClick={() => onCreate(user)} className=" bg-blue-800/70 rounded-xl">
                             <i className="fa-solid fa-edit" />
                           </button>
                           <button onClick={() => onDelete(user.idCliente)} className=" bg-red-800/70 rounded-xl">
                             <i className="fa-solid fa-trash" />
                           </button>
                         </div>
                       ) : (
                         <div className="grid grid-cols-2 gap-3">
                           <button onClick={() => onCreate(user)} className=" bg-green-500/70 rounded-xl">
                             <i className="fa-solid fa-edit" />
                           </button>
                           <button onClick={() => onDelete(user.idCliente)} className=" bg-red-800/70 rounded-xl">
                             <i className="fa-solid fa-trash" />
                           </button>
                         </div>
                       )}
                     </td>
                   </tr>
                 );   
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Usuarios
