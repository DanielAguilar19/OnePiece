import axios from 'axios'
import type { Crew } from '@/features/Crews/Interface/CrewsInterface'

export const CrewService = {
  async GetCrews(): Promise<Crew[]> {
    try {
      const response = await axios.get('https://api.api-onepiece.com/v2/crews/en')
      return response.data
    } catch (error) {
      console.error('Error fetching crews:', error)
      return []
    }
  },

  async GetCrewById(id: number): Promise<Crew | null> {
    try {
      const response = await axios.get(`https://api.api-onepiece.com/v2/crews/en/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching crew with ID ${id}:`, error)
      return null
    }
  },
}
