import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { mockCoaches } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  MessageCircle,
  PlayCircle,
  Shield,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const CoachProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const coach = mockCoaches.find((c) => c.id === id);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [selectedTab, setSelectedTab] = useState("about");

  // Mock data pour les fonctionnalités supplémentaires
  const mockStats = {
    totalSessions: 342,
    successRate: 87,
    avgSessionDuration: "1h 15min",
    responseTime: "< 2h",
    completionRate: 94,
  };

  const mockCertifications = [
    { id: "1", name: "Certified League Coach", icon: Shield, verified: true },
    { id: "2", name: "100+ Students Trained", icon: Trophy, verified: true },
    { id: "3", name: "Expert Mid Lane", icon: Target, verified: true },
  ];

  const mockGallery = [
    {
      id: "1",
      type: "image",
      url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
      title: "Gameplay Analysis",
    },
    {
      id: "2",
      type: "video",
      url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80",
      title: "Coaching Session",
    },
    {
      id: "3",
      type: "image",
      url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&q=80",
      title: "Strategy Review",
    },
  ];

  const mockMethodology = {
    approach:
      "I focus on personalized coaching tailored to each student's skill level and goals. My sessions combine live gameplay analysis, strategic planning, and targeted practice exercises.",
    sessionTypes: [
      {
        name: "1-on-1 Coaching",
        description: "Personalized sessions focused on your specific needs",
      },
      {
        name: "VOD Review",
        description: "Detailed analysis of your gameplay recordings",
      },
      {
        name: "Strategy Planning",
        description: "Macro and micro strategy development",
      },
    ],
    tools: ["Discord", "OBS Studio", "League Client", "Custom Analysis Tools"],
  };

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
                {coach.firstName[0]}
                {coach.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {coach.firstName} {coach.lastName}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {coach.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-primary text-primary mr-2" />
                  <span className="font-semibold text-lg">{coach.rating}</span>
                  <span className="text-muted-foreground ml-1">
                    ({coach.reviews.length} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-accent mr-2" />
                  <span className="font-semibold">
                    {coach.studentCount} students
                  </span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-gaming mr-2" />
                  <span className="font-semibold">{coach.experience}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {coach.gameCategories.map((game) => (
                  <Badge key={game} className="bg-primary/10 text-primary">
                    {game}
                  </Badge>
                ))}
              </div>

              {/* Certifications & Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {mockCertifications.map((cert) => (
                  <Badge key={cert.id} variant="secondary" className="gap-1">
                    <cert.icon className="h-3 w-3" />
                    {cert.name}
                    {cert.verified && (
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    )}
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
                      <DialogDescription>
                        Send a message to discuss your coaching needs
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea
                      placeholder="Type your message here..."
                      rows={5}
                    />
                    <Button
                      variant="hero"
                      onClick={() => toast({ title: "Message sent!" })}
                    >
                      Send Message
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card className="w-full md:w-auto min-w-[200px]">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">
                  ${coach.hourlyRate}
                  <span className="text-lg text-muted-foreground">/hour</span>
                </CardTitle>
                <CardDescription className="text-center">
                  Starting rate
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col gap-2">
                <Button variant="hero" className="w-full" size="lg">
                  Book a Session
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  View Packages
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">
                  {mockStats.totalSessions}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Total Sessions</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-2xl font-bold">
                  {mockStats.successRate}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-gaming" />
                <span className="text-2xl font-bold">
                  {mockStats.avgSessionDuration}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Avg Duration</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">
                  {mockStats.responseTime}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Response Time</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span className="text-2xl font-bold">
                  {mockStats.completionRate}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({coach.reviews.length})
            </TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  About {coach.firstName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {mockMethodology.approach}
                </p>

                <div>
                  <h4 className="font-semibold mb-3">Session Types</h4>
                  <div className="grid gap-3">
                    {mockMethodology.sessionTypes.map((type, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 p-3 rounded-lg bg-secondary/50"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{type.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Tools & Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockMethodology.tools.map((tool) => (
                      <Badge key={tool} variant="outline">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Available this week</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-700 dark:text-green-400"
                    >
                      {coach.availableSlots.length} slots
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response time</span>
                    <span className="text-sm font-medium">
                      {mockStats.responseTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time zone</span>
                    <span className="text-sm font-medium">UTC+1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Available Time Slots</CardTitle>
                    <CardDescription>
                      Book a coaching session with {coach.firstName}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {coach.availableSlots.length} available
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {coach.availableSlots.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coach.availableSlots.map((slot) => {
                      const slotDate = new Date(slot.date);
                      const isToday =
                        slotDate.toDateString() === new Date().toDateString();
                      const isTomorrow =
                        slotDate.toDateString() ===
                        new Date(Date.now() + 86400000).toDateString();

                      return (
                        <Card
                          key={slot.id}
                          className="hover:shadow-lg transition-all border-2 hover:border-primary/50"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="font-medium">
                                  {isToday
                                    ? "Today"
                                    : isTomorrow
                                    ? "Tomorrow"
                                    : slotDate.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                </span>
                              </div>
                              {isToday && (
                                <Badge
                                  variant="secondary"
                                  className="bg-accent/10 text-accent text-xs"
                                >
                                  Today
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {slot.startTime} - {slot.endTime}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                (1h)
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full hover:bg-primary hover:text-primary-foreground"
                              onClick={() => handleBooking(slot.id)}
                              disabled={!user}
                            >
                              {user ? "Book Session" : "Login to Book"}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground font-medium mb-2">
                      No available slots at the moment
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Check back later or contact the coach for custom
                      scheduling
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {/* Review Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Review Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {coach.rating}
                    </div>
                    <div className="flex gap-1 justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(coach.rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {coach.reviews.length} reviews
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((starLevel) => {
                      const count = coach.reviews.filter(
                        (r) => Math.floor(r.rating) === starLevel
                      ).length;
                      const percentage =
                        coach.reviews.length > 0
                          ? (count / coach.reviews.length) * 100
                          : 0;
                      return (
                        <div
                          key={starLevel}
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm w-8">{starLevel}</span>
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Write Review */}
            {user && user.role === "student" && (
              <Card>
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                  <CardDescription>
                    Share your experience with {coach.firstName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-7 w-7 cursor-pointer transition-all hover:scale-110 ${
                            star <= rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground hover:text-primary/50"
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground self-center">
                        {rating === 5
                          ? "Excellent"
                          : rating === 4
                          ? "Good"
                          : rating === 3
                          ? "Average"
                          : rating === 2
                          ? "Poor"
                          : "Very Poor"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Your Review
                    </label>
                    <Textarea
                      placeholder="Share your experience with this coach..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {reviewText.length}/500 characters
                    </p>
                  </div>
                  <Button
                    variant="hero"
                    onClick={handleSubmitReview}
                    disabled={!reviewText.trim() || reviewText.length < 10}
                    className="w-full"
                  >
                    Submit Review
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  All Reviews ({coach.reviews.length})
                </h3>
                <select className="text-sm border rounded-md px-3 py-1 bg-background">
                  <option>Most Recent</option>
                  <option>Highest Rated</option>
                  <option>Lowest Rated</option>
                </select>
              </div>
              {coach.reviews.map((review) => (
                <Card
                  key={review.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {review.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">
                            {review.studentName}
                          </CardTitle>
                          <CardDescription>
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Media Gallery
                </CardTitle>
                <CardDescription>
                  Photos, videos, and highlights from coaching sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockGallery.map((item) => (
                    <Card
                      key={item.id}
                      className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="relative aspect-video overflow-hidden bg-secondary">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute top-2 right-2">
                          {item.type === "video" ? (
                            <Badge className="bg-black/50 text-white">
                              <PlayCircle className="h-3 w-3 mr-1" />
                              Video
                            </Badge>
                          ) : (
                            <Badge className="bg-black/50 text-white">
                              <ImageIcon className="h-3 w-3 mr-1" />
                              Image
                            </Badge>
                          )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                          <p className="text-white font-medium text-sm">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CoachProfilePage;
