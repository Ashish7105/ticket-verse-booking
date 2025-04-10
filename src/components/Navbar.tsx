
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Film } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-slate-200 py-4 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Film className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TicketVerse
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="hidden md:block text-slate-700">
                Welcome, {user?.name || "User"}
              </span>
              <Link to="/movies">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Browse Movies
                </Button>
              </Link>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 transition-colors">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
