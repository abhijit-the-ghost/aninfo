export interface AnimeImage {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

export interface AnimeImages {
    jpg: AnimeImage;
    webp: AnimeImage;
}

export interface AnimeTitle {
    type: string;
    title: string;
}

export interface AnimeGenre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

export interface Anime {
    mal_id: number;
    url: string;
    images: AnimeImages;
    trailer: {
        youtube_id: string | null;
        url: string | null;
        embed_url: string | null;
    };
    approved: boolean;
    titles: AnimeTitle[];
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number | null;
    status: string;
    airing: boolean;
    aired: {
        from: string | null;
        to: string | null;
        prop: {
            from: { day: number | null; month: number | null; year: number | null };
            to: { day: number | null; month: number | null; year: number | null };
        };
        string: string | null;
    };
    duration: string;
    rating: string;
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
    synopsis: string | null;
    background: string | null;
    season: string | null;
    year: number | null;
    broadcast: {
        day: string | null;
        time: string | null;
        timezone: string | null;
        string: string | null;
    };
    producers: AnimeGenre[];
    licensors: AnimeGenre[];
    studios: AnimeGenre[];
    genres: AnimeGenre[];
    explicit_genres: AnimeGenre[];
    themes: AnimeGenre[];
    demographics: AnimeGenre[];
}

export interface JikanResponse<T> {
    data: T;
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        current_page: number;
        items: {
            count: number;
            total: number;
            per_page: number;
        };
    };
}
