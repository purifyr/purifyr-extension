<script setup lang="ts"></script>

<template>
  <footer
    aria-label="Site Footer"
    class="bg-base-200 mt-10 p-4"
  >
    <div class="flex items-center justify-between">
      <!-- Partie gauche : Texte et liens -->
      <div class="flex flex-col items-start">
        <span class="text-sm font-medium">
          © 2024 Purifyr. All rights reserved.
        </span>
        <div class="text-xs space-x-2">
          <a
            href="#"
            class="link link-hover"
          >
            Privacy Policy
          </a>
          <span>|</span>
          <a
            href="#"
            class="link link-hover"
          >
            Terms of Service
          </a>
        </div>
      </div>

      <!-- Partie droite : Conteneur flex pour les deux boutons -->
      <div class="flex">
        <div
          class="tooltip tooltip-top"
          data-tip="User"
        >
          <RouterLink
            to="/common/login"
            class="btn btn-ghost btn-sm"
          >
            <i-mdi-account />
          </RouterLink>
        </div>
        <div
          class="tooltip tooltip-top"
          data-tip="Settings"
        >
          <RouterLink
            to="/options"
            class="btn btn-ghost btn-sm"
          >
            <i-mdi-cog />
          </RouterLink>
        </div>
        <div
          class="tooltip tooltip-top"
          data-tip="Dark mode"
        >
          <label class="btn btn-ghost btn-sm swap swap-rotate">
            <!-- this hidden checkbox controls the state -->
            <input
              type="checkbox"
              class="theme-controller"
              value="dark"
            />
            <i-ic-baseline-wb-sunny class="swap-off" />
            <i-mdi-weather-night class="swap-on" />
          </label>
        </div>
      </div>
    </div>
  </footer>
</template>
