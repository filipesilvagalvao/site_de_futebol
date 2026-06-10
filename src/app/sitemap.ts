import { MetadataRoute } from "next";
import Channels from "@/functions/Channels";
import { filter_games } from "@/functions/FilterGames";
import DateToday from "@/functions/DateToday";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!rawBaseUrl) {
    console.warn("NEXT_PUBLIC_SITE_URL não foi definida. sitemap retornará vazio.")
    return []
  }

  const baseUrl: string = rawBaseUrl;

  const now = new Date();
  const today = DateToday();

  let games: Awaited<ReturnType<typeof filter_games>> = [];

  try {
    games = await filter_games();
  } catch (error) {
    console.error("Erro ao gerar jogos do sitemap:", error);
  }

  const gameRoutes: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${baseUrl}/futebol/${game.id}/${today}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  }));

  const channelRoutes: MetadataRoute.Sitemap = Channels.map((channel) => ({
    url: `${baseUrl}/canais/${channel.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...gameRoutes,
    ...channelRoutes,
  ];
}