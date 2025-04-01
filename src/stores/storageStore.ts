import { defineStore } from 'pinia'

export const useOnePieceStore = defineStore('onePiece', {
  state: () => ({
    characters: JSON.parse(sessionStorage.getItem('characters') || '[]'),
    gifs: JSON.parse(sessionStorage.getItem('gifs') || '{}'),
  }),
  actions: {
    async fetchCharacters() {
      // Si ya hay datos en sessionStorage, no se hace la petición
      if (this.characters.length > 0) return

      try {
        const res = await fetch('URL_DE_LA_API')
        const data = await res.json()
        this.characters = data

        // Guardar en sessionStorage
        sessionStorage.setItem('characters', JSON.stringify(data))
      } catch (error) {
        console.error('Error al obtener personajes:', error)
      }
    },

    async fetchGif(characterName: string) {
      // Si ya existe en sessionStorage, no se hace la petición
      if (this.gifs[characterName]) return

      try {
        const res = await fetch(`URL_DE_GIPHY_API?q=${characterName}`)
        const gifData = await res.json()

        // se guarda en Pinia y sessionStorage
        this.gifs[characterName] = gifData
        sessionStorage.setItem('gifs', JSON.stringify(this.gifs))
      } catch (error) {
        console.error(`Error al obtener GIF de ${characterName}:`, error)
      }
    },
  },
})
