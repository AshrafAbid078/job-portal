import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import MainLayout from "../MainLayout";
import Jobdetails from "./pages/Jobdetails";
import Companies from "./admin/Companies";
import AdminJobs from "./admin/AdminJobs";
import CreateCompany from "./admin/CreateCompany";
import CompanyDetails from "./admin/CompanyDetails";
import AdminJobDetails from "./admin/AdminJobDetails";
import PostJob from "./admin/PostJob";
import Applicants from "./admin/Applicants";
import ProtectedRoute from "./admin/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes WITH Navbar & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="jobs/job-details/:id" element={<Jobdetails />} />
        </Route>
        {/* Admin part */}
        <Route>
          <Route path="/admin/companies" element={<ProtectedRoute><Companies/></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
          <Route path="/admin/companies/create" element={<ProtectedRoute><CreateCompany /></ProtectedRoute>} />
          <Route path="/admin/companies/:id/update" element={<ProtectedRoute><CompanyDetails /></ProtectedRoute >}/>
          <Route path="/admin/jobs/:id/update" element={<ProtectedRoute><AdminJobDetails/></ProtectedRoute >} />
          <Route path="/admin/jobs/create" element={<ProtectedRoute><PostJob/></ProtectedRoute>} />
          <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute >} />

        </Route>

        {/* Routes WITHOUT Navbar & Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
