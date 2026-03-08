import React, { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { JOBAPI_END_POINT } from "../Utils/constant";
import { setSingleJob } from "../redux/JobSlice";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const AdminJobUpdate = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleJob } = useSelector((store) => store.job);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    salary: "",
    experience: "",
    location: "",
    jobType: "",
    requirements: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${JOBAPI_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchJob();
  }, [jobId, dispatch]);

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        salary: singleJob.salary || "",
        experience: singleJob.experience || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        requirements: singleJob.requirements?.join(", ") || "",
      });
    }
  }, [singleJob]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      ...input,
      requirements: input.requirements
        .split(",")
        .map((skill) => skill.trim()),
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `${JOBAPI_END_POINT}/update/${jobId}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-base-200 px-4 py-10">
        <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow p-8">

          <div className="flex items-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              className="btn btn-ghost btn-sm gap-2"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-xl font-bold">Update Job</h1>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Job Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeHandler}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Job Type</span>
                </label>
                <select
                  name="jobType"
                  value={input.jobType}
                  onChange={changeHandler}
                  className="select select-bordered w-full"
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Salary</span>
                </label>
                <input
                  type="number"
                  name="salary"
                  value={input.salary}
                  onChange={changeHandler}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Experience (years)</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  value={input.experience}
                  onChange={changeHandler}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeHandler}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Requirements</span>
                </label>
                <input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeHandler}
                  placeholder="React, Node, MongoDB"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea
                  name="description"
                  value={input.description}
                  onChange={changeHandler}
                  className="textarea textarea-bordered w-full"
                  rows={4}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn w-full ${
                loading
                  ? "btn-disabled"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? "Updating..." : "Update Job"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminJobUpdate;
