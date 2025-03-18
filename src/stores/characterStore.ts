import { defineStore } from 'pinia'
import { onePieceService } from '@/api/characters'
import { GiphyService } from '@/api/gifs'

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    //Estructura de los personajes, para el arreglo definimos que datos y que tipo de datos se van a almacenar
    characters: [] as Array<{
      id: number
      name: string
      description: string
      gifUrl: string | null
    }>,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async obtenerPersonajeGif() {
      this.loading = true
      this.error = null

      try {
        const characters = await onePieceService.GetCharacters()

        // Buscar GIFs en paralelo para cada personaje
        const charactersWithGifs = await Promise.all(
          characters.map(async (character) => {
            const gifUrl = await GiphyService.getGif(character.name)
            return { ...character, gifUrl }
          }),
        )

        this.characters = charactersWithGifs
      } catch (error) {
        console.error('Error fetching characters:', error)
        this.error = 'Error al obtener los personajes'
      } finally {
        this.loading = false
      }
    },
  },
})
