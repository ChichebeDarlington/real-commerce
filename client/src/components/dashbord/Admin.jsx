import { Link } from "react-router-dom";
import { isAuthenticate } from "../../auth";
import Layout from "../Layout";

const Admin = () => {
  const {
    user: { email, name, role },
  } = isAuthenticate();
  const adminInfo = () => {
    return (
      <div className="p-5 bg-gray-100 mx-auto mt-2 rounded border-2 border-gray-300">
        <h2 className="bg-gray-300 w-[100%]">Admin Information</h2>
        <ul className="">
          <li className="border-b w-[100%] bg-white">{name}</li>
          <li>{email}</li>
          <li className="border-b w-[100%] bg-white">
            {role === 1 ? "Admin" : "Regular User"}
          </li>
        </ul>
      </div>
    );
  };

  const adminLinks = () => {
    return (
      <div className="p-5 bg-gray-100 mx-auto mt-2 rounded border-2 border-gray-300 ml-3">
        <h4 className="bg-gray-300  border-gray-700">User Link</h4>
        <ul>
          <li className="border-b  border-gray-700 bg-white text-blue-400">
            <Link to="/create/category"> Create Category</Link>
          </li>
          <li className="border-b border-gray-700 bg-white text-blue-300">
            <Link to="/create/product">Create product</Link>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Layout title="Admin Dashboard" description="Dashboard for the GA|NGs">
      <div className="flex gap-5 mr-3">
        {adminLinks()}
        <div className="flex-1">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default Admin;
