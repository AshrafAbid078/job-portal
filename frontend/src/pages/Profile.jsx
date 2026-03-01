import React, { useState } from "react";
import { Pen, Mail, FileText } from "lucide-react";
import AppliedJobTable from "../components/AppliedJobTable";
import Navbar from "../components/Navbar";
import UpdateProfile from "../components/UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../Hooks/useGetAllApliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-base-200 py-8 px-4">
        <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">

          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="avatar">
                <div className="w-24 sm:w-28 rounded-full ring ring-orange-400 ring-offset-2">
                  <img
                    alt="profile"
                    src={
                      user?.profile?.profilePicture ||
                      "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    }
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {user?.fullName || "User"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {user?.profile?.designation || "No designation available."}
                </p>
              </div>
            </div>

            <button
              className="btn btn-outline btn-sm gap-2 self-center md:self-auto"
              onClick={() => setOpen(true)}
            >
              <Pen size={16} /> Edit Profile
            </button>
          </div>

          <div className="divider my-6" />

          {/* About */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {user?.profile?.bio || "No bio available."}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="flex items-center justify-start  gap-2 text-gray-600 text-sm sm:text-base">
              <Mail size={15} /> {user?.email || "No email available."}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="badge badge-outline border-orange-500 text-orange-500"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-600 text-sm">
                  No skills added yet.
                </p>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="flex justify-center sm:justify-end mt-6">
            {user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-md"
              >
                <FileText size={18} />
                View Resume
              </a>
            ) : (
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FileText size={18} />
                Resume not uploaded
              </div>
            )}
          </div>

          <div className="divider my-6" />

          {/* Applied Jobs */}
          <div className="bg-white rounded-2xl max-w-4xl mx-auto border border-gray-100 shadow-sm p-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Applied Jobs
            </h2>
            <AppliedJobTable />
          </div>
        </div>

        <UpdateProfile open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
