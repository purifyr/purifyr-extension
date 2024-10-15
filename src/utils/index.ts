export function isAuthenticated() {
    // Check for a valid token in localStorage or Vuex/Pinia store
    return !!localStorage.getItem('authToken')
}