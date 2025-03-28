import { supabase } from "./supabaseClient";

const TOKEN_REFRESH_EVENT = "refreshTokens";

// Token Service
export const TokenService = {
  /**
   * Fetches the token details for the logged-in user.
   */
  async fetchUserTokens(userId: string) {
    const { data, error } = await supabase
      .from("user_tokens")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching tokens:", error.message);
      return null;
    }

    return data;
  },

  /**
   * Adds a new token entry for the user (Used during signup).
   */
  async addUserTokens(userId: string, userType: string) {
    const initialTokens = userType === "free" ? 5000 : 10000; // Different limits per user type

    const { error } = await supabase.from("user_tokens").insert([
      {
        id: userId,
        user_type: userType,
        available_tokens: initialTokens,
      },
    ]);

    if (error) {
      console.error("Error adding tokens:", error.message);
      return false;
    }

    window.dispatchEvent(new Event(TOKEN_REFRESH_EVENT));

    return true;
  },

  /**
   * Updates available tokens for the user.
   */
  async updateUserTokens(userId: string, tokensUsed: number) {
    const { data: userTokens, error: fetchError } = await supabase
      .from("user_tokens")
      .select("available_tokens")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.error("Error fetching user tokens:", fetchError.message);
      return false;
    }

    const newTokenCount = Math.max(0, userTokens.available_tokens - tokensUsed);

    const { error } = await supabase
      .from("user_tokens")
      .update({ available_tokens: newTokenCount })
      .eq("id", userId);

    if (error) {
      console.error("Error updating tokens:", error.message);
      return false;
    }

    window.dispatchEvent(new Event(TOKEN_REFRESH_EVENT));

    return true;
  },

  /**
   * Resets user tokens by subtracting the given amount.
   */
  async resetUserTokens(userId: string) {
    const { data: userTokens, error: fetchError } = await supabase
      .from("user_tokens")
      .select("available_tokens, daily_limit")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.error("Error fetching user tokens:", fetchError.message);
      return false;
    }

    if (!userTokens?.daily_limit) {
      console.error("Daily limit not found for user:", userId);
      return false;
    }

    const newTokenCount = Math.max(0, userTokens.daily_limit);

    const { error } = await supabase
      .from("user_tokens")
      .update({ 
        available_tokens: newTokenCount, 
        last_updated: new Date().toISOString() // Ensures proper timestamp format
      })
      .eq("id", userId);

    if (error) {
      console.error("Error resetting tokens:", error.message);
      return false;
    }

    // Ensure TOKEN_REFRESH_EVENT is defined
    if (typeof TOKEN_REFRESH_EVENT !== "undefined") {
      window.dispatchEvent(new Event(TOKEN_REFRESH_EVENT));
    } else {
      console.warn("TOKEN_REFRESH_EVENT is not defined.");
    }

    return true;
}

};
