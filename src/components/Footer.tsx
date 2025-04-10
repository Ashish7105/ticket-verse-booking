
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Film } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">
                <span className="text-white">ticket</span>
                <span className="text-red-500">Verse</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs mb-6">
              The ultimate platform for booking movie tickets online. Experience cinema like never before.
            </p>
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-white mb-2">Customer Care</h3>
              <p className="text-sm">
                <a href="mailto:help@ticketverse.com" className="text-red-400 hover:text-red-300">help@ticketverse.com</a>
              </p>
              <p className="text-sm">
                <a href="tel:+1234567890" className="text-red-400 hover:text-red-300">+1 (234) 567-890</a>
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-3 text-sm uppercase">Movies</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-red-400">Upcoming Movies</a></li>
              <li><a href="#" className="text-slate-400 hover:text-red-400">Now Showing</a></li>
              <li><a href="#" className="text-slate-400 hover:text-red-400">Cinemas</a></li>
              <li><a href="#" className="text-slate-400 hover:text-red-400">Movie Trailers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-3 text-sm uppercase">Events</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-red-400">Concerts</a></li>
              <li><a href="#" className="text-slate-400 hover:text-red-400">Comedy Shows</a></li>
              <li><a href="#" className="text-slate-400 hover:text-red-400">Workshops</a></li>
              <li><a href="#" className="text-slate-400 hover:text-red-400">Sports</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-3 text-sm uppercase">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-red-400">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-red-400">Contact Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-red-400">Terms of Use</a></li>
              <li><a href="#" className="text-slate-400 hover:text-red-400">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-red-400">FAQs</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} TicketVerse. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 text-xs text-slate-500">
            Designed & Developed with ❤️ by TicketVerse Team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
