import React from 'react';
import { X } from 'lucide-react';

interface FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
    filters: any;
    setFilters: (filters: any) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose, filters, setFilters }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="w-full max-w-md bg-background h-full p-6 shadow-2xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-display font-bold">Filters</h2>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Status</label>
                        <select
                            className="w-full p-2 rounded-lg border border-input bg-background"
                            value={filters.status || ''}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        >
                            <option value="">All</option>
                            <option value="airing">Airing</option>
                            <option value="complete">Complete</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Type</label>
                        <select
                            className="w-full p-2 rounded-lg border border-input bg-background"
                            value={filters.type || ''}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                            <option value="">All</option>
                            <option value="tv">TV</option>
                            <option value="movie">Movie</option>
                            <option value="ova">OVA</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Sort By</label>
                        <select
                            className="w-full p-2 rounded-lg border border-input bg-background"
                            value={filters.order_by || 'popularity'}
                            onChange={(e) => setFilters({ ...filters, order_by: e.target.value })}
                        >
                            <option value="popularity">Popularity</option>
                            <option value="score">Score</option>
                            <option value="title">Title</option>
                            <option value="start_date">Start Date</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Sort Direction</label>
                        <select
                            className="w-full p-2 rounded-lg border border-input bg-background"
                            value={filters.sort || 'desc'}
                            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                    <button
                        className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors"
                        onClick={onClose}
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};
