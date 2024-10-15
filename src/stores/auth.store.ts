// src/stores/auth.store.js
import { defineStore } from 'pinia'
import { useApiFetch } from '@/utils/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        tokens: null,
        error: null,
        loading: false,
    }),

    actions: {
        async register({ name, email, password }: { name: string; email: string; password: string }) {
            this.loading = true
            const { data, error } = await useApiFetch('auth/register')
                .post({ name, email, password })
                .json()

            this.handleResponse(data, error, 'register')
        },

        async login({ email, password }: { email: string; password: string }) {
            this.loading = true
            const { data, error } = await useApiFetch('auth/login')
                .post({ email, password })
                .json()

            this.handleResponse(data, error, 'login')
        },

        async logout() {
            this.loading = true

            const { response, error } = await useApiFetch('auth/logout')
                .post({ refreshToken: this.tokens?.refresh?.token })

            if (error.value) {
                this.error = error.value.message || 'Failed to logout'
            } else if (response.value?.status === 204) {
                this.user = null
                this.tokens = null
                this.error = null
            }

            this.loading = false
        },

        async refreshTokens() {
            const { data, error } = await useApiFetch('auth/refresh-tokens')
                .post({ refreshToken: this.tokens?.refresh?.token })
                .json()

            this.handleResponse(data, error, 'refresh')
        },

        handleResponse(data: any, error: any, action: string) {
            if (error.value) {
                this.error = error.value.message || `Failed to ${action}`
            } else {
                if (action === 'register' || action === 'login') {
                    this.user = data.value.user
                    this.tokens = data.value.tokens
                } else if (action === 'refresh') {
                    this.tokens = data.value.tokens
                }
                this.error = null
            }

            this.loading = false
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
