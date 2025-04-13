
import Dexie, { Table } from 'dexie';
import { Movie, Theater, ShowTime, Seat, Booking } from "@/context/BookingContext";

// Define our database
class TicketVerseDatabase extends Dexie {
  movies!: Table<Movie, string>;
  theaters!: Table<Theater, string>;
  showTimes!: Table<ShowTime, string>;
  seats!: Table<Seat, string>;
  bookings!: Table<Booking & { id?: string }, string>;
  
  constructor() {
    super('ticketVerseDb');
    
    this.version(1).stores({
      movies: 'id, title, genre, language',
      theaters: 'id, name, city',
      showTimes: 'id, date, time',
      seats: 'id, row, number, status',
      bookings: '++id, movieId, theaterId, showTimeId'
    });
  }
}

export const db = new TicketVerseDatabase();

// Initialize the database with sample data from mockData
import { movies, theaters, showTimes, generateSeats } from './mockData';

export const initializeDatabase = async (): Promise<void> => {
  try {
    // Check if the database is already populated
    const moviesCount = await db.movies.count();
    
    if (moviesCount === 0) {
      console.log('Initializing local database with sample data...');
      
      // Add movies
      await db.movies.bulkAdd(movies);
      
      // Add theaters (flatten the theaters object)
      const allTheaters: Theater[] = [];
      Object.values(theaters).forEach(theaterArray => {
        allTheaters.push(...theaterArray);
      });
      await db.theaters.bulkAdd(allTheaters);
      
      // Add showtimes
      await db.showTimes.bulkAdd(showTimes);
      
      // Generate and add seats
      const seats = generateSeats();
      await db.seats.bulkAdd(seats);
      
      console.log('Database initialization complete!');
    } else {
      console.log('Database already initialized.');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Database operations for movies
export const getMoviesFromDB = async (): Promise<Movie[]> => {
  return await db.movies.toArray();
};

// Database operations for theaters
export const getTheatersFromDB = async (city: string): Promise<Theater[]> => {
  return await db.theaters.where('city').equals(city).toArray();
};

// Database operations for showtimes
export const getShowTimesFromDB = async (): Promise<ShowTime[]> => {
  return await db.showTimes.toArray();
};

// Database operations for seats
export const getSeatsFromDB = async (): Promise<Seat[]> => {
  return await db.seats.toArray();
};

// Database operations for bookings
export const saveBooking = async (booking: Booking): Promise<string> => {
  try {
    const id = await db.bookings.add(booking as (Booking & { id?: string }));
    return id.toString();
  } catch (error) {
    console.error('Error saving booking:', error);
    throw error;
  }
};

export const getBookings = async (): Promise<(Booking & { id: string })[]> => {
  return await db.bookings.toArray();
};

export const updateSeatStatus = async (seatIds: string[], status: "available" | "selected" | "booked"): Promise<void> => {
  await db.transaction('rw', db.seats, async () => {
    for (const id of seatIds) {
      await db.seats.update(id, { status });
    }
  });
};
