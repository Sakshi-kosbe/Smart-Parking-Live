import { MapPin } from "lucide-react";
import { ParkingLocation } from "@/data/mockParkingData";

interface Props {
  locations: ParkingLocation[];
  selectedId?: string;
  onSelect: (loc: ParkingLocation) => void;
}

const MapPlaceholder = ({ locations, selectedId, onSelect }: Props) => (
  <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-muted border border-border">
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-20">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`h-${i}`} className="absolute w-full h-px bg-foreground/10" style={{ top: `${(i + 1) * 5}%` }} />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`v-${i}`} className="absolute h-full w-px bg-foreground/10" style={{ left: `${(i + 1) * 5}%` }} />
      ))}
    </div>

    {/* Simulated roads */}
    <div className="absolute top-1/2 left-0 right-0 h-3 bg-foreground/5 -translate-y-1/2" />
    <div className="absolute left-1/3 top-0 bottom-0 w-3 bg-foreground/5" />
    <div className="absolute left-2/3 top-0 bottom-0 w-3 bg-foreground/5" />

    {/* Location pins */}
    {locations.map((loc, i) => {
      const positions = [
        { top: "25%", left: "20%" },
        { top: "45%", left: "50%" },
        { top: "70%", left: "75%" },
        { top: "30%", left: "60%" },
        { top: "60%", left: "30%" },
      ];
      const pos = positions[i % positions.length];
      const isSelected = selectedId === loc.id;

      return (
        <button
          key={loc.id}
          onClick={() => onSelect(loc)}
          className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300 ${
            isSelected ? "scale-125 z-20" : "z-10 hover:scale-110"
          }`}
          style={pos}
        >
          <div className={`flex flex-col items-center ${isSelected ? "animate-bounce" : ""}`}>
            <div className={`px-2 py-1 rounded-lg text-xs font-medium mb-1 whitespace-nowrap ${
              isSelected ? "bg-primary text-primary-foreground" : "bg-card text-foreground shadow-card"
            }`}>
              {loc.availableSlots} spots
            </div>
            <MapPin className={`h-8 w-8 ${
              isSelected ? "text-primary fill-primary/20" : "text-destructive fill-destructive/20"
            }`} />
          </div>
        </button>
      );
    })}

    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur text-xs text-muted-foreground shadow-card">
      🗺️ Map View (Mock)
    </div>
  </div>
);

export default MapPlaceholder;
