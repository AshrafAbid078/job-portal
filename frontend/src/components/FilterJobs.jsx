import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/JobSlice";

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="border border-base-200 rounded-xl p-5 bg-base-100 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 border-b border-gray-300">
        Filter Jobs
      </h2>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Job Type</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-neutral"
              checked={selectedValue === "Full-time"}
              onChange={() => changeHandler("Full-time")}
            />
            Full Time
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-neutral"
              checked={selectedValue === "Part Time"}
              onChange={() => changeHandler("Part Time")}
            />
            Part Time
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-neutral"
              checked={selectedValue === "Internship"}
              onChange={() => changeHandler("Internship")}
            />
            Internship
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-neutral"
              checked={selectedValue === "Onsite"}
              onChange={() => changeHandler("Onsite")}
            />
            Onsite
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-neutral"
              checked={selectedValue === "Remote"}
              onChange={() => changeHandler("Remote")}
            />
            Remote
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Location</h3>
        <select
          className="select select-bordered select-sm w-full cursor-pointer"
          onChange={(e) => changeHandler(e.target.value)}
        >
          <option value="">All</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Mymensingh">Mymensingh</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Experience</h3>
        <select
          className="select select-bordered select-sm w-full cursor-pointer"
          onChange={(e) => changeHandler(e.target.value)}
        >
          <option value="">All</option>
          <option value="0">0-1y</option>
          <option value="2">2-3y</option>
          <option value="4">4y+</option>
        </select>
      </div>

    </div>
  );
};

export default FilterCard;
