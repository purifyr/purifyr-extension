<script setup lang="ts">
import { ref } from 'vue'

// Champs du formulaire d'inscription
const username = ref('') // Nom d'utilisateur
const email = ref('') // Email de l'utilisateur
const password = ref('') // Mot de passe de l'utilisateur
const confirmPassword = ref('') // Confirmation du mot de passe
const acceptTerms = ref(false) // Consentement aux termes et conditions
const isLoading = ref(false) // État de chargement pour la soumission

// Fonction de soumission du formulaire
const submitRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  if (!acceptTerms.value) {
    alert('You must accept the terms and conditions.')
    return
  }

  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000))

  console.log('Username:', username.value)
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Accepted Terms:', acceptTerms.value)

  // TODO: Here go an API Call
  // ...

  isLoading.value = false

  // Reset fields
  username.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  acceptTerms.value = false
}
</script>

<template>
  <div class="mx-auto p-4 bg-base-100 max-w-md">
    <h2 class="text-2xl font-bold text-center mb-4">Create an Account</h2>
    <div class="divider" />

    <!-- Formulaire d'inscription -->
    <form
      class="space-y-4"
      @submit.prevent="submitRegister"
    >
      <!-- Nom d'utilisateur -->
      <div class="form-control">
        <label
          class="label"
          for="username"
        >
          <span class="label-text">Username</span>
        </label>
        <input
          id="username"
          type="text"
          v-model="username"
          placeholder="Your username"
          class="input input-bordered w-full"
          required
        />
      </div>

      <!-- Email -->
      <div class="form-control">
        <label
          class="label"
          for="email"
        >
          <span class="label-text">Email</span>
        </label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="you@example.com"
          class="input input-bordered w-full"
          required
        />
      </div>

      <!-- Mot de passe -->
      <div class="form-control">
        <label
          class="label"
          for="password"
        >
          <span class="label-text">Password</span>
        </label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="••••••••"
          class="input input-bordered w-full"
          required
        />
      </div>

      <!-- Confirmation du mot de passe -->
      <div class="form-control">
        <label
          class="label"
          for="confirm-password"
        >
          <span class="label-text">Confirm Password</span>
        </label>
        <input
          id="confirm-password"
          type="password"
          v-model="confirmPassword"
          placeholder="••••••••"
          class="input input-bordered w-full"
          required
        />
      </div>

      <!-- Checkbox "Accepter les termes" -->
      <div class="form-control">
        <label class="cursor-pointer flex items-start space-x-2">
          <input
            type="checkbox"
            v-model="acceptTerms"
            class="checkbox checkbox-primary"
          />
          <span class="label-text">
            I agree to the
            <a
              href="#"
              class="link"
            >
              Terms and Conditions
            </a>
            .
          </span>
        </label>
      </div>

      <!-- Submit button -->
      <div class="form-control">
        <button
          type="submit"
          class="btn btn-secondary w-full"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Register</span>
          <span
            v-if="isLoading"
            class="flex items-center justify-center"
          >
            <span class="loading loading-spinner mr-2" />
            Creating account...
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
