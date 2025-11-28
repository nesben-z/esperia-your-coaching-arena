import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Users, Calendar, MessageCircle, Award } from "lucide-react";
import { mockCoaches } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const CoachProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const coach = mockCoaches.find(c => c.id === id);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  if (!coach) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Coach Not Found</h1>
          <Button asChild>
            <Link to="/coaches">Browse Coaches</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleBooking = (slotId: string) => {
    toast({
      title: "Booking requested!",
      description: "The coach will confirm your booking shortly.",
    });
  };

  const handleSubmitReview = () => {
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });
    setReviewText("");
    setRating(5);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-32 w-32 ring-4 ring-primary/20">
              <AvatarImage src={coach.avatar} />
              <AvatarFallback className="text-4xl">
                {coach.firstName[0]}{coach.lastName[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{coach.firstName} {coach.lastName}</h1>
              <p className="text-lg text-muted-foreground mb-4">{coach.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-primary text-primary mr-2" />
                  <span className="font-semibold text-lg">{coach.rating}</span>
                  <span className="text-muted-foreground ml-1">({coach.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-accent mr-2" />
                  <span className="font-semibold">{coach.studentCount} students</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-gaming mr-2" />
                  <span className="font-semibold">{coach.experience}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {coach.gameCategories.map((game) => (
                  <Badge key={game} className="bg-primary/10 text-primary">
                    {game}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="lg">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Contact Coach
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact {coach.firstName}</DialogTitle>
                      <DialogDescription>Send a message to discuss your coaching needs</DialogDescription>
                    </DialogHeader>
                    <Textarea 
                      placeholder="Type your message here..."
                      rows={5}
                    />
                    <Button variant="hero" onClick={() => toast({ title: "Message sent!" })}>
                      Send Message
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card className="w-full md:w-auto">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">
                  ${coach.hourlyRate}<span className="text-lg text-muted-foreground">/hour</span>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({coach.reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
                <CardDescription>Book a coaching session with {coach.firstName}</CardDescription>
              </CardHeader>
              <CardContent>
                {coach.availableSlots.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coach.availableSlots.map((slot) => (
                      <Card key={slot.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span className="font-medium">
                              {new Date(slot.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {slot.startTime} - {slot.endTime}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleBooking(slot.id)}
                            disabled={!user}
                          >
                            {user ? "Book Session" : "Login to Book"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No available slots at the moment. Check back later!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {user && user.role === "student" && (
              <Card>
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer transition-colors ${
                          star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <Textarea
                    placeholder="Share your experience with this coach..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                  />
                  <Button variant="hero" onClick={handleSubmitReview}>
                    Submit Review
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {coach.reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{review.studentName}</CardTitle>
                        <CardDescription>
                          {new Date(review.createdAt).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CoachProfilePage;
