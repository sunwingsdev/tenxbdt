import { useEffect, useState } from "react";
import walletNumber from "../../../assets/walletNumber.png";
import { useToasts } from "react-toast-notifications";
import { GoCopy } from "react-icons/go";

const DepositLastPage = ({
  paymentMethod,
  closeModal,
  handleInputChange,
  formData,
  handleSubmit,
  isLoading,
  randomNumber,
  refetch,
  tempInputValues,
}) => {
  const [timeLeft, setTimeLeft] = useState(359);
  const { addToast } = useToasts();

  useEffect(() => {
    if (timeLeft <= 0) {
      resetAndClose();
      refetch();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // Function to reset all input fields and close modal
  const resetAndClose = () => {
    closeModal();
    refetch();
  };

  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleCopy = () => {
    if (randomNumber?.paymentNumber) {
      navigator.clipboard
        .writeText(randomNumber?.paymentNumber)
        .then(() => {
          addToast("Copied to the clipboard", {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const validateRequiredFields = () => {
    const requiredFields = paymentMethod?.userInputs?.filter(
      (input) => input.isRequired === "required"
    );

    for (const field of requiredFields) {
      if (!tempInputValues[field.name]) {
        addToast(`Please fill in the required field: ${field.label}`, {
          appearance: "error",
          autoDismiss: true,
        });
        return false;
      }
    }

    return true;
  };

  const handleFormSubmit = () => {
    if (validateRequiredFields()) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white px-4 py-6 md:p-6 rounded-lg shadow-lg w-[90%] md:w-[80%] lg:w-[60%] xl:w-[54%] relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Timer Display */}
        {randomNumber && (
          <div className="text-center text-xl font-semibold text-red-500 mb-4">
            Time Left: {formatTime(timeLeft)}
          </div>
        )}

        {randomNumber ? (
          <>
            <div className="flex gap-2 items-center pb-4 text-xl font-bold border-b-2 border-gray-300">
              <img
                className="w-12"
                src={`${import.meta.env.VITE_BASE_API_URL}${
                  paymentMethod.image
                }`}
                alt=""
              />
              <p>
                <span className="uppercase">{paymentMethod.method}</span>{" "}
                Payment
              </p>
            </div>

            <div className="text-base text-gray-500 text-center m-auto w-full lg:w-[80%]">
              <p className="mt-4">
                Please ensure the deposited amount matches the transferred
                amount. We are not liable for incorrect information.
              </p>
              <p>Only use your registered phone number for cash out.</p>
              <p className="font-semibold border-b-2 border-gray-300">
                Please cash out to the account below within:
              </p>
              <p className="font-semibold">06 minutes after submitting</p>
            </div>

            <div className="w-full xl:w-[86%] m-auto mt-5 flex justify-evenly items-center flex-col xl:flex-row gap-3 p-4 pb-6 bg-gray-200 rounded-xl">
              <img className="w-60 h-60" src={walletNumber} alt="" />
              <div className="w-full xl:w-[50%]">
                <p className="text-4xl text-center text-red-500 inline-flex items-center gap-2">
                  {randomNumber?.paymentNumber}{" "}
                  <GoCopy
                    onClick={handleCopy}
                    className="text-xl text-gray-400 hover:text-green-500"
                  />
                  <span className="text-sm">
                    ({randomNumber?.numberCategory})
                  </span>
                </p>
                <p className="text-lg text-center">
                  Amount:{" "}
                  <span className="text-red-500 font-bold">
                    {formData?.amount || 0}
                  </span>
                </p>
                <div className="">
                  {paymentMethod?.userInputs?.map((item) => (
                    <div key={item?.name}>
                      <label className="text-red-500 mt-3">{item?.label}</label>
                      {item?.type === "file" ? (
                        <input
                          name={item?.name}
                          type="file"
                          className="w-full py-1.5 px-3 outline-none rounded-sm"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            handleInputChange(item?.name, file); // Update temporary state with the file
                          }}
                          required={item?.isRequired === "required"}
                        />
                      ) : (
                        <input
                          name={item?.name}
                          type={item?.type}
                          className="w-full py-1.5 px-3 outline-none rounded-sm"
                          placeholder={item?.label}
                          value={tempInputValues[item?.name] || ""} // Bind to temporary state
                          onChange={(e) => {
                            const value = e.target.value;
                            handleInputChange(item?.name, value); // Update temporary state with the input value
                          }}
                          required={item?.isRequired === "required"}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="w-full sm:w-60 m-auto">
                  <button
                    type="submit"
                    onClick={handleFormSubmit}
                    disabled={isLoading}
                    className="mt-6 w-full p-2 text-base font-semibold bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white px-6 py-8 md:p-8 rounded-xl relative h-[60vh] flex flex-col items-center justify-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 15.75h4.5m-2.25-10.5v10.5M5.25 21h13.5a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25v13.5A2.25 2.25 0 005.25 21z"
              />
            </svg>
            <p className="text-gray-600 text-lg font-medium">
              No payment number in this method
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositLastPage;