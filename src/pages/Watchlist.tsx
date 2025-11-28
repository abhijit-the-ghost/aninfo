import React from 'react';
import { useWatchlistStore } from '../store/watchlist';
import { AnimeCard } from '../components/ui/AnimeCard';
import { Link } from 'react-router-dom';

export const Watchlist: React.FC = () => {
    const { watchlist } = useWatchlistStore();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-display font-bold">My Watchlist</h1>

            {watchlist.length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-3xl">
                    <h2 className="text-xl font-bold mb-2">Your watchlist is empty</h2>
                    <p className="text-muted-foreground mb-6">Start adding anime to track what you want to watch.</p>
                    <Link
                        to="/browse"
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                        Browse Anime
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {watchlist.map((anime) => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
                </div>
            )}
        </div>
    );
};
