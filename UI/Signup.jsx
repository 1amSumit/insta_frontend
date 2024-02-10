import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/signup";
import { setCurrentLoggedInUser, setUserToken } from "../utils/setUserToken";
import toast from "react-hot-toast";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setCurrentLoggedInUser(data.data.newUser);
      toast.success("Logged in successfully");
      setUserToken(data.token);
      navigate("/");
    },
  });
  const signupFormSubmit = (data) => {
    mutate(data);
  };
  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-50">
      <form
        onSubmit={handleSubmit(signupFormSubmit)}
        method="POST"
        className="border-2 border-gray-200 px-6 py-8 flex flex-col gap-[1.5rem] shadow-md rounded-md bg-white"
      >
        <div>
          <h1 className="text-3xl font-salsa font-semibold text-center text-blue-500">
            Instagram
          </h1>
          {isError && (
            <p className="text-center text-red-500 mt-[1rem]">
              {error.message || "Invalid input"}
            </p>
          )}
        </div>
        <div className="flex lg:flex-row flex-col gap-[2rem]">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              minLength={8}
              placeholder="Enter your username"
              className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 placeholder:text-sm"
              {...register("username")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500  placeholder:text-sm"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              minLength={8}
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 placeholder:text-sm"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmpassword"
              className="text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Enter your password again"
              className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 placeholder:text-sm"
              {...register("confirmPassword")}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none px-2  focus:ring focus:border-blue-300"
          >
            {isPending ? "Signing..." : "Sign up"}
          </button>
          <p className="text-gray-600 text-sm mt-2">
            Already have an account?
            <NavLink
              className="text-blue-500 cursor-pointer ml-1"
              to={"/login"}
            >
              Log In
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
