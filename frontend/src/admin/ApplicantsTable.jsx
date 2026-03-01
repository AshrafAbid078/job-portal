import React from "react";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICANT_API_END_POINT } from "../Utils/constant";
import toast from "react-hot-toast";

const shortlistingStatus = ["accepted", "rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, applicationId) => {
    try {
      const res = await axios.put(
        `${APPLICANT_API_END_POINT}/status/${applicationId}/update`,
        { status },
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Resume</th>
            <th>Date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {applicants.map((item) => (
            <tr key={item._id}>
              <td className="font-medium">{item.applicant?.fullName}</td>

              <td>{item.applicant?.email}</td>

              <td>{item.applicant?.profile?.designation || "N/A"}</td>

              <td>
                {item.applicant?.profile?.resume ? (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                  >
                    View Resume
                  </a>
                ) : (
                  "N/A"
                )}
              </td>

              <td>
                <span>
                {item.createdAt.split("T")[0]}
                </span>
              </td>

                <td className="text-right">
                  <div className="dropdown dropdown-end dropdown-bottom">
                    <label tabIndex={0} className="btn btn-ghost btn-sm">
                      <MoreHorizontal size={18} />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 z-100"
                    >
                      {shortlistingStatus.map((status) => (
                        <li key={status}>
                          <button
                            onClick={() => statusHandler(status, item._id)}
                            className="capitalize"
                          >
                            {status}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      {applicants.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No applicants found
        </div>
      )}
    </div>
  );
};

export default ApplicantsTable;
