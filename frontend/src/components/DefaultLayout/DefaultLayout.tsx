import { Link, Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../api/axios-client";

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
      <div id="defaultLayout">
        <aside>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/drivers">Motoristas</Link>
          <Link to="/transport-orders">Ordens de Transporte</Link>
        </aside>
        <div className="content">
          <header>
            <div>Header</div>
            <div>{user?.name}</div>
            <a href="#" onClick={onLogout} className="btn-logout">
              Logout
            </a>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
