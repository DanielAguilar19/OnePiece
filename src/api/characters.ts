import axios from 'axios'

export const onePieceService = {
  async GetCharacters() {
    try {
      const response = await axios.get(`https://api.api-onepiece.com/v2/characters/en`)
      response.data = response.data.slice(0, 3)
      //console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  },
  async GetAllCharacters() {
    try {
      const response = await axios.get(`https://api.api-onepiece.com/v2/characters/en`)
      response.data = response.data
      //console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  },
}
export const PersonajePorNombre = {
  async GetCharacterByName(name: string) {
    try {
      const response = await axios.get(
        `https://api.api-onepiece.com/v2/characters/en/search/?name=${name}`,
      )
      //console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  },
}
