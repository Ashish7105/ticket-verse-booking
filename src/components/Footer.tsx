
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Film, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Headphones,
  Send,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-primary/90 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white max-w-md">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-white/80 text-sm">
                Subscribe to our newsletter for exclusive offers, movie updates, and special events.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto max-w-md">
              <div className="relative flex-grow">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/10 border-white/20 placeholder:text-white/50 text-white rounded-full pr-10" 
                />
                <Button className="absolute right-0 top-0 h-full rounded-full px-3 bg-white/20 hover:bg-white/30">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">
                <span className="text-white">Ticket</span>
                <span className="text-primary">Verse</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              The ultimate destination for booking movie tickets and discovering events online.
            </p>
            <div className="flex space-x-3 mb-6">
              <a href="#" className="bg-gray-800 hover:bg-primary/20 hover:text-primary p-2 rounded-full transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary/20 hover:text-primary p-2 rounded-full transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary/20 hover:text-primary p-2 rounded-full transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary/20 hover:text-primary p-2 rounded-full transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Discover</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary text-sm flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden" />
                  Movies
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary text-sm flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden" />
                  Events
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary text-sm flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden" />
                  Plays
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary text-sm flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden" />
                  Sports
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary text-sm flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden" />
                  Activities
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary text-sm flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary text-sm flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary text-sm flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary text-sm flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary text-sm flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden" />
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <Mail className="h-4 w-4 mt-0.5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">support@ticketverse.com</span>
              </li>
              <li className="flex items-start group">
                <Phone className="h-4 w-4 mt-0.5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">+1 (234) 567-890</span>
              </li>
              <li className="flex items-start group">
                <MapPin className="h-4 w-4 mt-0.5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
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
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <Link to="#" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-primary transition-colors">Cookies</Link>
              <Link to="#" className="hover:text-primary transition-colors">Accessibility</Link>
              <div className="flex items-center text-gray-400">
                <span>Made with</span>
                <Heart className="h-3 w-3 mx-1 text-primary" />
                <span>by TicketVerse Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
