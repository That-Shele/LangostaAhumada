import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const Card = ({ img, id, desc, name, price }) => {
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    setCart((currentItems) => {
      const isItemFound = currentItems.find((item) => item.id == id);
      if (isItemFound) {
        return currentItems.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity++ };
          } else {
            return item;
          }
        });
      } else {
        return [...currentItems, {id, itemName: name, quantity: 1, itemPrice : price, itemImage : img }];
      }
    });
  };

  const removeItem = (id) => {
    setCart((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity < 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity-- };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getQuantityById = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById(id);

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
      {quantityPerItem === 0 ? (
        <button
          className="m-1 duration-200 primary-btn hover:scale-105"
          onClick={() => addToCart()}
        >
          Añadir al carrito
        </button>
      ) : (
        <button
          className="m-1 duration-200 primary-btn hover:scale-105"
          onClick={() => addToCart()}
        >
          Añadir, tienes {quantityPerItem}
        </button>
      )}

      {quantityPerItem > 0 && (
        <button
          className="m-1 text-black duration-200 secondary-btn hover:scale-105"
          onClick={() => removeItem(id)}
        >
          Quitar del carrito
        </button>
      )}
    </div>
  );
};

export default Card;
