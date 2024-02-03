import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/login";
import { setCurrentLoggedInUser, setUserToken } from "../utils/setUserToken";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setCurrentLoggedInUser(data.data.user);

      setUserToken(data.token);
      navigate("/");
    },
  });

  const formSubmitHandler = (data) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-50">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        method="POST"
        className="border-2 border-gray-200 px-6 py-8 flex flex-col gap-[1.5rem] shadow-md rounded-md bg-white"
      >
        <div>
          <h1 className="text-3xl font-salsa font-semibold text-center text-blue-500">
            Instagram
          </h1>
          {isError && (
            <p className="text-center text-red-500 mt-[1rem]">
              {error.message || "Invalid email or password"}
            </p>
          )}
        </div>
        <div className="flex lg:flex-row flex-col gap-[2rem]">
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
              required
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500  placeholder:text-sm"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              placeholder="Enter your password"
              className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 placeholder:text-sm"
              {...register("password")}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none px-2  focus:ring focus:border-blue-300"
          >
            {isPending ? "Loging..." : "Log in"}
          </button>
          <p className="text-gray-600 text-sm mt-2">
            Don&apos;t have an account?
            <NavLink
              className="text-blue-500 cursor-pointer ml-1"
              to={"/signup"}
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
