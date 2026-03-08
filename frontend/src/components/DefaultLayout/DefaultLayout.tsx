import { Link, Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../api/axios-client";
import { LogOut, Truck } from "lucide-react";

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
      <div className="flex h-screen overflow-hidden">
        <aside className="min-w-60 h-screen flex flex-col justify-between px-3 py-4 bg-white shadow">
          <div>
            <div className="flex gap-2 items-center p-4">
              <Truck size={45} />
              <div className="font-bold">
                <div>TransLog</div>
                <div>Software</div>
              </div>
            </div>
            <hr className="my-4 border-gray-300 w-full" />
            <Link
              className="block p-4 py-3 rounded-md hover:bg-black/20 transition-all"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="block p-4 py-3 rounded-md  hover:bg-black/20 transition-all"
              to="/drivers"
            >
              Motoristas
            </Link>
            <Link
              className="block p-4 py-3 rounded-md  hover:bg-black/20 transition-all"
              to="/transport-orders"
            >
              Ordens de Transporte
            </Link>
          </div>
          <div className="px-3 py-4">
            <Link
              onClick={onLogout}
              to="/"
              className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-md hover:bg-black/20 transition-all"
            >
              <span>Logout</span>
              <LogOut size={20} />
            </Link>
          </div>
        </aside>
        <div className="flex-1 flex flex-col min-h-screen">
          {/* <header className="h-20 py-8 px-12 shadow-sm flex justify-between items-center">
            <div>Header</div>
            <div>{user?.name}</div>
            <Button
              onClick={onLogout}
              className="text-black px-6 py-3 rounded-md hover:bg-black/10 transition-all"
            >
              Logout
            </Button>
          </header> */}
          <main className="flex-1 p-8 bg-[#f6f6f6] overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
