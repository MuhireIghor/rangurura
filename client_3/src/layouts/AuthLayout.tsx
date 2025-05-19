import Logo from "components/atoms/Logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding and info */}
      <div className="hidden md:flex md:w-1/2 bg-primary p-8 text-white flex-col justify-between">
        <div>
          <Logo className="text-white " showText />

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Your Voice Matters</h1>
            <p className="text-lg opacity-90">
              Join our platform to report issues, track progress, and help
              improve your community.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Citizen Engagement</h3>
                <p className="opacity-75 text-sm">
                  Submit and track your complaints easily
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Secure Platform</h3>
                <p className="opacity-75 text-sm">
                  Your data is protected and private
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Transparent Process</h3>
                <p className="opacity-75 text-sm">
                  Follow the progress of your complaints
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm opacity-75">
          © {new Date().getFullYear()} Rangurura. All rights reserved.
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-6 bg-light-white">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8">
            <Logo className="text-primary" showText />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
