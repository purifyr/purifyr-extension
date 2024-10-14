<script setup>
import { ref } from 'vue'

const url = ref('')
const cause = ref('')
const isLoading = ref(false)
const showModal = ref(false) // Variable pour afficher ou cacher la modal

const submitReport = async () => {
  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000))

  console.log('URL:', url.value)
  console.log('Cause:', cause.value)

  isLoading.value = false
  showModal.value = true

  // Reset the form
  url.value = ''
  cause.value = ''
}
</script>

<template>
  <div class="mx-auto p-4 bg-base-100">
    <h2 class="text-2xl font-bold text-center mb-4">Report a suspicious URL</h2>
    <div class="divider"></div>
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
          <option value="fraud">Fraud</option>
          <option value="illegal_content">Illegal Content</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-control">
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Submit Report</span>
          <span
            v-if="isLoading"
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
