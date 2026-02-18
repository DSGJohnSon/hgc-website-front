import { events as eventsData } from "@/data/events";

export default function sitemap() {
  const baseUrl = "https://holidaygeekcup.fr";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/evenements`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/reglement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const eventPages = eventsData.map((event) => ({
    url: `${baseUrl}/evenements/${event.id}`,
    lastModified: new Date(event.startDate),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...eventPages];
}