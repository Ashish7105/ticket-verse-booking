
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useBooking } from "@/context/BookingContext";
import { cities, Movie, Theater, ShowTime } from "@/services/mockData";
import { getMoviesFromDB, getTheatersFromDB, getShowTimesFromDB } from "@/services/localDatabase";
import { Loader2, CheckCircle, MapPin, Clock, Star } from "lucide-react";

const MovieSelection = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [showTimes, setShowTimes] = useState<ShowTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        // getMoviesFromDB now returns MockMovie[] compatible with our component
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
          // getTheatersFromDB now returns MockTheater[] compatible with our component
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-ticket-purple to-ticket-secondary text-transparent bg-clip-text">
        Select Movie & Showtime
      </h1>

      <div className="space-y-8">
        {/* City Selection */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-ticket-purple" strokeWidth={2.5} />
            Choose Your City
          </h2>
          <Select
            value={selectedCity}
            onValueChange={setSelectedCity}
          >
            <SelectTrigger className="w-full md:w-64 border-2 border-muted focus:border-ticket-purple focus:ring-1 focus:ring-ticket-purple bg-black/10 rounded-lg">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-sm border-ticket-purple/20">
              {cities.map((city) => (
                <SelectItem key={city} value={city} className="hover:bg-ticket-purple/10 focus:bg-ticket-purple/10">
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Theater Selection */}
        {selectedCity && (
          <div className="animate-scale-in">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-ticket-purple" strokeWidth={2.5} />
              Choose Theater
            </h2>
            {isLoading ? (
              <div className="flex justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-ticket-purple" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {theaters.map((theater) => (
                  <Card
                    key={theater.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden ${
                      selectedTheater?.id === theater.id
                        ? "border-2 border-ticket-purple bg-gradient-to-br from-ticket-purple/10 to-black/20"
                        : "border border-muted/30 bg-black/40 hover:translate-y-[-4px]"
                    }`}
                    onClick={() => setSelectedTheater(theater)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start">
                        {selectedTheater?.id === theater.id && (
                          <CheckCircle className="h-5 w-5 text-ticket-purple shrink-0 mr-3 mt-1" />
                        )}
                        <div>
                          <h3 className={`font-semibold text-lg ${
                            selectedTheater?.id === theater.id ? "text-ticket-purple" : ""
                          }`}>{theater.name}</h3>
                          <p className="text-sm text-ticket-gray mt-1 flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1 inline" strokeWidth={2} />
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
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-ticket-purple" strokeWidth={2.5} />
              Choose Movie
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <Card
                  key={movie.id}
                  className={`cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    selectedMovie?.id === movie.id
                      ? "border-2 border-ticket-purple ring-2 ring-ticket-purple/30"
                      : "border border-muted/30 hover:border-muted hover:translate-y-[-4px]"
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
                        <CheckCircle className="h-12 w-12 text-white drop-shadow-lg" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10">
                      <span className="text-xs font-medium py-1 px-2 rounded-full bg-ticket-purple/90 text-white">
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className={`font-medium text-base ${
                      selectedMovie?.id === movie.id ? "text-ticket-purple" : ""
                    }`}>{movie.title}</h3>
                    <div className="flex justify-between mt-1 text-xs text-ticket-gray">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {movie.duration}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Showtime Selection */}
        {selectedMovie && selectedTheater && (
          <div className="animate-scale-in mt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-ticket-purple" strokeWidth={2.5} />
              Choose Showtime
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {showTimes.map((time) => (
                <Button
                  key={time.id}
                  variant="outline"
                  className={`py-6 transition-all duration-300 ${
                    selectedShowTime?.id === time.id
                      ? "bg-ticket-purple text-white border-ticket-purple shadow-md shadow-ticket-purple/40"
                      : "border-muted bg-black/20 hover:bg-black/40 hover:border-ticket-purple/50"
                  }`}
                  onClick={() => setSelectedShowTime(time)}
                >
                  <div className="text-center">
                    <div className="font-medium">{time.time}</div>
                    <div className="text-xs mt-1 opacity-80">${time.price.toFixed(2)}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          onClick={handleContinue}
          className={`px-8 py-7 text-lg font-medium transition-all duration-300 rounded-xl ${
            !selectedCity || !selectedTheater || !selectedMovie || !selectedShowTime
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-ticket-purple to-ticket-secondary hover:from-ticket-secondary hover:to-ticket-purple text-white shadow-lg hover:shadow-xl shadow-ticket-purple/30"
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
