import { Link } from "react-router-dom";

const GameCard = ({ imageUrl, title, link }) => {
  return (
    <Link
      to={link}
      target="_blank"
      className="group relative max-w-xs rounded overflow-hidden shadow-lg bg-gray-800"
    >
      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      {/* Text Content */}
      <h2 className="py-1 px-3 text-base text-white bg-SidebarBg">{title}</h2>
    </Link>
  );
};

export default GameCard;
