import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  CreditCard,
  Minus,
  Plus,
  Shield,
  ShoppingCart,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

interface CartItem {
  id: string;
  type: "session" | "package";
  coachName: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      type: "session",
      coachName: "Alex Johnson",
      title: "Session de coaching 1h - League of Legends",
      price: 50,
      quantity: 1,
    },
    {
      id: "2",
      type: "package",
      coachName: "Emma Rodriguez",
      title: "Package Premium - 5 sessions",
      price: 200,
      quantity: 1,
    },
  ]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast({
      title: "Article retiré",
      description: "L'article a été retiré de votre panier",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      toast({
        title: "Code promo appliqué !",
        description: `Le code "${promoCode}" a été appliqué avec succès`,
      });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 0; // Calculé en fonction du code promo
  const tax = subtotal * 0.2; // TVA 20%
  const total = subtotal - discount + tax;

  const handleCheckout = () => {
    toast({
      title: "Redirection vers le paiement",
      description:
        "Vous allez être redirigé vers la page de paiement sécurisé...",
    });
    // Ici on intégrerait Stripe, PayPal, etc.
  };

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Header */}
      <div className="bg-gradient-hero py-12 border-b border-border scanlines">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/coaches">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continuer mes achats
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-primary glow-cyan" />
            <div>
              <h1 className="text-4xl font-bold gradient-gaming">Mon Panier</h1>
              <p className="text-muted-foreground">
                {cartItems.length} article{cartItems.length > 1 ? "s" : ""} dans
                votre panier
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-6">
                Découvrez nos coachs et réservez votre première session !
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/coaches">Parcourir les coachs</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Articles dans votre panier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        <div className="h-20 w-20 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <Badge variant="secondary" className="mb-2">
                                {item.type === "session"
                                  ? "Session"
                                  : "Package"}
                              </Badge>
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                Coach: {item.coachName}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-lg font-bold">
                              {item.price * item.quantity}€
                            </p>
                          </div>
                        </div>
                      </div>
                      {item.id !== cartItems[cartItems.length - 1].id && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Code promo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Entrez votre code promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Appliquer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Récapitulatif de commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sous-total</span>
                      <span>{subtotal}€</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Réduction</span>
                        <span>-{discount}€</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>TVA (20%)</span>
                      <span>{tax.toFixed(2)}€</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{total.toFixed(2)}€</span>
                    </div>
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Procéder au paiement
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Paiement 100% sécurisé</span>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      Annulation gratuite jusqu'à 24h avant
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      Garantie satisfait ou remboursé
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      Support client 7j/7
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-xs text-center text-muted-foreground">
                  <p>Moyens de paiement acceptés</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Visa</Badge>
                    <Badge variant="outline">Mastercard</Badge>
                    <Badge variant="outline">PayPal</Badge>
                    <Badge variant="outline">Stripe</Badge>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
