import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, CreditCard, QrCode, CheckCircle2 } from "lucide-react";
import { ParkingSlot } from "@/data/mockParkingData";
import { Button } from "@/components/ui/button";

interface Props {
  slot: ParkingSlot | null;
  locationName: string;
  onClose: () => void;
}

const BookingModal = ({ slot, locationName, onClose }: Props) => {
  const [step, setStep] = useState<"details" | "confirmed">("details");
  const [duration, setDuration] = useState(2);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (step === "confirmed") {
      setCountdown(duration * 3600);
      const timer = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
      return () => clearInterval(timer);
    }
  }, [step, duration]);

  if (!slot) return null;

  const cost = (slot.pricePerHour * duration).toFixed(2);
  const hrs = Math.floor(countdown / 3600);
  const mins = Math.floor((countdown % 3600) / 60);
  const secs = countdown % 60;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-2xl shadow-lg w-full max-w-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl">
                {step === "confirmed" ? "Booking Confirmed!" : "Book Slot"}
              </h2>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            {step === "details" ? (
              <>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{locationName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Slot</span>
                    <span className="font-display font-bold text-lg">{slot.number}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="capitalize">{slot.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate</span>
                    <span>${slot.pricePerHour}/hr</span>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Duration (hours)</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 8].map((h) => (
                        <button
                          key={h}
                          onClick={() => setDuration(h)}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                            duration === h
                              ? "bg-gradient-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-accent"
                          }`}
                        >
                          {h}h
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Cost</span>
                    <span className="font-display font-bold text-2xl">${cost}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-primary text-primary-foreground gap-2" size="lg" onClick={() => setStep("confirmed")}>
                  <CreditCard className="h-4 w-4" /> Confirm & Pay
                </Button>
              </>
            ) : (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-available/20 mb-4"
                >
                  <CheckCircle2 className="h-10 w-10 text-available" />
                </motion.div>

                <p className="text-muted-foreground mb-6">Slot <strong>{slot.number}</strong> at <strong>{locationName}</strong></p>

                <div className="p-4 rounded-xl bg-muted mb-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Time Remaining</span>
                  </div>
                  <span className="font-display font-bold text-3xl">
                    {String(hrs).padStart(2, "0")}:{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-border mb-6 flex flex-col items-center">
                  <QrCode className="h-24 w-24 text-foreground/30 mb-2" />
                  <span className="text-xs text-muted-foreground">Scan for parking entry</span>
                </div>

                <Button variant="outline" className="w-full" onClick={onClose}>
                  Done
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
