import { createFetch } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth.store'

let originalOptions: RequestInit | null = null

export const useApiFetch = createFetch({
    baseUrl: 'http://localhost:3000/v1',
    options: {
        async beforeFetch({ url, options }) {
            const authStore = useAuthStore()
            const token = authStore.tokens?.access?.token

            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`,
                }
            }
            originalOptions = { ...options }
            return { options }
        },
        onFetchError: async ({ data, response, error }) => {
            const authStore = useAuthStore()

            // If the response is 401, we try to refresh the token
            if (response?.status === 401 && authStore.tokens?.refresh?.token) {
                console.log('Token expired, attempting to refresh...')
                await authStore.refreshTokens()
                const newToken = authStore.tokens?.access?.token

                if (newToken && originalOptions) {
                    originalOptions.headers = {
                        ...originalOptions.headers,
                        Authorization: `Bearer ${newToken}`,
                    }
                    // Rerun initial request with native fetch
                    return fetch(response.url!, originalOptions).then(res => res.json())
                }
            }
            const errorMessage = data?.message || error?.message || 'Unknown error'
            return { data, error: new Error(errorMessage) }
        }

    },
    fetchOptions: {
        mode: 'cors',
    },
})
