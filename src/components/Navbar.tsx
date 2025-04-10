
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
    <nav className="bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Film className="h-6 w-6 text-ticket-purple" />
          <span className="text-xl font-bold bg-gradient-to-r from-ticket-purple to-ticket-secondary bg-clip-text text-transparent">
            TicketVerse
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700">
                Welcome, {user?.name || "User"}
              </span>
              <Link to="/movies">
                <Button variant="outline" className="border-ticket-purple text-ticket-purple hover:bg-ticket-purple hover:text-white">
                  Browse Movies
                </Button>
              </Link>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-ticket-purple hover:bg-ticket-secondary transition-colors">
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
