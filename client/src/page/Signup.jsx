import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';
import i2itLogo from "../img/i2itLogo.png"
export default function Signup() {
  const { storeTokenLocalStorage } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isOtpVerify, setIsOtpVerify] = useState(false);
  const [serverOtp, setServerOtp] = useState("");
  const [OtpInput, setOtpInput] = useState("");

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const verifyOtp = () => {
    if (OtpInput === serverOtp) {
      setIsOtpVerify(true);
      toast.success("OTP verified");
    } else {
      toast.error("Invalid OTP");
    }
  };

  const handleVerifyEmailButton = async () => {
    let inputEmail = userData.email;
    if (inputEmail === "" || !inputEmail.endsWith("@students.isquareit.edu.in")) {
      toast.error("Please use college email ID");
    } else {
      setIsValidEmail(true);
      toast.success("Check your email and enter OTP");
      try {
        const response = await fetch("https://i2it-confessions-server.onrender.com/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: inputEmail })
        });
        const res_data = await response.json();
        setServerOtp(res_data.otp);
      } catch (error) {
        toast.error("Please try again")
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = userData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    try {
      const response = await fetch("https://i2it-confessions-server.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const res_data = await response.json();
      if (response.ok) {
        storeTokenLocalStorage(res_data.token);
        toast.success("Successfully registered");
        navigate("/confessions");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <img
              src={i2itLogo}
              alt="Logo"
              className="mx-auto w-20 h-20 rounded-xl "
            />
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  College Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInput}
                    disabled={isValidEmail}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmailButton}
                    disabled={isOtpVerify}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-md text-sm font-medium transition duration-200 ${
                      isOtpVerify 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                  >
                    {isOtpVerify ? '✓ Verified' : 'Verify Email'}
                  </button>
                </div>
              </div>

              {isValidEmail && !isOtpVerify && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={OtpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter OTP"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Verify
                  </button>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValidEmail || !isOtpVerify}
              className={`w-full py-3 rounded-lg font-medium transition duration-300 transform hover:-translate-y-0.5 ${
                (!isValidEmail || !isOtpVerify)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700'
              }`}
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}