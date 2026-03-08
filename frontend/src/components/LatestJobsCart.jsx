import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LatestJobsCart = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="border border-base-300 bg-base-100 p-5 rounded-xl shadow-sm hover:shadow-xl transition duration-300" onClick={()=> navigate(`jobs/job-details/${job._id}`)}>
      
      <div className="mb-3">
        <h1 className="text-lg font-semibold text-gray-800">
          {job.company.name}
        </h1>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {job.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">
          {job.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="badge badge-outline badge-info">{job.jobType}</span>
        <span className="badge badge-outline badge-success">Experience {job.experience}y</span>
        <span className="badge badge-outline badge-warning">{job.salary/1000}K</span>
      </div>

      <div className="flex justify-end">
        <button className="btn btn-sm border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white rounded-md">
          <Link to={`/jobs/job-details/${job._id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
};

export default LatestJobsCart;
