import React, { useMemo } from "react";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText = "" } = useSelector(
    (store) => store.job
  );

  const navigate = useNavigate();

  const filteredJobs = useMemo(() => {
    if (!searchJobByText) return allAdminJobs;

    const q = searchJobByText.toLowerCase();
    return allAdminJobs.filter(
      (job) =>
        job?.title?.toLowerCase().includes(q) ||
        job?.company?.name?.toLowerCase().includes(q)
    );
  }, [allAdminJobs, searchJobByText]);

  const goEdit = (id) => navigate(`/admin/jobs/${id}/update`);
  const goApplicants = (id) => navigate(`/admin/jobs/${id}/applicants`);

  return (
    <section className="mt-6">

      {/* ===================== DESKTOP TABLE ===================== */}
      <div className="hidden md:block bg-base-100 rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Date</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job._id}>
                <td className="font-medium">
                  {job?.company?.name || "N/A"}
                </td>
                <td>{job?.title}</td>
                <td className="text-sm text-gray-500">
                  {formatDate(job?.createdAt)}
                </td>

                <td className="text-right">
                  <div className="dropdown dropdown-end">
                    <button className="btn btn-ghost btn-sm">
                      <MoreHorizontal size={18} />
                    </button>

                    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
                      <li onClick={() => goEdit(job._id)}>
                        <span className="flex items-center gap-2">
                          <Edit2 size={16} /> Edit
                        </span>
                      </li>
                      <li onClick={() => goApplicants(job._id)}>
                        <span className="flex items-center gap-2">
                          <Eye size={16} /> Applicants
                        </span>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No jobs found
          </p>
        )}
      </div>

      {/* ===================== MOBILE CARDS ===================== */}
      <div className="md:hidden space-y-4">
        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No jobs found
          </p>
        )}

        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-base-100 rounded-xl p-4 shadow border border-gray-100"
          >
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="font-semibold text-base">
                  {job?.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {job?.company?.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Posted on {formatDate(job?.createdAt)}
                </p>
              </div>

              <div className="dropdown dropdown-end">
                <button className="btn btn-ghost btn-sm">
                  <MoreHorizontal size={18} />
                </button>

                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
                  <li onClick={() => goEdit(job._id)}>
                    <span className="flex items-center gap-2">
                      <Edit2 size={16} /> Edit
                    </span>
                  </li>
                  <li onClick={() => goApplicants(job._id)}>
                    <span className="flex items-center gap-2">
                      <Eye size={16} /> Applicants
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminJobsTable;
