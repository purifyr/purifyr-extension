<script setup>
import { ref, watch } from 'vue'
import { useReportStore } from '@/stores/report.store'

const url = ref('')
const cause = ref('')
const showModal = ref(false)

const reportStore = useReportStore()

const submitReport = async () => {
  reportStore.loading = true

  await reportStore.addReportUrl({
    url: url.value,
    cause: cause.value,
  })

  if (!reportStore.error) {
    showModal.value = true
    url.value = ''
    cause.value = ''
  }
  reportStore.loading = false
}
</script>

<template>
  <div class="mx-auto p-4 bg-base-100">
    <h2 class="text-2xl font-bold text-center mb-4">Report a suspicious URL</h2>
    <div class="divider" />
    <!-- Show errors if they exist -->
    <div
      v-if="reportStore.error"
      role="alert"
      class="alert alert-error mb-4"
    >
      <i-mdi-alert-circle-outline class="" />
      <span>{{ reportStore.error }}</span>
    </div>
    <form
      class="space-y-4"
      @submit.prevent="submitReport"
    >
      <div class="form-control">
        <label
          class="label"
          for="url"
        >
          <span class="label-text">URL to Report</span>
        </label>
        <input
          id="url"
          type="url"
          v-model="url"
          placeholder="https://example.com"
          class="input input-bordered w-full"
          required
        />
      </div>
      <div class="form-control">
        <label
          class="label"
          for="cause"
        >
          <span class="label-text">Cause</span>
        </label>
        <select
          id="cause"
          v-model="cause"
          class="select select-bordered w-full"
          required
        >
          <option
            disabled
            value=""
          >
            Select a cause
          </option>
          <option value="harassment">Harassment</option>
          <option value="terrorism">Terrorism</option>
          <option value="phishing">Phishing</option>
          <option value="fraud">Fraud</option>
          <option value="illegal_content">Illegal Content</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-control">
        <button
          type="submit"
          class="btn btn-secondary w-full"
          :disabled="reportStore.loading"
        >
          <span v-if="!reportStore.loading">Submit Report</span>
          <span
            v-if="reportStore.loading"
            class="flex items-center justify-center"
          >
            <span class="loading loading-spinner mr-2" />
            Submitting...
          </span>
        </button>
      </div>
    </form>
  </div>
  <!-- Modal -->
  <dialog
    id="report-modal"
    class="modal modal-bottom sm:modal-middle"
    :class="{ 'modal-open': showModal }"
  >
    <div class="modal-box w-full">
      <h3 class="font-bold text-lg">Report submitted</h3>
      <p class="">Your report has been submitted successfully!</p>
      <div class="modal-action">
        <form method="dialog">
          <button
            class="btn btn-sm"
            @click="showModal = false"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
