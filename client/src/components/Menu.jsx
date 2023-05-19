import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);

  let myLocation = location.pathname;
  useEffect(() => {
    setCurrent(myLocation);
  }, [current, myLocation]);

  const signout = () => {
    localStorage.removeItem("userAuth");
    navigate("/signin");
  };

  return (
    <nav className="bg-blue-500">
      <ul className="flex gap-5 text-white">
        {isAuthenticate() ? (
          <>
            {" "}
            <li>
              <Link
                to="/"
                className={`${current === "/" && "text-amber-500"} `}
              >
                Home
              </Link>
            </li>
            {isAuthenticate() && isAuthenticate().user.role == 0 && (
              <li>
                <Link
                  to="/user/dashboard"
                  className={`${
                    current === "/user/dashboard" && "text-amber-500"
                  } `}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticate() && isAuthenticate().user.role == 1 && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className={`${
                    current === "/user/dashboard" && "text-amber-500"
                  } `}
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li onClick={signout}>
              <Link className="">Sign Out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/signup"
                className={`${current === "/signup" && "text-amber-500"} `}
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className={`${current === "/signin" && "text-amber-500"} `}
              >
                Sign In
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
