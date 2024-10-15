import { createFetch } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth.store'

// Un objet externe pour sauvegarder les options de la requête
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
                    Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
                }
            }

            // Sauvegarder les options d'origine dans une variable externe
            originalOptions = { ...options }

            return { options }
        },
        onFetchError: async ({ data, response, error }) => {
            const authStore = useAuthStore()

            // Si la réponse est 401, on tente de rafraîchir le token
            if (response?.status === 401 && authStore.tokens?.refresh?.token) {
                console.log('Token expired, attempting to refresh...')

                // Appeler l'API pour rafraîchir les tokens
                await authStore.refreshTokens()

                const newToken = authStore.tokens?.access?.token
                if (newToken && originalOptions) {
                    // Mettre à jour les headers avec le nouveau token
                    originalOptions.headers = {
                        ...originalOptions.headers,
                        Authorization: `Bearer ${newToken}`,
                    }

                    // Relancer la requête initiale avec fetch natif
                    return fetch(response.url!, originalOptions).then(res =>
                        res.json(),
                    ) // Assurer que la réponse est bien parsée en JSON
                }
            }

            // Retourner l'erreur si ce n'est pas un problème de token
            return { data, error }
        },
    },
    fetchOptions: {
        mode: 'cors',
    },
})
