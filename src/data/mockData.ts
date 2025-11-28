import { Coach, Event, Offer, GameCategory } from "@/types";

export const mockGameCategories: GameCategory[] = [
  { id: "1", name: "League of Legends", icon: "⚔️", description: "MOBA strategy game" },
  { id: "2", name: "CS:GO", icon: "🎯", description: "Tactical shooter" },
  { id: "3", name: "Valorant", icon: "🔫", description: "5v5 tactical shooter" },
  { id: "4", name: "Fortnite", icon: "🏆", description: "Battle royale" },
  { id: "5", name: "Dota 2", icon: "⚡", description: "MOBA game" },
  { id: "6", name: "Overwatch", icon: "🎮", description: "Team-based shooter" },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Championship 2024",
    date: "2024-07-15",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    message: "Join us for the biggest esports tournament of the year!",
    featured: true,
  },
  {
    id: "2",
    title: "Pro Coaching Webinar",
    date: "2024-06-20",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
    message: "Learn advanced strategies from top coaches",
  },
  {
    id: "3",
    title: "New Season Launch",
    date: "2024-08-01",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    message: "Celebrate the launch of our new coaching season",
  },
];

export const mockOffers: Offer[] = [
  {
    id: "1",
    title: "Starter Pack",
    description: "Perfect for beginners",
    price: 29.99,
    features: ["3 coaching sessions", "Basic game analysis", "Email support", "Community access"],
  },
  {
    id: "2",
    title: "Pro Pack",
    description: "For serious competitors",
    price: 79.99,
    features: [
      "10 coaching sessions",
      "Advanced game analysis",
      "Priority support",
      "VOD reviews",
      "1-on-1 mentoring",
    ],
    popular: true,
  },
  {
    id: "3",
    title: "Elite Pack",
    description: "Maximum improvement",
    price: 149.99,
    features: [
      "Unlimited coaching",
      "Premium analysis tools",
      "24/7 support",
      "Custom training plans",
      "Tournament prep",
      "Team coaching",
    ],
  },
];

export const mockCoaches: Coach[] = [
  {
    id: "1",
    email: "alex.pro@esperia.com",
    firstName: "Alex",
    lastName: "Johnson",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
    role: "coach",
    description:
      "Professional League of Legends coach with 5+ years experience. Former Diamond player specializing in mid-lane mechanics and macro strategy.",
    gameCategories: ["League of Legends", "Valorant"],
    rating: 4.8,
    studentCount: 127,
    hourlyRate: 45,
    experience: "5+ years",
    availableSlots: [
      {
        id: "s1",
        coachId: "1",
        date: "2024-06-15",
        startTime: "14:00",
        endTime: "15:00",
        available: true,
      },
      {
        id: "s2",
        coachId: "1",
        date: "2024-06-15",
        startTime: "16:00",
        endTime: "17:00",
        available: true,
      },
      {
        id: "s3",
        coachId: "1",
        date: "2024-06-16",
        startTime: "10:00",
        endTime: "11:00",
        available: true,
      },
    ],
    reviews: [
      {
        id: "r1",
        coachId: "1",
        studentId: "s1",
        studentName: "Mike Chen",
        rating: 5,
        comment: "Alex helped me climb from Gold to Platinum in just 2 weeks! Excellent coach.",
        createdAt: "2024-05-10",
      },
      {
        id: "r2",
        coachId: "1",
        studentId: "s2",
        studentName: "Sarah Kim",
        rating: 4.5,
        comment: "Great insights on wave management and trading patterns.",
        createdAt: "2024-05-15",
      },
    ],
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    email: "emma.striker@esperia.com",
    firstName: "Emma",
    lastName: "Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    role: "coach",
    description:
      "CS:GO veteran and Valorant expert. Specializing in aim training, positioning, and team coordination. Let's take your FPS skills to the next level!",
    gameCategories: ["CS:GO", "Valorant"],
    rating: 4.9,
    studentCount: 203,
    hourlyRate: 55,
    experience: "7+ years",
    availableSlots: [
      {
        id: "s4",
        coachId: "2",
        date: "2024-06-15",
        startTime: "15:00",
        endTime: "16:00",
        available: true,
      },
      {
        id: "s5",
        coachId: "2",
        date: "2024-06-16",
        startTime: "13:00",
        endTime: "14:00",
        available: true,
      },
    ],
    reviews: [
      {
        id: "r3",
        coachId: "2",
        studentId: "s3",
        studentName: "John Doe",
        rating: 5,
        comment: "Emma's aim training routines are game-changing. Highly recommend!",
        createdAt: "2024-05-12",
      },
    ],
    createdAt: "2023-02-20",
  },
  {
    id: "3",
    email: "marcus.elite@esperia.com",
    firstName: "Marcus",
    lastName: "Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    role: "coach",
    description:
      "Fortnite World Cup qualifier and professional builder. Teaching advanced building techniques, edit courses, and competitive strategies.",
    gameCategories: ["Fortnite"],
    rating: 4.7,
    studentCount: 156,
    hourlyRate: 50,
    experience: "4+ years",
    availableSlots: [
      {
        id: "s6",
        coachId: "3",
        date: "2024-06-15",
        startTime: "17:00",
        endTime: "18:00",
        available: true,
      },
      {
        id: "s7",
        coachId: "3",
        date: "2024-06-16",
        startTime: "14:00",
        endTime: "15:00",
        available: true,
      },
    ],
    reviews: [
      {
        id: "r4",
        coachId: "3",
        studentId: "s4",
        studentName: "Tyler B",
        rating: 5,
        comment: "Marcus taught me building techniques I never thought possible!",
        createdAt: "2024-05-08",
      },
    ],
    createdAt: "2023-03-10",
  },
  {
    id: "4",
    email: "sophie.legend@esperia.com",
    firstName: "Sophie",
    lastName: "Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    role: "coach",
    description:
      "Dota 2 International competitor with deep knowledge of draft strategies, hero mechanics, and team coordination.",
    gameCategories: ["Dota 2"],
    rating: 4.6,
    studentCount: 89,
    hourlyRate: 48,
    experience: "6+ years",
    availableSlots: [],
    reviews: [],
    createdAt: "2023-04-05",
  },
  {
    id: "5",
    email: "david.tank@esperia.com",
    firstName: "David",
    lastName: "Park",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    role: "coach",
    description:
      "Overwatch League coach specializing in tank and support roles. Expert in team composition and ultimate economy.",
    gameCategories: ["Overwatch"],
    rating: 4.9,
    studentCount: 178,
    hourlyRate: 52,
    experience: "5+ years",
    availableSlots: [],
    reviews: [],
    createdAt: "2023-05-12",
  },
];

// Get top 3 coaches based on rating and student count
export const getTopCoaches = () => {
  return [...mockCoaches]
    .sort((a, b) => {
      const scoreA = a.rating * 0.7 + (a.studentCount / 300) * 0.3;
      const scoreB = b.rating * 0.7 + (b.studentCount / 300) * 0.3;
      return scoreB - scoreA;
    })
    .slice(0, 3);
};
