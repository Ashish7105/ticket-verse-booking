
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Film, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold">
                <span className="text-white">ticket</span>
                <span className="text-red-500">Verse</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              The ultimate destination for booking movie tickets and discovering events online.
            </p>
            <div className="flex space-x-3 mb-6">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Discover</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-red-400 text-sm">Movies</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-red-400 text-sm">Events</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-red-400 text-sm">Plays</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-red-400 text-sm">Sports</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-red-400 text-sm">Activities</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Help</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-red-400 text-sm">About Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-red-400 text-sm">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-red-400 text-sm">Terms & Conditions</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-red-400 text-sm">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-red-400 text-sm">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-4 w-4 mt-0.5 mr-2 text-red-400" />
                <span className="text-sm text-gray-400">support@ticketverse.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-4 w-4 mt-0.5 mr-2 text-red-400" />
                <span className="text-sm text-gray-400">+1 (234) 567-890</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mt-0.5 mr-2 text-red-400" />
                <span className="text-sm text-gray-400">
                  123 Entertainment Boulevard, 
                  <br />Hollywood, CA 90210
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} TicketVerse. All rights reserved.
            </div>
            <div className="flex space-x-4 text-xs text-gray-500">
              <Link to="#" className="hover:text-gray-300">Terms</Link>
              <Link to="#" className="hover:text-gray-300">Privacy</Link>
              <Link to="#" className="hover:text-gray-300">Cookies</Link>
              <Link to="#" className="hover:text-gray-300">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
