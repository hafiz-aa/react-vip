import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";

const AuthLayout = (props) => {
  const { children, title, type } = props;
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  console.log(isDarkMode);
  return (
    <div className={`flex justify-center  min-h-screen items-center ${isDarkMode && "bg-slate-900"}`}>
      <div className="w-full max-w-xs">
        <button className="absolute right-2 top-2 bg-blue-600 text-white p-3 rounded" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "Light" : "Dark"}
        </button>
        <h1 className="text-3xl text-blue-600 font-bold mb-2">{title}</h1>
        <p className="font-medium text-slate-500 mb-8">Welcome, please enter your detail</p>
        {children}
        <Navigation type={type} />
      </div>
    </div>
  );
};

const Navigation = ({ type }) => {
  const { isDarkMode } = useContext(DarkMode);
  if (type === "login") {
    return (
      <p className={`text-sm mt-5 text-center ${isDarkMode && "text-white"}`}>
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-600 font-bold">
          Register
        </Link>
      </p>
    );
  } else {
    return (
      <p className={`text-sm mt-5 text-center ${isDarkMode && "text-white"}`}>
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-bold">
          Login
        </Link>
      </p>
    );
  }
};

export default AuthLayout;
