import ReasonModal from "../../components/dashboard/ReasonModal";
import { IoIosSearch } from "react-icons/io";
import {
  useGetWithdrawsQuery,
  useUpdateWithdrawStatusMutation,
} from "../../redux/features/allApis/withdrawsApi/withdrawsApi";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";

const WithdrawHistory = () => {
  const [updateWithdrawStatus] = useUpdateWithdrawStatusMutation();
  const { data: allWithdraws, isLoading, isError } = useGetWithdrawsQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);
  const [status, setStatus] = useState("");
  const { addToast } = useToasts();

  const handleStatusClick = (withdraw, status) => {
    setSelectedWithdraw(withdraw);
    setStatus(status);
    setModalOpen(true);
  };

  const handleSubmit = async (reason) => {
    const statusInfo = {
      id: selectedWithdraw?._id,
      data: {
        status: status,
        reason: reason,
      },
    };
    try {
      const { data } = await updateWithdrawStatus(statusInfo);
      if (data.modifiedCount > 0) {
        addToast("Status upadated!", {
          appearance: "success",
          autoDismiss: true,
        });
        setModalOpen(false);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      addToast("Error updating status", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading withdrawals.</div>;

  return (
    <div>
      <div className="bg-[#172437] flex flex-row items-center justify-between p-4 mb-2">
        <h1 className="text-2xl text-white font-bold">Withdraw History</h1>
        <form className="w-1/2 md:w-1/4 flex flex-row items-center">
          <input
            type="text"
            placeholder="Type Name or Receiver A/C Number..."
            className="py-2 px-1 w-full outline-none"
          />
          <button className="bg-white p-3">
            <IoIosSearch />
          </button>
        </form>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-[#172437] dark:bg-[#172437] dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Username
              </th>
              <th scope="col" className="px-3 py-3">
                Phone
              </th>
              <th scope="col" className="px-3 py-3">
                Withdraw Gateway
              </th>
              <th scope="col" className="px-3 py-3">
                Number Type
              </th>
              <th scope="col" className="px-3 py-3">
                Withdraw Method
              </th>
              <th scope="col" className="px-3 py-3">
                Receiver A/C Number
              </th>
              <th scope="col" className="px-3 py-3">
                Amount
              </th>
              <th scope="col" className="px-3 py-3">
                Time & Date
              </th>
              <th scope="col" className="px-3 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allWithdraws?.map((withdraw, index) => (
              <tr
                key={withdraw._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } text-black`}
              >
                <td className="px-2 py-2">
                  {withdraw.userInfo?.username || "N/A"}
                </td>
                <td className="px-2 py-2">
                  {withdraw.userInfo?.phone || "N/A"}
                </td>
                <td className="px-2 py-2">{withdraw.gateway || "N/A"}</td>
                <td className="px-2 py-2">{withdraw.receiverType || "N/A"}</td>
                <td className="px-2 py-2">{withdraw.paymentMethod || "N/A"}</td>
                <td className="px-2 py-2">
                  {withdraw?.accountNumber || withdraw?.receiverNumber}
                </td>
                <td className="px-2 py-2">{withdraw.amount}</td>
                <td className="px-2 py-2">
                  {withdraw.createdAt
                    ? new Date(withdraw.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "N/A"}
                </td>
                <td className="px-2 py-2 text-center">
                  {withdraw.status === "pending" ? (
                    <div className="flex flex-col gap-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                        onClick={() => handleStatusClick(withdraw, "completed")}
                      >
                        Complete
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleStatusClick(withdraw, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`rounded-full px-3 py-1 text-white capitalize ${
                        withdraw.status === "completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {withdraw.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {allWithdraws?.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No withdrawals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Reason Modal */}
      <ReasonModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        status={status}
      />
    </div>
  );
};
export default WithdrawHistory;
