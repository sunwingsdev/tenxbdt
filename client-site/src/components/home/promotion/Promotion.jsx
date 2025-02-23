import { useState } from "react";
import { useGetCategoriesQuery } from "../../../redux/features/allApis/categoriesApi/categoriesApi";
import { useGetPromotionsQuery } from "../../../redux/features/allApis/promotionApi/promotionApi";
import PromotionCardMenu from "../../shared/promotionOfferCard/PromotionCardMenu";
import PromotionOfferCard from "../../shared/promotionOfferCard/PromotionOfferCard";

const Promotion = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: promotions, isLoading } = useGetPromotionsQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const promotionCategories = categories?.filter(
    (category) => category.categoryType === "promotion"
  );

  // Filter promotions based on the selected category
  const filteredPromotions = selectedCategory
    ? promotions?.filter((promotion) =>
        promotion.categories.includes(selectedCategory.value)
      )
    : promotions;

  return (
    <div>
      <div className="bg-footerBg p-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {promotionCategories?.map((category) => (
            <PromotionCardMenu
              key={category?._id}
              category={category}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>
        <div className="flex items-center mt-4">
          <input
            type="text"
            placeholder="Promo Code"
            className="px-4 py-1 w-full rounded-l-md focus:outline-none bg-slate-100"
          />
          <button className="px-4 py-1 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition">
            Add
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-6">
          {isLoading ? (
            <p className="text-white text-center col-span-2 md:col-span-3">
              Loading...
            </p>
          ) : filteredPromotions?.length > 0 ? (
            filteredPromotions.map((promotion) => (
              <PromotionOfferCard key={promotion.id} offer={promotion} />
            ))
          ) : (
            <p className="text-white text-center col-span-2 md:col-span-3">
              No promotions available for the selected category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promotion;
