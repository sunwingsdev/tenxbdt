import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useAddPaymentNumberMutation } from "../../../redux/features/allApis/paymentNumberApi/paymentNumberApi";
import { useGetKycByIdQuery } from "../../../redux/features/allApis/kycApi/kycApi";

const AddPaymentMethodandNumberforAgent = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const { addToast } = useToasts();
  const [addPaymentNumber, { isLoading }] = useAddPaymentNumberMutation();
  const { data: singleKyc } = useGetKycByIdQuery(id);

  const selectedMethod = watch("paymentNumberMethod");

  const onSubmit = async (data) => {
    const formattedData = {
      userId: id,
      ...data,
    };
    try {
      const response = await addPaymentNumber(formattedData);
      if (response) {
        addToast("Payment Number added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      reset();
    } catch (error) {
      console.log(error);
      addToast("Failed to add payment number", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4 bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Add Payment Method
      </h2>
      {singleKyc?.status !== "approve" ? (
        <div>
          <p className="text-gray-500 text-sm text-center italic">
            Please Submit your kyc and wait for{" "}
            <span className="text-base text-gray-700 underline">
              admin approval
            </span>{" "}
            to unlock this feature.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Select Payment Method */}
          <label className="block text-sm font-medium text-gray-700">
            Select Payment Method
          </label>
          <select
            name="paymentNumberMethod"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("paymentNumberMethod", { required: true })}
          >
            <option value="" className="text-gray-500">
              Choose a payment method
            </option>
            <option value="bkash">Bkash</option>
            <option value="rocket">Rocket</option>
            <option value="nagad">Nagad</option>
          </select>

          {/* Conditional Input Field */}
          {selectedMethod && (
            <>
              <div>
                <label
                  htmlFor="payment-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  {`Enter your ${
                    selectedMethod.charAt(0).toUpperCase() +
                    selectedMethod.slice(1)
                  } Number`}
                </label>
                <input
                  type="text"
                  id="payment-number"
                  name="paymentNumber"
                  placeholder={`Enter ${selectedMethod} number`}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  {...register("paymentNumber", { required: true })}
                />
                {errors.paymentNumber && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Number Category
                </label>
                <div className="flex flex-row items-center gap-4">
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="agentCategory"
                      name="numberCategory"
                      value="agent"
                      {...register("numberCategory", { required: true })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="agentCategory"
                      className="ms-2 text-sm font-medium text-black"
                    >
                      Agent
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="personalCategory"
                      name="numberCategory"
                      value="personal"
                      {...register("numberCategory", { required: true })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="personalCategory"
                      className="ms-2 text-sm font-medium text-black"
                    >
                      Personal
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="merchantCategory"
                      name="numberCategory"
                      value="merchant"
                      {...register("numberCategory", { required: true })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="merchantCategory"
                      className="ms-2 text-sm font-medium text-black"
                    >
                      Merchant
                    </label>
                  </div>
                </div>

                {errors.numberCategory && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
          >
            {isLoading ? "Adding..." : "Add number"}
          </button>
        </div>
      )}
    </form>
  );
};

export default AddPaymentMethodandNumberforAgent;
