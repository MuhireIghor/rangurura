/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import Logo from "./atoms/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector(({ auth }: { auth: any }) => ({
    user: auth.user,
  }));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getDashboardLink = () => {
    if (!user) return "/auth/login";
    return user?.role === "CITIZEN" ? "/citizen/dashboard" : "/admin/dashboard";
  };

  return (
    <header className="bg-white border-b border-border-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo className="text-primary" showText={true} />

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-dark-gray hover:text-primary font-medium"
            >
              Home
            </Link>
            <Link
              to="/onboarding"
              className="text-dark-gray hover:text-primary font-medium"
            >
              How It Works
            </Link>
            <Link
              to="#"
              className="text-dark-gray hover:text-primary font-medium"
            >
              About
            </Link>
            <Link
              to="#"
              className="text-dark-gray hover:text-primary font-medium"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link
                to={getDashboardLink()}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-primary hover:text-secondary font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/auth/signup"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-dark-gray hover:text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border-gray">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-dark-gray hover:text-primary font-medium"
              >
                Home
              </Link>
              <Link
                to="/onboarding"
                className="text-dark-gray hover:text-primary font-medium"
              >
                How It Works
              </Link>
              <Link
                to="#"
                className="text-dark-gray hover:text-primary font-medium"
              >
                About
              </Link>
              <Link
                to="#"
                className="text-dark-gray hover:text-primary font-medium"
              >
                Contact
              </Link>
            </nav>

            <div className="flex flex-col space-y-3">
              {user ? (
                <Link
                  to={getDashboardLink()}
                  className="bg-primary text-white px-4 py-2 rounded-md text-center hover:bg-secondary transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="bg-primary text-white px-4 py-2 rounded-md text-center hover:bg-secondary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="border border-primary text-primary px-4 py-2 rounded-md text-center hover:bg-light-white transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
