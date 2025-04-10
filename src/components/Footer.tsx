
import React from "react";
import { Film } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-muted py-6 mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Film className="h-5 w-5 text-ticket-purple" />
            <span className="text-lg font-bold text-white">TicketVerse</span>
          </div>

          <div className="text-sm text-ticket-gray">
            © {new Date().getFullYear()} TicketVerse. All rights reserved.
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-ticket-gray hover:text-white transition">
              Terms
            </a>
            <a href="#" className="text-ticket-gray hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="text-ticket-gray hover:text-white transition">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
