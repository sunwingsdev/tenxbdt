import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useToasts } from "react-toast-notifications";
import { useAddHomeControlMutation } from "../../redux/features/allApis/homeControlApi/homeControlApi";
import SpinLoader from "../shared/loader/SpinLoader";
import { uploadImage } from "../../hooks/files";
import { Button } from "../shared/ui/button";

const LogoUploadForm = ({ closeModal }) => {
  const [addHomeControl] = useAddHomeControlMutation();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const { addToast } = useToasts();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setLogoFile(file);
    }
  };

  const handleRemove = () => {
    setLogoPreview(null);
    setLogoFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (logoFile) {
      try {
        setLoading(true);
        const { filePath } = await uploadImage(logoFile);
        if (filePath) {
          const logoInfo = {
            page: "home",
            section: "navbar",
            category: "logo",
            image: filePath,
          };
          const result = await addHomeControl(logoInfo);
          if (result.data.insertedId) {
            addToast("Logo uploaded successfully", {
              appearance: "success",
              autoDismiss: true,
            });
            setLogoPreview(null);
            setLogoFile(null);
            setLoading(false);
            closeModal();
          }
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setLoading(false);
        addToast("Failed to upload logo", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } else {
      addToast("Failed to upload image", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
          {!logoPreview ? (
            <label className="w-full h-full flex flex-col items-center text-center cursor-pointer relative">
              <div className="text-gray-400 text-4xl mb-4">📤</div>
              <p className="text-gray-500">Select a logo to upload</p>
              <p className="text-gray-400 text-sm">or drag and drop it here</p>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={logoPreview}
                alt="Preview"
                className="w-full h-auto object-cover rounded-md mb-4"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="text-red-500 text-sm hover:underline"
              >
                Remove Logo
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Button
            disabled={loading || !logoFile}
            type="submit"
            className="bg-[#222222] text-white hover:bg-[#ff3f3f] flex items-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {loading ? (
              <SpinLoader />
            ) : (
              <>
                <IoAdd /> Upload
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogoUploadForm;
