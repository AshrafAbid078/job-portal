import React from "react";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
    const navigate = useNavigate();
    
    const filterCompany = companies.length >= 0 && companies.filter((company)=>{
        if(!searchCompanyByText){
            return true
        };
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

    });
  return (
    <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
      <table className="table table-zebra w-full">
        <caption className="caption-bottom text-sm text-gray-500 py-3">
          A list of your recent registered companies
        </caption>

        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {filterCompany?.map((company) => (
            <tr key={company._id}>
              <td>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={company.logo}
                      alt={company.name}
                    />
                  </div>
                </div>
              </td>

              <td className="font-medium">{company.name}</td>

              <td className="text-sm text-gray-500">
                {company.createdAt.split("T")[0]}
              </td>

              <td className="text-right">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-sm">
                    <MoreHorizontal size={18} />
                  </label>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36"
                  >
                    <li
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}/update`)
                      }
                    >
                      <a className="flex items-center gap-2">
                        <Edit2 size={16} />
                        Edit
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filterCompany?.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          No companies found
        </div>
      )}
    </div>
  );
};

export default CompaniesTable;
