import { Car } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background dark:bg-card dark:text-foreground border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <Car className="h-5 w-5" /> SmartPark
          </div>
          <p className="text-sm opacity-70">IoT-based smart parking solution for modern cities.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-80">Product</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/dashboard" className="hover:opacity-100 transition-opacity">Dashboard</Link>
            <Link to="/about" className="hover:opacity-100 transition-opacity">About</Link>
            <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-80">Features</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span>Real-time Tracking</span>
            <span>Smart Booking</span>
            <span>IoT Sensors</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-80">Contact</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span>hello@smartpark.io</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 dark:border-border mt-8 pt-6 text-center text-xs opacity-50">
        © 2026 SmartPark. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
