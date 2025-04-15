
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { BookingProvider } from "@/context/BookingContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import MovieSelection from "@/pages/MovieSelection";
import SeatSelection from "@/pages/SeatSelection";
import BookingConfirmation from "@/pages/BookingConfirmation";
import Profile from "@/pages/Profile";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <BookingProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/movies" element={<MovieSelection />} />
                <Route path="/seats" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />
                <Route path="/confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/events" element={<Index />} />
                <Route path="/plays" element={<Index />} />
                <Route path="/offers" element={<Index />} />
                <Route path="/gift-cards" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
          <Toaster />
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
