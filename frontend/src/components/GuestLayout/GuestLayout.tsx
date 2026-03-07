import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UseStateContext } from "../../contexts/ContextProvider";

export default function GuestLayout() {
  const { token } = UseStateContext();
  const location = useLocation();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div
        key={location.pathname} //força remount do container quando muda rota
        className="login-signup-form animated fadeInDown"
      >
        <div className="form">
          <Outlet />
        </div>
      </div>
    </>
  );
}
