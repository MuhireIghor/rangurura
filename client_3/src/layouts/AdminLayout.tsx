"use client";

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Home,
  FileText,
  Users,
  BarChart,
  User,
  LogOut,
  Menu,
  Bell,
  X,
} from "lucide-react";
import { logout } from "utils/auth";
import { toggleSidebar } from "../redux/slices/ui";
import Logo from "components/atoms/Logo";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: any) => state.auth);
  const { sidebarOpen } = useSelector(({ ui }: { ui: any }) => ({
    sidebarOpen: ui.sidebarOpen,
  }));
  const dispatch = useDispatch();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    {
      path: "/admin/complaints",
      label: "Complaints",
      icon: <FileText size={20} />,
    },
    { path: "/admin/users", label: "Users", icon: <Users size={20} /> },
    {
      path: "/admin/analytics",
      label: "Analytics",
      icon: <BarChart size={20} />,
    },
    { path: "/admin/profile", label: "My Profile", icon: <User size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-light-white">
      {/* Sidebar for desktop */}
      <aside
        className={`bg-white fixed inset-y-0 z-50 flex flex-col border-r border-border-gray transition-all duration-300 ease-in-out lg:relative ${
          sidebarOpen ? "left-0 w-64" : "-left-64 lg:left-0 lg:w-20"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border-gray">
          <Logo
            className="text-primary"
            showText={sidebarOpen}
            url="/admin/dashboard"
          />
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="hidden lg:block text-gray hover:text-primary"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-dark-gray hover:bg-light-white"
                    }`
                  }
                >
                  {item.icon}
                  {sidebarOpen && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border-gray p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-dark-gray hover:bg-light-white"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border-gray">
          <NavLink to="/admin/dashboard" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 2H2v10h10V2z" />
              <path d="M12 12h10v10H12V12z" />
              <path d="M12 22v-9.8" />
              <path d="M12 12V2.2" />
              <path d="M2 12h10" />
              <path d="M12 12h10" />
            </svg>
            <span className="font-bold text-primary">CitizenConnect</span>
          </NavLink>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray hover:text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-dark-gray hover:bg-light-white"
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border-gray p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-dark-gray hover:bg-light-white"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-border-gray h-16 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray hover:text-primary lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-black">
              {location.pathname.includes("/dashboard") && "Admin Dashboard"}
              {location.pathname.includes("/complaints") &&
                !location.pathname.includes("/complaints/") &&
                "Complaint Management"}
              {location.pathname.includes("/complaints/") &&
                "Complaint Details"}
              {location.pathname.includes("/users") && "User Management"}
              {location.pathname.includes("/analytics") && "Analytics"}
              {location.pathname.includes("/profile") && "Admin Profile"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-gray hover:text-primary">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red text-[10px] text-white">
                5
              </span>
            </button>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-black">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
