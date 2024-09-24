import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
export default function PrivateRoute() {
  const { currentuser } = useSelector((state) => state.user);
  //since Navigate is a component so it is possible to use it here unlike useNavigate which is a hook
  return currentuser ? <Outlet /> : <Navigate to="/sign-in" />;
}
