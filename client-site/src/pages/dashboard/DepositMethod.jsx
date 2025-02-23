import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import AddDepositMethodForm from "./AddDepositMethodForm";
import { AiOutlineDelete, AiOutlineRollback } from "react-icons/ai";
import {
  useDeletePaymentMethodMutation,
  useGetPaymentMethodsQuery,
  useUpdatePaymentMethodMutation,
} from "../../redux/features/allApis/paymentMethodApi/paymentMethodApi";
import DeleteModal from "../../components/shared/modal/DeleteModal";
import { useToasts } from "react-toast-notifications";
import { deleteImage } from "../../hooks/files";
import { IoReloadOutline } from "react-icons/io5";

const DepositMethod = () => {
  const { data: gateways } = useGetPaymentMethodsQuery();
  const [deleteGateway, { isLoading }] = useDeletePaymentMethodMutation();
  const [updateStatus] = useUpdatePaymentMethodMutation();
  const [item, setItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addNewMethod, setAddNewMethod] = useState(false);
  const { addToast } = useToasts();
  const filteredGateways = gateways?.filter(
    (gateway) => gateway.paymentType === "deposit"
  );

  const handleOpenModal = (item) => {
    setIsOpen(true);
    setItem(item);
  };

  const handleDelete = async () => {
    const { message } = await deleteImage(item?.image);
    if (message) {
      const result = await deleteGateway(item?._id);
      if (result.error) {
        addToast("Failed to delete the payment method.", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
      if (result.data.deletedCount > 0) {
        addToast("Payment method deleted successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
        setIsOpen(false);
      }
    } else {
      addToast("Image not deleted", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleUpdateStatus = async (gateway) => {
    let { _id, status } = gateway;
    if (status === "active") status = "deactive";
    else status = "active";
    const statusInfo = {
      id: _id,
      data: {
        status: status,
      },
    };
    const result = await updateStatus(statusInfo);
    if (result.error) {
      addToast(result.error.data.error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    if (result.data.modifiedCount > 0) {
      addToast("Status updated successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };
  return (
    <>
      {!addNewMethod ? (
        <section className="bg-[#F3F3F9] p-6">
          <div className="w-full bg-white p-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Manual Gateways
            </h1>
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-1/2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={() => setAddNewMethod(true)}
                className="bg-SidebarBg hover:bg-hoverSidebarBg text-white px-4 py-2 rounded-[3px] focus:outline-none"
              >
                + Add New
              </button>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-SidebarBg text-white">
                  <th className="py-3 px-4 text-left">Gateway</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredGateways?.map((gateway) => (
                  <tr
                    key={gateway._id}
                    className="border-b border-x border-slate-500"
                  >
                    <td className="py-1 px-4">
                      <img
                        className="size-12 inline-flex items-center gap-2"
                        src={`${import.meta.env.VITE_BASE_API_URL}${
                          gateway?.image
                        }`}
                        alt=""
                      />
                      <span className="ps-2">{gateway.method}</span>
                    </td>
                    <td className="py-1 px-4">
                      <div
                        onClick={() => handleUpdateStatus(gateway)}
                        className="flex items-center hover:cursor-pointer"
                      >
                        <span
                          className={`h-2 w-2 ${
                            gateway?.status === "active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          } rounded-full mr-2`}
                        />
                        <span
                          className={` ${
                            gateway?.status === "active"
                              ? "text-green-700"
                              : "text-red-700"
                          } text-sm capitalize`}
                        >
                          {gateway.status || ""}
                        </span>
                      </div>
                    </td>
                    <td className="py-1 px-4 mx-auto">
                      <div className="flex items-center justify-center">
                        {isLoading ? (
                          <IoReloadOutline className="animate-spin" />
                        ) : (
                          <AiOutlineDelete
                            onClick={() => handleOpenModal(gateway)}
                            className="text-3xl text-red-600 hover:text-red-800 hover:cursor-pointer "
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="p-6">
          <button
            onClick={() => setAddNewMethod(false)}
            className="flex items-center text-gray-500 hover:text-blue-600 hover:underline focus:outline-none"
          >
            <AiOutlineRollback className="mr-1" /> Back
          </button>
          <AddDepositMethodForm />
        </section>
      )}

      <DeleteModal
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default DepositMethod;
