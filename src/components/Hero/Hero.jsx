import { Link } from "react-router-dom";
import HeroImg from "../../assets/HeroImg.png";

const Hero = () => {
  return (
    <div>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px] ">
        {/* text section */}
        <div className="flex flex-col justify-center gap-8 pt-24 pb-10 text-center md:text-left md:p-0">
          <h1 className="text-4xl font-semibold lg:text-6xl">
            Nuestro Restaurante
          </h1>
          <p className="">
            &quot;La langosta ahumada&quot; es un restaurante de mariscos que
            lleva más de 10 años en el mercado sirviendo y complaciendo los
            paladares de miles de satisfechos clientes que confían en la
            excelencia y la calidad de nuestros platos.
          </p>
          <div className="flex items-center justify-center gap-4 md:justify-start">
            <Link to="/Menu">
              <button className="duration-200 primary-btn hover:scale-105">
                Ver Menú
              </button>
            </Link>
            <Link to="/Pedidos">
              <button className="text-black duration-200 secondary-btn hover:scale-105">
                Hacer Pedido
              </button>
            </Link>
          </div>
        </div>
        {/* image section */}
        <div className="flex flex-col justify-center">
          <img
            src={HeroImg}
            alt=""
            className="animate-spin-slow img-shadow w-[400px] mx-auto "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
