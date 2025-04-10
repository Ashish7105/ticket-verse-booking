
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { movies } from "@/services/mockData";
import { Film, Calendar, CreditCard, Clock, ShieldCheck } from "lucide-react";

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

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
            <Film className="h-16 w-16 mb-2 animate-scale-in" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Your Cinema Experience, Simplified
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-[700px]">
              Book your perfect movie night with just a few clicks. Latest releases, comfortable seats, and hassle-free booking.
            </p>
            <div className="pt-4">
              <Button 
                onClick={handleGetStarted} 
                className="bg-white text-primary hover:bg-white/90 transition-all shadow-lg"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Movies</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Check out the latest blockbusters and trending titles available for booking
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {movies.slice(0, 4).map((movie) => (
              <div 
                key={movie.id} 
                className="movie-card"
              >
                <div className="poster">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                    <span className="text-white font-medium">{movie.genre}</span>
                  </div>
                </div>
                <div className="content">
                  <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{movie.duration}</span>
                    </div>
                    <div className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {movie.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button 
              onClick={() => navigate("/movies")} 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All Movies
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose TicketVerse</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Enjoy a seamless booking experience with premium features
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="feature-card text-center">
              <div className="mx-auto">
                <Film className="feature-icon mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Selection</h3>
              <p className="text-slate-600">
                Access to all the latest blockbusters and indie gems from around the world
              </p>
            </div>
            <div className="feature-card text-center">
              <div className="mx-auto">
                <Calendar className="feature-icon mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Scheduling</h3>
              <p className="text-slate-600">
                Browse showtimes, select seats, and plan your movie night with ease
              </p>
            </div>
            <div className="feature-card text-center">
              <div className="mx-auto">
                <ShieldCheck className="feature-icon mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-slate-600">
                Safe and protected transactions with multiple payment options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-primary/5">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="glass-card p-8 md:p-12 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for the Perfect Movie Experience?</h2>
            <p className="text-slate-600 mb-6">
              Join thousands of movie lovers who book their tickets through TicketVerse
            </p>
            <Button 
              onClick={handleGetStarted} 
              className="bg-primary hover:bg-primary/90 transition-all shadow"
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
