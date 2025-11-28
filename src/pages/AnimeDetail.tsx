import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { jikanApi } from '../api/jikan';
import { Loader2, Star, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TabButton: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
    >
        {children}
    </button>
);

export const AnimeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const animeId = parseInt(id || '0', 10);
    const [activeTab, setActiveTab] = useState('details');

    const { data: animeData, isLoading } = useQuery({
        queryKey: ['anime', animeId],
        queryFn: () => jikanApi.getAnimeById(animeId),
        enabled: !!animeId,
    });

    const anime = animeData?.data;

    // Lazy load tab data
    const { data: characters } = useQuery({
        queryKey: ['anime', animeId, 'characters'],
        queryFn: () => jikanApi.getAnimeCharacters(animeId),
        enabled: !!animeId && activeTab === 'characters',
    });

    const { data: episodes } = useQuery({
        queryKey: ['anime', animeId, 'episodes'],
        queryFn: () => jikanApi.getAnimeEpisodes(animeId),
        enabled: !!animeId && activeTab === 'episodes',
    });

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!anime) return null;

    return (
        <div className="pb-12">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden rounded-3xl mb-8">
                <img
                    src={anime.images.webp.large_image_url}
                    alt={anime.title}
                    className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col md:flex-row gap-8 items-end">
                    <img
                        src={anime.images.webp.large_image_url}
                        alt={anime.title}
                        className="w-48 rounded-xl shadow-2xl hidden md:block"
                    />
                    <div className="flex-1 space-y-4">
                        <h1 className="text-4xl font-display font-bold">{anime.title_english || anime.title}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-foreground font-bold">{anime.score}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {anime.year || 'Unknown'}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {anime.duration}
                            </span>
                            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs font-bold">
                                {anime.rating}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                <TabButton active={activeTab === 'details'} onClick={() => setActiveTab('details')}>
                    Details
                </TabButton>
                <TabButton active={activeTab === 'characters'} onClick={() => setActiveTab('characters')}>
                    Characters
                </TabButton>
                <TabButton active={activeTab === 'episodes'} onClick={() => setActiveTab('episodes')}>
                    Episodes
                </TabButton>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'details' && (
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-6">
                                <section>
                                    <h3 className="text-xl font-bold mb-3">Synopsis</h3>
                                    <p className="text-muted-foreground leading-relaxed">{anime.synopsis}</p>
                                </section>
                                {anime.trailer?.embed_url && (
                                    <section>
                                        <h3 className="text-xl font-bold mb-3">Trailer</h3>
                                        <div className="aspect-video rounded-xl overflow-hidden">
                                            <iframe
                                                src={anime.trailer.embed_url}
                                                title="Trailer"
                                                className="w-full h-full"
                                                allowFullScreen
                                            />
                                        </div>
                                    </section>
                                )}
                            </div>
                            <div className="space-y-6">
                                <div className="bg-card p-6 rounded-2xl border border-border space-y-4">
                                    <h3 className="font-bold border-b border-border pb-2">Information</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Type</span>
                                            <span>{anime.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Episodes</span>
                                            <span>{anime.episodes || 'Unknown'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Status</span>
                                            <span>{anime.status}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Studios</span>
                                            <span>{anime.studios.map(s => s.name).join(', ')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Genres</span>
                                            <span>{anime.genres.map(g => g.name).join(', ')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'characters' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {characters?.data?.map((char: any) => (
                                <div key={char.character.mal_id} className="bg-card rounded-xl overflow-hidden border border-border">
                                    <div className="aspect-square">
                                        <img
                                            src={char.character.images.webp.image_url}
                                            alt={char.character.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h4 className="font-bold text-sm line-clamp-1">{char.character.name}</h4>
                                        <p className="text-xs text-muted-foreground">{char.role}</p>
                                    </div>
                                </div>
                            ))}
                            {!characters && <Loader2 className="animate-spin" />}
                        </div>
                    )}

                    {activeTab === 'episodes' && (
                        <div className="space-y-2">
                            {episodes?.data?.map((ep: any) => (
                                <div key={ep.mal_id} className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-lg w-8 text-center">{ep.mal_id}</span>
                                        <div>
                                            <h4 className="font-bold">{ep.title}</h4>
                                            <p className="text-xs text-muted-foreground">{ep.title_japanese}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {ep.aired ? new Date(ep.aired).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                            ))}
                            {!episodes && <Loader2 className="animate-spin" />}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
