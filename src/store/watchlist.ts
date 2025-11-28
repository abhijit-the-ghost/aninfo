import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Anime } from '../types/anime';

interface WatchlistState {
    watchlist: Anime[];
    addToWatchlist: (anime: Anime) => void;
    removeFromWatchlist: (id: number) => void;
    isInWatchlist: (id: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
    persist(
        (set, get) => ({
            watchlist: [],
            addToWatchlist: (anime) => {
                const { watchlist } = get();
                if (!watchlist.some((a) => a.mal_id === anime.mal_id)) {
                    set({ watchlist: [...watchlist, anime] });
                }
            },
            removeFromWatchlist: (id) => {
                set({ watchlist: get().watchlist.filter((a) => a.mal_id !== id) });
            },
            isInWatchlist: (id) => {
                return get().watchlist.some((a) => a.mal_id === id);
            },
        }),
        {
            name: 'aninfo-watchlist',
        }
    )
);
