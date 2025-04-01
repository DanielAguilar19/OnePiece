import axios from 'axios'

export const CrewService = {
  async GetCrews() {
    try {
      const response = await axios.get(`https://api.api-onepiece.com/v2/crews/en`)
      response.data = response.data
      return response.data
    } catch (error) {
      console.error('Error fetching crews: ', error)
    }
  },
}
