// src/stores/auth.store.js
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,         // Utilisateur authentifié
        tokens: null,       // Jetons d'authentification
        error: null,        // Erreur lors de l'authentification
        loading: false,     // Indicateur de chargement
    }),

    actions: {
        async register({ name, email, password }) {
            this.loading = true

            const { data, error } = await useFetch('http://localhost:3000/v1/auth/register')
                .post({ name, email, password })
                .json()

            if (error.value) {
                this.error = error.value.message || 'Failed to register'
            } else {
                this.user = data.value.user
                this.tokens = data.value.tokens
                this.error = null
            }

            this.loading = false
        },

        async login({ email, password }) {
            this.loading = true

            const { data, error } = await useFetch('http://localhost:3000/v1/auth/login')
                .post({ email, password })
                .json()

            if (error.value) {
                this.error = error.value.message || 'Failed to login'
            } else {
                this.user = data.value.user
                this.tokens = data.value.tokens
                this.error = null
            }

            this.loading = false
        },

        async logout() {
            this.loading = true

            console.log("In logout")

            const { response, error } = await useFetch('http://localhost:3000/v1/auth/logout')
                .post({ refreshToken: this.tokens?.refresh?.token })

            console.log('Response:', response)
            console.log('Error:', error)

            // Gérer les erreurs
            if (error.value) {
                this.error = error.value.message || 'Failed to logout'
            } else if (response.value?.status === 204) {
                // Si l'API retourne 204 (No Content), ne tente pas de parser la réponse
                this.user = null
                this.tokens = null
                this.error = null
                console.log('Logout successful!')
            }

            this.loading = false
        },

        async refreshTokens() {
            const { data, error } = await useFetch('http://localhost:3000/v1/auth/refresh-tokens')
                .post({ refreshToken: this.tokens?.refresh?.token })
                .json()

            if (error.value) {
                this.error = error.value.message || 'Failed to refresh tokens'
            } else {
                this.tokens = data.value.tokens
            }
        },

        clearError() {
            this.error = null
        },
    },
    persist: {
        key: 'auth',
        storage: localStorage,
    },
})
