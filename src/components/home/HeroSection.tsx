import heroImage from "@/assets/hero-esports.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient with gaming pattern */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating gaming elements */}
      <div className="absolute top-20 left-10 animate-pulse">
        <Trophy className="h-8 w-8 text-primary/20" />
      </div>
      <div className="absolute bottom-20 right-10 animate-pulse delay-75">
        <Trophy className="h-6 w-6 text-accent/20" />
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 animate-glow">
              <Trophy className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                🎮 Level Up Your Game
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Train with{" "}
              <span className="bg-gradient-to-r from-primary to-gaming bg-clip-text text-transparent">
                Elite E-Sports
              </span>{" "}
              Coaches
            </h1>

            <p className="text-xl text-muted-foreground">
              Connect with professional coaches and take your gaming skills to
              the next level. Personalized training for every competitive game.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg" asChild>
                <Link to="/coaches">
                  Find Your Coach
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg" asChild>
                <Link to="/register">Become a Coach</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg" asChild>
                <Link to="/partner">Devenir Partenaire</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">500+</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Coaches</p>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  <span className="text-3xl font-bold">10k+</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Students Trained
                </p>
              </div>
            </div>
          </div>

          {/* Right content - Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Professional e-sports gaming setup"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-xl animate-glow">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4.9/5</p>
                  <p className="text-sm text-muted-foreground">
                    Average Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
