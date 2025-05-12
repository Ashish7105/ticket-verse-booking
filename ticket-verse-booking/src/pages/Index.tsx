
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { movies } from "@/services/mockData";
import { 
  ArrowRight, 
  ChevronRight, 
  Calendar, 
  Ticket, 
  Star, 
  Clock, 
  MapPin,
  Popcorn,
  Film,
  Mic2,
  Ticket as TicketIcon,
  Heart,
  ThumbsUp,
  Users
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

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
      subtitle: "Book your tickets now",
    },
    {
      id: 2,
      image: "https://assets-in.bmscdn.com/promotions/cms/creatives/1708612216171_allweekendfilmscubdesktop.jpg",
      title: "Weekend Films",
      subtitle: "Perfect for your weekend plans",
    },
    {
      id: 3,
      image: "https://assets-in.bmscdn.com/promotions/cms/creatives/1708589438522_winkubdesktoprevisednew.jpg",
      title: "Special Events",
      subtitle: "Limited time offers",
    }
  ];

  const categories = [
    { id: "movies", name: "Movies", icon: <Film className="h-4 w-4" /> },
    { id: "events", name: "Events", icon: <Calendar className="h-4 w-4" /> },
    { id: "plays", name: "Plays", icon: <Mic2 className="h-4 w-4" /> },
    { id: "sports", name: "Sports", icon: <Users className="h-4 w-4" /> },
    { id: "activities", name: "Activities", icon: <Popcorn className="h-4 w-4" /> }
  ];

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Category Tabs */}
      <div className="w-full bg-gray-50 py-3 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button flex items-center space-x-1.5 ${
                  activeTab === category.id
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Carousel */}
      <section className="w-full py-6 bg-white">
        <div className="container mx-auto px-4">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="relative rounded-xl overflow-hidden h-[280px] md:h-[400px]">
                    <img 
                      src={banner.image} 
                      alt={banner.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-1">{banner.title}</h2>
                        <p className="text-white/80 mb-4">{banner.subtitle}</p>
                        <Button 
                          className="bg-primary hover:bg-primary/90 mt-2 rounded-full font-medium"
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
            <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="w-full py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Recommended Movies</h2>
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/80 font-medium flex items-center text-sm"
              onClick={() => navigate("/movies")}
            >
              See All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {movies.slice(0, 5).map((movie) => (
              <div key={movie.id} className="group card-hover" onClick={() => navigate("/movies")}>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" /> 
                    {movie.rating}/10
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent pt-10 pb-3 px-3 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="bg-primary/20 text-white border-primary/30 text-xs">
                        {movie.language}
                      </Badge>
                      <Heart className="h-4 w-4 text-white hover:text-red-500 cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{truncateText(movie.title, 24)}</h3>
                  <p className="text-xs text-gray-500 mt-1">{movie.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="w-full py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Featured Events</h2>
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/80 font-medium flex items-center text-sm"
            >
              See All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="glass-card card-hover cursor-pointer">
                <div className="aspect-video relative">
                  <img 
                    src={`https://source.unsplash.com/random/600x400?concert,event&sig=${item}`} 
                    alt="Event" 
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs rounded-bl-lg rounded-tr-lg">
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
                    <span className="text-primary font-medium text-sm">$19.99 onwards</span>
                    <Button size="sm" variant="outline" className="text-xs border-primary text-primary hover:bg-primary/5 rounded-full">
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
      <section className="w-full py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Trending Movies</h2>
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/80 font-medium flex items-center text-sm"
              onClick={() => navigate("/movies")}
            >
              Explore <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="flex overflow-x-auto hide-scrollbar py-2 space-x-4 pb-4">
            {movies.slice(5, 12).map((movie) => (
              <div key={movie.id} className="flex-none w-36 md:w-48 card-hover" onClick={() => navigate("/movies")}>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <div className="flex items-center space-x-1">
                      <TicketIcon className="h-3 w-3 text-primary" />
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
      <section className="w-full py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Explore By Categories</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Comedy", icon: "😂", color: "bg-yellow-100 border-yellow-200" },
              { name: "Action", icon: "💥", color: "bg-red-100 border-red-200" },
              { name: "Drama", icon: "🎭", color: "bg-blue-100 border-blue-200" },
              { name: "Horror", icon: "👻", color: "bg-purple-100 border-purple-200" },
              { name: "Sci-Fi", icon: "🚀", color: "bg-green-100 border-green-200" },
              { name: "Kids", icon: "🧸", color: "bg-pink-100 border-pink-200" },
            ].map((category) => (
              <div 
                key={category.name} 
                className={`${category.color} rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer border card-hover`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-sm">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-16 bg-gradient-to-r from-primary/90 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Entertainment?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of users booking tickets for movies, events, and more through TicketVerse.
            Get exclusive deals and the best seats in town!
          </p>
          <Button 
            onClick={handleGetStarted} 
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg rounded-full"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">What Our Users Say</h2>
          <div className="max-w-4xl mx-auto mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  text: "TicketVerse made booking movie tickets so easy! The seat selection is intuitive and I love the discounts.",
                  rating: 5
                },
                {
                  name: "Michael Chen",
                  text: "I use TicketVerse for all my concert bookings. Their customer service is outstanding and the app is so user-friendly.",
                  rating: 5
                },
                {
                  name: "Priya Sharma",
                  text: "Great platform with excellent variety of events. I've discovered so many local plays through TicketVerse!",
                  rating: 4
                }
              ].map((testimonial, index) => (
                <div key={index} className="glass-card p-5 card-hover">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="mt-3 text-gray-600 text-sm italic">"{testimonial.text}"</p>
                  <div className="mt-4 flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-medium">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">Verified User</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
