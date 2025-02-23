const Registration = () => {
  return (
    <div className="bg-customGreenSecondary ">
      <div
        className="h-auto lg:h-[400px] pb-4 lg:pb-0 "
        style={{
          backgroundImage:
            "url(https://darazplaypartner.com/wp-content/uploads/2024/07/background-registration.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-neutral-content text-center items-center pr-0 md:pr-11 pl-14  lg:pl-0 md:pt-5 lg:pt-0 h">
          <div className="max-w-6xl mx-auto">
            <h1 className="mb-5 text-4xl pr-14 lg:pr-0 text-customGreenText  font-bold">
              <span className="pr-3.5 lg:pr-0">REGISTRATION</span> STEPS
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-8">
              <div className="w-52 h-48 bg-black  shadow-customBoxGreenShadow border 1px solid border-customYellow rounded-[20px] flex flex-col justify-center items-center p-4">
                <h3 className="text-lg text-customGreenText font-bold">
                  Registration Form
                </h3>
                <p className="text-md font-medium text-white text-center  mt-2">
                  To become a {import.meta.env.VITE_SITE_NAME} partner,
                  applicants must complete the registration form. Click Register
                  fill it out accurately.
                </p>
              </div>
              <div className="w-52 h-48 bg-black shadow-customBoxGreenShadow border 1px solid border-customYellow rounded-[20px] flex flex-col justify-center items-center p-4">
                <h3 className="text-lg text-customGreenText font-bold">
                  Verification
                </h3>
                <p className="text-md font-medium text-white text-center mt-2">
                  After submitting the HEYBAJI partner form, expect review and
                  email confirmation within 24 hours.
                </p>
              </div>
              <div className="w-52 h-48 bg-black  shadow-customBoxGreenShadow border 1px solid border-customYellow rounded-[20px] flex flex-col justify-center items-center p-4">
                <h3 className="text-lg text-customGreenText font-bold">
                  Payment
                </h3>
                <p className="text-md font-medium text-white text-center mt-2">
                  Earnings are transferred weekly to the partner{"'"}s HEYBAJI
                  account provided during registration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
