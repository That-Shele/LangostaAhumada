import BannerImg from "../../assets/BgImage.png";

const Banner = () => {
  return (
    <>
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* img section */}
          <div className="flex justify-center items-center">
            <img src={BannerImg} alt="" />
          </div>
          {/* text section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-semibold">¡Darse gusto es bueno!</h1>
            <p className="py-4 font-semibold">
              En &quot;La langosta ahumada&quot; creemos en el buen gusto y la
              apreciación por la comida de calidad por lo que estamos cometidos
              a ofrecer platillos de mariscos de la mano de chefs experimentados
              cuyos ingredientes son obtenidos de los mayorístas mejor valorados
              en el área del país.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
