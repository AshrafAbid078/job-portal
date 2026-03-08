import React, { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "../Hooks/useGetAllSingleCompany";
import { COMPANY_API_END_POINT } from "../Utils/constant";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const CompanyDetails = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-base-200 px-4 py-10">
        <div className="max-w-3xl mx-auto bg-base-100 rounded-2xl shadow p-8">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => navigate("/admin/companies")}
              className="btn btn-ghost btn-sm gap-2"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-xl font-bold">Company Setup</h1>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Company Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Website</span>
                </label>
                <input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">E-mail</span>
                </label>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Company Logo</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="file-input file-input-bordered w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn w-full ${
                loading
                  ? "btn-disabled"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? "Updating..." : "Update Company"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
