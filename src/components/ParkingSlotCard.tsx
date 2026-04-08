import { motion } from "framer-motion";
import { Car, Zap, Accessibility } from "lucide-react";
import { ParkingSlot, getStatusColor } from "@/data/mockParkingData";
import { Button } from "@/components/ui/button";

interface Props {
  slot: ParkingSlot;
  onBook: (slot: ParkingSlot) => void;
}

const typeIcons = {
  standard: Car,
  compact: Car,
  ev: Zap,
  handicap: Accessibility,
};

const ParkingSlotCard = ({ slot, onBook }: Props) => {
  const Icon = typeIcons[slot.type];
  const statusLabels = { available: "Available", occupied: "Occupied", reserved: "Reserved" };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative p-4 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all ${
        slot.status === "occupied" ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-display font-bold text-lg">{slot.number}</span>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-primary-foreground ${getStatusColor(slot.status)}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse-slow" />
          {statusLabels[slot.status]}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Icon className="h-4 w-4" />
        <span className="capitalize">{slot.type}</span>
        <span className="text-xs">•</span>
        <span>Floor {slot.floor}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-semibold">${slot.pricePerHour}/hr</span>
        {slot.status === "available" && (
          <Button size="sm" className="bg-gradient-primary text-primary-foreground" onClick={() => onBook(slot)}>
            Book Now
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ParkingSlotCard;
