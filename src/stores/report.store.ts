import { defineStore } from 'pinia'
import { useApiFetch } from '@/utils/api'

export const useReportStore = defineStore('report', {
    state: () => ({
        report: null,
        error: null,
        loading: false,
    }),

    actions: {
        async addReportUrl({ url, cause, description }: { url: string, cause: string, description?: string }) {
            this.loading = true

            const { error, data } = await useApiFetch('reports')
                .post({ url, cause, description })
                .json()

            this.handleResponse(data, error)
        },

        handleResponse(data, error) {
            if (error.value) {
                const errorMessage = error.value?.response?.data?.message
                    || error.value?.data?.message
                    || error.value?.message
                    || 'Failed to add report'
                this.error = errorMessage
            } else {
                this.report = data.value
                this.error = null
            }
            this.loading = false
        },

        clearError() {
            this.error = null
        },
    },
})
