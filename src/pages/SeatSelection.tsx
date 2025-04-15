
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useBooking } from "@/context/BookingContext";
import { Seat } from "@/services/mockData";
import { getSeatsFromDB, updateSeatStatus } from "@/services/localDatabase";
import { Loader2, CheckCircle, Clock, MapPin, Ticket } from "lucide-react";

const SeatSelection = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    selectedMovie,
    selectedTheater,
    selectedShowTime,
    selectedSeats,
    setSelectedSeats,
    updateBooking,
  } = useBooking();

  useEffect(() => {
    if (!selectedMovie || !selectedTheater || !selectedShowTime) {
      toast({
        title: "Missing Information",
        description: "Please select a movie and showtime first.",
        variant: "destructive",
      });
      navigate("/movies");
    }
  }, [selectedMovie, selectedTheater, selectedShowTime, toast, navigate]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setIsLoading(true);
        const seatsData = await getSeatsFromDB();
        setSeats(seatsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load seat layout. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeats();
  }, [toast]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "booked") return;

    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, { ...seat, status: "selected" }]);
    }
  };

  const getTotalAmount = () => {
    if (!selectedShowTime) return 0;
    return selectedSeats.length * selectedShowTime.price;
  };

  const handleContinue = async () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No Seats Selected",
        description: "Please select at least one seat to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateSeatStatus(
        selectedSeats.map(seat => seat.id),
        "booked"
      );

      updateBooking({
        selectedSeats,
        totalAmount: getTotalAmount(),
      });

      navigate("/confirmation");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book seats. Please try again.",
        variant: "destructive",
      });
      console.error("Booking error:", error);
    }
  };

  const seatsByRow = seats.reduce<{ [key: string]: Seat[] }>((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-ticket-purple" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-ticket-purple to-ticket-secondary text-transparent bg-clip-text">
        Select Your Seats
      </h1>

      {selectedMovie && selectedTheater && selectedShowTime && (
        <div className="mb-8 text-center glass-card p-5 rounded-xl max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2 text-white">{selectedMovie.title}</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 text-ticket-gray">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-ticket-purple" /> 
              {selectedTheater.name}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-ticket-purple" /> 
              {selectedShowTime.date} • {selectedShowTime.time}
            </span>
          </div>
        </div>
      )}

      <div className="mb-10">
        <div className="screen mb-12"></div>
        
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gray-200 border border-gray-300"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-green-500 border border-green-600"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-red-500 border border-red-600"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-6 max-w-3xl mx-auto">
          <div className="min-w-fit mx-auto">
            {Object.entries(seatsByRow).map(([row, rowSeats]) => (
              <div key={row} className="flex justify-center mb-2">
                <div className="w-8 h-10 flex items-center justify-center font-bold text-ticket-gray">
                  {row}
                </div>
                <div className="flex">
                  {rowSeats.map((seat) => {
                    const isSelected = selectedSeats.some((s) => s.id === seat.id);
                    const seatStatus = isSelected ? "selected" : seat.status;
                    
                    return (
                      <div
                        key={seat.id}
                        className={`
                          w-8 h-8 m-1 rounded-md flex items-center justify-center text-xs font-medium
                          cursor-pointer transition-all duration-200
                          ${seatStatus === "available" ? "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105" : ""}
                          ${seatStatus === "selected" ? "bg-green-500 text-white hover:bg-green-600 scale-105 shadow-md" : ""}
                          ${seatStatus === "booked" ? "bg-red-500 text-white cursor-not-allowed opacity-70" : ""}
                        `}
                        onClick={() => toggleSeat(seat)}
                      >
                        {seat.number}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="glass-card border-0 shadow-lg mb-8 overflow-hidden">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Ticket className="h-5 w-5 mr-2 text-ticket-purple" strokeWidth={2} />
                Selected Seats
              </h3>
              {selectedSeats.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="bg-ticket-purple/20 border border-ticket-purple/30 text-ticket-purple px-3 py-1 rounded-full text-sm font-medium">
                      {seat.row}{seat.number}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-ticket-gray text-sm">No seats selected</p>
              )}
            </div>
            <div className="border-t md:border-t-0 md:border-l border-muted pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
              <h3 className="text-lg font-medium mb-3">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ticket-gray">
                    {selectedSeats.length} × Tickets (${selectedShowTime?.price.toFixed(2) || "0.00"})
                  </span>
                  <span>${(selectedSeats.length * (selectedShowTime?.price || 0)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-muted">
                  <span>Total</span>
                  <span className="text-ticket-purple">${getTotalAmount().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleContinue}
          className={`px-8 py-7 text-lg font-medium transition-all duration-300 rounded-xl ${
            selectedSeats.length === 0
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-ticket-purple to-ticket-secondary hover:from-ticket-secondary hover:to-ticket-purple text-white shadow-lg hover:shadow-xl shadow-ticket-purple/30"
          }`}
          disabled={selectedSeats.length === 0}
        >
          <Ticket className="w-5 h-5 mr-2" />
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default SeatSelection;
