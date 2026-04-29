import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, CreditCard, QrCode, CheckCircle2 } from "lucide-react";
import { ParkingSlot } from "@/data/mockParkingData";
import { Button } from "@/components/ui/button";

interface Props {
  slot: ParkingSlot | null;
  locationName: string;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const BookingModal = ({ slot, locationName, onClose }: Props) => {
  const [step, setStep] = useState<"details" | "confirmed">("details");
  const [duration, setDuration] = useState(2);
  const [countdown, setCountdown] = useState(0);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (step === "confirmed") {
      setCountdown(duration * 3600);
      const timer = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
      return () => clearInterval(timer);
    }
  }, [step, duration]);

  // Reset step when modal closes / re-opens with a new slot
  useEffect(() => {
    if (slot) setStep("details");
  }, [slot?.id]);

  // Focus management: capture trigger, focus dialog, lock body scroll, restore on close
  useEffect(() => {
    if (!slot) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    // Focus first focusable in dialog (after mount)
    const id = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      (focusables[0] ?? dialog).focus();
    }, 0);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = prevOverflow;
      // Restore focus to the element that opened the modal (e.g. the "Book Now" button)
      const target = previouslyFocusedRef.current;
      if (target && typeof target.focus === "function") {
        // Defer so the trigger is back in the DOM and not aria-hidden
        window.setTimeout(() => target.focus(), 0);
      }
    };
  }, [slot?.id]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab") return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusables = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
    );
    if (focusables.length === 0) {
      e.preventDefault();
      dialog.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
      if (active === first || !dialog.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!slot) return null;

  const cost = (slot.pricePerHour * duration).toFixed(2);
  const hrs = Math.floor(countdown / 3600);
  const mins = Math.floor((countdown % 3600) / 60);
  const secs = countdown % 60;

  const titleId = "booking-modal-title";

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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          className="bg-card rounded-2xl shadow-lg w-full max-w-md overflow-hidden focus:outline-none"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 id={titleId} className="font-display font-bold text-xl">
                {step === "confirmed" ? "Booking Confirmed!" : "Book Slot"}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close booking dialog"
                className="p-1 rounded-lg hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X className="h-5 w-5" aria-hidden="true" />
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
                    <label className="text-sm text-muted-foreground mb-2 block" id="duration-label">
                      Duration (hours)
                    </label>
                    <div className="flex gap-2" role="radiogroup" aria-labelledby="duration-label">
                      {[1, 2, 3, 4, 8].map((h) => (
                        <button
                          key={h}
                          role="radio"
                          aria-checked={duration === h}
                          onClick={() => setDuration(h)}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
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
                  <CheckCircle2 className="h-10 w-10 text-available" aria-hidden="true" />
                </motion.div>

                <p className="text-muted-foreground mb-6">Slot <strong>{slot.number}</strong> at <strong>{locationName}</strong></p>

                <div className="p-4 rounded-xl bg-muted mb-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground">Time Remaining</span>
                  </div>
                  <span className="font-display font-bold text-3xl" aria-live="polite">
                    {String(hrs).padStart(2, "0")}:{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-border mb-6 flex flex-col items-center">
                  <QrCode className="h-24 w-24 text-foreground/30 mb-2" aria-hidden="true" />
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
