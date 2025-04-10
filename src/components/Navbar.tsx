
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Film, Search, Menu, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("Bengaluru");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        {/* Top navbar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-black">ticket</span>
              <span className="text-red-500">Verse</span>
            </span>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex items-center relative flex-1 max-w-xl mx-8">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search for Movies, Events, Plays, Sports and Activities" 
              className="pl-10 py-2 rounded-md w-full bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>

          {/* City selector and auth */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1 cursor-pointer text-slate-700 hover:text-slate-900">
              <span>{selectedCity}</span>
              <ChevronDown className="h-4 w-4" />
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="hidden md:block text-slate-700">
                  Hi, {user?.name?.split(' ')[0] || "User"}
                </span>
                <Button 
                  onClick={handleLogout} 
                  variant="outline" 
                  className="border-slate-200 text-slate-700 hover:bg-slate-100 text-sm"
                  size="sm"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <Button 
                as={Link} 
                to="/login" 
                className="bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors text-sm"
                size="sm"
              >
                Sign in
              </Button>
            )}

            <Button variant="ghost" className="md:hidden p-1" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Bottom navbar - navigation links */}
        <div className="flex items-center space-x-8 py-2 overflow-x-auto hide-scrollbar text-sm font-medium">
          <Link to="/movies" className="text-slate-700 hover:text-red-500 whitespace-nowrap">Movies</Link>
          <Link to="#" className="text-slate-700 hover:text-red-500 whitespace-nowrap">Stream</Link>
          <Link to="#" className="text-slate-700 hover:text-red-500 whitespace-nowrap">Events</Link>
          <Link to="#" className="text-slate-700 hover:text-red-500 whitespace-nowrap">Plays</Link>
          <Link to="#" className="text-slate-700 hover:text-red-500 whitespace-nowrap">Sports</Link>
          <Link to="#" className="text-slate-700 hover:text-red-500 whitespace-nowrap">Activities</Link>
          
          <div className="flex-1"></div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="#" className="text-slate-700 hover:text-red-500 whitespace-nowrap text-xs">ListYourShow</Link>
            <Link to="#" className="text-slate-700 hover:text-red-500 whitespace-nowrap text-xs">Corporates</Link>
            <Link to="#" className="text-slate-700 hover:text-red-500 whitespace-nowrap text-xs">Offers</Link>
            <Link to="#" className="text-slate-700 hover:text-red-500 whitespace-nowrap text-xs">Gift Cards</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
