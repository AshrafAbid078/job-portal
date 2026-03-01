import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USERAPI_END_POINT } from "../Utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {loading , user} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.post(`${USERAPI_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Login Successful!");
        dispatch(setUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <form className="w-full max-w-md" onSubmit={submitHandler}>
        <div className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-lg ">
          <h2 className="text-3xl font-semibold text-center mb-4 text-orange-500">
            Welcome Back
          </h2>
          <h4 className="text-center mb-4">Login to your account</h4>
          {/* Email Field */}
          <div className="flex flex-col mb-4">
            <label className="label">
              <span className="font-semibold">Email</span>
            </label>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                value={input.email}
                name="email"
                onChange={changeHandler}
                placeholder="mail@site.com"
                required
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          {/* Password Field */}
          <div className="flex flex-col mb-4">
            <label className="label">
              <span className="font-semibold">Password</span>
            </label>

            <label className="input flex items-center gap-2">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </g>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                value={input.password}
                name="password"
                onChange={changeHandler}
                required
                placeholder="Password"
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="opacity-60 hover:opacity-100"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </label>
          </div>
          {/* Button */}
          {loading ? (
            <button className=" w-full mt-4">
              <span className="loading loading-spinner loading-sm"></span>{" "}
              Please wait...
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-neutral w-full mt-4 hover:bg-neutral-700"
            >
              Login
            </button>
          )}

          {/* Footer */}
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <span className="text-blue-600 link link-hover cursor-pointer">
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
