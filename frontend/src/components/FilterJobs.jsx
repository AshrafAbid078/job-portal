import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/JobSlice";

const FilterCard = () => {
  const dispatch = useDispatch();

  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    dispatch(setSearchedQuery({ jobType, location, experience }));
  }, [jobType, location, experience, dispatch]);

  return (
    <div className="border border-base-200 rounded-xl p-5 bg-base-100 shadow-sm">

      <h2 className="text-lg font-semibold mb-4 border-b border-gray-300">
        Filter Jobs
      </h2>

      {/* Job Type */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Job Type</h3>

        <div className="space-y-2">

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="jobType"
              className="radio radio-sm"
              onChange={() => setJobType("Full-time")}
            />
            Full Time
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="jobType"
              className="radio radio-sm"
              onChange={() => setJobType("Part Time")}
            />
            Part Time
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="jobType"
              className="radio radio-sm"
              onChange={() => setJobType("Internship")}
            />
            Internship
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="jobType"
              className="radio radio-sm"
              onChange={() => setJobType("Onsite")}
            />
            Onsite
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="jobType"
              className="radio radio-sm"
              onChange={() => setJobType("Remote")}
            />
            Remote
          </label>

        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Location</h3>

        <select
          className="select select-bordered select-sm w-full"
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Mymensingh">Mymensingh</option>
        </select>
      </div>

      {/* Experience */}
      <div>
        <h3 className="font-medium mb-2">Experience</h3>

        <select
          className="select select-bordered select-sm w-full"
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="">All</option>
          <option value="1">0-1y</option>
          <option value="3">2-3y</option>
          <option value="5">4y+</option>
        </select>
      </div>

    </div>
  );
};

export default FilterCard;