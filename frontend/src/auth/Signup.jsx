import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USERAPI_END_POINT } from "../Utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "applicant",
    file: "",
  });
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const navigate = useNavigate();
  const {loading,user} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    console.log(input);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${USERAPI_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.success) {
        toast.success("Registration Successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create an Account
          </h2>
          <div className="flex flex-col mb-4">
            <label className="label">
              <span className=" font-semibold">Full Name</span>
            </label>
            <label className="input">
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                value={input.fullName}
                name="fullName"
                onChange={changeHandler}
                required
                placeholder="Username"
              />
            </label>
          </div>
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
          <div className="flex flex-col mb-4">
            <label className="label">
              <span className="font-semibold text-base">Register As</span>
            </label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer rounded-lg px-4 py-2 hover:bg-base-200 transition">
                <input
                  type="radio"
                  name="role"
                  value="applicant"
                  checked={input.role === "applicant"}
                  onChange={changeHandler}
                  className="radio radio-primary"
                />
                <span className="font-medium">Applicant</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer rounded-lg px-4 py-2 hover:bg-base-200 transition">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeHandler}
                  className="radio radio-primary"
                />
                <span className="font-medium">Recruiter</span>
              </label>
            </div>
          </div>
          {/* Profile */}
          <div className="flex flex-col mb-4">
            <label className="label">
              <span className="font-semibold text-base">Profile</span>
            </label>
            <input
              type="file"
              onChange={changeFileHandler}
              className="file-input file-input-ghost w-full "
            />
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
              Sign Up
            </button>
          )}
          {/* Footer */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span className="text-blue-600 link link-hover cursor-pointer">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
