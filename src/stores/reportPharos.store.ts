import { defineStore } from 'pinia'
import { useApiFetch } from '@/utils/api'

export const useReportPharosStore = defineStore('reportPharos', {
    state: () => ({
        reportPharos: null,
        error: null,
        loading: false,
    }),

    actions: {
        async addReportPharos({ screenshot, cause, description, optionalUrl }: { screenshot: File, cause: string, description: string, optionalUrl?: string }) {
            this.loading = true

            // Utilisation de FormData pour inclure l'image
            const formData = new FormData()
            if (screenshot) {
                formData.append('image', screenshot)
            }
            formData.append('cause', cause)
            formData.append('description', description)
            if (optionalUrl) {
                formData.append('optionalUrl', optionalUrl)
            }

            const { error, data } = await useApiFetch('reports-pharos')
                .post(formData)  // On envoie le formData
                .json()

            this.handleResponse(data, error)
        },

        handleResponse(data: any, error: any) {
            if (error.value) {
                const errorMessage = error.value?.response?.data?.message
                    || error.value?.data?.message
                    || error.value?.message
                    || 'Failed to add reportPharos'
                this.error = errorMessage
            } else {
                this.reportPharos = data.value
                this.error = null
            }
            this.loading = false
        },

        clearError() {
            this.error = null
        },
    },
})
