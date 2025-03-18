import axios from 'axios'

export const onePieceService = {
  async GetCharacters() {
    try {
      const response = await axios.get(`https://api.api-onepiece.com/v2/characters/en`)
      response.data = response.data.slice(0, 2)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  },
}
export const Personaje = {
  async GetCharacterById(id: number) {
    try {
      const response = await axios.get(`https://api.api-onepiece.com/v2/characters/en/${id}`)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  },
}
