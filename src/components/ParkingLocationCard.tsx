import { motion } from "framer-motion";
import { MapPin, Star, Car } from "lucide-react";
import { ParkingLocation } from "@/data/mockParkingData";
import { Button } from "@/components/ui/button";

interface Props {
  location: ParkingLocation;
  onSelect: (loc: ParkingLocation) => void;
}

const ParkingLocationCard = ({ location, onSelect }: Props) => {
  const availability = Math.round((location.availableSlots / location.totalSlots) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all cursor-pointer"
      onClick={() => onSelect(location)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-semibold text-base">{location.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="h-3.5 w-3.5" /> {location.address}
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-reserved text-reserved" />
          <span className="font-medium">{location.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5 text-sm">
          <Car className="h-4 w-4 text-available" />
          <span className="font-medium text-available">{location.availableSlots}</span>
          <span className="text-muted-foreground">/ {location.totalSlots}</span>
        </div>
        <span className="text-sm text-muted-foreground">{location.distance}</span>
        <span className="text-sm font-semibold">${location.pricePerHour}/hr</span>
      </div>

      <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-3">
        <div
          className="h-full rounded-full bg-gradient-primary transition-all duration-500"
          style={{ width: `${availability}%` }}
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {location.features.map((f) => (
          <span key={f} className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground">{f}</span>
        ))}
      </div>
    </motion.div>
  );
};

export default ParkingLocationCard;
