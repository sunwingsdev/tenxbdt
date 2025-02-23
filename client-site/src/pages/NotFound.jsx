import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="text-center">
        {/* SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 mx-auto mb-6 text-red-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12" y2="17"></line>
        </svg>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        {/* Home Link */}
        <Link
          to="/"
          className="inline-block px-6 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
