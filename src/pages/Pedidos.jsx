import Swal from "sweetalert2";
import Axios from "../api/Axios";
import { useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { CartContext } from "../contexts/CartContext";
const USER_URL = "/cliente";
const ORDER_CREATE_URL = "/pedido/CreatePedido";

const Pedidos = () => {
  const [cart, setCart] = useContext(CartContext);
  const [userData, setUserData] = useState({});
  const [detallePedido, setDetallePedido] = useState([]);
  const { auth } = useAuth();

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity
  }, 0);

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.itemPrice,
    0
  );

  useEffect(() => {
    requestData()
    convertToDetalle(cart);
  }, [])

  function requestData() {
    Axios.get(USER_URL, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173/",
      },
    }).then((res) => setUserData(res.data));
    console.log(userData);
  }

  function convertToDetalle(crt) {
      const cartArray = crt.map(order => ({
        plato : order.itemName,
        precioPlato : order.itemPrice,
        cantidad : order.quantity,
        fechaPedido: new Date().toJSON()
      }))
      setDetallePedido(cartArray)
      console.log(detallePedido)
  }

  function wea() {
    var user = userData.find((x) => x.correo === auth.correo);
    console.log(user);
    return user.idCliente;
  }

  const takeOrder = () => {
    try {
      var clientId = wea();
      convertToDetalle(cart);
      Swal.fire({
        title: "Quieres realizar este pedido?",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.post(
            ORDER_CREATE_URL,
            JSON.stringify({
              precioPedido: totalPrice,
              detalle: detallePedido,
              idCliente: clientId,
            }),
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173/",
              },
            }
          );
           Swal.fire("Éxito", "Pedido realizado exitosamente", "success");
            setCart([]);
            setUserData([]);
        }
      });
       
    } catch (err) {
      Swal.fire(
        "Error",
        "Hubo un error, revise la consola para más información",
        "error"
      );
      if (!err?.response) {
        console.log(err);
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
    <div className="p-5 m-4 bg-gray-800/50 rounded-3xl lg:p-6">
      <div className="flex justify-between m-2 text-base font-semibold text-white md:text-lg">
        <div className="p-3 ">Platos en la orden: {quantity}</div>
        <div className="p-3 ">Total: ${totalPrice}</div>
        <button
          className="pt-3 pb-3 pl-6 pr-6 text-lg text-white rounded-full me-7 bg-primary disabled:bg-slate-900/40"
          disabled={quantity > 0 ? false : true}
          onClick={() => takeOrder()}
        >
          Realizar
        </button>
      </div>
      {cart.map((pedido) => {
        return (
          <div
            key={pedido.id}
            className="grid justify-between grid-cols-4 gap-4 p-2 m-1 text-base text-white border-b-2 rounded-md place-items-center bg-slate-600 border-slate-700 md:text-2xl"
          >
            <img
              src={`data:image/png;base64,${pedido.itemImage}`}
              alt=""
              className="w-20 h-20 max-w-32 max-h-32 md:h-32 md:w-32"
            />
            <h3>{pedido.itemName}</h3>
            <p>${pedido.itemPrice}</p>
            <p className="flex p-4">
              Cantidad:{" "}
              <p className="pt-1 pb-1 pl-2 pr-2 -mt-1 rounded-full ms-3 bg-primary/80">
                {pedido.quantity}
              </p>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Pedidos;
