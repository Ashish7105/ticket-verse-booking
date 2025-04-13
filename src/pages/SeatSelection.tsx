import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useBooking } from "@/context/BookingContext";
import { Seat } from "@/services/mockData";
import { getSeatsFromDB, updateSeatStatus } from "@/services/localDatabase";
import { Loader2 } from "lucide-react";

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
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center">Select Your Seats</h1>

      {selectedMovie && selectedTheater && selectedShowTime && (
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold mb-1">{selectedMovie.title}</h2>
          <p className="text-ticket-gray">
            {selectedTheater.name} • {selectedShowTime.date} • {selectedShowTime.time}
          </p>
        </div>
      )}

      <div className="mb-10">
        <div className="screen"></div>
        
        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-ticket-available"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-ticket-selected"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-ticket-booked"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="max-w-3xl mx-auto">
            {Object.entries(seatsByRow).map(([row, rowSeats]) => (
              <div key={row} className="flex justify-center mb-2">
                <div className="w-8 h-10 flex items-center justify-center font-bold">
                  {row}
                </div>
                <div className="flex">
                  {rowSeats.map((seat) => {
                    const isSelected = selectedSeats.some((s) => s.id === seat.id);
                    const seatStatus = isSelected ? "selected" : seat.status;
                    
                    return (
                      <div
                        key={seat.id}
                        className={`seat seat-${seatStatus}`}
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

      <Card className="bg-black/40 border-muted mb-8">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Selected Seats</h3>
              {selectedSeats.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="bg-ticket-purple/20 text-ticket-purple px-3 py-1 rounded-full text-sm font-medium">
                      {seat.row}{seat.number}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-ticket-gray text-sm">No seats selected</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ticket-gray">
                    {selectedSeats.length} x Tickets (${selectedShowTime?.price.toFixed(2) || "0.00"})
                  </span>
                  <span>${(selectedSeats.length * (selectedShowTime?.price || 0)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-muted">
                  <span>Total</span>
                  <span>${getTotalAmount().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleContinue}
          className="px-8 py-6 bg-ticket-purple hover:bg-ticket-secondary text-lg"
          disabled={selectedSeats.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default SeatSelection;
