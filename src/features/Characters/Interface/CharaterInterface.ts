export interface Character {
  id: number
  name: string
  size?: string
  age?: string
  bounty?: string
  crew?: Crew
  fruit?: Fruit
  job?: string
  status?: string
}

export interface Crew {
  id: number
  name: string
  description: string
  status: string
  is_yonko: boolean
  number?: string
  roman_name?: string
  total_prime?: string
}

export interface Fruit {
  id: number
  name: string
  description: string
  type: string
  roman_name?: string
  filename: string
  technicalFile: string
}
