import { motion } from "framer-motion";
import { MapPin, Clock, Shield, Wifi, Navigation, CreditCard } from "lucide-react";

const features = [
  { icon: MapPin, title: "Live Availability", desc: "See which spots are free in real-time with IoT sensors." },
  { icon: Clock, title: "Instant Booking", desc: "Reserve your slot in seconds with countdown timer." },
  { icon: Navigation, title: "Smart Navigation", desc: "Get turn-by-turn directions to your parking spot." },
  { icon: Shield, title: "Secure Parking", desc: "CCTV monitored with 24/7 security and insurance." },
  { icon: Wifi, title: "IoT Sensors", desc: "Ultrasonic sensors detect occupancy with 99.9% accuracy." },
  { icon: CreditCard, title: "Easy Payment", desc: "Contactless payment with QR codes and digital wallets." },
];

const FeaturesSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-display text-3xl font-bold mb-3">Why SmartPark?</h2>
        <p className="text-muted-foreground max-w-md mx-auto">Cutting-edge IoT technology meets seamless user experience.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 group"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
              <f.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
