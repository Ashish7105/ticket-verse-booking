
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useBooking } from "@/context/BookingContext";
import { Seat } from "@/services/mockData";
import { getSeatsFromDB, updateSeatStatus } from "@/services/localDatabase";
import { 
  Loader2, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Ticket, 
  CreditCard, 
  Mail, 
  Smartphone, 
  ArrowRight, 
  ChevronRight,
  AlertCircle,
  Info,
  Zap
} from "lucide-react";

const SeatSelection = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No Seats Selected",
        description: "Please select at least one seat to continue.",
        variant: "destructive",
      });
      return;
    }

    // Show payment dialog
    setPaymentDialogOpen(true);
  };

  const handlePayment = async () => {
    if (selectedSeats.length === 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      await updateSeatStatus(
        selectedSeats.map(seat => seat.id),
        "booked"
      );

      updateBooking({
        selectedSeats,
        totalAmount: getTotalAmount(),
      });

      setPaymentDialogOpen(false);
      navigate("/confirmation");
      
      if (paymentMethod === "email" && email) {
        toast({
          title: "Payment Link Sent",
          description: `A payment link has been sent to ${email}`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
      console.error("Payment error:", error);
    } finally {
      setIsSubmitting(false);
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
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-ticket-purple to-ticket-secondary text-transparent bg-clip-text">
        Select Your Seats
      </h1>

      {selectedMovie && selectedTheater && selectedShowTime && (
        <div className="mb-6 text-center glass-card p-4 rounded-xl max-w-xl mx-auto">
          <h2 className="text-lg font-bold mb-1 text-white">{selectedMovie.title}</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-ticket-gray text-sm">
            <span className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1 text-ticket-purple" /> 
              {selectedTheater.name}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-ticket-purple" /> 
              {selectedShowTime.date} • {selectedShowTime.time}
            </span>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="screen mb-8"></div>
        
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-md bg-gray-200 border border-gray-300"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-md bg-green-500 border border-green-600"></div>
            <span className="text-xs">Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-md bg-red-500 border border-red-600"></div>
            <span className="text-xs">Booked</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-4 max-w-md mx-auto">
          <div className="min-w-fit mx-auto">
            {Object.entries(seatsByRow).map(([row, rowSeats]) => (
              <div key={row} className="flex justify-center mb-1">
                <div className="w-6 h-7 flex items-center justify-center font-bold text-ticket-gray text-xs">
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
                          w-7 h-7 m-0.5 rounded-md flex items-center justify-center text-xs font-medium
                          cursor-pointer transition-transform duration-200
                          ${seatStatus === "available" ? "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105" : ""}
                          ${seatStatus === "selected" ? "bg-green-500 text-white hover:bg-green-600 scale-105 shadow-sm" : ""}
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

      <Card className="glass-card border-0 shadow-md mb-6 overflow-hidden">
        <CardContent className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-base font-medium mb-2 flex items-center">
                <Ticket className="h-4 w-4 mr-1.5 text-ticket-purple" strokeWidth={2} />
                Selected Seats
              </h3>
              {selectedSeats.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="bg-ticket-purple/20 border border-ticket-purple/30 text-ticket-purple px-2 py-0.5 rounded-full text-xs font-medium">
                      {seat.row}{seat.number}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-ticket-gray text-xs">No seats selected</p>
              )}
            </div>
            <div className="border-t md:border-t-0 md:border-l border-muted pt-3 md:pt-0 md:pl-4 mt-3 md:mt-0">
              <h3 className="text-base font-medium mb-2">Price Details</h3>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-ticket-gray">
                    {selectedSeats.length} × Tickets (${selectedShowTime?.price.toFixed(2) || "0.00"})
                  </span>
                  <span>${(selectedSeats.length * (selectedShowTime?.price || 0)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-muted">
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
          className={`px-6 py-2 text-base font-medium transition-all duration-300 rounded-xl ${
            selectedSeats.length === 0
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-ticket-purple to-ticket-secondary hover:from-ticket-secondary hover:to-ticket-purple text-white shadow-md hover:shadow-lg shadow-ticket-purple/30"
          }`}
          disabled={selectedSeats.length === 0}
        >
          <Ticket className="w-4 h-4 mr-2" />
          Proceed to Checkout
        </Button>
      </div>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Select a payment method to complete your booking.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="card" className="w-full" onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card" className="text-xs">
                <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                Card
              </TabsTrigger>
              <TabsTrigger value="email" className="text-xs">
                <Mail className="h-3.5 w-3.5 mr-1.5" />
                Email Link
              </TabsTrigger>
              <TabsTrigger value="mobile" className="text-xs">
                <Smartphone className="h-3.5 w-3.5 mr-1.5" />
                Mobile Pay
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="card" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="text-xs font-medium mb-1 block">Card Number</label>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">CVC</label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div className="bg-blue-50 rounded p-2 flex text-xs text-blue-600">
                  <Info className="h-4 w-4 mr-2 shrink-0" />
                  <span>This is a demo. No actual payment will be processed.</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="email" className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium mb-1 block">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="bg-blue-50 rounded p-2 flex text-xs text-blue-600">
                  <Info className="h-4 w-4 mr-2 shrink-0" />
                  <span>We'll send a secure payment link to your email.</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mobile" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-around py-2">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#1677ff] text-white rounded-full flex items-center justify-center mx-auto mb-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 7V3.6C10.5 2.7 9.8 2 9 2H3.6C2.7 2 2 2.7 2 3.6V9C2 9.8 2.7 10.5 3.6 10.5H7M16.4 2H12.6C11.6 2 11 2.7 11 3.6V9C11 9.8 11.6 10.5 12.6 10.5H16.4C17.3 10.5 18 9.8 18 9V3.6C18 2.7 17.3 2 16.4 2ZM3.6 11H9C9.8 11 10.5 11.7 10.5 12.5V16M3.6 11C2.7 11 2 11.7 2 12.5V18C2 18.8 2.7 19.5 3.6 19.5H9C9.8 19.5 10.5 18.8 10.5 18V12.5M14 14.5V13.5C14 12.7 14.7 12 15.5 12H19.5C20.3 12 21 12.7 21 13.5V14.5M22 22V21C22 19.3 20.7 18 19 18H16C14.3 18 13 19.3 13 21V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs">PayNow</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#00457c] text-white rounded-full flex items-center justify-center mx-auto mb-1">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.12 4.64L13.59 17.19C13.4 17.9 12.8 18.1 12.21 17.78L8.72 15.1L7.03 16.73C6.83 16.93 6.65 17.1 6.27 17.1L6.54 13.52L14.26 6.46C14.57 6.19 14.2 6.04 13.79 6.31L4.39 12.38L0.931 11.3C0.231 11.09 0.221 10.42 1.071 10.09L16.04 3.54C16.63 3.33 17.15 3.83 17.12 4.64Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <span className="text-xs">Telegram</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-1">
                      <Zap className="h-5 w-5" />
                    </div>
                    <span className="text-xs">QuickPay</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded p-2 flex text-xs text-blue-600">
                  <Info className="h-4 w-4 mr-2 shrink-0" />
                  <span>Choose your preferred mobile payment method.</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex-col sm:flex-row sm:justify-end gap-2">
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handlePayment} 
              className="bg-ticket-purple hover:bg-ticket-purple/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay ${getTotalAmount().toFixed(2)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SeatSelection;
