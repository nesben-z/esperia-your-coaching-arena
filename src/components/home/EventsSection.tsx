import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trash2, Pencil, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockEvents } from "@/data/mockData";
import { Event } from "@/types";

export const EventsSection = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const isAdmin = user?.role === "admin";

  const handleDelete = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-muted-foreground">Don't miss out on exciting e-sports tournaments and workshops</p>
        </div>
        {isAdmin && (
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {event.featured && (
                <Badge className="absolute top-4 right-4 bg-accent">Featured</Badge>
              )}
              {isAdmin && (
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button size="sm" variant="secondary">
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            <CardHeader>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(event.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.message}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
