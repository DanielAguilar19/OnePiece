import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    searchQuery: '',
    isSearching: false,
  }),
  actions: {
    actualizarBusqueda(nuevoValor: string) {
      this.searchQuery = nuevoValor.trim()
      this.isSearching = this.searchQuery.length > 0
    },
    resetBusqueda() {
      this.searchQuery = ''
      this.isSearching = false
    },
  },
  getters: {
    hasSearchQuery: (state) => state.searchQuery.length > 0,
  },
})
