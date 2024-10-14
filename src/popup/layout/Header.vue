<script setup lang="ts">
const displayName = __DISPLAY_NAME__
</script>

<template>
  <header
    aria-label="Site Header"
    class="bg-base-content text-base-100"
  >
    <div class="flex flex-col items-start justify-between p-4">
      <div class="flex items-center space-x-2">
        <i-ic-outline-remove-red-eye class="logo h-8 w-8" />
        <h1 class="text-2xl font-bold">
          {{ displayName }}
        </h1>
      </div>
      <h6 class="mt-1 text-sm">
        Awareness, prevention & supports against harmful online content.
      </h6>
    </div>
  </header>
</template>
