import { useState } from "react";
import Layout from "../components/Layout";
import { API } from "../config";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "mazi",
    email: "mazi@gmail.com",
    password: "mazi123",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;
  const hanndleChange = (event) => {
    console.log(event.target.name);
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`http://localhost:8000/api/signup`, {
        name,
        email,
        password,
      });
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      }
      setValues({ ...values, error: "", success: true });
      //   localStorage.setItem("userAuth", JSON.stringify(data));
      console.log(data);
    } catch (error) {
      setValues({ ...values, error: error.message, success: false });
      console.log(error.message);
    }
  };

  const signupSuccess = () => {
    return (
      <div
        className={`${
          success
            ? "block bg-green-500 text-center text-white w-[96%] mx-auto mt-2 font-semibold text-lg"
            : "hidden"
        }`}
      >
        <small>You have successfully signed up, please login </small>
        <Link
          to="/signin"
          className="border-2 border-blue-500 bg-blue-400 rounded-md ml-2 text-sm"
        >
          Signin
        </Link>
      </div>
    );
  };

  const signupError = () => {
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

  const signUpForm = () => {
    return (
      <form className="flex-1 p-5" onSubmit={handleSubmit}>
        <div className="flex flex-col w-[60%] mx-auto my-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border-2 border-gray-400 rounded-md outline-none h-10"
            value={values.name}
            onChange={hanndleChange}
          />
        </div>

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
      title="Sign up to Ecommerce for MERN GA|NG"
      description="My prefered description"
    >
      {signupSuccess()}
      {signupError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
