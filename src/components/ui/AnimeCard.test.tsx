import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AnimeCard } from './AnimeCard';
import type { Anime } from '../../types/anime';

const mockAnime: Anime = {
    mal_id: 1,
    title: 'Cowboy Bebop',
    title_english: 'Cowboy Bebop',
    images: {
        webp: { large_image_url: 'test.jpg', image_url: 'test.jpg', small_image_url: 'test.jpg' },
        jpg: { large_image_url: 'test.jpg', image_url: 'test.jpg', small_image_url: 'test.jpg' },
    },
    score: 9.8,
    type: 'TV',
    year: 1998,
    episodes: 26,
    // ... other required fields mocked as needed
} as any;

describe('AnimeCard', () => {
    it('renders anime title', () => {
        render(
            <BrowserRouter>
                <AnimeCard anime={mockAnime} />
            </BrowserRouter>
        );
        expect(screen.getByText('Cowboy Bebop')).toBeDefined();
    });

    it('renders anime score', () => {
        render(
            <BrowserRouter>
                <AnimeCard anime={mockAnime} />
            </BrowserRouter>
        );
        expect(screen.getByText('9.8')).toBeDefined();
    });
});
