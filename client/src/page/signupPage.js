import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import i2itLogo from "../img/i2itLogo.png"
import { useAuth } from '../store/auth';
export default function Signup() {
  const { storeTokenLocalStorage } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isOtpVerify, setIsOtpVerify] = useState(false);
  const [serverOtp, setServerOtp] = useState("");

  const [OtpInput, setOtpInput] = useState("");
  const verifyOtp = () => {
    if (OtpInput === serverOtp) {
      setIsOtpVerify(true);
      toast.success("OTP verified");
    } else {
      toast.error("Invalid OTP");
    }
  }
  const handleVerifyEmailButton = async () => {
    let inputEmail = userData.email;

    if (inputEmail === "" || !inputEmail.endsWith("@students.isquareit.edu.in")) {
      toast.error("Please use collage email id");
    } else {
      setIsValidEmail(true);
      toast.success("check your email and enter OTP");
      const { email } = userData;
      try {
        const response = await fetch("/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });
        const res_data = await response.json();
        const sOTP = await res_data.otp;
        setServerOtp(sOTP);
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
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const res_data = await response.json();
      if (response.ok) {
        storeTokenLocalStorage(res_data.token);
        toast.success("Successfully registered ");
        navigate("/confessions");
      } else {
        console.log(res_data.extraDetails);
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={i2itLogo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Signup in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" >
            <div >
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 flex items-center justify-between">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="email"
                  value={userData.username}
                  onChange={handleInput}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div >
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 flex items-center justify-between">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userData.email}
                  onChange={handleInput}
                  disabled={isValidEmail}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

              </div>
              <button
                style={{
                  marginLeft: "73%",
                  color: "green",
                  marginTop: "0.5rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.25rem",
                }}
                onClick={handleVerifyEmailButton}
              >
                {isOtpVerify ? 'Verified' : 'Verify Email'}
              </button>

            </div>
            {isValidEmail ? (<>
              <input
                type="text"
                name="otp"
                id="otp"
                placeholder="Enter OTP"
                autoComplete="off"
                style={{
                  width: "116px",
                  position: "absolute",
                  marginTop: "-15px",
                  borderRadius: "13px",
                  outline: "none"
                }}
                value={OtpInput}
                onChange={(e) => {
                  setOtpInput(e.target.value);
                }}
                disabled={isOtpVerify}
              />

              <button style={{
                position: 'absolute',
                marginTop: '-11px',
                marginLeft: '122px',
                border: '2px solid gray',
                backgroundColor: '#a4a8ae',
                padding: '3px',
                borderRadius: '11px',
                outline: 'none',
                WebkitTextStrokeWidth: 'thin'
              }
              } onClick={verifyOtp}
                disabled={isOtpVerify} >Submit</button></>) : null}

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={userData.password}
                  onChange={handleInput}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={userData.confirmPassword}
                  onChange={handleInput}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!isValidEmail || !isOtpVerify}
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have account ?{' '}
            <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div >
    </>
  );
}