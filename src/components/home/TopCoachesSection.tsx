import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { getTopCoaches } from "@/data/mockData";

export const TopCoachesSection = () => {
  const topCoaches = getTopCoaches();

  return (
    <section className="container mx-auto px-4 py-16 bg-secondary/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Top Rated Coaches</h2>
        <p className="text-muted-foreground">Learn from the best in the industry</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topCoaches.map((coach) => (
          <Card key={coach.id} className="text-center hover:shadow-xl transition-shadow group">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                  <AvatarImage src={coach.avatar} />
                  <AvatarFallback>
                    {coach.firstName[0]}{coach.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{coach.firstName} {coach.lastName}</CardTitle>
              <CardDescription className="line-clamp-2">{coach.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {coach.gameCategories.slice(0, 2).map((game) => (
                  <Badge key={game} variant="secondary">{game}</Badge>
                ))}
              </div>
              
              <div className="flex justify-center items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span className="font-semibold">{coach.rating}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{coach.studentCount} students</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-primary">
                ${coach.hourlyRate}<span className="text-sm text-muted-foreground">/hr</span>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to={`/coaches/${coach.id}`}>View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="hero" size="lg" asChild>
          <Link to="/coaches">View All Coaches</Link>
        </Button>
      </div>
    </section>
  );
};
