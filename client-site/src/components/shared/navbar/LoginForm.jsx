import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  useLazyGetAuthenticatedUserQuery,
  useLoginUserMutation,
} from "../../../redux/features/allApis/usersApi/usersApi";
import { useToasts } from "react-toast-notifications";
import { setCredentials } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [getUser] = useLazyGetAuthenticatedUserQuery();
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      const { data: loginData } = await loginUser({ username, password });

      if (loginData.token) {
        const { data: userData } = await getUser(loginData.token);
        dispatch(setCredentials({ token: loginData.token, user: userData }));
        addToast("Login successful", {
          appearance: "success",
          autoDismiss: true,
        });

        if (userData?.user?.role !== "admin") {
          navigate("/");
        } else {
          navigate("/dashboard");
        }
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      addToast("Provide valid username and password", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      reset();
      onClose();
    }
  };

  return (
    <div>
      <form className="py-4 px-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1 mb-2">
          <label className="text-white text-sm" htmlFor="name">
            Username
          </label>
          <input
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Z0-9]{4,15}$/,
                message: "4-15 characters, letters and numbers only",
              },
            })}
            placeholder="4-15 char, allow number"
            className={`text-white bg-[#363636] border-none outline-none w-full py-1.5 px-4 rounded-md ring-2 ${
              errors.username ? "ring-SidebarBg" : "ring-[#767575]"
            } hover:ring-SidebarBg`}
          />
          {errors.username && (
            <p className="text-SidebarBg text-xs">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-1 relative">
          <label className="text-white text-sm" htmlFor="password">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="6-20 Characters and Numbers"
            className={`text-white bg-[#363636] border-none outline-none w-full py-1.5 px-4 rounded-md ring-2 ${
              errors.password ? "ring-SidebarBg" : "ring-[#767575]"
            } hover:ring-SidebarBg`}
          />
          <button
            type="button"
            className="absolute top-8 right-3 text-white"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
          </button>
          {errors.password && (
            <p className="text-textColor text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="my-2 text-right text-sm font-semibold text-textColor">
          <div className="inline-block cursor-pointer">Forgot password?</div>
        </div>
        <button
          type="submit"
          className="p-1.5 w-full text-lg text-[#aaa9a9] hover:text-white bg-[#363636] hover:bg-SidebarBg duration-300 rounded-md"
        >
          {isLoading ? "..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
