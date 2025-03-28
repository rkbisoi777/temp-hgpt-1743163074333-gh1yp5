import { supabase } from './supabaseClient';

export class CompareService {
    // Get compare data by user_id
    static async getCompare(userId: string) {
        const { data } = await supabase
            .from('compare')
            .select('item_ids')
            .eq('user_id', userId)
            .single();

        // if (error) {
        //     throw new Error(`Error fetching compare data: ${error.message}`);
        // }
        return data?.item_ids || [];
    }

    // Add items to compare list
    static async addItemsToCompare(userId: string, itemIds: string[]) {
        const { data: existingData, error: fetchError } = await supabase
            .from('compare')
            .select('item_ids')
            .eq('user_id', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            throw new Error(`Error fetching compare list: ${fetchError.message}`);
        }

        // If no existing compare list found, create a new one with the given items
        const existingItemIds = existingData?.item_ids || [];

        // Merge the existing item_ids with the new ones, avoiding duplicates
        const updatedItemIds = [
            ...new Set([...existingItemIds, ...itemIds]) // Combine and remove duplicates
        ];

        // Upsert the updated item_ids
        const { data, error } = await supabase
            .from('compare')
            .upsert({ user_id: userId, item_ids: updatedItemIds })
            .single();

        if (error) {
            throw new Error(`Error adding items to compare list: ${error.message}`);
        }

        return data;
    }


    // Remove items from compare list
    static async removeItemsFromCompare(userId: string, itemIds: string[]) {
        // Fetch the current compare list for the user
        const { data: existingData, error: fetchError } = await supabase
            .from('compare')
            .select('item_ids')
            .eq('user_id', userId)
            .single();

        if (fetchError) {
            throw new Error(`Error fetching compare list: ${fetchError.message}`);
        }

        // If no compare found, return early (nothing to remove)
        if (!existingData) {
            throw new Error('No compare list found for the user');
        }

        // Filter out the items to be removed from the compare
        const updatedItems = existingData.item_ids.filter(
            (item: string) => !itemIds.includes(item)
        );

        // Update the compare with the filtered item_ids
        const { data, error } = await supabase
            .from('compare')
            .update({ item_ids: updatedItems })
            .eq('user_id', userId)
            .single();

        if (error) {
            throw new Error(`Error removing items from compare list: ${error.message}`);
        }

        return data;
    }

    static async doesItemExist(userId: string, itemId: string): Promise<boolean> {
        const { data, error } = await supabase
            .from('compare')
            .select('item_ids')
            .eq('user_id', userId)
            .single();
    
        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching compare list: ${error.message}`);
        }
    
        return data?.item_ids?.includes(itemId) || false;
    }
}
