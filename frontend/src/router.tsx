import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Drivers from "./pages/Drivers/Drivers";
import NotFound from "./pages/NotFound/NotFound";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import GuestLayout from "./components/GuestLayout/GuestLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import TransportOrdens from "./pages/TransportOrders/TransportOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/dashboard"}></Navigate>,
      },
      {
        path: "/drivers",
        element: <Drivers />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/transport-orders",
        element: <TransportOrdens />,
      },
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
