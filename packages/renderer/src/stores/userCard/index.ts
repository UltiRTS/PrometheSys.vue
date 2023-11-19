import { defineStore } from 'pinia'

interface Location {
  x: number
  y: number
}
export const useUserCardStore = defineStore('userCard', {
  state: () => ({
    location: null as Location | null,
    user: '',
  }),
  getters: {
    isVisible: state => state.user !== '',
  },
  actions: {
    showUserCard(user: string, location: Location) {
      this.user = user
      this.location = location
    },
    closeUserCard() {
      this.user = ''
      this.location = null
    },
  },
})
