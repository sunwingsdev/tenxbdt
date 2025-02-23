import { useState } from "react";
import OppsModal from "../shared/modal/OppsModal";
import CategoryUploadForm from "./CategoryUploadForm";
import { IoAdd } from "react-icons/io5";
import { Button } from "../shared/ui/button";
import { useGetCategoriesQuery } from "../../redux/features/allApis/categoriesApi/categoriesApi";

const PromotionCategoriesSection = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const promotionCategories = categories?.filter(
    (category) => category.categoryType === "promotion"
  );
  return (
    <>
      <div className="w-full lg:w-2/3 rounded-lg text-white px-3 py-1.5">
        <div className="flex bg-[#222222] p-2 items-center justify-between rounded-md mb-4">
          <h2 className="text-base lg:text-lg font-bold rounded-md px-4">
            Add Promotion Categories
          </h2>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-black py-2 px-4 rounded whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            <IoAdd /> Add
          </Button>
        </div>
        <div className="text-center text-black">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            promotionCategories?.map((category) => (
              <div
                key={category._id}
                className="flex items-center mb-2 bg-[#d0caeb] rounded-md shadow-xl"
              >
                <h3 className="text-lg font-medium p-2 rounded-md w-full">
                  {category?.label} ({category?.value})
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
      <OppsModal
        title={"Uplaod logo"}
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
      >
        {/* <LogoUploadForm closeModal={() => setIsModalOpen(false)} /> */}
        <CategoryUploadForm closeModal={() => setIsModalOpen(false)} />
      </OppsModal>
    </>
  );
};

export default PromotionCategoriesSection;
