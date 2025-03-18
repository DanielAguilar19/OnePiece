import axios from 'axios'

const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search'
const GIPHY_API_KEY = 'l5kZb4tEAMxM2OE1GU3ghAfMRzhnQTGW'

export const GiphyService = {
  async getGif(searchTag: string) {
    try {
      const response = await axios.get(
        `${GIPHY_URL}?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchTag)}&limit=1`,
      )
      const data = response.data.data
      return data.length > 0 ? data[0].images.original.url : null
    } catch (error) {
      console.error('Error fetching GIF for:', searchTag, error)
      return null
    }
  },
}
