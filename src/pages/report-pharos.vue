<script setup>
import { ref } from 'vue'
import { useReportPharosStore } from '@/stores/reportPharos.store' // Importez le store

const screenshot = ref(null)
const cause = ref('')
const description = ref('')
const optionalUrl = ref('')
const consent = ref(false)
const isLoading = ref(false)
const showModal = ref(false)

const reportPharosStore = useReportPharosStore() // Instanciez le store

const handleFileChange = (e) => {
  screenshot.value = e.target.files[0]
}

const submitReport = async () => {
  if (!consent.value) {
    alert('You must agree to the terms before submitting the report.')
    return
  }

  if (!screenshot.value) {
    alert('Screenshot is required')
    return
  }

  isLoading.value = true

  // Appel à l'action du store pour ajouter le rapport
  await reportPharosStore.addReportPharos({
    screenshot: screenshot.value,
    cause: cause.value,
    description: description.value,
    optionalUrl: optionalUrl.value,
    consent: consent.value,
  })

  isLoading.value = false
  showModal.value = true

  // Reset form
  screenshot.value = null
  cause.value = ''
  description.value = ''
  optionalUrl.value = ''
  consent.value = false
}
</script>

<template>
  <div class="mx-auto p-4 bg-base-100">
    <h2 class="text-2xl font-bold text-center mb-4">
      Assisted Reporting via
      <a href="https://www.internet-signalement.gouv.fr/" target="_blank" class="link link-hover">
        Pharos
      </a>
    </h2>
    <div class="divider" />
    <form class="space-y-4" @submit.prevent="submitReport">
      <!-- Screenshot -->
      <div class="form-control">
        <label class="label" for="screenshot">
          <span class="label-text">Screenshot of the Content</span>
        </label>
        <input id="screenshot" type="file" accept="image/*" class="file-input file-input-bordered w-full" required
          @change="handleFileChange">
      </div>
      <!-- Content Type -->
      <div class="form-control">
        <label class="label" for="content-type">
          <span class="label-text">Type of Content</span>
        </label>
        <select id="content-type" v-model="cause" class="select select-bordered w-full" required>
          <option disabled value="">
            Select a content type
          </option>
          <option value="cyberbullying">Cyberbullying</option>
          <option value="misinformation">Misinformation</option>
          <option value="hate_speech">Hate Speech</option>
          <option value="identity_theft">Identity Theft</option>
          <option value="other">Other</option>
        </select>
      </div>
      <!-- Description of the problem -->
      <div class="form-control">
        <label class="label" for="description">
          <span class="label-text">Brief Description of the Issue</span>
        </label>
        <textarea id="description" v-model="description"
          placeholder="Describe the issue (e.g., 'This content promotes hate')"
          class="textarea textarea-bordered w-full" rows="4" required />
      </div>
      <!-- URL optional -->
      <div class="form-control">
        <label class="label" for="optional-url">
          <span class="label-text">URL of the Content (Optional)</span>
        </label>
        <input id="optional-url" v-model="optionalUrl" type="url" placeholder="https://example.com"
          class="input input-bordered w-full">
      </div>
      <!-- Checkbox for consent -->
      <div class="form-control">
        <label class="cursor-pointer flex items-start space-x-2">
          <input v-model="consent" type="checkbox" class="checkbox checkbox-primary" required>
          <span class="label-text">
            I consent that the provided information will be verified and
            understand that false statements may result in sanctions.
          </span>
        </label>
      </div>
      <!-- Submit button -->
      <div class="form-control">
        <button type="submit" class="btn btn-secondary w-full" :disabled="isLoading">
          <span v-if="!isLoading">Submit Report</span>
          <span v-if="isLoading" class="flex items-center justify-center">
            <span class="loading loading-spinner mr-2" />
            Submitting...
          </span>
        </button>
      </div>
    </form>
  </div>
  <!-- Modal -->
  <dialog id="report-modal" class="modal modal-bottom sm:modal-middle" :class="{ 'modal-open': showModal }">
    <div class="modal-box w-full">
      <h3 class="font-bold text-lg">
        Report submitted
      </h3>
      <p>Your report has been submitted successfully and is under review.</p>
      <div class="modal-action">
        <button class="btn btn-sm" @click="showModal = false">
          Close
        </button>
      </div>
    </div>
  </dialog>
</template>
