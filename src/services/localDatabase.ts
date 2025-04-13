
import Dexie, { Table } from 'dexie';
import { Movie as MockMovie, Theater as MockTheater, ShowTime as MockShowTime, Seat as MockSeat, movies, theaters, showTimes, generateSeats } from './mockData';

// Define our database types
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
  // Add poster field to match mockData
  poster: string;
}

export interface Theater {
  id: string;
  name: string;
  city: string;
  address: string;
  // Add location field to match mockData
  location: string;
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
  // Change number to string to match database schema
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

// Convert mock data to database schema
const convertMovies = (mockMovies: MockMovie[]): Movie[] => {
  return mockMovies.map(movie => ({
    id: movie.id,
    title: movie.title,
    genre: movie.genre,
    language: movie.language,
    posterUrl: movie.poster, // Use poster as posterUrl
    duration: movie.duration,
    rating: movie.rating,
    releaseDate: '2023-01-01', // Default value since mock doesn't have this
    description: movie.genre, // Use genre as description since mock doesn't have this
    poster: movie.poster // Keep the poster field for compatibility
  }));
};

const convertTheaters = (mockTheaterArray: MockTheater[]): Theater[] => {
  return mockTheaterArray.map(theater => ({
    id: theater.id,
    name: theater.name,
    city: theater.city,
    address: theater.location, // Use location as address
    location: theater.location // Keep the location field for compatibility
  }));
};

const convertShowTimes = (mockShowTimes: MockShowTime[]): ShowTime[] => {
  // Add dummy movie and theater IDs for the mock data
  return mockShowTimes.map((showTime, index) => ({
    id: showTime.id,
    movieId: `movie${(index % 6) + 1}`, // Cycle through 6 movies
    theaterId: `ny-theater${(index % 3) + 1}`, // Cycle through 3 theaters
    date: showTime.date,
    time: showTime.time,
    price: showTime.price
  }));
};

const convertSeats = (mockSeats: MockSeat[]): Seat[] => {
  return mockSeats.map(seat => ({
    id: seat.id,
    row: seat.row,
    number: seat.number.toString(), // Convert number to string
    status: seat.status
  }));
};

// Initialize the database with sample data from mockData
export const initializeDatabase = async (): Promise<void> => {
  try {
    // Check if the database is already populated
    const moviesCount = await db.movies.count();
    
    if (moviesCount === 0) {
      console.log('Initializing local database with sample data...');
      
      // Convert and add movies
      const dbMovies = convertMovies(movies);
      await db.movies.bulkAdd(dbMovies);
      
      // Convert and add theaters
      const allTheaters: MockTheater[] = [];
      Object.values(theaters).forEach(theaterArray => {
        allTheaters.push(...theaterArray);
      });
      const dbTheaters = convertTheaters(allTheaters);
      await db.theaters.bulkAdd(dbTheaters);
      
      // Convert and add showtimes
      const dbShowTimes = convertShowTimes(showTimes);
      await db.showTimes.bulkAdd(dbShowTimes);
      
      // Convert and add seats
      const mockSeats = generateSeats();
      const dbSeats = convertSeats(mockSeats);
      await db.seats.bulkAdd(dbSeats);
      
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
      console.log('User already exists:', email);
      return null; // User already exists
    }
    
    // Create new user
    const userId = `user-${Date.now()}`;
    const newUser = {
      id: userId,
      name,
      email,
      password // In a real app, you'd hash this
    };
    
    await db.users.add(newUser);
    console.log('User registered successfully:', email);
    
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
    
    if (!user) {
      console.log('User not found:', email);
      return null;
    }
    
    // Check if password matches
    if (user.password === password) {
      console.log('Login successful for:', email);
      // Don't return the password to the client
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: '' // We still need to include this for TypeScript, but it's empty
      };
    }
    
    console.log('Invalid password for:', email);
    return null;
  } catch (error) {
    console.error('Error logging in user:', error);
    return null;
  }
};

// Convert database Movie to mockData Movie for frontend compatibility
const toMockMovie = (dbMovie: Movie): MockMovie => {
  return {
    id: dbMovie.id,
    title: dbMovie.title,
    poster: dbMovie.poster || dbMovie.posterUrl,
    duration: dbMovie.duration,
    genre: dbMovie.genre,
    rating: dbMovie.rating,
    language: dbMovie.language
  };
};

// Convert database Theater to mockData Theater for frontend compatibility
const toMockTheater = (dbTheater: Theater): MockTheater => {
  return {
    id: dbTheater.id,
    name: dbTheater.name,
    location: dbTheater.location || dbTheater.address,
    city: dbTheater.city
  };
};

// Convert database Seat to mockData Seat for frontend compatibility
const toMockSeat = (dbSeat: Seat): MockSeat => {
  return {
    id: dbSeat.id,
    row: dbSeat.row,
    number: parseInt(dbSeat.number),
    status: dbSeat.status
  };
};

// Database operations for movies
export const getMoviesFromDB = async (): Promise<MockMovie[]> => {
  const dbMovies = await db.movies.toArray();
  return dbMovies.map(toMockMovie);
};

// Database operations for theaters
export const getTheatersFromDB = async (city: string): Promise<MockTheater[]> => {
  const dbTheaters = await db.theaters.where('city').equals(city).toArray();
  return dbTheaters.map(toMockTheater);
};

// Database operations for showtimes
export const getShowTimesFromDB = async (): Promise<MockShowTime[]> => {
  const dbShowTimes = await db.showTimes.toArray();
  return dbShowTimes.map(showTime => ({
    id: showTime.id,
    time: showTime.time,
    date: showTime.date,
    price: showTime.price
  }));
};

// Database operations for seats
export const getSeatsFromDB = async (): Promise<MockSeat[]> => {
  const dbSeats = await db.seats.toArray();
  return dbSeats.map(toMockSeat);
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
