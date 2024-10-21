import Image1 from "../../assets/Food1.png";
import Image2 from "../../assets/Food2.png";
import Image3 from "../../assets/Food3.png";

const FoodData = [
  {
    image: Image1,
    rating: "⭐⭐⭐⭐",
    price: "$7.99",
    name: "Camarones 'a la Porteña'",
    desc: "Un apetecible plato que contiene dos camarones grandes acompañados de una docena de camarones pequeños",
  },
  {
    image: Image2,
    rating: "⭐⭐⭐⭐⭐",
    price: "$12.99",
    name: "Fluvial de Ostras",
    desc: "Platillo de ostras de alta calidad de distintos tipos, ordenadas de forma que recuerda a un fluvial. Recomendación personal de los fundadores",
  },
  {
    image: Image3,
    rating: "⭐⭐⭐⭐",
    price: "$6.49",
    name: "Danza de Camarones",
    desc: "Conjunto de camarones con ensalada de verduras, dando un contraste de sabores único que permite disfrutar lo mejor de los dos mundos",
  },
];

const TopList = () => {
  return (
    <div className="container py-14">
      {/* header section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold">Top Platillos</h1>
        <p>Nuestros mejores platillos</p>
      </div>
      {/* card section */}
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8">
        {FoodData.map((item, index) => (
          <div
            key={index}
            className="bg-white/50 p-5 lg:p-6 rounded-3xl hover:scale-110 transition duration-300 "
          >
            <img
              src={item.image}
              alt=""
              className="w-60 sm:w-40  lg:w-[240px] mx-auto object-cover rounded-full img-shadow"
            />
            <div className="space-y-2">
              <p className="text-red-500">{item.rating}</p>
              <p className="text-lg font-semibold ">{item.name}</p>
              <p>{item.desc}</p>
              <p className="text-lg font-semibold">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopList;
