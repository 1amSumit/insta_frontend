import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../UI/AppLayout";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CreatePop from "../UI/CreatePop";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { action as LoginAction } from "./pages/LoginPage";
import { action as SignupAction } from "./pages/SignupPage";
import { loader as tokenLoader } from "../utils/auth";
import { action as LogoutAction } from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <h1>search</h1> },
      { path: "explore", element: <h1>explore</h1> },
      { path: "reels", element: <h1>reels</h1> },
      { path: "direct", element: <h1>direct</h1> },
      { path: "notifications", element: <h1>notifications</h1> },
      { path: "create", element: <CreatePop /> },
      { path: "profile", element: <h1>profile</h1> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    action: LoginAction,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    action: SignupAction,
  },
  {
    path: "/logout",
    action: LogoutAction,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}
