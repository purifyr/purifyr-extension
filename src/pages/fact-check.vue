<script setup>
import { ref } from 'vue'

const textToAnalyze = ref('')
const isLoading = ref(false)
const showModal = ref(false)
const analysisRating = ref(0)

const submitReport = async () => {
  isLoading.value = true

  await new Promise((resolve) => setTimeout(resolve, 2000))

  console.log('Text to Analyze:', textToAnalyze.value)

  // Simulate an analysis note (e.g. random for demo)
  analysisRating.value = Math.floor(Math.random() * 5) + 1

  isLoading.value = false
  showModal.value = true

  analysisRating.value = ''
  textToAnalyze.value = ''
}
</script>

<template>
  <div class="mx-auto p-4 bg-base-100">
    <h2 class="text-2xl font-bold text-center mb-4">Fact Check a Text</h2>
    <div class="divider" />
    <form
      class="space-y-4"
      @submit.prevent="submitReport"
    >
      <div class="form-control">
        <label
          class="label"
          for="text-to-analyze"
        >
          <span class="label-text">Text to Analyze (Max 4000 characters)</span>
        </label>
        <textarea
          id="text-to-analyze"
          v-model="textToAnalyze"
          placeholder="Enter the text you want to analyze..."
          class="textarea textarea-bordered w-full"
          maxlength="4000"
          rows="5"
          required
        />
        <span class="text-xs text-gray-500 mt-1">
          {{ textToAnalyze.length }}/4000 characters
        </span>
      </div>
      <div class="form-control">
        <button
          type="submit"
          class="btn btn-secondary w-full"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Submit for Analysis</span>
          <span
            v-if="isLoading"
            class="flex items-center justify-center"
          >
            <span class="loading loading-spinner mr-2" />
            Analyzing...
          </span>
        </button>
      </div>
    </form>
  </div>
  <dialog
    id="report-modal"
    class="modal modal-bottom sm:modal-middle"
    :class="{ 'modal-open': showModal }"
  >
    <div class="modal-box w-full">
      <h3 class="font-bold text-lg">Analysis result</h3>
      <p>The result of the fact-checking analysis is:</p>
      <div class="rating mt-4">
        <input
          v-for="n in 5"
          :key="n"
          type="radio"
          name="rating"
          class="mask mask-star-2"
          :checked="n <= analysisRating"
          disabled
        />
      </div>
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
