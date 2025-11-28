import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Plus, Check } from 'lucide-react';
import type { Anime } from '../../types/anime';
import { useWatchlistStore } from '../../store/watchlist';

interface AnimeCardProps {
    anime: Anime;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
    const isSaved = isInWatchlist(anime.mal_id);

    const toggleWatchlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSaved) {
            removeFromWatchlist(anime.mal_id);
        } else {
            addToWatchlist(anime);
        }
    };

    return (
        <motion.div
            className="group relative w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, z: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Link to={`/anime/${anime.mal_id}`} className="block">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-muted shadow-lg">
                    <img
                        src={anime.images.webp.large_image_url || anime.images.jpg.large_image_url}
                        alt={anime.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-bold">{anime.score || 'N/A'}</span>
                            </div>
                            <span className="text-xs font-medium bg-primary/80 px-2 py-1 rounded-full">
                                {anime.type}
                            </span>
                        </div>
                        <button
                            className={`mt-3 w-full flex items-center justify-center space-x-2 backdrop-blur-sm py-2 rounded-xl text-sm font-medium transition-colors ${isSaved
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-white/20 hover:bg-white/30 text-white'
                                }`}
                            onClick={toggleWatchlist}
                        >
                            {isSaved ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            <span>{isSaved ? 'Saved' : 'Watchlist'}</span>
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <h3 className="font-bold text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {anime.title_english || anime.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                        {anime.year || 'Unknown'} • {anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};
