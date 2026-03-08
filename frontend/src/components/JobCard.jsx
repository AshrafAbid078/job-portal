import React from "react";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const daysAgo = job?.createdAt
    ? Math.floor(
        (Date.now() - new Date(job.createdAt)) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="border border-base-300 rounded-xl p-4 sm:p-5 bg-base-100 shadow-sm hover:shadow-lg transition">
      
      <div className="flex flex-col sm:flex-row gap-4">

        {/* Left Content */}
        <div className="flex-1">
          <div className="mb-1">
            <h3 className="text-sm font-semibold text-gray-700">
              {job.company.name}
            </h3>
            <p className="text-xs text-gray-500">{job.location}</p>
          </div>

          <h2 className="text-lg sm:text-xl font-bold mb-2">
            {job.title}
          </h2>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-outline badge-info">
              {job.jobType}
            </span>
            <span className="badge badge-outline badge-success">
              Experience {job.experience || 0}y
            </span>
            <span className="badge badge-outline badge-warning">
              {job.salary / 1000}K
            </span>
          </div>

          <Link
            to={`/jobs/job-details/${job?._id}`}
            className="inline-block"
          >
            <button className="btn btn-sm border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white rounded-md transition">
              View Details
            </button>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex sm:flex-col flex-row sm:items-end items-center justify-between gap-3">
          <span className="text-xs text-gray-500 whitespace-nowrap">
            Posted{" "}
            {daysAgo === 0
              ? "Today"
              : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`}
          </span>

          <button
            className="p-2 rounded-full border hover:bg-gray-200 transition"
            title="Save job"
          >
            <Bookmark size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default JobCard;
