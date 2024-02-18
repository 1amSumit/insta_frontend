import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../UI/AppLayout";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CreatePop from "../UI/CreatePop";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// import { action as LoginAction } from "./pages/LoginPage";
// import { action as SignupAction } from "./pages/SignupPage";
// import { loader as tokenLoader } from "../utils/auth";
// import { action as LogoutAction } from "./pages/Logout";
import { Toaster } from "react-hot-toast";
import Error from "./pages/Error";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    id: "root",
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <h1>explore</h1> },
      { path: "reels", element: <h1>reels</h1> },
      { path: "direct", element: <h1>direct</h1> },
      { path: "notifications", element: <h1>notifications</h1> },
      { path: "create", element: <CreatePop /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/logout",
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
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </QueryClientProvider>
  );
}
