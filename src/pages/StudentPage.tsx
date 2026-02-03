import { Badge } from "@/components/ui/badge";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { mockGameCategories } from "@/data/mockData";
import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Search,
  Shield,
  Sword,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const StudentPage = () => {
  const { user } = useAuth();
  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [riotId, setRiotId] = useState("");
  const [tagline, setTagline] = useState("");
  const [expandedAnalysis, setExpandedAnalysis] = useState<string | null>(null);

  // Mock data pour les analyses détaillées
  const mockAnalyses = [
    {
      id: "1",
      game: "League of Legends",
      date: "2024-06-15",
      rank: "Gold II",
      kda: "3.2",
      winRate: 58,
      details: {
        strengths: [
          "Bon farm early game",
          "Excellente vision control",
          "Positionnement en teamfight",
        ],
        weaknesses: [
          "Trop agressif en mid game",
          "Manque de roaming",
          "Trading en lane à améliorer",
        ],
        recommendations: [
          "Travailler les timings de roam",
          "Améliorer le wave management",
          "Focus sur les objectifs",
        ],
      },
    },
    {
      id: "2",
      game: "League of Legends",
      date: "2024-06-10",
      rank: "Gold III",
      kda: "2.8",
      winRate: 52,
      details: {
        strengths: ["Bonne mécanique", "Vision correcte"],
        weaknesses: ["Décisions macro", "Farming sous pression"],
        recommendations: ["Étudier les matchups", "Pratiquer le farming"],
      },
    },
  ];

  const filteredAnalyses =
    selectedGame === "all"
      ? mockAnalyses
      : mockAnalyses.filter((a) => a.game === selectedGame);

  if (!user || user.role !== "student") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Learning Space</h1>
          <p className="text-muted-foreground">
            Track your progress and improve your skills
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Riot ID Connection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Lier votre compte de jeu
            </CardTitle>
            <CardDescription>
              Entrez votre pseudo et tag pour synchroniser vos statistiques de
              jeu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="riotId">Pseudo</Label>
                <Input
                  id="riotId"
                  placeholder="VotreUsername"
                  value={riotId}
                  onChange={(e) => setRiotId(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-32">
                <Label htmlFor="tagline">Tag</Label>
                <Input
                  id="tagline"
                  placeholder="#EUW"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button variant="hero">
                  <Search className="mr-2 h-4 w-4" />
                  Lier
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            {/* Filter by Game */}
            <div className="flex justify-between items-center">
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par jeu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les jeux</SelectItem>
                  {mockGameCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stats Overview with Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Sessions
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3 ce mois-ci
                  </div>
                  <div className="mt-3 h-12">
                    <div className="flex items-end justify-between h-full gap-1">
                      {[40, 55, 35, 70, 50, 85, 75].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary rounded-t"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Heures d'entraînement
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">48h</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12h ce mois-ci
                  </div>
                  <div className="mt-3 h-12">
                    <div className="flex items-end justify-between h-full gap-1">
                      {[60, 45, 70, 55, 80, 65, 90].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-accent rounded-t"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Taux de victoire
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">58%</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5% ce mois-ci
                  </div>
                  <div className="mt-3">
                    <Progress value={58} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skill Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progression des compétences</CardTitle>
                <CardDescription>
                  Votre amélioration dans différents domaines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Sword className="h-4 w-4" />
                      Mécaniques de jeu
                    </span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Stratégie & Tactiques
                    </span>
                    <span className="text-muted-foreground">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Communication d'équipe
                    </span>
                    <span className="text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Prise de décision
                    </span>
                    <span className="text-muted-foreground">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {/* Filter by Game */}
            <div className="flex justify-between items-center">
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par jeu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les jeux</SelectItem>
                  {mockGameCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Analyses détaillées de performances</CardTitle>
                <CardDescription>
                  Type OP.GG - Analyses complètes de vos parties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAnalyses.map((analysis) => (
                    <Card key={analysis.id} className="border-2">
                      <CardContent className="p-4">
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() =>
                            setExpandedAnalysis(
                              expandedAnalysis === analysis.id
                                ? null
                                : analysis.id
                            )
                          }
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="text-center">
                              <Badge variant="secondary">{analysis.rank}</Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(analysis.date).toLocaleDateString(
                                  "fr-FR"
                                )}
                              </p>
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{analysis.game}</p>
                              <div className="flex gap-4 mt-1">
                                <span className="text-sm">
                                  KDA:{" "}
                                  <span className="font-bold text-primary">
                                    {analysis.kda}
                                  </span>
                                </span>
                                <span className="text-sm">
                                  Win Rate:{" "}
                                  <span className="font-bold text-accent">
                                    {analysis.winRate}%
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            {expandedAnalysis === analysis.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        {expandedAnalysis === analysis.id && (
                          <div className="mt-4 pt-4 border-t space-y-4">
                            <div>
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-green-600">
                                <TrendingUp className="h-4 w-4" />
                                Points forts
                              </h4>
                              <ul className="space-y-1">
                                {analysis.details.strengths.map(
                                  (strength, idx) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-muted-foreground flex items-start"
                                    >
                                      <span className="text-green-600 mr-2">
                                        ✓
                                      </span>
                                      {strength}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-red-600">
                                <TrendingDown className="h-4 w-4" />
                                Points à améliorer
                              </h4>
                              <ul className="space-y-1">
                                {analysis.details.weaknesses.map(
                                  (weakness, idx) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-muted-foreground flex items-start"
                                    >
                                      <span className="text-red-600 mr-2">
                                        ✗
                                      </span>
                                      {weakness}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-primary">
                                <Target className="h-4 w-4" />
                                Recommandations
                              </h4>
                              <ul className="space-y-1">
                                {analysis.details.recommendations.map(
                                  (rec, idx) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-muted-foreground flex items-start"
                                    >
                                      <span className="text-primary mr-2">
                                        →
                                      </span>
                                      {rec}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sessions à venir</CardTitle>
                <CardDescription>
                  Vos sessions de coaching planifiées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      coach: "Alex Johnson",
                      date: "2024-06-15",
                      time: "14:00 - 15:00",
                      game: "League of Legends",
                    },
                    {
                      coach: "Emma Rodriguez",
                      date: "2024-06-16",
                      time: "13:00 - 14:00",
                      game: "Valorant",
                    },
                  ].map((booking, idx) => (
                    <Card key={idx}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-semibold">{booking.coach}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.game}
                          </p>
                          <div className="flex items-center mt-2 text-sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(booking.date).toLocaleDateString(
                              "fr-FR",
                              {
                                month: "long",
                                day: "numeric",
                              }
                            )}{" "}
                            à {booking.time}
                          </div>
                        </div>
                        <Button variant="outline">Rejoindre</Button>
                      </CardContent>
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

export default StudentPage;
