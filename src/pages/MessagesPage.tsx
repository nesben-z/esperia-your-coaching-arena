import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  MoreVertical,
  Paperclip,
  Search,
  Send,
  Smile,
} from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  participantRole: "coach" | "student";
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

const MessagesPage = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock conversations
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      participantId: "coach1",
      participantName: "Alex Johnson",
      participantAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      participantRole: "coach",
      lastMessage: "Parfait ! On se retrouve demain à 14h pour la session.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
      unreadCount: 2,
      messages: [
        {
          id: "m1",
          senderId: "coach1",
          content:
            "Bonjour ! Merci pour votre réservation. Avez-vous des questions avant notre session ?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          read: true,
        },
        {
          id: "m2",
          senderId: user?.id || "me",
          content:
            "Oui, je voudrais travailler sur mon positionnement en teamfight.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          read: true,
        },
        {
          id: "m3",
          senderId: "coach1",
          content:
            "Excellent choix ! Je vais préparer quelques replays et exercices spécifiques.",
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          read: true,
        },
        {
          id: "m4",
          senderId: "coach1",
          content: "Parfait ! On se retrouve demain à 14h pour la session.",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          read: false,
        },
      ],
    },
    {
      id: "2",
      participantId: "coach2",
      participantName: "Emma Rodriguez",
      participantAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      participantRole: "coach",
      lastMessage: "Super session aujourd'hui ! Continue comme ça 💪",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 0,
      messages: [
        {
          id: "m5",
          senderId: user?.id || "me",
          content: "Merci pour la session d'hier !",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
          read: true,
        },
        {
          id: "m6",
          senderId: "coach2",
          content: "Super session aujourd'hui ! Continue comme ça 💪",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          read: true,
        },
      ],
    },
    {
      id: "3",
      participantId: "coach3",
      participantName: "Marcus Chen",
      participantAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      participantRole: "coach",
      lastMessage: "Je peux te proposer un créneau mercredi prochain.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      unreadCount: 0,
      messages: [
        {
          id: "m7",
          senderId: user?.id || "me",
          content: "Bonjour, avez-vous de la disponibilité cette semaine ?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50),
          read: true,
        },
        {
          id: "m8",
          senderId: "coach3",
          content: "Je peux te proposer un créneau mercredi prochain.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
          read: true,
        },
      ],
    },
  ]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    // Ici on ajouterait le message à la conversation
    setMessageInput("");
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `${diffMins}min`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}j`;
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Header */}
      <div className="bg-gradient-hero py-8 border-b border-border scanlines">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-primary glow-cyan" />
            <div>
              <h1 className="text-3xl font-bold gradient-gaming">Messagerie</h1>
              <p className="text-muted-foreground">
                Communiquez avec vos coachs
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-250px)]">
          {/* Sidebar - Conversations List */}
          <Card className="lg:col-span-4 flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une conversation..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-secondary",
                      selectedConversation === conv.id && "bg-secondary"
                    )}
                    onClick={() => setSelectedConversation(conv.id)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conv.participantAvatar} />
                        <AvatarFallback>
                          {conv.participantName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conv.unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold text-sm truncate">
                          {conv.participantName}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatTime(conv.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-8 flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConv.participantAvatar} />
                      <AvatarFallback>
                        {selectedConv.participantName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {selectedConv.participantName}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {selectedConv.participantRole === "coach"
                          ? "Coach"
                          : "Élève"}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedConv.messages.map((message) => {
                      const isMe =
                        message.senderId === user.id ||
                        message.senderId === "me";
                      return (
                        <div
                          key={message.id}
                          className={cn(
                            "flex gap-2",
                            isMe ? "justify-end" : "justify-start"
                          )}
                        >
                          {!isMe && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={selectedConv.participantAvatar}
                              />
                              <AvatarFallback>
                                {selectedConv.participantName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={cn(
                              "max-w-[70%] rounded-2xl px-4 py-2",
                              isMe
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary"
                            )}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={cn(
                                "text-xs mt-1",
                                isMe
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              )}
                            >
                              {formatMessageTime(message.timestamp)}
                            </p>
                          </div>
                          {isMe && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.firstName[0]}
                                {user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Écrivez votre message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      variant="hero"
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">
                    Sélectionnez une conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choisissez une conversation dans la liste pour commencer à
                    échanger
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
