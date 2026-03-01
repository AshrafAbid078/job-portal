import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/JobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full flex justify-center py-15 bg-white">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold">
          Find Your <span className="text-orange-500">Dream Job</span>
        </h1>

        <div className="flex mt-8 bg-white shadow rounded-full px-4 py-2">
          <input
            className="flex-1 outline-none px-2"
            placeholder="Search jobs..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchJobHandler}
            className="bg-orange-500 text-white px-4 py-2 rounded-full"
          >
            <Search size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
