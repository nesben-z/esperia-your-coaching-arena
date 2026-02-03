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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { mockCoaches, mockGameCategories } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import {
  AlertCircle,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Edit,
  Eye,
  FileText,
  Filter,
  Handshake,
  Plus,
  Search,
  Settings,
  Shield,
  Trash2,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const AdminPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [coachFilter, setCoachFilter] = useState("all");
  const [studentFilter, setStudentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data pour les demandes de partenariat
  const [partnershipRequests] = useState([
    {
      id: "1",
      companyName: "Gaming Corp",
      contactName: "John Doe",
      email: "john@gamingcorp.com",
      partnerType: "sponsor",
      description: "Nous souhaitons sponsoriser vos meilleurs coachs",
      status: "pending",
      submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    {
      id: "2",
      companyName: "ESport Media",
      contactName: "Jane Smith",
      email: "jane@esportmedia.com",
      partnerType: "media",
      description: "Partenariat médiatique pour couvrir vos événements",
      status: "pending",
      submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ]);

  // Mock data pour les certifications en attente
  const [pendingCertifications] = useState([
    {
      id: "1",
      coachId: "coach1",
      coachName: "Alex Johnson",
      certificationName: "Coach Riot Games Niveau 3",
      proofUrl: "https://example.com/proof1.pdf",
      notes: "Renouvellement de ma certification",
      submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
    {
      id: "2",
      coachId: "coach4",
      coachName: "Sarah Miller",
      certificationName: "Expert Valorant",
      proofUrl: "https://example.com/proof2.pdf",
      notes: "Nouvelle certification obtenue",
      submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    },
  ]);

  // Mock data pour les événements
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Championship 2024",
      description: "Tournoi annuel Esperia",
      date: new Date("2024-12-15"),
      participants: 128,
      prize: "5000€",
      isActive: true,
    },
    {
      id: "2",
      title: "Summer Boot Camp",
      description: "Stage intensif d'été",
      date: new Date("2024-07-20"),
      participants: 50,
      prize: "N/A",
      isActive: true,
    },
  ]);

  // Mock students data
  const mockStudents = [
    {
      id: "1",
      firstName: "Pierre",
      lastName: "Martin",
      email: "pierre@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre",
      sessionsCount: 12,
      totalSpent: 600,
      joinedAt: new Date("2024-01-15"),
      level: 15,
      xp: 1250,
    },
    {
      id: "2",
      firstName: "Marie",
      lastName: "Dubois",
      email: "marie@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
      sessionsCount: 8,
      totalSpent: 400,
      joinedAt: new Date("2024-02-20"),
      level: 10,
      xp: 850,
    },
  ];

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleApproveCertification = (certId: string) => {
    toast({
      title: "Certification approuvée",
      description: "La certification a été validée avec succès",
    });
  };

  const handleRejectCertification = (certId: string) => {
    toast({
      title: "Certification rejetée",
      description: "La certification a été refusée",
      variant: "destructive",
    });
  };

  const handleApprovePartnership = (partnerId: string) => {
    toast({
      title: "Partenariat approuvé",
      description: "La demande de partenariat a été acceptée",
    });
  };

  const handleRejectPartnership = (partnerId: string) => {
    toast({
      title: "Partenariat rejeté",
      description: "La demande de partenariat a été refusée",
      variant: "destructive",
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId));
    toast({
      title: "Événement supprimé",
      description: "L'événement a été retiré de la page d'accueil",
    });
  };

  const handleToggleEventStatus = (eventId: string) => {
    setEvents(
      events.map((e) =>
        e.id === eventId ? { ...e, isActive: !e.isActive } : e
      )
    );
    toast({
      title: "Statut modifié",
      description: "Le statut de l'événement a été mis à jour",
    });
  };

  const filteredCoaches = mockCoaches.filter((coach) => {
    const matchesSearch =
      coach.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      coachFilter === "all" ||
      (coachFilter === "active" && coach.rating >= 4.5) ||
      (coachFilter === "new" && coach.studentCount < 10);
    return matchesSearch && matchesFilter;
  });

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      studentFilter === "all" ||
      (studentFilter === "active" && student.sessionsCount > 5) ||
      (studentFilter === "new" && student.sessionsCount <= 5);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background admin-theme">
      {/* Header */}
      <div className="bg-gradient-hero py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Dashboard Administration
              </h1>
              <p className="text-muted-foreground">
                Gérez l'intégralité de la plateforme Esperia
              </p>
            </div>
            <Badge className="bg-primary text-primary-foreground px-4 py-2 text-lg">
              <Shield className="mr-2 h-5 w-5" />
              Admin
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="coaches">Coachs</TabsTrigger>
            <TabsTrigger value="students">Élèves</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="partnerships">Partenariats</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Utilisateurs
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% ce mois
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Coachs Actifs
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockCoaches.length}</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3 cette semaine
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Revenu Total
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,680€</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18% ce mois
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    En Attente
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {pendingCertifications.length + partnershipRequests.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Demandes à traiter
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex-col"
                    onClick={() => setSelectedTab("certifications")}
                  >
                    <Shield className="h-6 w-6 mb-2" />
                    Certifications
                    {pendingCertifications.length > 0 && (
                      <Badge className="mt-2 bg-primary">
                        {pendingCertifications.length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col"
                    onClick={() => setSelectedTab("partnerships")}
                  >
                    <Handshake className="h-6 w-6 mb-2" />
                    Partenariats
                    {partnershipRequests.length > 0 && (
                      <Badge className="mt-2 bg-primary">
                        {partnershipRequests.length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col"
                    onClick={() => setSelectedTab("events")}
                  >
                    <Calendar className="h-6 w-6 mb-2" />
                    Événements
                    <Badge className="mt-2" variant="secondary">
                      {events.length}
                    </Badge>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col"
                    onClick={() => setSelectedTab("settings")}
                  >
                    <Settings className="h-6 w-6 mb-2" />
                    Paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <UserCheck className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Nouveau coach inscrit
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Sarah Miller - Il y a 2 heures
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Certification soumise
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Alex Johnson - Il y a 12 heures
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <Handshake className="h-5 w-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Demande de partenariat
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Gaming Corp - Il y a 2 jours
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coaches Tab */}
          <TabsContent value="coaches" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Gestion des Coachs</CardTitle>
                    <CardDescription>
                      Suivez et gérez tous les coachs de la plateforme
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher..."
                        className="pl-10 w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={coachFilter} onValueChange={setCoachFilter}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="active">Très actifs</SelectItem>
                        <SelectItem value="new">Nouveaux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCoaches.map((coach) => (
                    <Card key={coach.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={coach.avatar} />
                              <AvatarFallback>
                                {coach.firstName[0]}
                                {coach.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold">
                                  {coach.firstName} {coach.lastName}
                                </p>
                                <Badge
                                  variant="secondary"
                                  className="bg-primary/10 text-primary"
                                >
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Certifié
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {coach.email}
                              </p>
                              <div className="flex gap-4 mt-2 text-xs">
                                <span>⭐ {coach.rating}</span>
                                <span>👥 {coach.studentCount} élèves</span>
                                <span>💰 {coach.hourlyRate}€/h</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Éditer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Gestion des Élèves</CardTitle>
                    <CardDescription>
                      Suivez et gérez tous les élèves de la plateforme
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher..."
                        className="pl-10 w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select
                      value={studentFilter}
                      onValueChange={setStudentFilter}
                    >
                      <SelectTrigger className="w-[150px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="active">Actifs</SelectItem>
                        <SelectItem value="new">Nouveaux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <Card key={student.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>
                                {student.firstName[0]}
                                {student.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold">
                                  {student.firstName} {student.lastName}
                                </p>
                                <Badge variant="secondary">
                                  Level {student.level}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {student.email}
                              </p>
                              <div className="flex gap-4 mt-2 text-xs">
                                <span>📚 {student.sessionsCount} sessions</span>
                                <span>💰 {student.totalSpent}€ dépensés</span>
                                <span>⚡ {student.xp} XP</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-1" />
                              Stats
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion des Événements</CardTitle>
                    <CardDescription>
                      Gérez les événements affichés sur la page d'accueil
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="hero">
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvel Événement
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Créer un nouvel événement</DialogTitle>
                        <DialogDescription>
                          Cet événement sera visible sur la page d'accueil
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="eventTitle">Titre</Label>
                          <Input
                            id="eventTitle"
                            placeholder="Championship 2025"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventDesc">Description</Label>
                          <Textarea
                            id="eventDesc"
                            placeholder="Description de l'événement..."
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="eventDate">Date</Label>
                            <Input id="eventDate" type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="eventPrize">Prix</Label>
                            <Input id="eventPrize" placeholder="5000€" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventParticipants">
                            Participants max
                          </Label>
                          <Input
                            id="eventParticipants"
                            type="number"
                            placeholder="128"
                          />
                        </div>
                        <Button type="submit" variant="hero" className="w-full">
                          Créer l'événement
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">
                                {event.title}
                              </h3>
                              <Badge
                                className={
                                  event.isActive
                                    ? "bg-green-500/10 text-green-700"
                                    : "bg-gray-500/10 text-gray-700"
                                }
                              >
                                {event.isActive ? "Actif" : "Inactif"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {event.description}
                            </p>
                            <div className="flex gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {event.date.toLocaleDateString("fr-FR")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {event.participants} participants
                              </span>
                              <span className="flex items-center gap-1">
                                <Trophy className="h-4 w-4" />
                                {event.prize}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleEventStatus(event.id)}
                            >
                              {event.isActive ? "Désactiver" : "Activer"}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Partnerships Tab */}
          <TabsContent value="partnerships" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Demandes de Partenariat</CardTitle>
                <CardDescription>
                  Validez ou refusez les demandes de partenariat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partnershipRequests.map((request) => (
                    <Card key={request.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">
                                {request.companyName}
                              </h3>
                              <Badge variant="secondary">
                                {request.partnerType}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {request.contactName} • {request.email}
                            </p>
                          </div>
                          <Badge className="bg-yellow-500/10 text-yellow-700">
                            <Clock className="h-3 w-3 mr-1" />
                            En attente
                          </Badge>
                        </div>
                        <p className="text-sm mb-3">{request.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Soumis il y a{" "}
                            {Math.floor(
                              (Date.now() - request.submittedAt.getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            jours
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleRejectPartnership(request.id)
                              }
                            >
                              <XCircle className="h-4 w-4 mr-1 text-destructive" />
                              Refuser
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() =>
                                handleApprovePartnership(request.id)
                              }
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approuver
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Certifications en Attente</CardTitle>
                <CardDescription>
                  Validez ou refusez les demandes de certification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingCertifications.map((cert) => (
                    <Card key={cert.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Award className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {cert.certificationName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Coach: {cert.coachName}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-500/10 text-yellow-700">
                            <Clock className="h-3 w-3 mr-1" />
                            En attente
                          </Badge>
                        </div>
                        {cert.notes && (
                          <p className="text-sm mb-3 p-3 bg-secondary rounded-lg">
                            📝 {cert.notes}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <a
                            href={cert.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            <FileText className="h-4 w-4" />
                            Voir la preuve
                          </a>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectCertification(cert.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1 text-destructive" />
                              Refuser
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() =>
                                handleApproveCertification(cert.id)
                              }
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approuver
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres Généraux du Site</CardTitle>
                <CardDescription>
                  Configurez les paramètres globaux de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Nom du site</Label>
                    <Input id="siteName" defaultValue="Esperia" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteTagline">Slogan</Label>
                    <Input
                      id="siteTagline"
                      defaultValue="Your Coaching Arena"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email de contact</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      defaultValue="contact@esperia.gg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commission">
                      Commission plateforme (%)
                    </Label>
                    <Input id="commission" type="number" defaultValue="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minPrice">Prix minimum session (€)</Label>
                    <Input id="minPrice" type="number" defaultValue="20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPrice">Prix maximum session (€)</Label>
                    <Input id="maxPrice" type="number" defaultValue="200" />
                  </div>
                </div>
                <Button variant="hero">Enregistrer les modifications</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Catégories de Jeux</CardTitle>
                <CardDescription>
                  Gérez les catégories disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockGameCategories.map((category) => (
                    <Card key={category.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{category.icon}</span>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-semibold">{category.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="border-2 border-dashed cursor-pointer hover:border-primary transition-colors">
                        <CardContent className="p-4 flex items-center justify-center h-full">
                          <div className="text-center">
                            <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm font-medium">Ajouter</p>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nouvelle catégorie de jeu</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label>Nom</Label>
                          <Input placeholder="Ex: Rocket League" />
                        </div>
                        <div className="space-y-2">
                          <Label>Emoji/Icône</Label>
                          <Input placeholder="🚗" />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input placeholder="Sport automobile en équipe" />
                        </div>
                        <Button type="submit" variant="hero" className="w-full">
                          Ajouter la catégorie
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
