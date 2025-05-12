
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBooking } from "@/context/BookingContext";
import { cities, Movie, Theater, ShowTime } from "@/services/mockData";
import { getMoviesFromDB, getTheatersFromDB, getShowTimesFromDB } from "@/services/localDatabase";
import { Loader2, CheckCircle, MapPin, Clock, Star, Calendar, Filter, TrendingUp } from "lucide-react";

const MovieSelection = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [showTimes, setShowTimes] = useState<ShowTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("now-showing");
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    selectedCity,
    setSelectedCity,
    selectedTheater,
    setSelectedTheater,
    selectedMovie,
    setSelectedMovie,
    selectedShowTime,
    setSelectedShowTime,
    updateBooking,
  } = useBooking();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMoviesFromDB();
        setMovies(moviesData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load movies. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [toast]);

  useEffect(() => {
    const fetchTheaters = async () => {
      if (selectedCity) {
        try {
          setIsLoading(true);
          const theatersData = await getTheatersFromDB(selectedCity);
          setTheaters(theatersData);
          
          // Reset selections when city changes
          setSelectedTheater(null);
          setSelectedMovie(null);
          setSelectedShowTime(null);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load theaters. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTheaters();
  }, [selectedCity, setSelectedTheater, setSelectedMovie, setSelectedShowTime, toast]);

  useEffect(() => {
    const fetchShowTimes = async () => {
      if (selectedTheater && selectedMovie) {
        try {
          setIsLoading(true);
          const showTimesData = await getShowTimesFromDB();
          setShowTimes(showTimesData);
          setSelectedShowTime(null);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load showtimes. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchShowTimes();
  }, [selectedTheater, selectedMovie, setSelectedShowTime, toast]);

  const handleContinue = () => {
    if (!selectedCity || !selectedTheater || !selectedMovie || !selectedShowTime) {
      toast({
        title: "Incomplete Selection",
        description: "Please select all required options before proceeding.",
        variant: "destructive",
      });
      return;
    }

    updateBooking({
      movieId: selectedMovie.id,
      theaterId: selectedTheater.id,
      showTimeId: selectedShowTime.id,
    });

    navigate("/seats");
  };

  // More cities
  const extendedCities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Austin"
   , "Denver", "Washington DC", "Atlanta", "Miami",
    
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-ticket-purple to-ticket-secondary text-transparent bg-clip-text">
        Select Movie & Showtime
      </h1>

      <div className="space-y-6">
        {/* City Selection */}
        <Card className="bg-white/5 backdrop-blur-sm border-[1px] border-white/10 shadow-md overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-ticket-purple" strokeWidth={2.5} />
              <h2 className="text-lg font-semibold">Choose Your City</h2>
            </div>
            <Select
              value={selectedCity}
              onValueChange={setSelectedCity}
            >
              <SelectTrigger className="w-full md:w-64 bg-white/10 border-muted focus:ring-1 focus:ring-ticket-purple rounded-lg">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto bg-background/95 backdrop-blur-sm border-ticket-purple/20">
                {extendedCities.map((city) => (
                  <SelectItem key={city} value={city} className="hover:bg-ticket-purple/10 focus:bg-ticket-purple/10">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Theater Selection */}
        {selectedCity && (
          <div className="animate-scale-in">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-ticket-purple" strokeWidth={2.5} />
              <h2 className="text-lg font-semibold">Choose Theater</h2>
            </div>
            {isLoading ? (
              <div className="flex justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-ticket-purple" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {theaters.map((theater) => (
                  <Card
                    key={theater.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden ${
                      selectedTheater?.id === theater.id
                        ? "border-2 border-ticket-purple bg-gradient-to-br from-ticket-purple/10 to-black/20"
                        : "border border-muted/30 bg-white/5 hover:translate-y-[-2px]"
                    }`}
                    onClick={() => setSelectedTheater(theater)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        {selectedTheater?.id === theater.id && (
                          <CheckCircle className="h-4 w-4 text-ticket-purple shrink-0 mr-2 mt-1" />
                        )}
                        <div>
                          <h3 className={`font-medium text-base ${
                            selectedTheater?.id === theater.id ? "text-ticket-purple" : ""
                          }`}>{theater.name}</h3>
                          <p className="text-xs text-ticket-gray mt-1 flex items-center">
                            <MapPin className="h-3 w-3 mr-1 inline" strokeWidth={2} />
                            {theater.location}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Movie Selection */}
        {selectedTheater && (
          <div className="animate-scale-in">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-ticket-purple" strokeWidth={2.5} />
                <h2 className="text-lg font-semibold">Choose Movie</h2>
              </div>
              
              <Tabs defaultValue="now-showing" className="w-auto" onValueChange={setActiveTab}>
                <TabsList className="bg-white/10 border border-white/5">
                  <TabsTrigger value="now-showing" className="text-xs data-[state=active]:bg-ticket-purple data-[state=active]:text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Now Showing
                  </TabsTrigger>
                  <TabsTrigger value="coming-soon" className="text-xs data-[state=active]:bg-ticket-purple data-[state=active]:text-white">
                    <Calendar className="h-3 w-3 mr-1" />
                    Coming Soon
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {movies.map((movie) => (
                <Card
                  key={movie.id}
                  className={`cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    selectedMovie?.id === movie.id
                      ? "border-2 border-ticket-purple ring-1 ring-ticket-purple/30"
                      : "border border-muted/30 hover:translate-y-[-3px]"
                  }`}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className={`object-cover w-full h-full transition-transform duration-500 ${
                        selectedMovie?.id === movie.id ? "scale-105" : "hover:scale-105"
                      }`}
                    />
                    {selectedMovie?.id === movie.id && (
                      <div className="absolute inset-0 bg-gradient-to-t from-ticket-purple/80 to-transparent flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-white drop-shadow-lg" />
                      </div>
                    )}
                    <div className="absolute top-1 right-1 bg-black/70 text-white/90 px-1.5 py-0.5 rounded text-xs flex items-center">
                      <Star className="h-3 w-3 mr-0.5 text-yellow-400 fill-yellow-400" /> 
                      {movie.rating}
                    </div>
                  </div>
                  <CardContent className="p-2">
                    <h3 className={`font-medium text-xs truncate ${
                      selectedMovie?.id === movie.id ? "text-ticket-purple" : ""
                    }`}>{movie.title}</h3>
                    <div className="flex items-center mt-1 text-[10px] text-ticket-gray">
                      <Clock className="h-2.5 w-2.5 mr-0.5" /> {movie.duration}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Showtime Selection */}
        {selectedMovie && selectedTheater && (
          <div className="animate-scale-in mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-ticket-purple" strokeWidth={2.5} />
              <h2 className="text-lg font-semibold">Choose Showtime</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {showTimes.map((time) => (
                <Button
                  key={time.id}
                  variant="outline"
                  className={`py-3 transition-all duration-200 text-sm ${
                    selectedShowTime?.id === time.id
                      ? "bg-ticket-purple text-white border-ticket-purple shadow-md shadow-ticket-purple/40"
                      : "border-muted bg-white/5 hover:bg-black/10 hover:border-ticket-purple/50"
                  }`}
                  onClick={() => setSelectedShowTime(time)}
                >
                  <div className="text-center">
                    <div className="font-medium">{time.time}</div>
                    <div className="text-xs mt-0.5 opacity-80">${time.price.toFixed(2)}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={handleContinue}
          className={`px-6 py-2 text-base font-medium transition-all duration-300 rounded-xl ${
            !selectedCity || !selectedTheater || !selectedMovie || !selectedShowTime
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-ticket-purple to-ticket-secondary hover:from-ticket-secondary hover:to-ticket-purple text-white shadow-md hover:shadow-lg shadow-ticket-purple/30"
          }`}
          disabled={!selectedCity || !selectedTheater || !selectedMovie || !selectedShowTime}
        >
          Continue to Seat Selection
        </Button>
      </div>
    </div>
  );
};

export default MovieSelection;
