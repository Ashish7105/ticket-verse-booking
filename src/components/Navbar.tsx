
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getMoviesFromDB } from "@/services/localDatabase";
import { 
  Film, 
  Search, 
  Menu, 
  ChevronDown,
  MapPin, 
  Bell, 
  User as UserIcon,
  Ticket,
  Calendar,
  Tag,
  Gift,
  Popcorn,
  Mic,
  LogOut,
  Settings,
  History,
  Heart,
  X,
  CircleUserRound,
} from "lucide-react";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState("New York");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const cities = [
    "New York", 
    "Los Angeles", 
    "Chicago", 
    "Houston", 
    "Phoenix", 
    "Philadelphia", 
    "San Antonio", 
    "San Diego", 
    "Dallas", 
    "Austin",
    "San Francisco",
    "Seattle",
    "Denver",
    "Boston",
    "Las Vegas"
  ];

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.length > 2) {
        try {
          const movies = await getMoviesFromDB();
          const filtered = movies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(filtered);
          setShowSearchResults(true);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    };

    const debounce = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (!searchVisible) {
      setSearchTerm("");
      setShowSearchResults(false);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchResultClick = (movieId: string) => {
    setSearchTerm("");
    setShowSearchResults(false);
    navigate(`/movie/${movieId}`);
  };

  const closeSearch = () => {
    setSearchTerm("");
    setShowSearchResults(false);
    setSearchVisible(false);
  };

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <nav className="bg-background border-b border-muted sticky top-0 z-50">
      {/* Top navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-ticket-purple" />
              <span className="text-xl font-heading font-bold">
                <span className="text-foreground">Ticket</span>
                <span className="text-ticket-purple">Verse</span>
              </span>
            </Link>
          </div>

          {/* City selector - visible on all screen sizes */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center md:ml-6 cursor-pointer bg-muted/30 hover:bg-muted/50 px-3 py-1 rounded-full text-sm">
                <MapPin className="h-4 w-4 text-ticket-purple mr-1" />
                <span className="text-foreground">{selectedCity}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2 max-h-[300px] overflow-y-auto">
              <div className="grid grid-cols-1 gap-1">
                {cities.map((city) => (
                  <Button
                    key={city}
                    variant="ghost"
                    className="justify-start font-normal"
                    onClick={() => setSelectedCity(city)}
                  >
                    <MapPin className={`h-4 w-4 mr-2 ${selectedCity === city ? "text-ticket-purple" : "text-muted-foreground"}`} />
                    {city}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Search icon - visible on mobile, toggles search bar */}
          <div className="flex md:hidden">
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full text-muted-foreground hover:text-ticket-purple hover:bg-muted/30"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Search bar - hidden on mobile unless toggled */}
          <div className={`hidden md:flex items-center relative flex-1 max-w-xl mx-4 ${searchVisible ? 'absolute top-16 left-0 right-0 p-4 flex bg-background shadow-md z-50' : ''}`}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search for Movies, Events, Plays, Sports and Activities" 
                className="pl-10 py-2 rounded-full w-full bg-muted/30 border-muted focus:bg-background"
                value={searchTerm}
                onChange={handleSearchInput}
                onFocus={() => setShowSearchResults(searchTerm.length > 2)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-muted rounded-md shadow-lg z-50">
                  <div className="p-2 max-h-[300px] overflow-y-auto">
                    {searchResults.map((movie) => (
                      <div 
                        key={movie.id}
                        className="flex items-center p-2 hover:bg-muted/30 rounded-md cursor-pointer"
                        onClick={() => handleSearchResultClick(movie.id)}
                      >
                        <img 
                          src={movie.poster} 
                          alt={movie.title} 
                          className="w-8 h-12 object-cover rounded mr-3"
                        />
                        <div>
                          <div className="font-medium">{movie.title}</div>
                          <div className="text-xs text-muted-foreground">{movie.genre}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Theme toggle and auth section - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <button className="text-muted-foreground hover:text-foreground">
                  <Bell className="h-5 w-5" />
                </button>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center space-x-1 cursor-pointer group p-1 hover:bg-muted/30 rounded-full">
                      <div className="bg-ticket-purple/10 rounded-full p-1.5">
                        <CircleUserRound className="h-5 w-5 text-ticket-purple" />
                      </div>
                      <span className="text-foreground group-hover:text-ticket-purple transition-colors">
                        {user?.name?.split(' ')[0] || "User"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="flex flex-col space-y-1">
                      <Button 
                        variant="ghost" 
                        className="justify-start font-normal"
                        onClick={() => navigate("/profile")}
                      >
                        <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        Profile
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start font-normal"
                        onClick={() => navigate("/profile?tab=bookings")}
                      >
                        <History className="h-4 w-4 mr-2 text-muted-foreground" />
                        Bookings
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start font-normal"
                      >
                        <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
                        Favorites
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start font-normal"
                        onClick={() => navigate("/profile?tab=settings")}
                      >
                        <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                        Settings
                      </Button>
                      <hr className="my-1 border-muted" />
                      <Button 
                        variant="ghost" 
                        className="justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <Button 
                onClick={() => navigate("/login")}
                className="bg-ticket-purple hover:bg-ticket-purple/90 text-white rounded-full"
                size="sm"
              >
                Sign in
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={toggleMobileMenu} className="p-1" size="icon">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Bottom navbar - navigation links */}
        <div className="hidden md:flex items-center space-x-8 py-3">
          <Link 
            to="/movies" 
            className={`nav-link flex items-center gap-1.5 ${isActiveRoute('/movies') ? 'text-ticket-purple font-medium' : ''}`}
          >
            <Film className="h-4 w-4" />
            Movies
          </Link>
          <Link 
            to="/events" 
            className={`nav-link flex items-center gap-1.5 ${isActiveRoute('/events') ? 'text-ticket-purple font-medium' : ''}`}
          >
            <Calendar className="h-4 w-4" />
            Events
          </Link>
          <Link 
            to="/plays" 
            className={`nav-link flex items-center gap-1.5 ${isActiveRoute('/plays') ? 'text-ticket-purple font-medium' : ''}`}
          >
            <Mic className="h-4 w-4" />
            Plays
          </Link>
          <Link 
            to="/offers" 
            className={`nav-link flex items-center gap-1.5 ${isActiveRoute('/offers') ? 'text-ticket-purple font-medium' : ''}`}
          >
            <Tag className="h-4 w-4" />
            Offers
          </Link>
          <Link 
            to="/gift-cards" 
            className={`nav-link flex items-center gap-1.5 ${isActiveRoute('/gift-cards') ? 'text-ticket-purple font-medium' : ''}`}
          >
            <Gift className="h-4 w-4" />
            Gift Cards
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background shadow-lg">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <Link to="/movies" className="block py-2 px-3 rounded-md nav-link hover:bg-muted/30">
              <div className="flex items-center">
                <Film className="h-4 w-4 mr-3" />
                Movies
              </div>
            </Link>
            <Link to="/events" className="block py-2 px-3 rounded-md nav-link hover:bg-muted/30">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-3" />
                Events
              </div>
            </Link>
            <Link to="/plays" className="block py-2 px-3 rounded-md nav-link hover:bg-muted/30">
              <div className="flex items-center">
                <Mic className="h-4 w-4 mr-3" />
                Plays
              </div>
            </Link>
            <Link to="/offers" className="block py-2 px-3 rounded-md nav-link hover:bg-muted/30">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-3" />
                Offers
              </div>
            </Link>
            <Link to="/gift-cards" className="block py-2 px-3 rounded-md nav-link hover:bg-muted/30">
              <div className="flex items-center">
                <Gift className="h-4 w-4 mr-3" />
                Gift Cards
              </div>
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="pt-2 pb-4 border-t border-muted px-4">
              <div className="flex items-center py-2">
                <div className="bg-ticket-purple/10 rounded-full p-2 mr-3">
                  <CircleUserRound className="h-5 w-5 text-ticket-purple" />
                </div>
                <span className="text-foreground font-medium">
                  {user?.name || "User"}
                </span>
              </div>
              <div className="space-y-1 mt-2">
                <Link to="/profile" className="block py-2 px-3 rounded-md text-sm hover:bg-muted/30">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-3 text-muted-foreground" />
                    Profile
                  </div>
                </Link>
                <Link to="/profile?tab=bookings" className="block py-2 px-3 rounded-md text-sm hover:bg-muted/30">
                  <div className="flex items-center">
                    <History className="h-4 w-4 mr-3 text-muted-foreground" />
                    Bookings
                  </div>
                </Link>
                <Link to="/profile?tab=settings" className="block py-2 px-3 rounded-md text-sm hover:bg-muted/30">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-3 text-muted-foreground" />
                    Settings
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block py-2 px-3 rounded-md text-sm text-red-500 hover:bg-red-50 mt-2"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 pb-4 border-t border-muted px-4">
              <Button 
                onClick={() => navigate("/login")}
                className="bg-ticket-purple hover:bg-ticket-purple/90 text-white w-full"
              >
                Sign in
              </Button>
            </div>
          )}

          <div className="pt-2 pb-4 border-t border-muted px-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Theme</div>
            <ThemeToggle />
          </div>
        </div>
      )}

      {/* Mobile search bar - only visible when toggled */}
      {searchVisible && (
        <div className="md:hidden p-4 bg-background shadow-md">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search for Movies, Events..." 
              className="pl-10 py-2 rounded-full w-full bg-muted/30 border-muted"
              value={searchTerm}
              onChange={handleSearchInput}
            />
            <button 
              onClick={closeSearch}
              className="absolute right-3 top-2.5 text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* Mobile Search Results */}
          {searchTerm.length > 2 && searchResults.length > 0 && (
            <div className="mt-2 bg-background border border-muted rounded-md shadow-md">
              {searchResults.map((movie) => (
                <div 
                  key={movie.id}
                  className="flex items-center p-3 border-b border-muted last:border-0"
                  onClick={() => handleSearchResultClick(movie.id)}
                >
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-10 h-14 object-cover rounded mr-3"
                  />
                  <div>
                    <div className="font-medium">{movie.title}</div>
                    <div className="text-xs text-muted-foreground">{movie.genre}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
