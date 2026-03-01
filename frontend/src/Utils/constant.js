const BASE_URL = import.meta.env.VITE_API_URL;

const USERAPI_END_POINT = `${BASE_URL}/api/v1/users`;
const JOBAPI_END_POINT = `${BASE_URL}/api/v1/jobs`;
const APPLICANT_API_END_POINT = `${BASE_URL}/api/v1/applications`;
const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/companies`;

export {
  USERAPI_END_POINT,
  JOBAPI_END_POINT,
  APPLICANT_API_END_POINT,
  COMPANY_API_END_POINT
};