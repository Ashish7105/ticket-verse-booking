
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { movies } from "@/services/mockData";
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  Ticket, 
  Star, 
  Clock, 
  MapPin 
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("movies");

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/movies");
    } else {
      navigate("/login");
    }
  };

  const banners = [
    {
      id: 1,
      image: "/lovable-uploads/7810f656-0eac-4ee9-b49c-bac8abab298c.png",
      title: "Latest Movies",
    },
    {
      id: 2,
      image: "https://assets-in.bmscdn.com/promotions/cms/creatives/1708612216171_allweekendfilmscubdesktop.jpg",
      title: "Weekend Films",
    },
    {
      id: 3,
      image: "https://assets-in.bmscdn.com/promotions/cms/creatives/1708589438522_winkubdesktoprevisednew.jpg",
      title: "Special Events",
    }
  ];

  const categories = [
    { id: "movies", name: "Movies" },
    { id: "events", name: "Events" },
    { id: "plays", name: "Plays" },
    { id: "sports", name: "Sports" },
    { id: "activities", name: "Activities" }
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Category Tabs */}
      <div className="w-full bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === category.id
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Carousel */}
      <section className="w-full py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px]">
                    <img 
                      src={banner.image} 
                      alt={banner.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h2 className="text-xl md:text-2xl font-bold mb-2">{banner.title}</h2>
                        <Button 
                          className="bg-red-500 hover:bg-red-600 mt-2"
                          size="sm"
                          onClick={() => navigate("/movies")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recommended Movies</h2>
            <Button 
              variant="ghost" 
              className="text-red-500 hover:text-red-600 font-medium flex items-center text-sm"
              onClick={() => navigate("/movies")}
            >
              See All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.slice(0, 5).map((movie) => (
              <div key={movie.id} className="group" onClick={() => navigate("/movies")}>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-400" /> 
                    {movie.rating}/10
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-bold text-sm group-hover:text-red-500 transition-colors">{movie.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{movie.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="w-full py-8 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Events</h2>
            <Button 
              variant="ghost" 
              className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center text-sm"
            >
              See All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src={`https://source.unsplash.com/random/600x400?concert,event&sig=${item}`} 
                    alt="Event" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-xs">
                    Featured
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">Music Festival {item}</h3>
                  <div className="flex items-center text-gray-500 text-xs mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Sat, 10 May</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>7:00 PM</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>Central Auditorium</span>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-indigo-600 font-medium text-sm">$19.99 onwards</span>
                    <Button size="sm" variant="outline" className="text-xs border-indigo-500 text-indigo-500 hover:bg-indigo-50">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="w-full py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Trending Movies</h2>
            <Button 
              variant="ghost" 
              className="text-red-500 hover:text-red-600 font-medium flex items-center text-sm"
              onClick={() => navigate("/movies")}
            >
              Explore <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="flex overflow-x-auto hide-scrollbar py-2 space-x-4">
            {movies.slice(5, 12).map((movie) => (
              <div key={movie.id} className="flex-none w-36 md:w-48">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <div className="flex items-center space-x-1">
                      <Ticket className="h-3 w-3 text-red-400" />
                      <span className="text-white text-xs">Book Now</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-bold text-sm truncate">{movie.title}</h3>
                  <p className="text-xs text-gray-500 truncate">{movie.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore By Categories</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Comedy", icon: "😂", color: "bg-yellow-100" },
              { name: "Action", icon: "💥", color: "bg-red-100" },
              { name: "Drama", icon: "🎭", color: "bg-blue-100" },
              { name: "Horror", icon: "👻", color: "bg-purple-100" },
              { name: "Sci-Fi", icon: "🚀", color: "bg-green-100" },
              { name: "Kids", icon: "🧸", color: "bg-pink-100" },
            ].map((category) => (
              <div 
                key={category.name} 
                className={`${category.color} rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-sm">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Entertainment?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of users booking tickets for movies, events, and more through TicketVerse.
            Get exclusive deals and the best seats in town!
          </p>
          <Button 
            onClick={handleGetStarted} 
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg rounded-full"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
