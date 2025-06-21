import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-500 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} MyCompany. All rights reserved.</p>
        <ul className="flex space-x-4 text-sm">
          <li>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
