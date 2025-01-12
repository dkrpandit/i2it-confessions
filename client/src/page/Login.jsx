import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';
import i2itLogo from "../img/i2itLogo.png"
export default function Login() {
  const navigate = useNavigate();
  const { storeTokenLocalStorage } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://i2it-confessions-server.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usernameOrEmail: userData.email,
          password: userData.password
        })
      });

      const res_data = await response.json();
      if (response.ok) {
        storeTokenLocalStorage(res_data.token);
        navigate("/confessions");
        toast.success(res_data.message);
      } else {
        toast.error(res_data.message)
      }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <img
              src={i2itLogo}
              alt="Logo"
              className="mx-auto w-20 h-20 rounded-xl"
            />
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500">Please sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Email / Username
                </label>
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg py-3 font-medium shadow-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:-translate-y-0.5"
            >
              Sign in
            </button>
          </form>
          <p className="text-center text-gray-600">
            New member?{' '}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}