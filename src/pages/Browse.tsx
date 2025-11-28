import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { jikanApi } from '../api/jikan';
import { AnimeCard } from '../components/ui/AnimeCard';
import { Loader2, SlidersHorizontal } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FilterPanel } from '../components/browse/FilterPanel';
import type { JikanResponse, Anime } from '../types/anime';

export const Browse: React.FC = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') || '';
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        order_by: 'popularity',
        sort: 'desc',
    });

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery<JikanResponse<Anime[]>>({
        queryKey: ['browseAnime', q, filters],
        queryFn: ({ pageParam = 1 }) => {
            // If there's a search query, use search endpoint
            if (q) {
                return jikanApi.searchAnime(q, pageParam as number, filters);
            }
            // Otherwise use search endpoint with filters (Jikan search endpoint handles empty q with filters)
            return jikanApi.searchAnime('', pageParam as number, filters);
        },
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.has_next_page
                ? lastPage.pagination.current_page + 1
                : undefined;
        },
        initialPageParam: 1,
    });

    const { targetRef, isIntersecting } = useIntersectionObserver({
        rootMargin: '200px',
    });

    useEffect(() => {
        if (isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allAnime = data?.pages.flatMap((page) => page.data) || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-display font-bold">
                    {q ? `Results for "${q}"` : 'Browse Anime'}
                </h1>
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters</span>
                </button>
            </div>

            <FilterPanel
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                setFilters={setFilters}
            />

            {isLoading ? (
                <div className="flex h-[50vh] items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            ) : isError ? (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
                    <p className="text-muted-foreground">Failed to load anime. Please try again later.</p>
                </div>
            ) : allAnime.length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-3xl">
                    <p className="text-lg text-muted-foreground">No anime found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {allAnime.map((anime) => (
                        <AnimeCard key={`${anime.mal_id}-${anime.title}`} anime={anime} />
                    ))}
                </div>
            )}

            {/* Loading indicator for infinite scroll */}
            <div ref={targetRef} className="py-8 flex justify-center">
                {isFetchingNextPage && (
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                )}
            </div>
        </div>
    );
};
