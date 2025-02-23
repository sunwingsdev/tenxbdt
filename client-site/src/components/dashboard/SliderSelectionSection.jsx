import { FaTrash } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import {
  useDeleteHomeControlMutation,
  useGetHomeControlsQuery,
  useUpdateSelectionMutation,
} from "../../redux/features/allApis/homeControlApi/homeControlApi";
import DeleteModal from "../shared/modal/DeleteModal";
import { useState } from "react";
import { deleteImage } from "../../hooks/files";

const SliderSelectionSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState(null);
  const { data: homeControls, refetch } = useGetHomeControlsQuery();
  const [updateSelection] = useUpdateSelectionMutation();
  const [deleteHomeControl] = useDeleteHomeControlMutation();
  const { addToast } = useToasts();

  const sliderHomeControls = homeControls?.filter(
    (control) => control.category === "slider"
  );

  const handleCheckboxChange = async (id) => {
    try {
      const result = await updateSelection(id);
      if (result.data) {
        addToast(result.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteButtonClick = (item) => {
    setItem(item);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
      const { message } = await deleteImage(item?.image);
      if (message) {
        try {
          const result = await deleteHomeControl(item?._id);
          if (result.data.deletedCount > 0) {
            addToast("Slider deleted successfully", {
              appearance: "success",
              autoDismiss: true,
            });
            refetch();
            setIsOpen(false);
          }
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          addToast("Failed to delete slider", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        {sliderHomeControls?.map((control) => (
          <div
            className="relative border border-[#041d3c] p-2 rounded-md"
            key={control._id}
          >
            <img
              className="w-full h-full rounded-md"
              src={`${import.meta.env.VITE_BASE_API_URL}${control.image}`}
              alt=""
            />
            <input
              checked={control?.isSelected === true}
              className="absolute top-0 left-0 size-6"
              type="checkbox"
              name=""
              onChange={() => handleCheckboxChange(control._id)}
              id={control?._id}
            />
            <div
              onClick={() => handleDeleteButtonClick(control)}
              className="absolute top-0 right-0 p-2 group rounded-full bg-red-600 hover:bg-white duration-200 cursor-pointer"
            >
              <FaTrash className="text-xl text-white group-hover:text-red-600 duration-200" />
            </div>
          </div>
        ))}
      </div>
      <DeleteModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        handleDelete={handleDelete}
      ></DeleteModal>
    </>
  );
};

export default SliderSelectionSection;
