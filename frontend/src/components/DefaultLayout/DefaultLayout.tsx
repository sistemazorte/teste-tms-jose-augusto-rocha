import { Link, Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../api/axios-client";
import { Button } from "@mui/material";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = UseStateContext();

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  const onLogout = (ev: React.MouseEvent) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser(null);
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        <aside className="w-60 bg-purple-600 p-4 block px-3 py-4 h-screen">
          <Link
            className="block px-4 py-3 rounded-md text-white hover:bg-black/20 transition-all"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="block px-4 py-3 rounded-md text-white hover:bg-black/20 transition-all"
            to="/drivers"
          >
            Motoristas
          </Link>
          <Link
            className="block px-4 py-3 rounded-md text-white hover:bg-black/20 transition-all"
            to="/transport-orders"
          >
            Ordens de Transporte
          </Link>
        </aside>
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-20 py-8 px-12 bg-white shadow-sm flex justify-between items-center">
            <div>Header</div>
            <div>{user?.name}</div>
            <Button
              onClick={onLogout}
              className="text-black px-6 py-3 rounded-md hover:bg-black/10 transition-all"
            >
              Logout
            </Button>
          </header>
          <main className="flex-1 p-8 bg-[#f6f6f6] overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
