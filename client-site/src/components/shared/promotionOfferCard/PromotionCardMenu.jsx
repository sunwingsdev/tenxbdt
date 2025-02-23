const PromotionCardMenu = ({
  category,
  setSelectedCategory,
  selectedCategory,
}) => {
  return (
    <div onClick={() => setSelectedCategory(category)} className="">
      <button
        className={`${
          category?.value === selectedCategory?.value
            ? " bg-red-600"
            : "bg-slate-500 hover:bg-red-600"
        } py-1.5 px-6 w-full text-sm font-semibold text-white duration-300 rounded-sm whitespace-nowrap`}
      >
        {category?.label}
      </button>
    </div>
  );
};

export default PromotionCardMenu;
