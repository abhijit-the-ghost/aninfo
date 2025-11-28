import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { jikanApi } from '../api/jikan';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { AnimeSection } from '../components/home/AnimeSection';
import { AnimeCard } from '../components/ui/AnimeCard';
import { Loader2 } from 'lucide-react';

export const Home: React.FC = () => {
    const { data: topAnime, isLoading: loadingTop } = useQuery({
        queryKey: ['topAnime'],
        queryFn: () => jikanApi.getTopAnime(1),
    });

    const { data: upcomingAnime, isLoading: loadingUpcoming } = useQuery({
        queryKey: ['upcomingAnime'],
        queryFn: () => jikanApi.getUpcomingAnime(1),
    });

    const { data: seasonNow, isLoading: loadingSeason } = useQuery({
        queryKey: ['seasonNow'],
        queryFn: () => jikanApi.getSeasonNow(1),
    });

    if (loadingTop || loadingUpcoming || loadingSeason) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            {topAnime?.data && <HeroCarousel animeList={topAnime.data.slice(0, 5)} />}

            <AnimeSection title="Trending Now" linkTo="/browse?filter=airing">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {topAnime?.data?.slice(0, 10).map((anime) => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
                </div>
            </AnimeSection>

            <AnimeSection title="This Season" linkTo="/browse?filter=upcoming">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {seasonNow?.data?.slice(0, 10).map((anime) => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
                </div>
            </AnimeSection>

            <AnimeSection title="Upcoming Hype" linkTo="/browse?filter=upcoming">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {upcomingAnime?.data?.slice(0, 10).map((anime) => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
                </div>
            </AnimeSection>
        </div>
    );
};
