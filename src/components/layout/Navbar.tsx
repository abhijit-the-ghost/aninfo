import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/useDebounce';
import { jikanApi } from '../../api/jikan';

export const Navbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debouncedSearch = useDebounce(searchQuery, 300);
    const navigate = useNavigate();

    const { data: suggestions, isLoading } = useQuery({
        queryKey: ['searchSuggestions', debouncedSearch],
        queryFn: () => jikanApi.searchAnime(debouncedSearch, 1, { limit: 5 }),
        enabled: debouncedSearch.length > 2,
    });

    useEffect(() => {
        if (debouncedSearch.length > 2) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [debouncedSearch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowSuggestions(false);
            navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-display font-bold text-primary">
                    Aninfo
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link to="/browse" className="text-sm font-medium hover:text-primary transition-colors">
                        Browse
                    </Link>
                    <Link to="/watchlist" className="text-sm font-medium hover:text-primary transition-colors">
                        Watchlist
                    </Link>
                    <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                        About
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative hidden sm:block">
                        <form onSubmit={handleSearch}>
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search anime..."
                                className="h-9 w-64 rounded-full border border-input bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            />
                        </form>

                        {/* Typeahead Suggestions */}
                        {showSuggestions && (
                            <div
                                className="absolute top-full mt-2 w-full bg-card rounded-xl shadow-xl border border-border overflow-hidden"
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                {isLoading ? (
                                    <div className="p-4 flex justify-center">
                                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                    </div>
                                ) : suggestions?.data?.length ? (
                                    <ul>
                                        {suggestions.data.slice(0, 5).map((anime) => (
                                            <li key={anime.mal_id}>
                                                <Link
                                                    to={`/anime/${anime.mal_id}`}
                                                    className="flex items-center space-x-3 p-3 hover:bg-muted transition-colors"
                                                    onClick={() => setShowSuggestions(false)}
                                                >
                                                    <img
                                                        src={anime.images.webp.small_image_url}
                                                        alt={anime.title}
                                                        className="w-8 h-12 object-cover rounded"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">{anime.title}</p>
                                                        <p className="text-xs text-muted-foreground">{anime.year || 'Unknown'}</p>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
