
import React, { useEffect } from "react";
import JobCard from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/JobSlice";
import useGetAllJobs from "../Hooks/useGetAllJobs";
import {motion} from "framer-motion";

const Browse = () => {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Available Jobs
          <span className="text-orange-500 ml-2">
            ({allJobs.length})
          </span>
        </h1>
        <p className="text-gray-600 mt-1">
          Explore jobs that match your skills
        </p>
      </div>

      {allJobs.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">No jobs found 😕</h2>
          <p className="text-gray-500">
            Try searching with different keywords
          </p>
        </div>
      )}

      {allJobs.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allJobs.map((job) => (
            <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job._id}
                >
                  <JobCard job={job} />
                </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;
