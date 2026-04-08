export type SlotStatus = "available" | "occupied" | "reserved";

export interface ParkingSlot {
  id: string;
  number: string;
  status: SlotStatus;
  floor: number;
  type: "standard" | "compact" | "ev" | "handicap";
  pricePerHour: number;
}

export interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  totalSlots: number;
  availableSlots: number;
  pricePerHour: number;
  distance: string;
  rating: number;
  slots: ParkingSlot[];
  features: string[];
}

const generateSlots = (total: number, available: number): ParkingSlot[] => {
  const slots: ParkingSlot[] = [];
  const types: ParkingSlot["type"][] = ["standard", "compact", "ev", "handicap"];
  for (let i = 1; i <= total; i++) {
    const status: SlotStatus = i <= available ? "available" : i <= available + 2 ? "reserved" : "occupied";
    slots.push({
      id: `slot-${i}`,
      number: `${String.fromCharCode(65 + Math.floor((i - 1) / 10))}${((i - 1) % 10) + 1}`,
      status,
      floor: Math.ceil(i / 10),
      type: types[i % types.length],
      pricePerHour: 2 + Math.floor(Math.random() * 3),
    });
  }
  return slots;
};

export const parkingLocations: ParkingLocation[] = [
  {
    id: "1", name: "Central Mall Parking", address: "123 Main Street, Downtown",
    lat: 40.7128, lng: -74.006, totalSlots: 30, availableSlots: 12,
    pricePerHour: 3, distance: "0.3 km", rating: 4.5,
    slots: generateSlots(30, 12),
    features: ["CCTV", "EV Charging", "Covered"],
  },
  {
    id: "2", name: "Tech Park Garage", address: "456 Innovation Drive",
    lat: 40.7148, lng: -74.002, totalSlots: 50, availableSlots: 23,
    pricePerHour: 2, distance: "0.8 km", rating: 4.2,
    slots: generateSlots(50, 23),
    features: ["24/7", "Security Guard", "Wheelchair Access"],
  },
  {
    id: "3", name: "Airport Long-Stay", address: "789 Airport Road",
    lat: 40.7108, lng: -74.012, totalSlots: 100, availableSlots: 45,
    pricePerHour: 5, distance: "2.1 km", rating: 4.7,
    slots: generateSlots(100, 45),
    features: ["Shuttle", "Covered", "CCTV", "EV Charging"],
  },
  {
    id: "4", name: "City Center Lot", address: "321 Broadway Ave",
    lat: 40.7158, lng: -74.008, totalSlots: 20, availableSlots: 5,
    pricePerHour: 4, distance: "0.5 km", rating: 4.0,
    slots: generateSlots(20, 5),
    features: ["Open Air", "CCTV"],
  },
  {
    id: "5", name: "Riverside Parking", address: "555 River Walk",
    lat: 40.7098, lng: -74.015, totalSlots: 40, availableSlots: 18,
    pricePerHour: 2.5, distance: "1.2 km", rating: 4.3,
    slots: generateSlots(40, 18),
    features: ["Covered", "Security Guard", "Wheelchair Access"],
  },
];

export const getStatusColor = (status: SlotStatus) => {
  switch (status) {
    case "available": return "bg-available";
    case "occupied": return "bg-occupied";
    case "reserved": return "bg-reserved";
  }
};
