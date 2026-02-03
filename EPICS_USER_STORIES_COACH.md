# 🎯 Épics et User Stories - Fonctionnalité Coach

## 📋 Vue d'ensemble

Ce document détaille les épics et user stories basés sur les fonctionnalités **déjà existantes** dans le code de la plateforme Esperia. Il s'agit d'améliorer et de connecter ce qui est actuellement implémenté en frontend.

---

## 🎪 EPIC 1 : Amélioration de la Recherche et Filtrage

**Objectif** : Améliorer les fonctionnalités de recherche et filtrage déjà présentes dans `CoachesPage.tsx`.

### US 1.1 : Ajouter une barre de recherche textuelle

**En tant que** étudiant
**Je veux** rechercher des coachs par nom dans la barre de recherche
**Afin de** trouver rapidement un coach spécifique

**État actuel** : ❌ Non implémenté
**Ce qui existe** : Filtrage par jeu uniquement (Select dropdown)

**Critères d'acceptation** :

- Barre de recherche Input dans la section filtres
- Recherche en temps réel sur firstName et lastName
- Mise à jour du compteur de résultats
- Reset de la recherche avec le filtre de jeu

**Priorité** : Haute

---

### US 1.2 : Améliorer les filtres existants

**En tant que** étudiant
**Je veux** filtrer par prix et note en plus du filtre par jeu
**Afin de** affiner ma recherche selon mon budget et mes attentes

**État actuel** : ✅ Filtre par jeu existant
**Ce qui existe** : `handleGameFilter` dans CoachesPage.tsx

**Critères d'acceptation** :

- Conserver le filtre par jeu existant
- Ajouter un filtre par prix min/max (slider ou inputs)
- Ajouter un filtre par note minimale (étoiles)
- Les filtres doivent être combinables
- Bouton "Réinitialiser tous les filtres"

**Priorité** : Haute

---

### US 1.3 : Améliorer le tri existant

**En tant que** étudiant
**Je veux** trier par disponibilité (nombre de créneaux)
**Afin de** voir d'abord les coachs avec le plus de disponibilités

**État actuel** : ✅ Tri existant (rating, price-low, price-high, students)
**Ce qui existe** : `handleSort` dans CoachesPage.tsx avec 4 options

**Critères d'acceptation** :

- Conserver les 4 tris existants
- Ajouter "Tri par disponibilité" (coachs avec le plus de `availableSlots.length`)
- Le tri doit fonctionner avec les filtres actifs

**Priorité** : Moyenne

---

## 🎪 EPIC 2 : Connexion Backend - Réservation de Sessions

**Objectif** : Connecter la fonctionnalité de réservation qui existe actuellement en frontend uniquement (toast mock).

### US 2.1 : Implémenter la réservation réelle

**En tant que** étudiant
**Je veux** réserver un créneau disponible et voir ma réservation confirmée
**Afin de** planifier mes sessions de coaching

**État actuel** : ⚠️ Mock (toast uniquement)
**Ce qui existe** : `handleBooking(slotId)` dans CoachProfilePage.tsx qui affiche juste un toast

**Critères d'acceptation** :

- Le bouton "Book Session" envoie une requête au backend
- Création d'un Booking avec status "pending"
- Le créneau devient indisponible après réservation
- Notification de confirmation
- Redirection vers la page de mes réservations
- Gestion des erreurs (créneau déjà pris, etc.)

**Priorité** : Haute

---

### US 2.2 : Afficher les créneaux réservés

**En tant que** étudiant
**Je veux** voir quels créneaux sont déjà réservés
**Afin de** ne pas essayer de réserver un créneau pris

**État actuel** : ⚠️ Tous les créneaux sont marqués `available: true` dans mockData
**Ce qui existe** : `availableSlots` avec propriété `available` mais toujours true

**Critères d'acceptation** :

- Les créneaux réservés ne s'affichent pas ou sont grisés
- Indication visuelle "Réservé" sur les créneaux pris
- Seuls les créneaux avec `available: true` sont cliquables
- Mise à jour en temps réel si un créneau est réservé

**Priorité** : Haute

---

### US 2.3 : Gérer mes réservations

**En tant que** étudiant
**Je veux** voir la liste de mes réservations à venir et passées
**Afin de** gérer mon planning de coaching

**État actuel** : ❌ Non implémenté
**Ce qui existe** : Type `Booking` défini dans types/index.ts mais pas de page

**Critères d'acceptation** :

- Page "Mes Réservations" accessible depuis le profil étudiant
- Liste des réservations avec : coach, date, heure, statut
- Filtres : à venir / passées / annulées
- Annulation de réservation (avec politique)
- Détails de chaque réservation

**Priorité** : Haute

---

## 🎪 EPIC 3 : Connexion Backend - Système d'Avis

**Objectif** : Connecter le système d'avis qui existe en frontend (affichage et formulaire mock).

### US 3.1 : Sauvegarder un avis réel

**En tant que** étudiant
**Je veux** laisser un avis sur un coach après une session
**Afin de** partager mon expérience avec la communauté

**État actuel** : ⚠️ Mock (toast uniquement)
**Ce qui existe** : Formulaire d'avis dans CoachProfilePage.tsx avec `handleSubmitReview` qui affiche juste un toast

**Critères d'acceptation** :

- Le formulaire envoie les données au backend
- Vérification que l'étudiant a bien eu une session avec le coach
- Sauvegarde de l'avis avec rating et comment
- L'avis apparaît immédiatement dans la liste
- Mise à jour de la note moyenne du coach
- Un étudiant ne peut laisser qu'un seul avis par coach

**Priorité** : Haute

---

### US 3.2 : Améliorer l'affichage des avis existants

**En tant que** étudiant
**Je veux** voir tous les avis avec pagination
**Afin de** lire les retours d'expérience complets

**État actuel** : ✅ Affichage basique existant
**Ce qui existe** : `coach.reviews.map()` dans CoachProfilePage.tsx affiche tous les avis

**Critères d'acceptation** :

- Pagination (10 avis par page)
- Tri par date (plus récents en premier)
- Affichage du nombre total d'avis
- Indicateur "Avis vérifié" si l'étudiant a bien eu une session
- Format de date amélioré (relatif : "Il y a 2 jours")

**Priorité** : Moyenne

---

### US 3.3 : Filtrer les avis par note

**En tant que** étudiant
**Je veux** filtrer les avis par nombre d'étoiles
**Afin de** voir uniquement les avis positifs ou négatifs

**État actuel** : ❌ Non implémenté

**Critères d'acceptation** :

- Filtres par note (5 étoiles, 4 étoiles, etc.)
- Badges montrant la distribution des notes
- Compteur d'avis par note

**Priorité** : Basse

---

## 🎪 EPIC 4 : Connexion Backend - Messagerie

**Objectif** : Connecter le formulaire de contact qui existe en frontend (dialog mock).

### US 4.1 : Envoyer un message réel au coach

**En tant que** étudiant
**Je veux** envoyer un message au coach depuis son profil
**Afin de** poser des questions avant de réserver

**État actuel** : ⚠️ Mock (toast uniquement)
**Ce qui existe** : Dialog "Contact Coach" dans CoachProfilePage.tsx avec Textarea qui affiche juste un toast

**Critères d'acceptation** :

- Le message est envoyé au backend
- Création d'une conversation entre étudiant et coach
- Notification au coach
- Confirmation d'envoi
- Historique des messages sauvegardé

**Priorité** : Haute

---

### US 4.2 : Afficher les conversations

**En tant que** utilisateur
**Je veux** voir mes conversations avec les coachs/étudiants
**Afin de** suivre mes échanges

**État actuel** : ❌ Non implémenté

**Critères d'acceptation** :

- Page "Messages" accessible depuis la navbar
- Liste des conversations
- Dernier message visible
- Badge avec nombre de messages non lus
- Ouverture d'une conversation en cliquant

**Priorité** : Moyenne

---

## 🎪 EPIC 5 : Amélioration du Profil Coach

**Objectif** : Améliorer l'affichage du profil coach existant.

### US 5.1 : Améliorer l'affichage des créneaux

**En tant que** étudiant
**Je veux** voir un calendrier visuel des disponibilités
**Afin de** mieux visualiser les créneaux disponibles

**État actuel** : ✅ Affichage en grille de cartes
**Ce qui existe** : `coach.availableSlots.map()` affiche les créneaux en grille

**Critères d'acceptation** :

- Conserver l'affichage actuel en grille
- Ajouter une vue calendrier (optionnel)
- Regrouper les créneaux par date
- Indication du fuseau horaire
- Créneaux passés non affichés ou grisés

**Priorité** : Moyenne

---

### US 5.2 : Afficher plus d'informations sur le coach

**En tant que** étudiant
**Je veux** voir toutes les informations pertinentes du coach
**Afin de** prendre une décision éclairée

**État actuel** : ✅ Affichage basique (nom, description, rating, students, experience, prix, jeux)
**Ce qui existe** : Toutes les infos sont déjà affichées dans CoachProfilePage.tsx

**Critères d'acceptation** :

- Conserver toutes les infos existantes
- Ajouter une section "À propos" plus détaillée
- Afficher le nombre total de sessions complétées
- Afficher la date d'inscription du coach
- Badge "Coach vérifié" si applicable

**Priorité** : Basse

---

## 🎪 EPIC 6 : Gestion du Profil Coach (Côté Coach)

**Objectif** : Permettre aux coachs de gérer leur profil (actuellement en lecture seule).

### US 6.1 : Éditer mon profil

**En tant que** coach
**Je veux** modifier ma description, mes tarifs et mes catégories de jeux
**Afin de** maintenir mon profil à jour

**État actuel** : ❌ Non implémenté (lecture seule)

**Critères d'acceptation** :

- Page "Éditer mon profil" accessible depuis le profil coach
- Formulaire avec tous les champs modifiables :
  - Description
  - Tarif horaire (hourlyRate)
  - Catégories de jeux (gameCategories)
  - Expérience
- Validation des données
- Sauvegarde au backend
- Prévisualisation avant sauvegarde

**Priorité** : Haute

---

### US 6.2 : Gérer mes créneaux disponibles

**En tant que** coach
**Je veux** ajouter, modifier et supprimer mes créneaux disponibles
**Afin de** contrôler mon planning

**État actuel** : ❌ Non implémenté (créneaux en dur dans mockData)

**Critères d'acceptation** :

- Page "Gérer mes créneaux" accessible depuis le profil coach
- Formulaire pour ajouter un créneau (date, heure début, heure fin)
- Liste de tous mes créneaux
- Suppression d'un créneau (si non réservé)
- Modification d'un créneau (si non réservé)
- Création de créneaux récurrents (optionnel)

**Priorité** : Haute

---

### US 6.3 : Voir mes réservations

**En tant que** coach
**Je veux** voir toutes les réservations de mes étudiants
**Afin de** organiser mes sessions

**État actuel** : ❌ Non implémenté

**Critères d'acceptation** :

- Page "Mes Réservations" accessible depuis le profil coach
- Liste de toutes les réservations avec : étudiant, date, heure, statut
- Filtres : à venir / passées / annulées
- Confirmation/refus d'une réservation en attente
- Annulation d'une réservation (avec notification à l'étudiant)
- Détails de chaque réservation

**Priorité** : Haute

---

## 🎪 EPIC 7 : Amélioration UX de la Liste des Coachs

**Objectif** : Améliorer l'expérience utilisateur de la page CoachesPage existante.

### US 7.1 : Améliorer l'affichage des cartes coach

**En tant que** étudiant
**Je veux** voir plus d'informations sur chaque coach dans la liste
**Afin de** faire un choix plus rapide

**État actuel** : ✅ Affichage basique (nom, description, jeux, rating, students, prix)
**Ce qui existe** : Cartes coach dans CoachesPage.tsx avec toutes les infos de base

**Critères d'acceptation** :

- Conserver l'affichage actuel
- Ajouter le nombre de créneaux disponibles
- Badge "Disponible maintenant" si créneaux aujourd'hui
- Indicateur visuel si coach vérifié
- Lien "Voir le profil" plus visible

**Priorité** : Basse

---

### US 7.2 : Gérer l'état vide

**En tant que** étudiant
**Je veux** voir un message clair si aucun coach ne correspond à mes filtres
**Afin de** comprendre pourquoi je ne vois pas de résultats

**État actuel** : ⚠️ Pas de gestion d'état vide

**Critères d'acceptation** :

- Message "Aucun coach trouvé" si filteredCoaches.length === 0
- Suggestion de réinitialiser les filtres
- Illustration ou icône pour l'état vide

**Priorité** : Moyenne

---

## 📊 Priorisation Globale

### Phase 1 (MVP - Must Have) 🔴

**Fonctionnalités critiques à connecter au backend :**

- US 2.1 : Réservation réelle (actuellement juste un toast)
- US 2.2 : Afficher créneaux réservés
- US 2.3 : Gérer mes réservations
- US 3.1 : Sauvegarder un avis réel (actuellement juste un toast)
- US 4.1 : Envoyer un message réel (actuellement juste un toast)
- US 6.1 : Éditer mon profil coach
- US 6.2 : Gérer mes créneaux
- US 6.3 : Voir mes réservations (coach)

### Phase 2 (Important) 🟡

**Améliorations des fonctionnalités existantes :**

- US 1.1 : Barre de recherche textuelle
- US 1.2 : Filtres supplémentaires (prix, note)
- US 3.2 : Pagination des avis
- US 4.2 : Page messages
- US 5.1 : Améliorer affichage créneaux
- US 7.2 : Gérer état vide

### Phase 3 (Nice to Have) 🟢

**Améliorations UX :**

- US 1.3 : Tri par disponibilité
- US 3.3 : Filtrer avis par note
- US 5.2 : Plus d'infos coach
- US 7.1 : Améliorer cartes coach

---

## 📝 Notes Techniques

### Ce qui existe déjà dans le code

1. **CoachesPage.tsx** :

   - Filtrage par jeu (Select)
   - Tri (rating, price-low, price-high, students)
   - Affichage des coachs en grille
   - Compteur de résultats

2. **CoachProfilePage.tsx** :

   - Affichage complet du profil
   - Onglets Schedule et Reviews
   - Affichage des créneaux disponibles
   - Formulaire de réservation (mock)
   - Formulaire de contact (mock)
   - Affichage des avis
   - Formulaire d'avis (mock)

3. **Types définis** :
   - `Coach` avec availableSlots et reviews
   - `TimeSlot` avec date, startTime, endTime, available
   - `Review` avec rating, comment, studentName
   - `Booking` (défini mais pas utilisé)

### Ce qui doit être connecté au backend

- Réservation de sessions (actuellement toast mock)
- Envoi d'avis (actuellement toast mock)
- Envoi de messages (actuellement toast mock)
- Gestion des créneaux (actuellement en dur dans mockData)
- Édition du profil coach (actuellement lecture seule)

---

**Document créé le** : 2024
**Dernière mise à jour** : 2024
**Version** : 2.0 (Basé sur le code existant)
