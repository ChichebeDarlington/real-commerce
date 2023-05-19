import { useState } from "react";
import Layout from "../components/Layout";
import { API } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticate } from "../auth";

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "mazi@gmail.com",
    password: "mazi123",
    error: "",
  });
  console.log(isAuthenticate());
  const { email, password, error } = values;
  const hanndleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`http://localhost:8000/api/signin`, {
        email,
        password,
      });
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      }
      setValues({ ...values, error: "", success: true });
      localStorage.setItem("userAuth", JSON.stringify(data));
      if (isAuthenticate().user.role === 1) {
        navigate("/admin/dashboard");
      }
      navigate("/user/dashboard");
    } catch (error) {
      // setValues({ ...values, error: error.message, success: false });
      console.log(error.message);
    }
  };

  const signinError = () => {
    return (
      <div
        className={`${
          error
            ? "block bg-red-500 text-center text-white w-[96%] mx-auto mt-2 font-semibold text-lg"
            : ""
        }`}
      >
        <span>{error}</span>
      </div>
    );
  };

  const signinForm = () => {
    return (
      <form className="flex-1 p-5" onSubmit={handleSubmit}>
        <div className="flex flex-col w-[60%] mx-auto  my-4">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="border-2 border-gray-400 rounded-md outline-none h-10"
            value={values.email}
            onChange={hanndleChange}
          />
        </div>

        <div className="flex flex-col w-[60%] mx-auto  my-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-2 border-gray-400 rounded-md outline-none h-10"
            value={values.password}
            onChange={hanndleChange}
          />
        </div>
        <div className="w-[60%] mx-auto my-3">
          <button
            type="submit"
            className="bg-blue-700 p-2 rounded-lg text-white"
          >
            Submit
          </button>
        </div>
      </form>
    );
  };
  return (
    <Layout
      title="Sign in to Ecommerce for MERN GA|NG"
      description="My prefered description"
    >
      {signinError()}
      {signinForm()}
    </Layout>
  );
};

export default Signin;
