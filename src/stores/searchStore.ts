import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    searchQuery: '',
    isSearching: false, // Para controlar si hay búsqueda activa
  }),
  actions: {
    actualizarBusqueda(nuevoValor: string) {
      this.searchQuery = nuevoValor
      this.isSearching = nuevoValor.length > 0 // Si tiene texto, se activa la búsqueda
    },
    resetBusqueda() {
      this.searchQuery = ''
      this.isSearching = false
    },
  },
})
