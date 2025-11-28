export type UserRole = "admin" | "coach" | "student";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export interface Coach extends User {
  role: "coach";
  description: string;
  gameCategories: string[];
  rating: number;
  studentCount: number;
  hourlyRate: number;
  experience: string;
  availableSlots: TimeSlot[];
  reviews: Review[];
}

export interface TimeSlot {
  id: string;
  coachId: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Review {
  id: string;
  coachId: string;
  studentId: string;
  studentName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
  message: string;
  featured?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface GameCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Booking {
  id: string;
  studentId: string;
  coachId: string;
  coachName: string;
  timeSlot: TimeSlot;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}
