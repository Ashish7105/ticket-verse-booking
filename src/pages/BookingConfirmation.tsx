
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { sendConfirmationEmail } from "@/services/mockData";
import { Check, Loader2, Calendar, Clock, MapPin, Ticket, Mail, ArrowLeft } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Success Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-ticket-purple/30 to-ticket-purple/10 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ticket-purple to-ticket-secondary flex items-center justify-center">
            <Check className="h-8 w-8 text-white" strokeWidth={3} />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-ticket-gray bg-clip-text text-transparent">Booking Confirmed!</h1>
        <p className="text-ticket-gray max-w-md mx-auto">
          Your tickets have been booked successfully. You can find all the details below.
        </p>
      </div>

      {/* Ticket Card */}
      <div className="mb-10">
        <Card className="overflow-hidden border-none bg-black/40 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="relative">
            {/* Top decorative strip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-ticket-purple via-ticket-blue to-ticket-secondary"></div>
            
            {/* Movie Info Section */}
            <div className="p-8 pb-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex-shrink-0">
                  <div className="rounded-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] h-full">
                    <img 
                      src={selectedMovie.poster} 
                      alt={selectedMovie.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h2 className="text-2xl font-bold mb-1">{selectedMovie.title}</h2>
                  <div className="flex items-center text-sm text-ticket-gray mb-4">
                    <span className="mr-3">{selectedMovie.duration}</span>
                    <span className="mr-3">•</span>
                    <span>{selectedMovie.genre}</span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-3 text-ticket-purple" />
                      <div>
                        <p className="text-sm text-ticket-gray">Date</p>
                        <p>{selectedShowTime.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 mr-3 text-ticket-purple" />
                      <div>
                        <p className="text-sm text-ticket-gray">Showtime</p>
                        <p>{selectedShowTime.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 text-ticket-purple" />
                      <div>
                        <p className="text-sm text-ticket-gray">Theater</p>
                        <p>{selectedTheater.name}</p>
                        <p className="text-xs text-ticket-gray">{selectedTheater.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Details Section */}
            <CardContent className="p-8 pt-4">
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm uppercase tracking-wide text-ticket-gray mb-2">Booking Reference</h3>
                    <p className="font-mono text-lg font-semibold">{bookingId}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-ticket-gray mb-2">Seats</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <div key={seat.id} className="bg-ticket-purple/10 border border-ticket-purple/30 text-ticket-purple px-3 py-1 rounded-md text-sm font-medium">
                          {seat.row}{seat.number}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-black/30 border border-white/5">
                    <h3 className="text-sm uppercase tracking-wide text-ticket-gray mb-3">Price Summary</h3>
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex justify-between">
                        <span className="text-ticket-gray">
                          {selectedSeats.length} Ticket{selectedSeats.length > 1 ? 's' : ''}
                        </span>
                        <span>${(selectedSeats.length * selectedShowTime.price).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-ticket-gray">
                        <span>Convenience Fee</span>
                        <span>$0.00</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/5">
                      <div className="flex justify-between font-bold">
                        <span>Amount Paid</span>
                        <span className="text-ticket-purple">${booking.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-ticket-gray">
                    <div className="flex items-center">
                      <Ticket className="w-4 h-4 mr-2" />
                      <span>E-ticket</span>
                    </div>
                    {emailSent ? (
                      <div className="flex items-center text-green-500">
                        <Check className="w-4 h-4 mr-1" />
                        <span>Sent to email</span>
                      </div>
                    ) : (
                      <span>Will be sent to your email</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleSendEmail}
          className="bg-gradient-to-r from-ticket-purple to-ticket-secondary hover:opacity-90 transition-all shadow-md"
          size="lg"
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
            <>
              <Mail className="mr-2 h-4 w-4" /> Send Confirmation Email
            </>
          )}
        </Button>

        <Button
          onClick={handleBackToHome}
          variant="outline"
          size="lg"
          className="border-white/10 hover:bg-white/5"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
