import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { BsArrowLeftSquare } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdGTranslate } from "react-icons/md";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useAddWithdrawMutation } from "../../../redux/features/allApis/withdrawsApi/withdrawsApi";
import { setSingleUser } from "../../../redux/slices/authSlice";
import { useLazyGetUserByIdQuery } from "../../../redux/features/allApis/usersApi/usersApi";
// import { useAddWithdrawMutation } from "../../../redux/features/allApis/withdrawApi/withdrawApi";
// import { uploadImage } from "../../../hooks/files";

// TODO:
// 2. inputs will be dynamic based on the payment method

const mobilePaymentMethods = [
  {
    image: "https://pay.hostbuybd.com/assets/template/images/bkash.png",
    gateway: "MOBILE_BANKING",
    paymentMethod: "bKash",
    bgColor: "#e2136e",
  },
  {
    image: "https://pay.hostbuybd.com/assets/template/images/nagad.png",
    gateway: "MOBILE_BANKING",
    paymentMethod: "Nagad",
    bgColor: "#ec1d25",
  },
  {
    image: "https://pay.hostbuybd.com/assets/template/images/upay.png",
    gateway: "MOBILE_BANKING",
    paymentMethod: "Upay",
    bgColor: "#ec1d25",
  },
  {
    image: "https://pay.hostbuybd.com/assets/template/images/tap.png",
    gateway: "MOBILE_BANKING",
    paymentMethod: "Tap",
    bgColor: "#ec1d25",
  },
];

const bankPaymentMethods = [
  {
    image: "https://pay.hostbuybd.com/uploads/bank_logo/ibbl.png",
    gateway: "BANK_TRANSFER",
    paymentMethod: "IBBL",
    bgColor: "#02733c",
    inputs: [
      {
        property: "accountNumber",
        type: "text",
        label: "Enter Receiver Account Number",
        required: true,
      },
    ],
  },
  {
    image: "https://pay.hostbuybd.com/uploads/bank_logo/dbbl.png",
    gateway: "BANK_TRANSFER",
    paymentMethod: "DBBL",
    bgColor: "#02733c",
    inputs: [
      {
        property: "accountNumber",
        type: "text",
        label: "Enter Receiver Account Number",
        required: true,
      },
    ],
  },
  {
    image: "https://sslcommerz.com/wp-content/uploads/2024/05/dhaka-bank.jpg",
    gateway: "BANK_TRANSFER",
    paymentMethod: "DHAKA BANK",
    bgColor: "#02733c",
    inputs: [
      {
        property: "accountNumber",
        type: "text",
        label: "Enter Receiver Account Number",
        required: true,
      },
    ],
  },
];

const WithdrawModal = ({ closeWithdrawModal }) => {
  const [getSingleUser] = useLazyGetUserByIdQuery();
  const { user, singleUser } = useSelector((state) => state.auth);
  const [addWithdraw, { isLoading }] = useAddWithdrawMutation();
  const [activeTabBottom, setActiveTabBottom] = useState("MOBILE_BANKING");
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
    setStep(2);
  };

  const handleSubmitWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawAmount) {
      addToast("Please enter the amount", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    const withdrawInfo = {
      amount: withdrawAmount,
      paymentMethod: paymentMethod.paymentMethod,
      gateway: paymentMethod.gateway,
      receiverType: e.target?.receiverType?.value,
      receiverNumber: e.target?.receiverNumber?.value,
      accountNumber: e.target?.accountNumber?.value,
      userId: user?._id,
    };
    if (withdrawAmount > singleUser?.balance) {
      addToast("You don't have enough balance", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    try {
      const { data } = await addWithdraw(withdrawInfo);
      if (data.insertedId) {
        addToast("Withdraw request sent successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        closeWithdrawModal();
        reloadBalance();
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      addToast("Failed to send withdraw request", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (!user) return;
    getSingleUser(user?._id).then(({ data }) => {
      dispatch(setSingleUser(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const reloadBalance = () => {
    if (!user) return;
    getSingleUser(user?._id).then(({ data }) => {
      dispatch(setSingleUser(data));
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full max-w-md bg-[#222222] rounded-lg shadow-md flex flex-col overflow-y-auto max-h-svh relative">
        {/* Close Button */}
        <button
          onClick={closeWithdrawModal}
          className="absolute top-2 md:top-4 right-2 md:right-4 text-[#fff] text-lg hover:text-red-600 duration-300"
        >
          <FaTimes />
        </button>

        {/* Step 1: Select Payment Method */}
        {step === 1 && (
          <div className="p-6">
            <div className="flex justify-center items-center space-x-3">
              <p className="text-2xl font-bold text-white">Withdraw</p>
            </div>
            <div className="flex mt-2 justify-between items-center gap-4 py-2 px-4 text-gray-700 bg-gray-50 border-2 border-red-600">
              <IoHomeOutline onClick={() => setStep(1)} size={30} />
              <div className="flex gap-3">
                <MdGTranslate size={30} />
                <IoMdClose onClick={closeWithdrawModal} size={30} />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex">
                <button
                  onClick={() => setActiveTabBottom("MOBILE_BANKING")}
                  className={`flex-1 py-2 font-semibold text-center rounded-l-md ${
                    activeTabBottom === "MOBILE_BANKING"
                      ? "text-white loginButtonBgColor scale-105"
                      : "bg-black text-gray-200"
                  }`}
                >
                  MOBILE BANKING
                </button>
                <button
                  onClick={() => setActiveTabBottom("BANK_TRANSFER")}
                  className={`flex-1 py-2 font-semibold text-center rounded-r-md ${
                    activeTabBottom === "BANK_TRANSFER"
                      ? "text-white loginButtonBgColor scale-105"
                      : "bg-black text-gray-200"
                  }`}
                >
                  BANK TRANSFER
                </button>
              </div>
              <div className="mt-4">
                {activeTabBottom === "MOBILE_BANKING" ? (
                  <div className="grid grid-cols-3 gap-2">
                    {mobilePaymentMethods?.map((item) => (
                      <button
                        key={item.paymentMethod}
                        onClick={() => selectPaymentMethod(item)}
                      >
                        <div className="p-2 bg-gray-200 rounded-md text-center group">
                          <img
                            className="w-20 m-auto transform transition-transform duration-300 group-hover:scale-110"
                            src={item.image}
                            alt={item.paymentMethod}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {bankPaymentMethods?.map((item) => (
                      <button
                        key={item.paymentMethod}
                        onClick={() => selectPaymentMethod(item)}
                      >
                        <div className="p-2 bg-gray-200 rounded-md text-center group">
                          <img
                            className="w-20 m-auto transform transition-transform duration-300 group-hover:scale-110"
                            src={item.image}
                            alt={item.paymentMethod}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Enter Deposit Amount */}
        {step === 2 && (
          <div className="space-y-2">
            <h2 className="p-2 w-full text-center text-lg font-semibold text-white border-b-2 border-gray-500">
              Withdraw
            </h2>

            <div className="pb-4 px-4 space-y-4">
              <div className="flex items-center gap-3">
                <BsArrowLeftSquare
                  onClick={() => setStep(1)}
                  size={26}
                  className="text-white"
                />
                <p className="text-white text-base font-semibold">
                  Choose other payment
                </p>
              </div>
              <div className="flex justify-between items-center gap-4 py-2 px-4 text-gray-700 bg-gray-50 border-2 border-red-500">
                <IoHomeOutline onClick={() => setStep(1)} size={30} />
                <div className="flex gap-3">
                  <MdGTranslate size={30} />
                  <IoMdClose onClick={closeWithdrawModal} size={30} />
                </div>
              </div>
              <div
                style={{ backgroundColor: `${paymentMethod?.bgColor}` }}
                className="p-3 bg-red-600 border-2 border-white"
              >
                <div className="flex justify-around items-center gap-2">
                  <div className="bg-white rounded-xl">
                    <img className="w-32" src={paymentMethod.image} alt="" />
                  </div>
                  <div>
                    <h4 className="text-xl text-white font-bold">
                      {withdrawAmount} BDT
                    </h4>
                  </div>
                </div>
              </div>

              <div className=" text-white">
                <form onSubmit={handleSubmitWithdraw}>
                  {/* Radio Inputs for Personal and Agent */}
                  <div className="flex items-center gap-3">
                    <p className="text-base font-semibold">Receiver Type</p>
                    <div className="flex gap-4 items-center">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="receiverType"
                          value="Personal"
                          className="form-radio"
                          defaultChecked
                        />
                        <span>Personal</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="receiverType"
                          value="Agent"
                          className="form-radio"
                        />
                        <span>Agent</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="" className="text-base font-semibold">
                      Receiver Number
                    </label>
                    <input
                      className="w-full my-2 px-5 py-2 font-bold bg-[#152234] border border-gray-500 rounded-lg focus:outline-none placeholder-white text-white"
                      type="text"
                      placeholder="Enter Receiver Number"
                      id="receiverNumber"
                      name="receiverNumber"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="" className="text-base font-semibold">
                      Enter Amount
                    </label>
                    <input
                      className="w-full my-2 px-5 py-2 font-bold bg-[#152234] border border-gray-500 rounded-lg focus:outline-none placeholder-white text-white"
                      type="text"
                      placeholder="Enter Amount"
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>

                  <div>
                    {paymentMethod.inputs &&
                      paymentMethod?.inputs?.map((input, idx) => (
                        <div key={idx}>
                          <label
                            htmlFor={input.property}
                            className="text-white font-bold"
                          >
                            {input.label}
                          </label>
                          <input
                            type={input.type}
                            name={input.property}
                            id={input.property}
                            placeholder={input.label}
                            className="w-full py-2 px-4 font-bold text-white bg-[#152234] rounded-lg mt-2 border-2 border-gray-500 focus:outline-none placeholder-white"
                          />
                        </div>
                      ))}
                  </div>
                  <div className="w-full pt-3">
                    <button
                      type="submit"
                      className="py-2 px-4 w-full text-xl font-semibold text-white loginButtonBgColor disabled:bg-slate-400 disabled:text-black disabled:cursor-not-allowed border border-white rounded-lg duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Withdraw"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawModal;
