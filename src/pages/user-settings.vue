<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store' // Importation du store d'authentification

const authStore = useAuthStore()

// Simulated reports data
const reports = ref([
  { id: 1, url: 'https://example.com', cause: 'Phishing', status: 'Pending' },
  { id: 2, url: 'https://fraudsite.com', cause: 'Fraud', status: 'Approved' },
  { id: 3, url: 'https://malware.com', cause: 'Malware', status: 'Rejected' },
])

// Simulated Pharos reports data
const pharosReports = ref([
  {
    id: 1,
    url: 'https://phishing.com',
    cause: 'Phishing',
    status: 'Under review',
  },
  {
    id: 2,
    url: 'https://illegal.com',
    cause: 'Illegal Content',
    status: 'Sent to Pharos',
  },
])

// Active tab state
const activeTab = ref('profile')
</script>

<template>
  <div class="mx-auto p-4 bg-base-100">
    <h2 class="text-3xl font-bold text-center mb-6">User Settings</h2>

    <!-- Tabs navigation -->
    <div class="tabs tabs-bordered">
      <a
        class="tab"
        :class="{ 'tab-active': activeTab === 'profile' }"
        @click="activeTab = 'profile'"
      >
        Profile
      </a>
      <a
        class="tab"
        :class="{ 'tab-active': activeTab === 'reports' }"
        @click="activeTab = 'reports'"
      >
        Reports
      </a>
      <a
        class="tab"
        :class="{ 'tab-active': activeTab === 'settings' }"
        @click="activeTab = 'settings'"
      >
        Settings
      </a>
    </div>

    <!-- Profile Tab -->
    <div
      v-if="activeTab === 'profile'"
      class="mt-6"
    >
      <h3 class="text-2xl font-bold mb-4">Profile Information</h3>
      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            type="text"
            class="input input-bordered w-full"
            :value="authStore.user.name"
            disabled
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            class="input input-bordered w-full"
            :value="authStore.user.email"
            disabled
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Role</span>
          </label>
          <input
            type="text"
            class="input input-bordered w-full"
            :value="authStore.user.role"
            disabled
          />
        </div>
      </div>
    </div>

    <!-- Reports Tab -->
    <div
      v-if="activeTab === 'reports'"
      class="mt-6"
    >
      <h3 class="text-2xl font-bold mb-4">Your last 5 URL Reports</h3>
      <table class="table w-full mb-6">
        <thead>
          <tr>
            <th>URL</th>
            <th>Cause</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="report in reports"
            :key="report.id"
          >
            <td>{{ report.url }}</td>
            <td>{{ report.cause }}</td>
            <td>
              <span
                :class="{
                  'badge badge-error': report.status === 'Rejected',
                  'badge badge-warning': report.status === 'Pending',
                  'badge badge-success': report.status === 'Approved',
                }"
              >
                {{ report.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pharos Reports -->
      <h3 class="text-2xl font-bold mb-4">Your last 5 Pharos Reports</h3>
      <table class="table w-full">
        <thead>
          <tr>
            <th>URL</th>
            <th>Cause</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="report in pharosReports"
            :key="report.id"
          >
            <td>{{ report.url }}</td>
            <td>{{ report.cause }}</td>
            <td>
              <span class="badge badge-info">{{ report.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Settings Tab -->
    <div
      v-if="activeTab === 'settings'"
      class="mt-6"
    >
      <h3 class="text-2xl font-bold mb-4">Settings</h3>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Receive email notifications</span>
          <input
            type="checkbox"
            class="toggle toggle-primary"
          />
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Active monitoring of flagged URLs</span>
          <input
            type="checkbox"
            class="toggle toggle-secondary"
          />
        </label>
      </div>
    </div>
  </div>
</template>
