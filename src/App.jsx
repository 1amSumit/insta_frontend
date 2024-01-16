import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../UI/AppLayout";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <h1>search</h1> },
      { path: "explore", element: <h1>explore</h1> },
      { path: "reels", element: <h1>reels</h1> },
      { path: "direct", element: <h1>direct</h1> },
      { path: "notifications", element: <h1>notifications</h1> },
      { path: "create", element: <h1>create</h1> },
      { path: "profile", element: <h1>profile</h1> },
    ],
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
