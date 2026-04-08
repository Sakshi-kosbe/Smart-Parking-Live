import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapPlaceholder from "@/components/MapPlaceholder";
import ParkingLocationCard from "@/components/ParkingLocationCard";
import ParkingSlotCard from "@/components/ParkingSlotCard";
import BookingModal from "@/components/BookingModal";
import { parkingLocations, ParkingLocation, ParkingSlot } from "@/data/mockParkingData";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<ParkingLocation | null>(null);
  const [bookingSlot, setBookingSlot] = useState<ParkingSlot | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<"all" | "cheap" | "near">("all");
  const [liveLocations, setLiveLocations] = useState(parkingLocations);

  // Simulate IoT sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLocations((prev) =>
        prev.map((loc) => {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const newAvailable = Math.max(0, Math.min(loc.totalSlots, loc.availableSlots + delta));
          return {
            ...loc,
            availableSlots: newAvailable,
            slots: loc.slots.map((s, i) => ({
              ...s,
              status: i < newAvailable ? "available" as const : i < newAvailable + 2 ? "reserved" as const : "occupied" as const,
            })),
          };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtered = liveLocations
    .filter((l) => l.name.toLowerCase().includes(search.toLowerCase()) || l.address.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (filter === "cheap") return a.pricePerHour - b.pricePerHour;
      if (filter === "near") return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="font-display text-2xl font-bold mb-1">Find Parking</h1>
            <p className="text-muted-foreground text-sm">Real-time availability from IoT sensors</p>
          </motion.div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "cheap", "near"] as const).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  className={filter === f ? "bg-gradient-primary text-primary-foreground" : ""}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "All" : f === "cheap" ? "$ Low" : "Near Me"}
                </Button>
              ))}
              <Button size="sm" variant="outline" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="mb-8">
            <MapPlaceholder
              locations={filtered}
              selectedId={selectedLocation?.id}
              onSelect={setSelectedLocation}
            />
          </div>

          {/* Location cards or slot grid */}
          {selectedLocation ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display font-bold text-lg">{selectedLocation.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedLocation(null)}>
                  ← Back
                </Button>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mb-4">
                {[
                  { label: "Available", cls: "bg-available" },
                  { label: "Reserved", cls: "bg-reserved" },
                  { label: "Occupied", cls: "bg-occupied" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5 text-sm">
                    <span className={`h-3 w-3 rounded-full ${l.cls}`} />
                    <span className="text-muted-foreground">{l.label}</span>
                  </div>
                ))}
              </div>

              <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 max-w-xl"}`}>
                {(liveLocations.find((l) => l.id === selectedLocation.id)?.slots || selectedLocation.slots).map((slot) => (
                  <ParkingSlotCard key={slot.id} slot={slot} onBook={setBookingSlot} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((loc) => (
                <ParkingLocationCard key={loc.id} location={loc} onSelect={setSelectedLocation} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BookingModal
        slot={bookingSlot}
        locationName={selectedLocation?.name || ""}
        onClose={() => setBookingSlot(null)}
      />
      <Footer />
    </div>
  );
};

export default Dashboard;
