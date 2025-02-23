import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useAddPageDetailsMutation,
  useDeletePageDetailMutation,
  useGetPagesDetailQuery,
  useUpdatePageDetailMutation,
} from "../../redux/features/allApis/pagesApi/pagesApi";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import DeleteModal from "../../components/shared/modal/DeleteModal";

const routeOptions = [
  { value: "about-us", label: "About Us" },
  { value: "contact-us", label: "Contact Us" },
  { value: "terms-conditions", label: "Terms and Conditions" },
  { value: "rules-regulations", label: "Rules and Regulations" },
  { value: "responsible-gaming", label: "Responsible Gaming" },
  { value: "privacy-policy", label: "Privacy Policy" },
];

const ManagePages = () => {
  const { handleSubmit, control, reset, setValue } = useForm();
  const { data: allPages } = useGetPagesDetailQuery();
  const [addPageDetails] = useAddPageDetailsMutation();
  const [deletePageDetail] = useDeletePageDetailMutation();
  const [updatePageDetail] = useUpdatePageDetailMutation();
  const { addToast } = useToasts();
  const [editingPage, setEditingPage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState(null);

  const filteredRoutes = routeOptions?.filter(
    (page) => !allPages?.some((p) => p.route === page.value)
  );

  const onSubmit = async (data) => {
    const pageDetails = {
      route: data?.route?.value,
      details: data?.details,
    };

    if (editingPage) {
      // Update page details
      const result = await updatePageDetail({
        id: editingPage._id,
        pageDetails,
      });
      if (result.error) {
        addToast("Failed to update page.", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast("Page updated successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
        setEditingPage(null);
      }
    } else {
      // Add new page details
      const result = await addPageDetails(pageDetails);
      if (result.error) {
        addToast("Failed to add page.", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast("Page added successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    }
    reset();
    setValue("route", null);
  };

  const handleEdit = (page) => {
    setEditingPage(page);
    const selectedRoute = routeOptions?.find(
      (route) => route.value === page.route
    );
    setValue("route", selectedRoute);
    setValue("details", page.details);
  };

  const handleDeleteButtonClick = (page) => {
    setItem(page);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    const result = await deletePageDetail(item?._id);
    if (result.error) {
      addToast("Failed to delete the page.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      addToast("Page deleted successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      setIsOpen(false);
    }
  };

  const truncateHTML = (html, wordLimit) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : html;
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-2">
        {/* Add/Edit Page Section */}
        <div className="w-ful md:w-1/2 p-6 bg-gray-50 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            {editingPage ? "Edit Page" : "Add Page"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 w-full md:w-80 ">
              <label
                htmlFor="route"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Select Route
              </label>
              <Controller
                name="route"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={filteredRoutes}
                    placeholder="Select a route"
                    className="text-gray-800 z-20"
                  />
                )}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="details"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Details
              </label>
              <Controller
                name="details"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <ReactQuill
                      {...field}
                      theme="snow"
                      modules={quillModules}
                      placeholder="Add details"
                      className="bg-white rounded-md border border-gray-300"
                    />
                    <style>{`
                    .ql-container {
                      height: 350px;
                      overflow-y: auto; 
                    }
                    .ql-toolbar {
                      position: sticky;
                      top: 0;
                      z-index: 1;
                      background-color: white;
                    }
                  `}</style>
                  </div>
                )}
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {editingPage ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* Pages Content */}
        <div className="md:w-1/2 p-6 shadow-lg w-full">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            All Pages
          </h2>
          <table className="table-auto w-full border-collapse border border-gray-300 overflow-x-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1.5">Route</th>
                <th className="border border-gray-300 px-3 py-1.5">Details</th>
                <th className="border border-gray-300 px-3 py-1.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPages?.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-1.5">
                    {page.route}
                  </td>
                  <td
                    className="border border-gray-300 px-3 py-1.5"
                    dangerouslySetInnerHTML={{
                      __html: truncateHTML(page.details, 5),
                    }}
                  ></td>
                  <td className="border border-gray-300 px-3 py-1.5 flex h-full w-full">
                    <button
                      className="mr-2 px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                      onClick={() => handleEdit(page)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      onClick={() => handleDeleteButtonClick(page)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default ManagePages;
