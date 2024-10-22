import { useEffect, useState } from 'react'
import Axios from '../api/Axios';
const ORDERS_URL = "/pedido";



const ListaPedidos = () => {

const [data, setData] = useState(null);


function requestData() {
  setData(null);
  Axios.get(ORDERS_URL, {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5173/",
    },
  }).then((res) => setData(res.data));
  console.log(data);
}

useEffect(() => {
  requestData();
}, []);


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
                Precio Total
              </th>
              <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left border-r-2 border-gray-200">
                Cliente
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.map((order) => {
              return (
                <tr className="bg-white" key={order.idPedido}>
                  <td className="p-3 text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap">
                    {order.idPedido}
                  </td>
                  <td className="p-3 text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap">
                    ${order.precioPedido}
                  </td>
                  <td className="p-3 text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap">
                     {order.idCliente}
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

export default ListaPedidos
