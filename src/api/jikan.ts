import { apiClient } from './client';
import type { Anime, JikanResponse } from '../types/anime';

export const jikanApi = {
    getTopAnime: async (page = 1, filter = 'bypopularity') => {
        return apiClient.get<JikanResponse<Anime[]>>('/top/anime', {
            params: { page, filter },
        });
    },

    getSeasonNow: async (page = 1) => {
        return apiClient.get<JikanResponse<Anime[]>>('/seasons/now', {
            params: { page },
        });
    },

    getUpcomingAnime: async (page = 1) => {
        return apiClient.get<JikanResponse<Anime[]>>('/seasons/upcoming', {
            params: { page },
        });
    },

    searchAnime: async (q: string, page = 1, filters?: any) => {
        return apiClient.get<JikanResponse<Anime[]>>('/anime', {
            params: { q, page, ...filters },
        });
    },

    getAnimeById: async (id: number) => {
        return apiClient.get<{ data: Anime }>(`/anime/${id}`);
    },

    getAnimeCharacters: async (id: number) => {
        return apiClient.get<JikanResponse<any[]>>(`/anime/${id}/characters`);
    },

    getAnimeEpisodes: async (id: number) => {
        return apiClient.get<JikanResponse<any[]>>(`/anime/${id}/episodes`);
    },

    getAnimeStaff: async (id: number) => {
        return apiClient.get<JikanResponse<any[]>>(`/anime/${id}/staff`);
    },

    getAnimeRecommendations: async (id: number) => {
        return apiClient.get<JikanResponse<any[]>>(`/anime/${id}/recommendations`);
    },

    getAnimePictures: async (id: number) => {
        return apiClient.get<{ data: any[] }>(`/anime/${id}/pictures`);
    },
};
