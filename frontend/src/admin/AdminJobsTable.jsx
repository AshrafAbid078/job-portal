import React, { useMemo } from "react";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText = "" } = useSelector(
    (store) => store.job,
  );

  const navigate = useNavigate();

  const filterJobs = useMemo(() => {
    return allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });
  }, [allAdminJobs, searchJobByText]);
  

  return (
    <div className="bg-base-100 rounded-xl shadow">
      <table className="table table-zebra w-full">
        <caption className="caption-bottom text-sm text-gray-500 py-3">
          A list of your recent posted jobs
        </caption>

        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {filterJobs.map((job) => (
            <tr key={job._id}>
              <td className="font-medium">{job?.company?.name}</td>
              <td>{job?.title}</td>
              <td className="text-sm text-gray-500">
                {job?.createdAt.split("T")[0]}
              </td>

              <td className="text-right">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-sm">
                    <MoreHorizontal size={18} />
                  </label>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                  >
                    <li onClick={() => navigate(`/admin/jobs/${job._id}/update`)}>
                      <a
                        className="flex items-center gap-2"
            
                      >
                        <Edit2 size={16} />
                        Edit
                      </a>
                    </li>

                    <li
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                    >
                      <a className="flex items-center gap-2">
                        <Eye size={16} />
                        Applicants
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filterJobs.length === 0 && (
        <div className="text-center text-gray-500 py-6">No jobs found</div>
      )}
    </div>
  );
};

export default AdminJobsTable;
