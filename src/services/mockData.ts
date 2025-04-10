
import { Booking } from "@/context/BookingContext";

// Explicitly define and export the types here
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

export const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];

export const movies: Movie[] = [
  {
    id: "movie1",
    title: "Inception",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    duration: "2h 28m",
    genre: "Sci-Fi, Action",
    rating: "8.8/10"
  },
  {
    id: "movie2",
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    duration: "2h 32m",
    genre: "Action, Crime, Drama",
    rating: "9.0/10"
  },
  {
    id: "movie3",
    title: "Interstellar",
    poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    duration: "2h 49m",
    genre: "Adventure, Drama, Sci-Fi",
    rating: "8.6/10"
  },
  {
    id: "movie4",
    title: "Dune",
    poster: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    duration: "2h 35m",
    genre: "Adventure, Drama, Sci-Fi",
    rating: "8.0/10"
  },
  {
    id: "movie5",
    title: "The Avengers",
    poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    duration: "2h 23m",
    genre: "Action, Adventure, Sci-Fi",
    rating: "8.0/10"
  },
  {
    id: "movie6",
    title: "Joker",
    poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    duration: "2h 2m",
    genre: "Crime, Drama, Thriller",
    rating: "8.4/10"
  }
];

export const theaters: { [city: string]: Theater[] } = {
  "New York": [
    {
      id: "ny-theater1",
      name: "AMC Empire 25",
      location: "234 W 42nd St",
      city: "New York"
    },
    {
      id: "ny-theater2",
      name: "Regal E-Walk",
      location: "247 W 42nd St",
      city: "New York"
    },
    {
      id: "ny-theater3",
      name: "IFC Center",
      location: "323 6th Ave",
      city: "New York"
    }
  ],
  "Los Angeles": [
    {
      id: "la-theater1",
      name: "TCL Chinese Theatre",
      location: "6925 Hollywood Blvd",
      city: "Los Angeles"
    },
    {
      id: "la-theater2",
      name: "ArcLight Hollywood",
      location: "6360 Sunset Blvd",
      city: "Los Angeles"
    },
    {
      id: "la-theater3",
      name: "The Landmark",
      location: "10850 W Pico Blvd",
      city: "Los Angeles"
    }
  ],
  "Chicago": [
    {
      id: "chi-theater1",
      name: "AMC River East 21",
      location: "322 E Illinois St",
      city: "Chicago"
    },
    {
      id: "chi-theater2",
      name: "Showplace ICON",
      location: "1011 S Delano Ct",
      city: "Chicago"
    }
  ],
  "Houston": [
    {
      id: "hou-theater1",
      name: "Edwards Greenway Grand Palace",
      location: "3839 Weslayan St",
      city: "Houston"
    },
    {
      id: "hou-theater2",
      name: "AMC Studio 30",
      location: "2949 Dunvale Rd",
      city: "Houston"
    }
  ],
  "Miami": [
    {
      id: "mia-theater1",
      name: "Silverspot Cinema",
      location: "300 SE 3rd St",
      city: "Miami"
    },
    {
      id: "mia-theater2",
      name: "AMC Aventura 24",
      location: "19501 Biscayne Blvd",
      city: "Miami"
    }
  ]
};

export const showTimes: ShowTime[] = [
  { id: "st1", time: "10:00 AM", date: "2025-04-10", price: 10.50 },
  { id: "st2", time: "1:30 PM", date: "2025-04-10", price: 12.50 },
  { id: "st3", time: "4:15 PM", date: "2025-04-10", price: 14.00 },
  { id: "st4", time: "7:00 PM", date: "2025-04-10", price: 15.50 },
  { id: "st5", time: "9:45 PM", date: "2025-04-10", price: 15.50 },
  { id: "st6", time: "11:00 AM", date: "2025-04-11", price: 10.50 },
  { id: "st7", time: "2:00 PM", date: "2025-04-11", price: 12.50 },
  { id: "st8", time: "5:15 PM", date: "2025-04-11", price: 14.00 },
];

export const generateSeats = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  const seats: Seat[] = [];

  rows.forEach(row => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const status = Math.random() < 0.2 ? "booked" : "available"; // 20% chance of being booked
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        status
      });
    }
  });

  return seats;
};

export const getMovies = (): Promise<Movie[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(movies);
    }, 500);
  });
};

export const getTheaters = (city: string): Promise<Theater[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(theaters[city] || []);
    }, 500);
  });
};

export const getShowTimes = (): Promise<ShowTime[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(showTimes);
    }, 500);
  });
};

export const getSeats = (): Promise<Seat[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(generateSeats());
    }, 500);
  });
};

export const sendConfirmationEmail = (email: string, bookingDetails: any): Promise<boolean> => {
  return new Promise(resolve => {
    // This would be integrated with a real email service in production
    console.log("Sending email to:", email, "with details:", bookingDetails);
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
