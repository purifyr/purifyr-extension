<script setup lang="ts"></script>

<template>
  <div class="m-4 flex flex-col gap-y-2">
    <RouterLink
      to="/common/report-url"
      class="btn justify-start"
    >
      <i-mdi-link-variant />
      Report URL
    </RouterLink>
    <RouterLink
      to="/common/fact-check"
      class="btn justify-start"
    >
      <i-mdi-file-search-outline />
      Fact check a text
    </RouterLink>
    <RouterLink
      to="/common/fact-check"
      class="btn justify-start"
    >
      <i-mdi-police-badge-outline />
      Report suspicious behavior
    </RouterLink>
  </div>
</template>

<style scoped></style>
