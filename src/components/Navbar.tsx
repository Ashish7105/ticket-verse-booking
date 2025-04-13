
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { 
  Film, 
  Search, 
  Menu, 
  ChevronDown, 
  MapPin, 
  Bell, 
  User,
  Ticket,
  Calendar,
  Tag,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("Bengaluru");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-xl font-heading font-bold">
                <span className="text-gray-900">Ticket</span>
                <span className="text-primary">Verse</span>
              </span>
            </Link>
          </div>

          {/* City selector - visible on all screen sizes */}
          <div className="flex items-center md:ml-6 cursor-pointer bg-gray-50 hover:bg-gray-100 px-3 py-1 rounded-full text-sm">
            <MapPin className="h-4 w-4 text-primary mr-1" />
            <span className="text-gray-700">{selectedCity}</span>
            <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
          </div>

          {/* Search icon - visible on mobile, toggles search bar */}
          <div className="flex md:hidden">
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-100"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Search bar - hidden on mobile unless toggled */}
          <div className={`hidden md:flex items-center relative flex-1 max-w-xl mx-4 ${searchVisible ? 'absolute top-16 left-0 right-0 p-4 flex bg-white shadow-md z-50' : ''}`}>
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search for Movies, Events, Plays, Sports and Activities" 
              className="pl-10 py-2 rounded-full w-full bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>

          {/* Auth section - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-gray-600 hover:text-primary cursor-pointer" />
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <div className="bg-primary/10 rounded-full p-1.5">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-gray-700 group-hover:text-primary transition-colors">
                    {user?.name?.split(' ')[0] || "User"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </div>
                <Button 
                  onClick={handleLogout} 
                  variant="outline" 
                  className="border-gray-200 text-gray-700 hover:bg-gray-100 text-sm"
                  size="sm"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-primary/90 text-white rounded-full"
                size="sm"
              >
                Sign in
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu} className="p-1" size="icon">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Bottom navbar - navigation links */}
        <div className="hidden md:flex items-center space-x-8 py-3">
          <Link to="/movies" className="nav-link flex items-center gap-1.5">
            <Ticket className="h-4 w-4" />
            Movies
          </Link>
          <Link to="#" className="nav-link flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            Events
          </Link>
          <Link to="#" className="nav-link flex items-center gap-1.5">
            <Film className="h-4 w-4" />
            Plays
          </Link>
          <Link to="#" className="nav-link flex items-center gap-1.5">
            <Tag className="h-4 w-4" />
            Offers
          </Link>
          <Link to="#" className="nav-link flex items-center gap-1.5">
            <Film className="h-4 w-4" />
            Gift Cards
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="pt-2 pb-4 space-y-2 px-4">
            <Link to="/movies" className="block py-2 nav-link">Movies</Link>
            <Link to="#" className="block py-2 nav-link">Events</Link>
            <Link to="#" className="block py-2 nav-link">Plays</Link>
            <Link to="#" className="block py-2 nav-link">Offers</Link>
            <Link to="#" className="block py-2 nav-link">Gift Cards</Link>
          </div>
          {!isAuthenticated ? (
            <div className="pt-2 pb-4 border-t border-gray-200">
              <Button 
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-primary/90 text-white w-full rounded-none"
              >
                Sign in
              </Button>
            </div>
          ) : (
            <div className="pt-2 pb-4 border-t border-gray-200 px-4">
              <div className="flex items-center space-x-2 py-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-700">
                  {user?.name?.split(' ')[0] || "User"}
                </span>
              </div>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="w-full mt-2"
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Mobile search bar - only visible when toggled */}
      {searchVisible && (
        <div className="md:hidden p-4 bg-white shadow-md">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search for Movies, Events..." 
              className="pl-10 py-2 rounded-full w-full bg-gray-50 border-gray-200"
            />
            <button 
              onClick={toggleSearch}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
