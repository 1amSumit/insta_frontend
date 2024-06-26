import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../UI/AppLayout";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import RightMessage from "../UI/RightMessage";
import { RecoilRoot } from "recoil";
import Reels from "./pages/Reels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    id: "root",
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <h1>explore</h1> },
      { path: "reels/:realId", element: <Reels /> },
      {
        path: "direct",
        element: <Messages />,
        id: "message",
        children: [{ path: "t/:messageId", element: <RightMessage /> }],
      },

      {
        path: `/:searchedUser`,
        element: <Profile />,
        errorElement: <p>Something went wrong</p>,
      },
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
    <RecoilRoot>
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
    </RecoilRoot>
  );
}
