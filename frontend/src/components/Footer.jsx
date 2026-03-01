import React from "react";
import { Facebook, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-20 md:mt-5 sm:mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-orange-500">JobPortal</h2>
          <p className="text-sm text-gray-600 mt-3 max-w-sm mx-auto sm:mx-0">
            Find your dream job or hire the best talent.
            Simple, fast & reliable job platform.
          </p>

          <div className="flex justify-center sm:justify-start gap-4 mt-4">
            <a className="hover:text-orange-500 cursor-pointer">
              <Facebook size={20} />
            </a>
            <a className="hover:text-orange-500 cursor-pointer">
              <Linkedin size={20} />
            </a>
            <a className="hover:text-orange-500 cursor-pointer">
              <Twitter size={20} />
            </a>
            <a className="hover:text-orange-500 cursor-pointer">
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Job Seekers */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold text-lg mb-4">For Job Seekers</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">Browse Jobs</li>
            <li className="hover:text-orange-500 cursor-pointer">Job Categories</li>
            <li className="hover:text-orange-500 cursor-pointer">Saved Jobs</li>
            <li className="hover:text-orange-500 cursor-pointer">Applied Jobs</li>
          </ul>
        </div>

        {/* Employers */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold text-lg mb-4">For Employers</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">Post a Job</li>
            <li className="hover:text-orange-500 cursor-pointer">Manage Jobs</li>
            <li className="hover:text-orange-500 cursor-pointer">View Applicants</li>
            <li className="hover:text-orange-500 cursor-pointer">Recruiter Dashboard</li>
          </ul>
        </div>

        {/* Company */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">About Us</li>
            <li className="hover:text-orange-500 cursor-pointer">Contact</li>
            <li className="hover:text-orange-500 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-orange-500 cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-base-300 py-4 text-center text-sm text-gray-500 px-4">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
