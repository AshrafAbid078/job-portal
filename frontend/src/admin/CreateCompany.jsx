import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../Utils/constant";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setSingleCompany } from "../redux/companySlice";

const CreateCompany = () => {
  const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
  const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies`);
            }
        } catch (error) {
            toast.error("Failed to create company");
            console.log(error);
        }
    }

  return (
    <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-xl bg-base-100 rounded-2xl shadow p-8">
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Create Your Company</h1>
          <p className="text-gray-500 text-sm">
            Give your company a name. You can change this later.
          </p>
        </div>

        <div className="form-control mb-8">
          <label className="label mb-2">
            <span className="label-text font-medium">Company Name : </span>
          </label>
          <br />
          <input
            type="text"
            placeholder="Microsoft, Google..."
            className="input input-bordered focus:outline-none focus:border-orange-400  w-full"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="btn btn-ghost"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </button>

          <button className="btn bg-orange-500 text-white hover:bg-orange-600"
          onClick={registerNewCompany}
          
          >
            Continue
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateCompany;
