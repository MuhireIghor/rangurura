/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Home,
  PlusCircle,
  List,
  User,
  LogOut,
  Menu,
  Bell,
  X,
  Loader,
} from "lucide-react";
import { useAppDispatch } from "../redux/store";
import { decodeToken, logout } from "utils/auth";
import Logo from "components/atoms/Logo";
import { toggleSidebar } from "../redux/slices/ui";
import { getUserProfile } from "../redux/slices/auth";
import { enumToCamelCase } from "utils";

const CitizenLayout = ({ children }: { children: React.ReactNode }) => {
  const { profile, loadingUserProfile } = useSelector(({ auth }: any) => ({
    profile: auth.profile,
    loadingUserProfile: auth.loadingUserProfile,
  }));
  const { sidebarOpen } = useSelector(({ ui }: { ui: any }) => ({
    sidebarOpen: ui.sidebarOpen,
  }));
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    const { email } = decodeToken();
    dispatch(getUserProfile(email));
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      path: "/citizen/dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
    },
    {
      path: "/citizen/complaints/new",
      label: "New Complaint",
      icon: <PlusCircle size={20} />,
    },
    {
      path: "/citizen/complaints",
      label: "My Complaints",
      icon: <List size={20} />,
    },
    { path: "/citizen/profile", label: "My Profile", icon: <User size={20} /> },
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
            url="/citizen/dashboard"
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
          <Logo
            className="text-primary"
            showText={true}
            url="/citizen/dashboard"
          />
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
              {location.pathname.includes("/dashboard") && "Dashboard"}
              {location.pathname.includes("/new-complaint") &&
                "Submit New Complaint"}
              {location.pathname.includes("/my-complaints") && "My Complaints"}
              {location.pathname.includes("/profile") && "My Profile"}
              {location.pathname.includes("/complaints/") &&
                "Complaint Details"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-gray hover:text-primary">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red text-[10px] text-white">
                3
              </span>
            </button>
            {loadingUserProfile ? (
              <Loader />
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {profile?.name?.charAt(0).toUpperCase() || ""}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-black">
                    {profile?.name || ""}
                  </p>
                  <p className="text-xs text-gray">
                    {enumToCamelCase(profile.role)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default CitizenLayout;
