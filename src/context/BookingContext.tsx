
import React, { createContext, useState, useContext } from "react";

export interface Movie {
  id: string;
  title: string;
  poster: string;
  duration: string;
  genre: string;
  rating: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  city: string;
}

export interface ShowTime {
  id: string;
  time: string;
  date: string;
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: "available" | "selected" | "booked";
}

export interface Booking {
  movieId?: string;
  theaterId?: string;
  showTimeId?: string;
  selectedSeats: Seat[];
  totalAmount: number;
}

interface BookingContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedTheater: Theater | null;
  setSelectedTheater: (theater: Theater | null) => void;
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  selectedShowTime: ShowTime | null;
  setSelectedShowTime: (showTime: ShowTime | null) => void;
  booking: Booking;
  updateBooking: (booking: Partial<Booking>) => void;
  resetBooking: () => void;
  selectedSeats: Seat[];
  setSelectedSeats: (seats: Seat[]) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [booking, setBooking] = useState<Booking>({
    selectedSeats: [],
    totalAmount: 0,
  });

  const updateBooking = (newBookingData: Partial<Booking>) => {
    setBooking((prev) => ({ ...prev, ...newBookingData }));
  };

  const resetBooking = () => {
    setSelectedCity("");
    setSelectedTheater(null);
    setSelectedMovie(null);
    setSelectedShowTime(null);
    setSelectedSeats([]);
    setBooking({
      selectedSeats: [],
      totalAmount: 0,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        selectedTheater,
        setSelectedTheater,
        selectedMovie,
        setSelectedMovie,
        selectedShowTime,
        setSelectedShowTime,
        booking,
        updateBooking,
        resetBooking,
        selectedSeats,
        setSelectedSeats,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
