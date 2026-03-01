import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../Hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../redux/CompanySlice";

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Companies</h1>

          <button
            className="btn bg-orange-500 text-white hover:bg-orange-600 rounded-md"
            onClick={() => navigate("/admin/companies/create")}
          >
            + New Company
          </button>
        </div>
        <div className="bg-base-100 rounded-2xl shadow p-6">
          <div className="form-control mb-5 max-w-sm">
            <input
              type="text"
              placeholder="Filter by company name"
              className="input input-bordered w-full"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
