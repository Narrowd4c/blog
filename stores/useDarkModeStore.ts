import { defineStore } from 'pinia'
export const useDarkModeStore = defineStore('darkMode', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      isDark: false,
    }
  },
  getters: {
    // getters have to be declared explicitly
    getIsDark(state) {
      return state.isDark
    },
  },
  actions: {
    // actions have to be declared explicitly
    toggleDarkMode() {
      this.isDark = !this.isDark
    },
  }
})