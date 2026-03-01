import React, { useEffect, useState } from "react";
import FilterJobs from "../components/FilterJobs";
import JobCard from "../components/JobCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (!searchedQuery) {
      setFilterJobs(allJobs);
      return;
    }

    const query = searchedQuery.toLowerCase();

    const filtered = allJobs.filter((job) => (
      job.title?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.jobType?.toLowerCase().includes(query) ||
      String(job.experience)?.includes(query) ||
      String(job.salary)?.includes(query)
    ));

    setFilterJobs(filtered);
  }, [allJobs, searchedQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="btn btn-outline w-full"
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Filter */}
        <div
          className={`md:w-1/4 ${
            showFilter ? "block" : "hidden"
          } md:block`}
        >
          <FilterJobs />
        </div>

        {/* Jobs */}
        <div className="flex-1">
          {filterJobs.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No jobs available
            </p>
          ) : (
            <div className="pb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.3 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
