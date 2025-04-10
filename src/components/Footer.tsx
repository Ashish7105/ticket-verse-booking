
import React from "react";
import { Film, Twitter, Instagram, Facebook, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Film className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-slate-900">TicketVerse</span>
            </div>
            <p className="text-slate-600 text-sm max-w-xs">
              The ultimate platform for booking movie tickets online. Experience cinema like never before.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-primary">Home</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary">Movies</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary">Theaters</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary">Promotions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-primary">Help Center</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary">FAQs</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary">Ticket Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary">Cookie Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-primary">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} TicketVerse. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <select className="bg-white text-slate-600 text-sm border border-slate-200 rounded-md p-1">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
