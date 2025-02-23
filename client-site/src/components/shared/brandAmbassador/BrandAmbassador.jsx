const BrandAmbassador = ({ image, heading, text, item }) => {
  return (
    <div className="text-gray-100">
      <img
        className={`${item?.imageSize ? "w-6 h-6" : "w-14"}`}
        src={image}
        alt=""
      />
      <h2 className="text-xs font-semibold">{heading}</h2>
      <p className="text-xs">{text}</p>
    </div>
  );
};

export default BrandAmbassador;
