import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

// Rate limiting configuration
const MAX_CONCURRENT_REQUESTS = 2;
const REQUEST_INTERVAL_MS = 340; // ~3 requests per second (1000ms / 3 = 333ms)

interface QueueItem {
    config: AxiosRequestConfig;
    resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
    reject: (reason?: any) => void;
}

class ApiClient {
    private client: AxiosInstance;
    private queue: QueueItem[] = [];
    private activeRequests = 0;
    private lastRequestTime = 0;

    constructor() {
        this.client = axios.create({
            baseURL: JIKAN_API_BASE,
        });

        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 429) {
                    // Exponential backoff or retry logic could go here
                    // For now, we just reject, but the queue helps avoid this
                    console.warn('Rate limited by Jikan API');
                }
                return Promise.reject(error);
            }
        );
    }

    public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.request<T>({ ...config, method: 'GET', url });
        return response.data;
    }

    private request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return new Promise((resolve, reject) => {
            this.queue.push({ config, resolve: resolve as any, reject });
            this.processQueue();
        });
    }

    private async processQueue() {
        if (this.activeRequests >= MAX_CONCURRENT_REQUESTS || this.queue.length === 0) {
            return;
        }

        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;

        if (timeSinceLastRequest < REQUEST_INTERVAL_MS) {
            setTimeout(() => {
                this.processQueue();
            }, REQUEST_INTERVAL_MS - timeSinceLastRequest);
            return;
        }

        const item = this.queue.shift();
        if (!item) return;

        this.activeRequests++;
        this.lastRequestTime = Date.now();

        try {
            const response = await this.client.request(item.config);
            item.resolve(response);
        } catch (error) {
            item.reject(error);
        } finally {
            this.activeRequests--;
            this.processQueue();
        }
    }
}

export const apiClient = new ApiClient();
