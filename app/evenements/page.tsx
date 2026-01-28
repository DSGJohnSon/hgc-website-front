"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import EventFilters from "@/components/features/events/EventFilters";
import EventGrid from "@/components/features/events/EventGrid";
import eventsData from "@/data/events";
import gamesData from "@/data/games.json";
import categoriesData from "@/data/categories.json";
import { EventItem } from "@/types/pages/detail-event";
import PixelBackground from "@/components/ui/pixel-background";

function EventsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL as source of truth - Handle multiple values (comma-separated)
  const selectedCategories = useMemo(() => {
    const cat = searchParams.get("category");
    return cat ? cat.split(",") : [];
  }, [searchParams]);

  const selectedGames = useMemo(() => {
    const game = searchParams.get("game");
    return game ? game.split(",") : [];
  }, [searchParams]);

  // State for immediate search input feedback
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  // Update URL helper for toggling filters
  const toggleFilter = (key: string, id: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentValues = newParams.get(key)?.split(",") || [];

    if (id === "all") {
      newParams.delete(key);
    } else {
      const index = currentValues.indexOf(id);
      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(id);
      }

      if (currentValues.length > 0) {
        newParams.set(key, currentValues.join(","));
      } else {
        newParams.delete(key);
      }
    }

    const queryString = newParams.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(url, { scroll: false });
  };

  // Debounce search query update to URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQuery = searchParams.get("q") || "";
      if (searchQuery !== currentQuery) {
        const newParams = new URLSearchParams(searchParams.toString());
        if (searchQuery) {
          newParams.set("q", searchQuery);
        } else {
          newParams.delete("q");
        }
        const queryString = newParams.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;
        router.replace(url, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, pathname, router, searchParams]);

  // Sync state with URL for back/forward (only for search)
  useEffect(() => {
    const query = searchParams.get("q") || "";
    if (query !== searchQuery) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Process events data
  const processedEvents = useMemo(() => {
    return eventsData.map((event) => {
      const startDate = new Date(event.startDate);
      const endDate = event.endDate ? new Date(event.endDate) : startDate;

      // Determine if ongoing
      const isOngoing = today >= startDate && today <= endDate;

      // Determine if past
      const isPast = endDate < today;

      // Map category and game IDs to objects (handle arrays)
      const categories = event.categoryId
        ? event.categoryId
            .map(catId => categoriesData.categories.find((c) => c.id === catId))
            .filter(Boolean) as Array<{ id: string; name: string; color?: string }>
        : [];
      
      const games = event.gameId
        ? event.gameId
            .map(gameId => gamesData.games.find((g) => g.id === gameId))
            .filter(Boolean) as Array<{ id: string; name: string; icon?: string; color?: string }>
        : [];

      return {
        ...event,
        isOngoing,
        isPast,
        categories,
        games,
      } as EventItem;
    });
  }, []);

  // Conditional Filtering: Available games based on selected categories
  const availableGames = useMemo(() => {
    // If no categories selected, show all games that have at least one event
    const relevantEvents =
      selectedCategories.length > 0
        ? processedEvents.filter((e) =>
            e.categoryId?.some(catId => selectedCategories.includes(catId))
          )
        : processedEvents;

    const gameIds = Array.from(
      new Set(relevantEvents.flatMap((e) => e.gameId || []))
    );
    return gamesData.games.filter((g) => gameIds.includes(g.id));
  }, [selectedCategories, processedEvents]);

  // Cleanup selected games when they are no longer available (due to category change)
  useEffect(() => {
    if (selectedGames.length === 0) return;

    const availableGameIds = availableGames.map((g) => g.id);
    const validSelectedGames = selectedGames.filter((id) =>
      availableGameIds.includes(id)
    );

    if (validSelectedGames.length !== selectedGames.length) {
      const newParams = new URLSearchParams(searchParams.toString());
      if (validSelectedGames.length > 0) {
        newParams.set("game", validSelectedGames.join(","));
      } else {
        newParams.delete("game");
      }
      const queryString = newParams.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(url, { scroll: false });
    }
  }, [availableGames, selectedGames, pathname, router, searchParams]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return processedEvents.filter((event) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        event.categoryId?.some(catId => selectedCategories.includes(catId));
      const gameMatch =
        selectedGames.length === 0 ||
        event.gameId?.some(gameId => selectedGames.includes(gameId));

      const searchLower = searchQuery.toLowerCase();
      const searchMatch =
        !searchQuery ||
        event.title.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.categories?.some((c) =>
          c.name.toLowerCase().includes(searchLower)
        ) ||
        event.games?.some((g) => g.name.toLowerCase().includes(searchLower)) ||
        event.startDate.includes(searchLower);

      return categoryMatch && gameMatch && searchMatch;
    });
  }, [selectedCategories, selectedGames, searchQuery, processedEvents]);

  // Group and sort events
  const upcomingEvents = useMemo(() => {
    return filteredEvents
      .filter((e) => !e.isPast)
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
  }, [filteredEvents]);

  const pastEvents = useMemo(() => {
    return filteredEvents
      .filter((e) => e.isPast)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
  }, [filteredEvents]);

  return (
    <div className="min-h-screen bg-transparent pb-20">
      <PixelBackground
        className="relative pt-72 pb-24 flex flex-col items-center justify-center bg-transparent"
        speed={30}
        gap={10}
        colors="#111827"
        opacity={1}
        direction="center"
        haloRadius={250}
        haloSecondaryColor="#d97706"
        haloTertiaryColor="#86198f"
        haloDelay={100}
        canvasClassName="absolute inset-0"
        fadeBottom={true}
        fadeHeight={150}
      >
        <div className="container mx-auto px-4 relative z-10 w-full">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-theme font-rajdhani uppercase tracking-[0.3em] text-sm font-bold mb-4">
              Événements & Tournois
            </p>
            <h1 className="font-rajdhani font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-[0.9] mb-8">
              Vivez l'expérience <span className="text-theme2">HGC</span>
            </h1>
            <p className="text-gray-400 font-rajdhani text-lg md:text-xl">
              Retrouvez tous nos tournois e-sport, nos événements communautaires
              et bien plus encore. Retrouvez ce qui a déjà été fait ou
              rejoignez-nous pour les prochaines étapes !
            </p>
          </div>

          {/* Search Bar - Part of EventFilters but moved here for layout */}
          <div className="max-w-2xl mx-auto">
            <EventFilters
              categories={categoriesData.categories}
              games={availableGames}
              selectedCategories={selectedCategories}
              onCategoryChange={(id) => toggleFilter("category", id)}
              selectedGames={selectedGames}
              onGameChange={(id) => toggleFilter("game", id)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              hideFilters={true}
            />
          </div>
        </div>
      </PixelBackground>

      <div className="container mx-auto px-4 mt-8">
        {/* Remaining Filters Section */}
        <EventFilters
          categories={categoriesData.categories}
          games={availableGames}
          selectedCategories={selectedCategories}
          onCategoryChange={(id) => toggleFilter("category", id)}
          selectedGames={selectedGames}
          onGameChange={(id) => toggleFilter("game", id)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          hideSearch={true}
        />

        {/* Dynamic Sections */}
        <div className="space-y-24">
          <EventGrid
            title="Prochainement & En Cours"
            subtitle="Ne manquez rien"
            events={upcomingEvents}
            emptyMessage="Aucun événement à venir ne correspond à vos critères."
          />

          {pastEvents.length > 0 && (
            <EventGrid
              title="Événements Passés"
              subtitle="C'était mémorable"
              events={pastEvents}
              className="opacity-80"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense>
      <EventsContent />
    </Suspense>
  );
}
