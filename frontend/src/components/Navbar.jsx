import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageCircle, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-black border-b border-red-700 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-opacity-80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-red-900/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-red-500" />
              </div>
              <h1 className="text-lg font-bold text-red-500">Talken</h1>
            </Link>
          </div>

          {/* Navigation Section */}
          <div className="flex items-center gap-4">
            <Link
              to="/settings"
              className="btn btn-sm gap-2 bg-red-600 hover:bg-red-700 text-black border-none"
            >
              <Settings className="w-4 h-4 text-black" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm gap-2 bg-red-600 hover:bg-red-700 text-black border-none"
                >
                  <User className="w-5 h-5 text-black" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="btn btn-sm gap-2 bg-red-600 hover:bg-red-700 text-black border-none"
                  onClick={logout}
                >
                  <LogOut className="w-5 h-5 text-black" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
