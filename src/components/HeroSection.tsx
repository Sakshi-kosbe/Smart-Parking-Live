import { motion } from "framer-motion";
import { ArrowRight, MapPin, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "500+", label: "Parking Spots" },
  { value: "10K+", label: "Happy Users" },
  { value: "99.9%", label: "Uptime" },
];

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-primary/50 blur-3xl" />
    </div>

    <div className="container mx-auto px-4 py-24 relative z-10">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground/90 text-sm font-medium mb-6">
            <Zap className="h-3.5 w-3.5" /> IoT-Powered Smart Parking
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Find & Reserve Parking{" "}
            <span className="text-primary">In Seconds</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-xl mb-8">
            Real-time parking availability powered by IoT sensors. No more circling blocks—find, reserve, and navigate to your spot instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <Button size="lg" className="bg-gradient-primary text-primary-foreground gap-2" asChild>
            <Link to="/dashboard">
              Find Parking <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white" asChild>
            <Link to="/about">Learn More</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-display font-bold text-primary-foreground">{s.value}</div>
              <div className="text-sm text-primary-foreground/50">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
