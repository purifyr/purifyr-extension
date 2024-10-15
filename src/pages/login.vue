<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router' // Importation du RouterLink pour créer des liens internes

// Champs du formulaire de login
const email = ref('') // Email de l'utilisateur
const password = ref('') // Mot de passe de l'utilisateur
const rememberMe = ref(false) // Se souvenir de l'utilisateur
const isLoading = ref(false) // État de chargement pour la soumission

// Fonction de soumission du formulaire
const submitLogin = async () => {
  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulation du délai de traitement

  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Remember me:', rememberMe.value)

  // Logique de soumission (API call, authentification, etc.)
  // ...

  isLoading.value = false

  // Reset les champs (optionnel)
  email.value = ''
  password.value = ''
  rememberMe.value = false
}
</script>

<template>
  <div class="mx-auto p-4 bg-base-100 max-w-md">
    <h2 class="text-2xl font-bold text-center mb-4">Login to your account</h2>
    <div class="divider"></div>

    <!-- Formulaire de login -->
    <form
      class="space-y-4"
      @submit.prevent="submitLogin"
    >
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

      <!-- Bouton de soumission -->
      <div class="form-control">
        <button
          type="submit"
          class="btn btn-secondary w-full"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Login</span>
          <span
            v-if="isLoading"
            class="flex items-center justify-center"
          >
            <span class="loading loading-spinner mr-2" />
            Logging in...
          </span>
        </button>
      </div>
    </form>

    <!-- Lien vers la vue de register -->
    <div class="text-center mt-4">
      <p class="text-sm">
        Don't have an account yet?
        <RouterLink
          to="/common/register"
          class="link"
        >
          Register here
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
