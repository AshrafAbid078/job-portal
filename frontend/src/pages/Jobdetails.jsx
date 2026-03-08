import React, { useEffect, useState } from "react";
import { MapPin, Briefcase, Clock, DollarSign, Bookmark } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APPLICANT_API_END_POINT, JOBAPI_END_POINT } from "../Utils/constant";
import axios from "axios";
import { setSingleJob } from "../redux/JobSlice";
import { toast } from "react-hot-toast";

const JobDetails = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOBAPI_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const checkApplied = async () => {
      if (!user || !jobId) return;

      try {
        const res = await axios.get(`${APPLICANT_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const applied = res.data.applications.some(
          (job) =>
            job._id === jobId 
        );
          setIsApplied(applied);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkApplied();
  }, [jobId, user]);
  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICANT_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true); 
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Apply failed");
    }
  };

  const daysAgo = singleJob?.createdAt
    ? Math.floor(
        (Date.now() - new Date(singleJob.createdAt)) / (1000 * 60 * 60 * 24),
      )
    : 0;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 shadow">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">{singleJob?.title}</h1>

            <p className="text-gray-600 text-sm flex items-center gap-2">
              {singleJob?.company?.name}
              <span className="ml-4 flex items-center gap-1">
                <Clock size={14} />
                Posted{" "}
                {daysAgo === 0
                  ? "Today"
                  : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn btn-outline btn-sm gap-2">
              <Bookmark size={16} /> Save
            </button>
          </div>
        </div>

        <div className="divider my-6" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-2 text-orange-600 font-semibold">
            <Briefcase size={18} />
            <span>{singleJob?.jobType}</span>
          </div>
          <div className="flex items-center gap-2 text-orange-600 font-semibold">
            <Clock size={18} />
            <span>{singleJob?.experience} Year</span>
          </div>
          <div className="flex items-center gap-2 text-orange-600 font-semibold">
            <DollarSign size={18} />
            <span>{singleJob?.salary / 1000}K</span>
          </div>
          <div className="flex items-center gap-2 text-orange-600 font-semibold">
            <MapPin size={18} />
            <span>{singleJob?.location}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {singleJob?.description}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Requirements</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Strong knowledge of React</li>
            <li>Experience with Tailwind CSS</li>
            <li>Basic understanding of REST APIs</li>
            <li>Problem-solving mindset</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {singleJob?.requirements?.map((skill, i) => (
              <span
                key={i}
                className="badge badge-outline border-gray-300 text-gray-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            className={`btn btn-primary  btn-lg ${
              isApplied ? "btn-disabled" : ""
            }`}
            onClick={isApplied ? undefined : applyJobHandler}
            disabled={isApplied}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
