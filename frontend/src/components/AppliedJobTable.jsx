import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">

        <caption className="caption-bottom py-4">
          A list of your applied jobs
        </caption>

        <thead>
          <tr>
            <th>Date</th>
            <th>Job Role</th>
            <th>Company</th>
            <th className="text-right">Status</th>
          </tr>
        </thead>

        <tbody>
          {allAppliedJobs.length <= 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-6">
                You haven't applied any job yet.
              </td>
            </tr>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <tr key={appliedJob._id}>
                <td>
                  {appliedJob?.createdAt?.split("T")[0]}
                </td>

                <td>
                  {appliedJob?.job?.title}
                </td>

                <td>
                  {appliedJob?.job?.company?.name}
                </td>

                <td className="text-right">
                  <span
                    className={`badge text-white ${
                      appliedJob?.status === "rejected"
                        ? "badge-error"
                        : appliedJob?.status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {appliedJob?.status?.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default AppliedJobTable;