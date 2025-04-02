import type { Crew } from '../Interface/CrewsInterface'
import { translateText } from '@/utils/translate'

export class CrewTranslateService {
  static async processCrew(crew: Crew): Promise<Crew> {
    try {
      const processedCrew: Crew = { ...crew }

      if (crew.name) {
        processedCrew.name = await translateText(crew.name)
      }
      if (crew.status) {
        processedCrew.status = this.normalizeStatus(crew.status)
      }
      if (crew.total_prime) {
        processedCrew.total_prime = this.formatBounty(crew.total_prime)
      }
      processedCrew.description = crew.description || 'No description available'
      processedCrew.number = crew.number || 'Unknown'

      return processedCrew
    } catch (error) {
      console.error(`Error processing crew "${crew.name}":`, error)
      return crew
    }
  }

  static async processCrews(crews: Crew[]): Promise<Crew[]> {
    const processPromises = crews.map((crew) => this.processCrew(crew))
    return Promise.all(processPromises)
  }

  private static normalizeStatus(status: string): string {
    const statusMap: Record<string, string> = {
      assets: 'Active',
      actif: 'Active',
      disbanded: 'Disbanded',
      dissous: 'Disbanded',
      inactive: 'Inactive',
      inactif: 'Inactive',
    }

    const lowerStatus = status.toLowerCase()
    return statusMap[lowerStatus] || 'Unknown'
  }

  private static formatBounty(bounty: string): string {
    if (!bounty || bounty === 'null' || bounty === 'undefined') {
      return 'Unknown'
    }

    try {
      const cleanBounty = bounty.replace(/[^\d.,]/g, '')

      const numericValue = parseFloat(cleanBounty.replace(',', '.'))
      if (isNaN(numericValue)) return bounty

      if (numericValue >= 1000000000) {
        return `${(numericValue / 1000000000).toFixed(2)} B`
      } else if (numericValue >= 1000000) {
        return `${(numericValue / 1000000).toFixed(2)} M`
      } else if (numericValue >= 1000) {
        return `${(numericValue / 1000).toFixed(2)} K`
      }

      return numericValue.toLocaleString('en-US')
    } catch (e) {
      console.log(`Error formatting bounty "${bounty}":`, e)
      return bounty
    }
  }
}
