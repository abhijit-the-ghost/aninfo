import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Anime } from '../../types/anime';
import { Star, PlayCircle, ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { useWatchlistStore } from '../../store/watchlist';

interface HeroCarouselProps {
    animeList: Anime[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ animeList }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();

    useEffect(() => {
        if (animeList.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % animeList.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [animeList.length]);

    const featured = animeList[currentIndex];

    if (!featured) return null;

    const isSaved = isInWatchlist(featured.mal_id);

    const toggleWatchlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSaved) {
            removeFromWatchlist(featured.mal_id);
        } else {
            addToWatchlist(featured);
        }
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % animeList.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + animeList.length) % animeList.length);
    };

    return (
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12 group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={featured.mal_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src={featured.images.webp.large_image_url}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <motion.div
                    key={`content-${featured.mal_id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center space-x-3 mb-4">
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                            Trending Now
                        </span>
                        <div className="flex items-center text-yellow-400 space-x-1">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-bold text-foreground">{featured.score}</span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 line-clamp-2 max-w-4xl">
                        {featured.title_english || featured.title}
                    </h2>

                    <p className="text-muted-foreground line-clamp-3 max-w-2xl mb-8 text-lg">
                        {featured.synopsis}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to={`/anime/${featured.mal_id}`}
                            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors flex items-center space-x-2"
                        >
                            <PlayCircle className="h-5 w-5" />
                            <span>View Details</span>
                        </Link>
                        <button
                            onClick={toggleWatchlist}
                            className={`px-8 py-3 font-bold rounded-xl transition-colors flex items-center space-x-2 ${isSaved
                                ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                : 'bg-primary/10 text-primary hover:bg-primary/20 backdrop-blur-sm'
                                }`}
                        >
                            {isSaved ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                            <span>{isSaved ? 'Saved' : 'Add to Watchlist'}</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 right-8 flex space-x-2">
                {animeList.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-6' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
