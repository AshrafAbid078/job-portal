import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../Hooks/useGetAllAdminJobs";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "../redux/JobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold">Manage Jobs</h1>

          <button
            className="btn bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => navigate("/admin/jobs/create")}
          >
            + New Job
          </button>
        </div>
        <div className="bg-base-100 rounded-2xl shadow p-6">
          <div className="form-control mb-5 max-w-sm">
            <input
              type="text"
              placeholder="Filter by name or role"
              className="input input-bordered w-full"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
