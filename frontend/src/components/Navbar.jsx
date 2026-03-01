import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USERAPI_END_POINT } from "../Utils/constant";
import { setUser } from "../redux/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const user = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      const res = await axios.get(USERAPI_END_POINT + "/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="bg-base-200 border-b border-base-300">
      <div className="flex justify-between items-center p-4 mx-auto max-w-7xl">

        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/">
            Job <span className="text-orange-400">Portal</span>
          </Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-9">
          <ul className="flex font-medium items-center gap-5">
            {user.user && user.user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-orange-400">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-orange-400">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
                <li><Link to="/jobs" className="hover:text-orange-400">Jobs</Link></li>
                <li><Link to="/browse" className="hover:text-orange-400">Browse</Link></li>
              </>
            )}
          </ul>

          {!user.user ? (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/signup" className="btn bg-orange-400 hover:bg-orange-500 text-white">
                Signup
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-8 rounded-full">
                  <img
                    src={
                      user?.user?.profile?.profilePicture ||
                      "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    }
                    alt="profile"
                  />
                </div>
              </div>

              <div
                tabIndex={0}
                className="dropdown-content bg-base-100 rounded-box w-72 p-4 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user?.user?.profile?.profilePicture ||
                          "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                        }
                        alt="profile"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">{user?.user?.fullName}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.user?.profile?.designation}
                    </p>
                  </div>
                </div>

                <div className="divider my-2"></div>

                <div className="flex flex-col gap-4">
                  {user.user.role !== "recruiter" && (
                    <Link to="/profile" className="flex items-center gap-2">
                      <User2 size={18} /> Profile
                    </Link>
                  )}
                  <button onClick={logout} className="flex items-center gap-2">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {user.user && user.user.role === "recruiter" ? (
              <>
                <p>
                  <Link to="/admin/companies" className="hover:text-orange-400">
                    Companies
                  </Link>
                </p>
                <p>
                  <Link to="/admin/jobs" className="hover:text-orange-400">
                    Jobs
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p><Link to="/" className="hover:text-orange-400">Home</Link></p>
                <p><Link to="/jobs" className="hover:text-orange-400">Jobs</Link></p>
                <p><Link to="/browse" className="hover:text-orange-400">Browse</Link></p>
              </>
            )}

          {!user.user ? (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/signup" className="btn bg-orange-400 hover:bg-orange-500 text-white">
                Signup
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-right">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-8 rounded-full">
                  <img
                    src={
                      user?.user?.profile?.profilePicture ||
                      "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    }
                    alt="profile"
                  />
                </div>
              </div>

              <div
                tabIndex={0}
                className="dropdown-content bg-base-100 rounded-box w-72 p-4 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user?.user?.profile?.profilePicture ||
                          "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                        }
                        alt="profile"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">{user?.user?.fullName}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.user?.profile?.designation}
                    </p>
                  </div>
                </div>

                <div className="divider my-2"></div>

                <div className="flex flex-col gap-4">
                  {user.user.role !== "recruiter" && (
                    <Link to="/profile" className="flex items-center gap-2">
                      <User2 size={18} /> Profile
                    </Link>
                  )}
                  <button onClick={logout} className="flex items-center gap-2">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
