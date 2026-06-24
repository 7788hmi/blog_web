import { NavLink, useLocation } from "react-router-dom";

const PublicNavbar = () => {
  const location = useLocation();
  const hideHome = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="primary-link">
      {!hideHome && <NavLink to="/home">Home</NavLink>}
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
    </nav>
  );
};

export default PublicNavbar;

