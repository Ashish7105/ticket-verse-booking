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

  const getTotalAmount = () =>
    selectedShowTime ? selectedSeats.length * selectedShowTime.price : 0;

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
        selectedSeats.map((seat) => seat.id),
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
    }
  };

  const seatsByRow = seats.reduce<{ [key: string]: Seat[] }>((acc, seat) => {
    acc[seat.row] = acc[seat.row] || [];
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
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-center mb-4">🎟 Select Your Seats</h1>

      {selectedMovie && selectedTheater && selectedShowTime && (
        <div className="text-center mb-4 text-sm text-gray-600">
          <strong>{selectedMovie.title}</strong> @ {selectedTheater.name} <br />
          {selectedShowTime.date} • {selectedShowTime.time}
        </div>
      )}

      <div className="mb-6">
        <div className="screen mb-4 w-full h-6 bg-gray-300 rounded-md text-center text-sm font-medium text-gray-700">
          Screen
        </div>

        <div className="flex justify-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-ticket-available rounded-sm"></div> Available
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-ticket-selected rounded-sm"></div> Selected
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-ticket-booked rounded-sm"></div> Booked
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="space-y-1">
            {Object.entries(seatsByRow).map(([row, rowSeats]) => (
              <div key={row} className="flex items-center justify-center gap-2">
                <span className="w-6 text-center font-semibold">{row}</span>
                <div className="flex gap-1">
                  {rowSeats.map((seat) => {
                    const isSelected = selectedSeats.some((s) => s.id === seat.id);
                    const status = isSelected ? "selected" : seat.status;
                    return (
                      <div
                        key={seat.id}
                        className={`w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer text-xs font-medium
                          ${
                            status === "booked"
                              ? "bg-ticket-booked text-white cursor-not-allowed"
                              : status === "selected"
                              ? "bg-ticket-selected text-white"
                              : "bg-ticket-available text-black hover:bg-purple-200"
                          }
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

      {/* Price + Seat Info Card */}
      <Card className="bg-white border border-muted mb-6">
        <CardContent className="p-4 md:p-6 grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Selected Seats</h3>
            {selectedSeats.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((seat) => (
                  <span
                    key={seat.id}
                    className="bg-ticket-purple/10 text-ticket-purple px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {seat.row}
                    {seat.number}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No seats selected</p>
            )}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Price Details</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>
                  {selectedSeats.length} x Tickets (${selectedShowTime?.price.toFixed(2)})
                </span>
                <span>${getTotalAmount().toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-1 font-bold flex justify-between text-base">
                <span>Total</span>
                <span>${getTotalAmount().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={handleContinue}
          className="px-6 py-3 text-base bg-ticket-purple hover:bg-ticket-secondary text-white rounded-md"
          disabled={selectedSeats.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default SeatSelection;
