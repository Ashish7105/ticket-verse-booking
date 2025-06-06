
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { BookingProvider } from "@/context/BookingContext";
import { useEffect, useState } from "react";
import { initializeDatabase } from "@/services/localDatabase";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MovieSelection from "@/pages/MovieSelection";
import SeatSelection from "@/pages/SeatSelection";
import BookingConfirmation from "@/pages/BookingConfirmation";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const [databaseInitialized, setDatabaseInitialized] = useState(false);

  // Initialize the database on app startup
  useEffect(() => {
    const initDB = async () => {
      try {
        await initializeDatabase();
        console.log("Database initialized successfully");
        setDatabaseInitialized(true);
      } catch (error) {
        console.error("Database initialization failed:", error);
      }
    };
    
    initDB();
  }, []);

  if (!databaseInitialized) {
    return <div className="flex items-center justify-center h-screen">Initializing app...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BookingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="movies" element={<ProtectedRoute><MovieSelection /></ProtectedRoute>} />
                  <Route path="seats" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />
                  <Route path="confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </BookingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
