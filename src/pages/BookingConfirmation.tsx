
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { sendConfirmationEmail } from "@/services/mockData";
import { Check, Loader2 } from "lucide-react";

const BookingConfirmation = () => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    selectedMovie,
    selectedTheater,
    selectedShowTime,
    selectedSeats,
    booking,
    resetBooking,
  } = useBooking();

  // Generate a unique booking ID
  useEffect(() => {
    const generateBookingId = () => {
      const timestamp = Date.now().toString(36);
      const randomStr = Math.random().toString(36).substring(2, 8);
      return `BK-${timestamp}-${randomStr}`.toUpperCase();
    };

    setBookingId(generateBookingId());
  }, []);

  // Redirect if essential data is missing
  useEffect(() => {
    if (!selectedMovie || !selectedTheater || !selectedShowTime || selectedSeats.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please complete the booking process first.",
        variant: "destructive",
      });
      navigate("/movies");
    }
  }, [selectedMovie, selectedTheater, selectedShowTime, selectedSeats, toast, navigate]);

  const handleSendEmail = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "Email information is missing.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);

    try {
      const bookingDetails = {
        bookingId,
        movie: selectedMovie?.title,
        theater: selectedTheater?.name,
        showtime: `${selectedShowTime?.date} at ${selectedShowTime?.time}`,
        seats: selectedSeats.map(seat => `${seat.row}${seat.number}`).join(", "),
        totalAmount: booking.totalAmount.toFixed(2),
      };

      await sendConfirmationEmail(user.email, bookingDetails);
      setEmailSent(true);
      
      toast({
        title: "Email Sent",
        description: "Booking confirmation has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "We couldn't send the confirmation email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleBackToHome = () => {
    resetBooking();
    navigate("/");
  };

  if (!selectedMovie || !selectedTheater || !selectedShowTime) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-ticket-purple" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ticket-purple/20 mb-4">
          <Check className="h-8 w-8 text-ticket-purple" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-ticket-gray">
          Your tickets have been booked successfully. Details are provided below.
        </p>
      </div>

      <Card className="bg-black/40 border-muted mb-8">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-muted">
              <div>
                <h2 className="text-lg font-bold">{selectedMovie.title}</h2>
                <p className="text-sm text-ticket-gray">{selectedMovie.duration} • {selectedMovie.genre}</p>
              </div>
              <div className="hidden sm:block w-16">
                <img 
                  src={selectedMovie.poster} 
                  alt={selectedMovie.title} 
                  className="w-full rounded"
                />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h3 className="text-sm font-medium text-ticket-gray">Booking ID</h3>
                  <p className="font-mono">{bookingId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-ticket-gray">Date & Time</h3>
                  <p>{selectedShowTime.date} at {selectedShowTime.time}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h3 className="text-sm font-medium text-ticket-gray">Theater</h3>
                  <p>{selectedTheater.name}</p>
                  <p className="text-xs text-ticket-gray">{selectedTheater.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-ticket-gray">Seats</h3>
                  <p>{selectedSeats.map(seat => `${seat.row}${seat.number}`).join(", ")}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-muted">
                <div className="flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>${booking.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleSendEmail}
          className="bg-ticket-purple hover:bg-ticket-secondary"
          disabled={isSendingEmail || emailSent}
        >
          {isSendingEmail ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Email...
            </>
          ) : emailSent ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Email Sent
            </>
          ) : (
            "Send Confirmation Email"
          )}
        </Button>

        <Button
          onClick={handleBackToHome}
          variant="outline"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
