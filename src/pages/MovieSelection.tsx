
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useBooking } from "@/context/BookingContext";
import { cities, Movie, Theater, ShowTime } from "@/services/mockData";
import { getMoviesFromDB, getTheatersFromDB, getShowTimesFromDB } from "@/services/localDatabase";
import { Loader2 } from "lucide-react";

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
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center">Select Movie & Showtime</h1>

      <div className="grid gap-6 mb-8">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Choose City</h2>
          <Select
            value={selectedCity}
            onValueChange={setSelectedCity}
          >
            <SelectTrigger className="bg-muted">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCity && (
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Choose Theater</h2>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-ticket-purple" />
              </div>
            ) : (
              <div className="grid gap-2">
                {theaters.map((theater) => (
                  <Card
                    key={theater.id}
                    className={`cursor-pointer border-2 transition-all ${
                      selectedTheater?.id === theater.id
                        ? "border-ticket-purple bg-ticket-purple/10"
                        : "border-muted bg-black/40"
                    }`}
                    onClick={() => setSelectedTheater(theater)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-medium">{theater.name}</h3>
                      <p className="text-sm text-ticket-gray">{theater.location}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedTheater && (
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Choose Movie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {movies.map((movie) => (
                <Card
                  key={movie.id}
                  className={`cursor-pointer border-2 overflow-hidden transition-all ${
                    selectedMovie?.id === movie.id
                      ? "border-ticket-purple"
                      : "border-muted"
                  }`}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <div className="aspect-[2/3] relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="object-cover w-full h-full"
                    />
                    {selectedMovie?.id === movie.id && (
                      <div className="absolute inset-0 bg-ticket-purple/30 flex items-center justify-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="h-12 w-12 text-white"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm">{movie.title}</h3>
                    <div className="flex justify-between mt-1 text-xs text-ticket-gray">
                      <span>{movie.duration}</span>
                      <span>{movie.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedMovie && selectedTheater && (
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Choose Showtime</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {showTimes.map((time) => (
                <Button
                  key={time.id}
                  variant="outline"
                  className={`py-6 ${
                    selectedShowTime?.id === time.id
                      ? "bg-ticket-purple text-white border-ticket-purple"
                      : "border-muted"
                  }`}
                  onClick={() => setSelectedShowTime(time)}
                >
                  <div className="text-center">
                    <div className="font-medium">{time.time}</div>
                    <div className="text-xs mt-1">${time.price.toFixed(2)}</div>
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
          className="px-8 py-6 bg-ticket-purple hover:bg-ticket-secondary text-lg"
          disabled={!selectedCity || !selectedTheater || !selectedMovie || !selectedShowTime}
        >
          Continue to Seat Selection
        </Button>
      </div>
    </div>
  );
};

export default MovieSelection;
