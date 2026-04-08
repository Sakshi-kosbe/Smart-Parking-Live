import { motion } from "framer-motion";
import { Cpu, Wifi, Database, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  { icon: Wifi, title: "IoT Sensors", desc: "Ultrasonic sensors installed at each parking slot detect vehicle presence in real-time." },
  { icon: Database, title: "Data Processing", desc: "Sensor data is transmitted to our cloud backend for instant processing and analysis." },
  { icon: Cpu, title: "Smart Algorithm", desc: "AI-powered algorithms optimize slot allocation and predict availability patterns." },
  { icon: BarChart3, title: "Live Dashboard", desc: "Users see real-time availability, analytics, and can book slots instantly." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="font-display text-4xl font-bold mb-4">About SmartPark</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            An IoT-based smart parking system designed to solve urban parking challenges using real-time sensor data, intelligent algorithms, and a seamless user experience.
          </p>
        </motion.div>

        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-xl bg-card border border-border shadow-card"
              >
                <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-hero text-primary-foreground text-center">
          <h2 className="font-display text-2xl font-bold mb-3">The Problem We Solve</h2>
          <p className="opacity-80 max-w-xl mx-auto">
            Drivers spend an average of 17 minutes searching for parking. This wastes fuel, increases emissions, and causes traffic congestion. SmartPark eliminates this with real-time IoT-powered parking intelligence.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default About;
