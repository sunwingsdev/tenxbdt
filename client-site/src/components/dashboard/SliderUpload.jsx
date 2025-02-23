import { useState } from "react";
import { Button } from "../shared/ui/button";
import { IoAdd } from "react-icons/io5";
import OppsModal from "../shared/modal/OppsModal";

const SliderUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <div className="flex items-center justify-between border-2 bg-gray-400 rounded-lg">
          <p className="text-lg md:text-xl font-semibold px-3">
            Upload Home Slider Image
          </p>
          <Button
            className="bg-[#14805e] text-[#fde047]"
            onClick={() => setIsModalOpen(true)}
          >
            <IoAdd /> Add
          </Button>
        </div>
      </div>
      <OppsModal
        title={"Uplaod Slider Image"}
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
      >
        <SliderUploadForm closeModal={() => setIsModalOpen(false)} />
      </OppsModal>
    </>
  );
};

export default SliderUpload;
