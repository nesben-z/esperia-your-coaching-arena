import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  CheckCircle2,
  Globe,
  Handshake,
  Mail,
  Phone,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

const PartnerPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    partnerType: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée !",
      description:
        "Nous examinerons votre candidature et vous contacterons sous 48h.",
    });
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      partnerType: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Handshake className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Devenir Partenaire Esperia
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rejoignez l'écosystème Esperia et participez à la révolution de
            l'e-sport coaching
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Benefits */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Pourquoi devenir partenaire ?
              </h2>
              <p className="text-muted-foreground">
                Esperia est la plateforme leader de coaching e-sport. En
                devenant partenaire, vous accédez à une communauté de joueurs
                passionnés et de coachs professionnels.
              </p>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Audience ciblée</h3>
                    <p className="text-sm text-muted-foreground">
                      Accédez à une communauté de +10 000 joueurs actifs et
                      passionnés
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visibilité accrue</h3>
                    <p className="text-sm text-muted-foreground">
                      Mettez en avant votre marque auprès d'une audience engagée
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="h-12 w-12 rounded-full bg-gaming/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-6 w-6 text-gaming" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Croissance partagée</h3>
                    <p className="text-sm text-muted-foreground">
                      Développez votre activité avec un écosystème en pleine
                      expansion
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle>Formulaire de candidature</CardTitle>
              <CardDescription>
                Remplissez ce formulaire et notre équipe vous contactera
                rapidement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                  <Input
                    id="companyName"
                    placeholder="Votre entreprise"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName">Nom du contact *</Label>
                  <Input
                    id="contactName"
                    placeholder="Prénom Nom"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@entreprise.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.votre-site.com"
                      className="pl-10"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partnerType">Type de partenariat *</Label>
                  <Select
                    value={formData.partnerType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, partnerType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sponsor">
                        Sponsor / Annonceur
                      </SelectItem>
                      <SelectItem value="tournament">
                        Organisateur de tournois
                      </SelectItem>
                      <SelectItem value="brand">
                        Marque Gaming / E-sport
                      </SelectItem>
                      <SelectItem value="media">
                        Média / Créateur de contenu
                      </SelectItem>
                      <SelectItem value="academy">Académie / École</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Décrivez votre projet *</Label>
                  <Textarea
                    id="description"
                    placeholder="Parlez-nous de votre projet de partenariat, vos objectifs, et comment nous pouvons collaborer..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  size="lg"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Envoyer ma candidature
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="bg-gradient-hero">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Des questions ?</h3>
            <p className="text-muted-foreground mb-6">
              Notre équipe partenariats est disponible pour répondre à toutes
              vos questions
            </p>
            <Button variant="outline" size="lg">
              <Mail className="mr-2 h-5 w-5" />
              partnerships@esperia.gg
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerPage;
