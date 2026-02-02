import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  RefreshCw,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [renewalFormData, setRenewalFormData] = useState({
    certificationName: "",
    proofUrl: "",
    notes: "",
  });

  // Mock certifications pour les coachs
  const mockCertifications = [
    {
      id: "1",
      name: "Coach Certifié League of Legends",
      issuer: "Riot Games",
      issueDate: new Date("2024-01-15"),
      expiryDate: new Date("2025-01-15"),
      status: "active" as const,
      verificationUrl: "#",
    },
    {
      id: "2",
      name: "Expert Stratégie E-sport",
      issuer: "Esperia Academy",
      issueDate: new Date("2023-06-10"),
      expiryDate: new Date("2024-06-10"),
      status: "expired" as const,
      verificationUrl: "#",
    },
    {
      id: "3",
      name: "Coaching Pédagogique Niveau 2",
      issuer: "ESF Certification",
      issueDate: new Date("2023-11-20"),
      expiryDate: new Date("2025-11-20"),
      status: "active" as const,
      verificationUrl: "#",
    },
  ];

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    toast({
      title: "Profil mis à jour !",
      description: "Vos modifications ont été enregistrées avec succès.",
    });
  };

  const handleRenewalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande de renouvellement envoyée !",
      description: "Votre demande sera traitée sous 48h.",
    });
    setRenewalFormData({
      certificationName: "",
      proofUrl: "",
      notes: "",
    });
  };

  const getCertificationStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "expired":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4 ring-4 ring-primary/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-4xl">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <CardTitle>
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="capitalize">
                {user.role}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">{user.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <Button type="submit" variant="hero">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Coach Certifications */}
          {user.role === "coach" && (
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Mes Certifications
                    </CardTitle>
                    <CardDescription>
                      Gérez vos certifications et qualifications
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Renouveler
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Renouveler une certification</DialogTitle>
                        <DialogDescription>
                          Remplissez ce formulaire pour renouveler votre
                          certification
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleRenewalSubmit}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="certName">
                            Nom de la certification
                          </Label>
                          <Input
                            id="certName"
                            placeholder="Ex: Coach Certifié League of Legends"
                            value={renewalFormData.certificationName}
                            onChange={(e) =>
                              setRenewalFormData({
                                ...renewalFormData,
                                certificationName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="proofUrl">Lien vers la preuve</Label>
                          <Input
                            id="proofUrl"
                            type="url"
                            placeholder="https://..."
                            value={renewalFormData.proofUrl}
                            onChange={(e) =>
                              setRenewalFormData({
                                ...renewalFormData,
                                proofUrl: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes additionnelles</Label>
                          <Textarea
                            id="notes"
                            placeholder="Informations complémentaires..."
                            rows={3}
                            value={renewalFormData.notes}
                            onChange={(e) =>
                              setRenewalFormData({
                                ...renewalFormData,
                                notes: e.target.value,
                              })
                            }
                          />
                        </div>
                        <Button type="submit" variant="hero" className="w-full">
                          Soumettre la demande
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCertifications.map((cert) => (
                    <Card key={cert.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Award className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{cert.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {cert.issuer}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={getCertificationStatusColor(cert.status)}
                          >
                            {cert.status === "active" && (
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                            )}
                            {cert.status === "expired" && (
                              <Clock className="mr-1 h-3 w-3" />
                            )}
                            {cert.status === "active"
                              ? "Active"
                              : cert.status === "expired"
                              ? "Expirée"
                              : "En attente"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">
                              Date d'obtention
                            </p>
                            <p className="font-medium">
                              {cert.issueDate.toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              Date d'expiration
                            </p>
                            <p
                              className={`font-medium ${
                                cert.status === "expired" ? "text-red-600" : ""
                              }`}
                            >
                              {cert.expiryDate.toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        {cert.status === "expired" && (
                          <div className="mt-3 pt-3 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Renouveler cette certification
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Booking History */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Historique des réservations</CardTitle>
              <CardDescription>Vos sessions passées et à venir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    coach: "Alex Johnson",
                    date: "2024-05-20",
                    status: "completed",
                  },
                  {
                    coach: "Emma Rodriguez",
                    date: "2024-06-01",
                    status: "completed",
                  },
                  {
                    coach: "Marcus Chen",
                    date: "2024-06-15",
                    status: "upcoming",
                  },
                ].map((booking, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{booking.coach}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.date).toLocaleDateString("fr-FR", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          booking.status === "completed"
                            ? "bg-primary/10 text-primary"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {booking.status === "completed" ? "Terminé" : "À venir"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
