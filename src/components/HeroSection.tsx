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
          <button
            type="button"
            tabIndex={0}
            aria-label="IoT-Powered Smart Parking — learn more"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                (e.currentTarget as HTMLButtonElement).click();
              }
            }}
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 text-primary text-sm font-semibold mb-6 border border-white shadow-glow dark:bg-primary dark:text-primary-foreground dark:border-primary/60 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_24px_hsl(var(--primary)/0.45)] focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background dark:focus-visible:ring-primary-foreground dark:focus-visible:ring-offset-background dark:hover:shadow-[0_0_28px_hsl(var(--primary)/0.6)]"
          >
            <Zap className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12 group-focus-visible:rotate-12" aria-hidden="true" /> IoT-Powered Smart Parking
          </button>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Find & Reserve Parking{" "}
            <span className="text-primary">In Seconds</span>
          </h1>
          <p className="text-lg text-primary-foreground/85 max-w-xl mb-8">
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
              <div className="text-sm text-primary-foreground/75">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
