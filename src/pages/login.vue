<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store' // Importation du store d'authentification
import { useRouter } from 'vue-router' // Pour rediriger après la connexion réussie

// Champs du formulaire de login
const email = ref('') // Email de l'utilisateur
const password = ref('') // Mot de passe de l'utilisateur
const rememberMe = ref(false) // Se souvenir de l'utilisateur
const isLoading = ref(false) // État de chargement pour la soumission

// Initialisation du store Pinia et du routeur
const authStore = useAuthStore()
const router = useRouter()

// Fonction de soumission du formulaire
const submitLogin = async () => {
  isLoading.value = true

  // Appel au store pour effectuer la connexion
  await authStore.login({ email: email.value, password: password.value })

  // Vérification de l'état après la tentative de connexion
  if (!authStore.error) {
    // Si la connexion réussit, redirige vers une autre page (ex. Dashboard)
    router.push('/')
  } else {
    // Si une erreur survient, elle sera gérée via authStore.error
    console.log(authStore.error)
  }

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
    <div class="divider" />
    <!-- Show errors if they exist -->
    <div
      v-if="authStore.error"
      role="alert"
      class="alert alert-error mb-4"
    >
      <i-mdi-alert-circle-outline class="" />
      <span>{{ authStore.error }}</span>
    </div>

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
      <!-- Password -->
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
      <!-- Submit button -->
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
    <!-- Link to register page -->
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
