import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { MapPin } from "lucide-react";
import { ParkingLocation } from "@/data/mockParkingData";

interface Props {
  locations: ParkingLocation[];
  selectedId?: string;
  onSelect: (loc: ParkingLocation) => void;
}

const MapPlaceholder = ({ locations, selectedId, onSelect }: Props) => {
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const initialFocus = Math.max(
    0,
    locations.findIndex((l) => l.id === selectedId),
  );
  const [activeIndex, setActiveIndex] = useState(initialFocus === -1 ? 0 : initialFocus);

  useEffect(() => {
    if (activeIndex >= locations.length) setActiveIndex(0);
  }, [locations.length, activeIndex]);

  const focusIndex = (i: number) => {
    setActiveIndex(i);
    buttonsRef.current[i]?.focus();
  };

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = locations.length - 1;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusIndex(i === last ? 0 : i + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusIndex(i === 0 ? last : i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusIndex(0);
        break;
      case "End":
        e.preventDefault();
        focusIndex(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onSelect(locations[i]);
        break;
    }
  };

  return (
    <div
      role="region"
      aria-label="Parking locations map. Use arrow keys to move between pins, Enter or Space to select."
      className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-muted border border-border"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px bg-foreground/10" style={{ top: `${(i + 1) * 5}%` }} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px bg-foreground/10" style={{ left: `${(i + 1) * 5}%` }} />
        ))}
      </div>

      {/* Simulated roads */}
      <div aria-hidden="true" className="absolute top-1/2 left-0 right-0 h-3 bg-foreground/5 -translate-y-1/2" />
      <div aria-hidden="true" className="absolute left-1/3 top-0 bottom-0 w-3 bg-foreground/5" />
      <div aria-hidden="true" className="absolute left-2/3 top-0 bottom-0 w-3 bg-foreground/5" />

      {/* Location pins (roving tabindex listbox) */}
      <ul
        role="listbox"
        aria-label="Parking locations"
        aria-activedescendant={locations[activeIndex] ? `map-pin-${locations[activeIndex].id}` : undefined}
        className="contents"
      >
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
          const isActive = activeIndex === i;

          return (
            <li key={loc.id} role="presentation" className="contents">
              <button
                id={`map-pin-${loc.id}`}
                ref={(el) => (buttonsRef.current[i] = el)}
                role="option"
                aria-selected={isSelected}
                aria-label={`${loc.name}, ${loc.availableSlots} spots available. ${loc.address}.`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  setActiveIndex(i);
                  onSelect(loc);
                }}
                onFocus={() => setActiveIndex(i)}
                onKeyDown={(e) => handleKey(e, i)}
                className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
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
                  <MapPin
                    aria-hidden="true"
                    className={`h-8 w-8 ${
                      isSelected ? "text-primary fill-primary/20" : "text-destructive fill-destructive/20"
                    }`}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur text-xs text-muted-foreground shadow-card hidden sm:block">
        ← → arrows to move • Enter to select
      </div>
      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur text-xs text-muted-foreground shadow-card">
        🗺️ Map View (Mock)
      </div>
    </div>
  );
};

export default MapPlaceholder;
