import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";
import { FaArrowLeft } from "react-icons/fa";
import { logout } from "../app/features/authSlice";
import { useDispatch } from "react-redux";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const [activeTab, setActiveTab] = useState(pathname);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });


  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          } ${variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : " shadow-sm"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <FaArrowLeft />
          </button>

          {/* Logo */}
          <NavLink end to="/dashboard" className="block">
            <img src={Logo} alt="Logo" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          <div>
            <ul className="mt-3">
              {/* Dashboard */}
              <NavLink
                to="/dashboard"
                className={`flex items-center gap-2 mb-2 px-4 py-2 rounded-md transition ${activeTab === "/dashboard"
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-100 bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Dashboard
                </span>
              </NavLink>

              {/* Animals */}
              <NavLink
                to="/animals"
                className={`flex items-center gap-2 mb-2 px-4 py-2 rounded-md transition ${activeTab === "/animals"
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-100 bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Animals
                </span>
              </NavLink>

              
              {/* Add Feed */}
              <NavLink
                to="/feeds"
                className={`flex items-center gap-2 mb-2 px-4 py-2 rounded-md transition ${activeTab === "/feeds"
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-100 bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Feed
                </span>
              </NavLink>

      {/* Meditation */}
              <NavLink
                to="/meditation"
                className={`flex items-center gap-2 mb-2 px-4 py-2 rounded-md transition ${activeTab === "/meditation"
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-100 bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Meditation
                </span>
              </NavLink>

              {/* add flock */}
              <NavLink
                to="/flock"
                className={`flex items-center gap-2 mb-2 px-4 py-2 rounded-md transition ${activeTab === "/flock"
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-100 bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Add Flock
                </span>
              </NavLink>

              {/* Feed Stock */}
              <NavLink
                to="/feed-stock"
                className={`flex items-center gap-2 mb-2 px-4 py-2 rounded-md transition ${activeTab === "/feed-stock"
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-100 bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Add Feed Stock
                </span>
              </NavLink>

              {/* reports */}
              <NavLink
                to="/reports"
                className={`flex items-center gap-2 mb-2 px-4 py-2 rounded-md transition ${activeTab === "/reports"
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-100 bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Reports
                </span>
              </NavLink>

                  {/* Profile */}
              <NavLink
                to="/profile"
                className={`flex items-center gap-2 mb-2 px-4 py-2 rounded-md transition ${activeTab === "/profile"
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-100 bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  My Profile
                </span>
              </NavLink>


              {/* Logout */}
              <NavLink
                onClick={handleLogout}
                className={`flex items-center gap-2 mb-2 px-4 py-2 rounded-md transition ${activeTab === "/logout"
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-100 bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200" onClick={handleLogout}>
                  Logout
                </span>
              </NavLink>

            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
