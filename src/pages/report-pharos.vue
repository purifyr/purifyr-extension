<script setup>
import { ref } from 'vue'
import { definePage } from 'unplugin-vue-router/runtime'

definePage({
  meta: {
    requiresAuth: true,
  },
})

// Champs du formulaire
const screenshot = ref(null)
const contentType = ref('')
const description = ref('')
const optionalUrl = ref('')
const consent = ref(false)
const isLoading = ref(false)
const showModal = ref(false)

// Fonction de soumission du formulaire
const submitReport = async () => {
  if (!consent.value) {
    alert('You must agree to the terms before submitting the report.')
    return
  }

  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000))

  console.log('Screenshot:', screenshot.value)
  console.log('Content Type:', contentType.value)
  console.log('Description:', description.value)
  console.log('Optional URL:', optionalUrl.value)
  console.log('Consent:', consent.value)

  isLoading.value = false
  showModal.value = true

  // Reset du formulaire après soumission
  screenshot.value = null
  contentType.value = ''
  description.value = ''
  optionalUrl.value = ''
  consent.value = false
}
</script>

<template>
  <div class="mx-auto p-4 bg-base-100">
    <h2 class="text-2xl font-bold text-center mb-4">
      Assisted Reporting via
      <a
        href="https://www.internet-signalement.gouv.fr/"
        target="_blank"
        class="link link-hover"
      >
        Pharos
      </a>
    </h2>
    <div class="divider" />
    <form
      class="space-y-4"
      @submit.prevent="submitReport"
    >
      <!-- Capture d'écran -->
      <div class="form-control">
        <label
          class="label"
          for="screenshot"
        >
          <span class="label-text">Screenshot of the Content</span>
        </label>
        <input
          id="screenshot"
          type="file"
          accept="image/*"
          @change="(e) => (screenshot.value = e.target.files[0])"
          class="file-input file-input-bordered w-full"
          required
        />
      </div>

      <!-- Type de contenu -->
      <div class="form-control">
        <label
          class="label"
          for="content-type"
        >
          <span class="label-text">Type of Content</span>
        </label>
        <select
          id="content-type"
          v-model="contentType"
          class="select select-bordered w-full"
          required
        >
          <option
            disabled
            value=""
          >
            Select a content type
          </option>
          <option value="cyberbullying">Cyberbullying</option>
          <option value="misinformation">Misinformation</option>
          <option value="hate_speech">Hate Speech</option>
          <option value="identity_theft">Identity Theft</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Description du problème -->
      <div class="form-control">
        <label
          class="label"
          for="description"
        >
          <span class="label-text">Brief Description of the Issue</span>
        </label>
        <textarea
          id="description"
          v-model="description"
          placeholder="Describe the issue (e.g., 'This content promotes hate')"
          class="textarea textarea-bordered w-full"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- URL facultative -->
      <div class="form-control">
        <label
          class="label"
          for="optional-url"
        >
          <span class="label-text">URL of the Content (Optional)</span>
        </label>
        <input
          id="optional-url"
          type="url"
          v-model="optionalUrl"
          placeholder="https://example.com"
          class="input input-bordered w-full"
        />
      </div>

      <!-- Checkbox pour consentement -->
      <div class="form-control">
        <label class="cursor-pointer flex items-start space-x-2">
          <input
            type="checkbox"
            v-model="consent"
            class="checkbox checkbox-primary"
            required
          />
          <span class="label-text">
            I consent that the provided information will be verified and
            understand that false statements may result in sanctions.
          </span>
        </label>
      </div>

      <!-- Bouton de soumission -->
      <div class="form-control">
        <button
          type="submit"
          class="btn btn-secondary w-full"
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
      <p>Your report has been submitted successfully and is under review.</p>
      <div class="modal-action">
        <button
          class="btn btn-sm"
          @click="showModal = false"
        >
          Close
        </button>
      </div>
    </div>
  </dialog>
</template>
