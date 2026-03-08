import React from "react";
import LatestJobsCart from "./LatestJobsCart";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-5 sm:py-3">
      
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
        <span className="text-orange-500">Latest & Top </span>
        Jobs Openings
      </h1>

      <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg text-center max-w-3xl mx-auto">
        Explore the latest job openings from top companies. Find your dream job today!
      </p>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobsCart key={job._id} job={job} />
          ))
        ) : (
          <h1 className="text-center col-span-full text-gray-500">
            No Jobs Available
          </h1>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
