import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { JOBAPI_END_POINT } from "../Utils/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const PostJob = () => {
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      return toast.error("Please select a company");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${JOBAPI_END_POINT}/post`,
        {
          ...input,
          salary: Number(input.salary),
          experience: Number(input.experience),
          position: Number(input.position),
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Job post failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <form
          onSubmit={submitHandler}
          className="card w-full max-w-4xl bg-base-100 shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Post a New Job
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="form-control">
              <label className="label font-semibold">Job Title :</label>
              <br />
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={changeHandler}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Location</label>
              <br />
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeHandler}
                className="input input-bordered"
                required
              />
            </div>

            <div >
              <label className="label font-semibold">Description</label>
              <br />
              <textarea
                name="description"
                value={input.description}
                onChange={changeHandler}
                className="input input-bordered "
                rows={3}
                required
              />
            </div>

            <div >
              <label className="label font-semibold">
                Requirements (comma separated)
              </label>
              <br />
              <input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeHandler}
                className="input input-bordered"
                placeholder="React, Node.js, MongoDB"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Salary</label>
              <br />
              <input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeHandler}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Job Type</label>
              <br />
              <select
                name="jobType"
                value={input.jobType}
                onChange={changeHandler}
                className="select select-bordered"
                required
              >
                <option value="">Select</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label font-semibold">Experience (Years)</label>
              <br />
              <input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeHandler}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">No. of Positions</label>
              <br />
              <input
                type="number"
                name="position"
                value={input.position}
                onChange={changeHandler}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label font-semibold">Company</label>
              <br />
              <select
                name="companyId"
                value={input.companyId}
                onChange={changeHandler}
                className="select select-bordered"
                required
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn bg-orange-500 hover:bg-orange-600 text-white w-full mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Job"
            )}
          </button>

          {companies.length === 0 && (
            <p className="text-center text-sm text-red-500 mt-4">
              *Please register a company before posting a job
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default PostJob;
