import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Users, DollarSign } from "lucide-react";
import { mockCoaches, mockGameCategories } from "@/data/mockData";
import { Coach } from "@/types";

const CoachesPage = () => {
  const [coaches] = useState<Coach[]>(mockCoaches);
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>(mockCoaches);
  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  const handleGameFilter = (game: string) => {
    setSelectedGame(game);
    if (game === "all") {
      setFilteredCoaches(coaches);
    } else {
      setFilteredCoaches(coaches.filter(coach => coach.gameCategories.includes(game)));
    }
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...filteredCoaches].sort((a, b) => {
      switch (value) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.hourlyRate - b.hourlyRate;
        case "price-high":
          return b.hourlyRate - a.hourlyRate;
        case "students":
          return b.studentCount - a.studentCount;
        default:
          return 0;
      }
    });
    setFilteredCoaches(sorted);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Find Your Coach</h1>
          <p className="text-muted-foreground">Browse professional coaches and level up your game</p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedGame} onValueChange={handleGameFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by game" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Games</SelectItem>
                {mockGameCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="students">Most Students</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 text-sm text-muted-foreground flex items-center">
              {filteredCoaches.length} coaches found
            </div>
          </div>
        </div>
      </div>

      {/* Coaches Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoaches.map((coach) => (
            <Card key={coach.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                    <AvatarImage src={coach.avatar} />
                    <AvatarFallback>
                      {coach.firstName[0]}{coach.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {coach.firstName} {coach.lastName}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{coach.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {coach.gameCategories.slice(0, 3).map((game) => (
                    <Badge key={game} variant="secondary" className="text-xs">
                      {game}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex flex-col items-center p-2 bg-secondary rounded-md">
                    <Star className="h-4 w-4 fill-primary text-primary mb-1" />
                    <span className="font-semibold">{coach.rating}</span>
                    <span className="text-xs text-muted-foreground">Rating</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-secondary rounded-md">
                    <Users className="h-4 w-4 text-accent mb-1" />
                    <span className="font-semibold">{coach.studentCount}</span>
                    <span className="text-xs text-muted-foreground">Students</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-secondary rounded-md">
                    <DollarSign className="h-4 w-4 text-gaming mb-1" />
                    <span className="font-semibold">${coach.hourlyRate}</span>
                    <span className="text-xs text-muted-foreground">/hour</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/coaches/${coach.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachesPage;
