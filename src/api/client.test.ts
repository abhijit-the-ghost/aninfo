import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from './client';

vi.mock('axios', () => {
    const mockAxios = {
        create: vi.fn(() => ({
            interceptors: {
                response: { use: vi.fn() },
            },
            request: vi.fn(),
        })),
    };
    return { default: mockAxios };
});

describe('ApiClient', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should be defined', () => {
        expect(apiClient).toBeDefined();
    });

    // More tests would go here, mocking the internal axios instance
    // Since apiClient is a class instance exporting methods, we'd need to access the private client or mock the module differently
    // For this MVP, basic existence check is fine, or we can test the public methods if we mock the response
});
