import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APPLICANT_API_END_POINT } from "../Utils/constant";
import { setAllApplicants } from "../redux/applicationSlice";
import Navbar from "../components/Navbar";
import ApplicantsTable from "./ApplicantsTable";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICANT_API_END_POINT}/${id}/applicants`,
          { withCredentials: true },
        );
        if (res.data.success) {
          console.log(res.data);

          dispatch(setAllApplicants(res.data.applicants));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, [id, dispatch]);

const totalApplicants = applicants.length;


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-base-200 px-4 py-10">
        <div className="max-w-7xl mx-auto bg-base-100 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              Applicants
              <span className="badge badge-primary ml-3">
                {totalApplicants}
              </span>
            </h1>
          </div>
          
          <div className="overflow-x-auto">
            <ApplicantsTable />
          </div>

          {applicants.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No applicants have applied for this job yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Applicants;
