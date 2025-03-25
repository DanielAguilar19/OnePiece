import type { Gif, SearchResponse } from '@/features/Gifs/Interfaces/IGifs'
import axios from 'axios'

const GIPHY_API_KEY = import.meta.env.VITE_API_KEY
const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search'

// Definimos un tipo para los parámetros de filtrado
type FilterCriteria = {
  unwantedUsernames: string[]
  unwantedSlugs: string[]
  requiredKeywords: string[]
}

export const GiphyService = {
  async getGif(searchTag: string): Promise<string | null> {
    try {
      const response = await axios.get<SearchResponse>(
        `${GIPHY_URL}?api_key=${GIPHY_API_KEY}&q=One Piece ${encodeURIComponent(searchTag)}&limit=15`,
      )

      const filterCriteria: FilterCriteria = {
        unwantedUsernames: ['siswimsuit', 'playvalorant', 'valorant_esports', 'andbox'],
        unwantedSlugs: ['siswimsuit', 'valorant', 'nyxl'],
        requiredKeywords: ['one piece'],
      }

      const filteredData = response.data.data.filter((gif: Gif) => {
        if (
          gif.username &&
          filterCriteria.unwantedUsernames.some((name) =>
            gif.username.toLowerCase().includes(name.toLowerCase()),
          )
        ) {
          return false
        }

        if (
          gif.slug &&
          filterCriteria.unwantedSlugs.some((slug) =>
            gif.slug.toLowerCase().includes(slug.toLowerCase()),
          )
        ) {
          return false
        }

        const title = gif.title?.toLowerCase() || ''
        return filterCriteria.requiredKeywords.some((keyword) => title.includes(keyword))
      })

      if (filteredData.length === 0) {
        console.warn('No relevant One Piece GIFs found for:', searchTag)
        return null
      }

      const randomIndex = Math.floor(Math.random() * filteredData.length)
      return filteredData[randomIndex].images.original.url
    } catch (error) {
      console.error('Error fetching GIF for:', searchTag, error)
      return null
    }
  },
}
