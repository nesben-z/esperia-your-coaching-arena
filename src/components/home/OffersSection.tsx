import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Trash2, Pencil, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockOffers } from "@/data/mockData";
import { Offer } from "@/types";

export const OffersSection = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const isAdmin = user?.role === "admin";

  const handleDelete = (id: string) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  return (
    <section className="container mx-auto px-4 py-16 bg-gradient-hero">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Our Coaching Packages</h2>
          <p className="text-muted-foreground">Choose the perfect plan for your gaming journey</p>
        </div>
        {isAdmin && (
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Create Offer
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card 
            key={offer.id} 
            className={`relative ${offer.popular ? 'border-primary shadow-lg ring-2 ring-primary/20' : ''} hover:shadow-xl transition-shadow`}
          >
            {offer.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
            )}
            {isAdmin && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="sm" variant="ghost">
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(offer.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{offer.title}</CardTitle>
              <CardDescription>{offer.description}</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">${offer.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {offer.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant={offer.popular ? "hero" : "outline"} 
                className="w-full"
                onClick={() => setSelectedOffer(offer)}
              >
                Select Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Offer Details Dialog */}
      <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedOffer?.title}</DialogTitle>
            <DialogDescription>{selectedOffer?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center py-4">
              <span className="text-4xl font-bold">${selectedOffer?.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3">
              {selectedOffer?.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="hero" className="w-full" size="lg">
              Proceed to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
