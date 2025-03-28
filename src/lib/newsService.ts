import { supabase } from "./supabaseClient";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  published_at: string;
  created_at: string;
}

export const NewsService = {
  async fetchNews(limit: number = 10, page: number = 1) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("real_estate_news")
      .select("*")
      .order("published_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return data;
  },
};
