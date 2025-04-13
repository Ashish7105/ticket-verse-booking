
import Dexie, { Table } from 'dexie';

// Define our types - we need to define them here instead of importing to avoid the errors
export interface Movie {
  id: string;
  title: string;
  genre: string;
  language: string;
  posterUrl: string;
  duration: string;
  rating: string;
  releaseDate: string;
  description: string;
}

export interface Theater {
  id: string;
  name: string;
  city: string;
  address: string;
}

export interface ShowTime {
  id: string;
  movieId: string;
  theaterId: string;
  date: string;
  time: string;
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: string;
  status: "available" | "selected" | "booked";
}

export interface Booking {
  id?: string;
  userId: string;
  movieId: string;
  theaterId: string;
  showTimeId: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
}

// Add user type for authentication
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
}

// Define our database
class TicketVerseDatabase extends Dexie {
  movies!: Table<Movie, string>;
  theaters!: Table<Theater, string>;
  showTimes!: Table<ShowTime, string>;
  seats!: Table<Seat, string>;
  bookings!: Table<Booking, string>;
  users!: Table<User, string>; // Add users table for authentication
  
  constructor() {
    super('ticketVerseDb');
    
    this.version(1).stores({
      movies: 'id, title, genre, language',
      theaters: 'id, name, city',
      showTimes: 'id, date, time',
      seats: 'id, row, number, status',
      bookings: '++id, movieId, theaterId, showTimeId, userId',
      users: 'id, email' // Add users table with email indexing for quick lookups
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

// Authentication operations
export const registerUser = async (name: string, email: string, password: string): Promise<string | null> => {
  try {
    // Check if user already exists
    const existingUser = await db.users.where('email').equals(email).first();
    if (existingUser) {
      return null; // User already exists
    }
    
    // Create new user
    const userId = `user-${Date.now()}`;
    await db.users.add({
      id: userId,
      name,
      email,
      password // In a real app, you'd hash this
    });
    
    return userId;
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
};

export const loginUser = async (email: string, password: string): Promise<User | null> => {
  try {
    // Find user by email
    const user = await db.users.where('email').equals(email).first();
    
    // Check if user exists and password matches
    if (user && user.password === password) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    }
    
    return null;
  } catch (error) {
    console.error('Error logging in user:', error);
    return null;
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
    const id = await db.bookings.add(booking);
    return id.toString();
  } catch (error) {
    console.error('Error saving booking:', error);
    throw error;
  }
};

export const getBookings = async (userId: string): Promise<Booking[]> => {
  return await db.bookings.where('userId').equals(userId).toArray();
};

export const updateSeatStatus = async (seatIds: string[], status: "available" | "selected" | "booked"): Promise<void> => {
  await db.transaction('rw', db.seats, async () => {
    for (const id of seatIds) {
      await db.seats.update(id, { status });
    }
  });
};
