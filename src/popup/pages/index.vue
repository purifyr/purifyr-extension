<script setup lang="ts"></script>

<template>
  <div class="m-4 flex flex-col gap-y-2">
    <!-- Stats -->
    <div class="stats stats-horizontal shadow mb-4">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <i-mdi-information-slab-circle-outline class="h-8 w-8" />
        </div>
        <div class="stat-title">Reported URL</div>
        <div class="stat-value">31K</div>
        <div class="stat-desc">↗︎ 350 (18%)</div>
      </div>

      <div class="stat">
        <div class="stat-title">Fact Checks</div>
        <div class="stat-value">4,200</div>
        <div class="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div class="stat">
        <div class="stat-title">Sus. Behaviors Reported</div>
        <div class="stat-value">1,200</div>
        <div class="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
    <!-- Buttons -->
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
      Report suspicious behavior (Pharos)
    </RouterLink>
  </div>
</template>

<style scoped></style>
