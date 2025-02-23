import { useState } from "react";
import AddPromotionSection from "../../components/dashboard/AddPromotionSection";
import PromotionCategoriesSection from "../../components/dashboard/PromotionCategoriesSection";
import PromotionOfferCard from "../../components/shared/promotionOfferCard/PromotionOfferCard";
import {
  useDeletePromotionMutation,
  useGetPromotionsQuery,
} from "../../redux/features/allApis/promotionApi/promotionApi";
import DeleteModal from "../../components/shared/modal/DeleteModal";
import { useToasts } from "react-toast-notifications";
import { deleteImage } from "../../hooks/files";

const PromotionOffer = () => {
  const { data: promotions, isLoading, refetch } = useGetPromotionsQuery();
  const [deletePromotion] = useDeletePromotionMutation();
  const [item, setItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToasts();

  const handleDeleteButtonClick = (item) => {
    setIsOpen(true);
    setItem(item);
  };

  const handleDelete = async () => {
    try {
      const { message } = await deleteImage(item?.image);
      if (message) {
        const result = await deletePromotion(item?._id);
        if (result.data) {
          addToast("Promotion deleted successfully", {
            appearance: "success",
            autoDismiss: true,
          });
        }
        refetch();
        setIsOpen(false);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      addToast("Failed to delete promotion", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <div className="rounded-md">
        <h1 className="text-2xl lg:text-3xl py-4 font-bold text-center text-black">
          Promotions Offers
        </h1>
        <div className="flex flex-col md:flex-row lg:space-x-6">
          <AddPromotionSection />
          <PromotionCategoriesSection />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 my-4 mt-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            promotions?.map((promotion) => (
              <PromotionOfferCard
                key={promotion.id}
                offer={promotion}
                hidden={true}
                handleDeleteButtonClick={handleDeleteButtonClick}
              />
            ))
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        handleDelete={handleDelete}
      ></DeleteModal>
    </>
  );
};

export default PromotionOffer;
