import axios from 'axios'

export const fruitsService = {
  async GetFrutits() {
    try {
      const response = await axios.get(`https://api.api-onepiece.com/v2/fruits/en`)
      return response.data
    } catch (error) {
      console.error('Error fetching fruits: ', error)
      return []
    }
  },
}
