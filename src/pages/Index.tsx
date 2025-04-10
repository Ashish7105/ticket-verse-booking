
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { movies } from "@/services/mockData";
import { Film } from "lucide-react";

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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                Book Your Movie Tickets with Ease
              </h1>
              <p className="mx-auto max-w-[700px] text-ticket-gray md:text-xl">
                Experience the magic of cinema with our seamless booking platform.
                Choose from the latest movies and reserve your perfect seats.
              </p>
            </div>
            <div className="space-x-4">
              <Button 
                onClick={handleGetStarted} 
                className="bg-ticket-purple hover:bg-ticket-secondary"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Featured Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {movies.slice(0, 4).map((movie) => (
              <div 
                key={movie.id} 
                className="overflow-hidden rounded-lg bg-black/40 border border-muted transition-all hover:scale-105"
              >
                <div className="aspect-[2/3] relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{movie.title}</h3>
                  <div className="flex justify-between mt-2 text-xs text-ticket-gray">
                    <span>{movie.duration}</span>
                    <span>{movie.genre}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button 
              onClick={() => navigate("/movies")} 
              variant="outline"
              className="border-ticket-purple text-ticket-purple hover:bg-ticket-purple hover:text-white"
            >
              View All Movies
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-black/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-muted p-6 flex flex-col items-center text-center">
              <Film className="h-10 w-10 text-ticket-purple mb-4" />
              <h3 className="text-xl font-bold">Wide Selection</h3>
              <p className="text-ticket-gray mt-2">
                Choose from all the latest blockbusters and indie films
              </p>
            </div>
            <div className="rounded-lg border border-muted p-6 flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-ticket-purple mb-4">
                <path d="M4 18v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/>
                <path d="M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              <h3 className="text-xl font-bold">Easy Booking</h3>
              <p className="text-ticket-gray mt-2">
                Simple and intuitive interface for quick reservations
              </p>
            </div>
            <div className="rounded-lg border border-muted p-6 flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-ticket-purple mb-4">
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <line x1="2" x2="22" y1="10" y2="10"/>
              </svg>
              <h3 className="text-xl font-bold">Secure Payments</h3>
              <p className="text-ticket-gray mt-2">
                Fast and secure payment options for your convenience
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
