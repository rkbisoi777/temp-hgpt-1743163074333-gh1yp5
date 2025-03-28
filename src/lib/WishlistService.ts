import { supabase } from './supabaseClient';

export class WishlistService {
    // Get wishlist by user_id
    static async getWishlist(userId: string) {
        const { data } = await supabase
            .from('wishlist')
            .select('item_ids')
            .eq('user_id', userId)
            .single();

        return data?.item_ids || [];
    }

    static async addItemsToWishlist(userId: string, itemIds: string[]) {
        // Fetch the current wishlist for the user
        const { data: existingData, error: fetchError } = await supabase
            .from('wishlist')
            .select('item_ids')
            .eq('user_id', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            throw new Error(`Error fetching wishlist: ${fetchError.message}`);
        }

        // If no existing wishlist found, create a new one with the given items
        const existingItemIds = existingData?.item_ids || [];

        // Merge the existing item_ids with the new ones, avoiding duplicates
        const updatedItemIds = [
            ...new Set([...existingItemIds, ...itemIds]) // Combine and remove duplicates
        ];

        // Upsert the updated item_ids
        const { data, error } = await supabase
            .from('wishlist')
            .upsert({ user_id: userId, item_ids: updatedItemIds })
            .single();

        if (error) {
            throw new Error(`Error adding items to wishlist: ${error.message}`);
        }

        return data;
    }

    static async removeItemsFromWishlist(userId: string, itemIds: string[]) {
        // Fetch the current wishlist for the user
        const { data: existingData, error: fetchError } = await supabase
            .from('wishlist')
            .select('item_ids')
            .eq('user_id', userId)
            .single();

        if (fetchError) {
            throw new Error(`Error fetching wishlist: ${fetchError.message}`);
        }

        // If no wishlist found, return early (nothing to remove)
        if (!existingData) {
            throw new Error('No wishlist found for the user');
        }

        // Filter out the items to be removed from the wishlist
        const updatedItems = existingData.item_ids.filter(
            (item: string) => !itemIds.includes(item)
        );

        // Update the wishlist with the filtered item_ids
        const { data, error } = await supabase
            .from('wishlist')
            .update({ item_ids: updatedItems })
            .eq('user_id', userId)
            .single();

        if (error) {
            throw new Error(`Error removing items from wishlist: ${error.message}`);
        }

        return data;
    }

    static async doesItemExist(userId: string, itemId: string): Promise<boolean> {
        const { data, error } = await supabase
            .from('wishlist')
            .select('item_ids')
            .eq('user_id', userId)
            .single();
    
        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching wish list: ${error.message}`);
        }
    
        return data?.item_ids?.includes(itemId) || false;
    }

}
