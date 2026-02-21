import { EventCard } from "@/types/pages/detail-event";
import eventsData from "@/data/events";
import categoriesData from "@/data/categories.json";
import gamesData from "@/data/games.json";

export function prepareEvents(
  events: typeof eventsData,
  excludeId?: string,
  limit?: number
): EventCard[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let filteredEvents = events;

  if (excludeId) {
    filteredEvents = events.filter((e) => e.id !== excludeId);
  }

  const prepared = filteredEvents
    .map((e) => {
      const startDate = new Date(e.startDate);
      const endDate = e.endDate ? new Date(e.endDate) : startDate;
      const isPast = endDate < today;
      const isOngoing = !isPast && startDate <= today && (e.endDate ? endDate >= today : startDate.getTime() === today.getTime());
      const isUpcoming = startDate > today;
      const isCancelled = e.isCancelled;

      return {
        id: e.id,
        type: e.type as "tournoi" | "event",
        title: e.title,
        startDate: e.startDate,
        endDate: e.endDate,
        time: e.startTime || "",
        cardThumbnail: e.cardThumbnail,
        color: e.color,
        isPast,
        isOngoing,
        isUpcoming,
        isCancelled,
        date: e.startDate,
        categories: e.categoryId
          ?.map((catId) => categoriesData.categories.find((c) => c.id === catId))
          .filter(
            (cat): cat is { id: string; name: string } => cat !== undefined,
          ),
        games: e.gameId
          ?.map((gameId) => gamesData.games.find((g) => g.id === gameId))
          .filter(
            (game): game is NonNullable<typeof game> =>
              game !== undefined,
          ),
      };
    })
    .sort((a, b) => {
      // Priority order: upcoming, ongoing, cancelled, past
      const getPriority = (event: typeof a) => {
        if (event.isUpcoming) return 0;
        if (event.isOngoing) return 1;
        if (event.isCancelled) return 2;
        return 3; // past
      };
      const priorityA = getPriority(a);
      const priorityB = getPriority(b);
      if (priorityA !== priorityB) return priorityA - priorityB;
      // Then by date (closest first)
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  if (limit) {
    return prepared.slice(0, limit);
  }

  return prepared;
}