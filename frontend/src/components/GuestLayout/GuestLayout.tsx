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
      <div className="h-screen flex justify-center items-center">
        <div className="w-full max-w-90 animate-fadeInDown">
          <Outlet />
        </div>
      </div>
    </>
  );
}
