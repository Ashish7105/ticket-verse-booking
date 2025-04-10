
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { movies } from "@/services/mockData";
import { ChevronRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/movies");
    } else {
      navigate("/login");
    }
  };

  // Upload the image
  const carouselImage = "/lovable-uploads/7810f656-0eac-4ee9-b49c-bac8abab298c.png";

  return (
    <div className="flex flex-col items-center w-full">
      {/* Carousel Section */}
      <section className="w-full">
        <div className="carousel relative w-full">
          <img 
            src={carouselImage} 
            alt="Promotional banner" 
            className="w-full object-cover max-h-[320px]"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-md rounded-full h-10 w-10">
              <ChevronRight className="h-6 w-6 transform rotate-180" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-md rounded-full h-10 w-10">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Recommended Movies Section */}
      <section className="w-full container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Recommended Movies</h2>
          <Button 
            variant="ghost" 
            className="text-red-500 hover:text-red-600 font-medium flex items-center"
            onClick={() => navigate("/movies")}
          >
            See All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.slice(0, 5).map((movie) => (
            <div key={movie.id} className="movie-poster-card" onClick={() => navigate("/movies")}>
              <div className="aspect-[2/3] rounded-lg overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-sm">{movie.title}</h3>
                <p className="text-xs text-slate-500">{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premier Section */}
      <section className="w-full py-10 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Premieres</h2>
              <p className="text-sm text-slate-400">Brand new releases every Friday</p>
            </div>
            <Button 
              variant="ghost" 
              className="text-red-400 hover:text-red-300 font-medium flex items-center"
            >
              See All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.slice(5, 10).map((movie) => (
              <div key={movie.id} className="movie-poster-card" onClick={() => navigate("/movies")}>
                <div className="aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="font-bold text-sm text-white">{movie.title}</h3>
                  <p className="text-xs text-slate-400">{movie.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & More Section */}
      <section className="w-full container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Events & More</h2>
          <Button 
            variant="ghost" 
            className="text-red-500 hover:text-red-600 font-medium flex items-center"
          >
            See All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTArIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/workshop-and-more-web-collection-202211140440.png" 
              alt="Workshops & More" 
              className="w-full aspect-square object-cover"
            />
            <h3 className="font-medium text-sm mt-2">Workshops & More</h3>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/comedy-shows-collection-202211140440.png" 
              alt="Comedy Shows" 
              className="w-full aspect-square object-cover"
            />
            <h3 className="font-medium text-sm mt-2">Comedy Shows</h3>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NCBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/music-shows-collection-202211140440.png" 
              alt="Music Shows" 
              className="w-full aspect-square object-cover"
            />
            <h3 className="font-medium text-sm mt-2">Music Shows</h3>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-OCBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/esports-collection-202211140440.png" 
              alt="E-Sports" 
              className="w-full aspect-square object-cover"
            />
            <h3 className="font-medium text-sm mt-2">E-Sports</h3>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 bg-slate-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="bg-white p-8 md:p-12 max-w-4xl mx-auto text-center rounded-xl shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for the Perfect Movie Experience?</h2>
            <p className="text-slate-600 mb-6">
              Join thousands of movie lovers who book their tickets through TicketVerse
            </p>
            <Button 
              onClick={handleGetStarted} 
              className="bg-red-500 hover:bg-red-600 text-white transition-all shadow px-8 py-6"
              size="lg"
            >
              Book Your Tickets Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
