import { TWindCondition } from '../types/Types'
// as per Beaufort scale https://en.wikipedia.org/wiki/Beaufort_scale

export const WIND_SPEED: TWindCondition = [
  { speedMin: 0, speedMax: 0.5, description: 'Calm' },
  { speedMin: 0.6, speedMax: 1.5, description: 'Ligth Air' },
  { speedMin: 1.6, speedMax: 3.3, description: 'Light breeze' },
  { speedMin: 3.4, speedMax: 5.5, description: 'Gentle breeze' },
  { speedMin: 5.6, speedMax: 7.9, description: 'Moderate breeze' },
  { speedMin: 8, speedMax: 10.7, description: 'Fresh breeze' },
  { speedMin: 10.8, speedMax: 13.8, description: 'Strong breeze' },
  { speedMin: 13.9, speedMax: 17.1, description: 'Near gale' },
  { speedMin: 17.2, speedMax: 20.7, description: 'Fresh gale' },
  { speedMin: 20.8, speedMax: 24.4, description: 'Severe gale' },
  { speedMin: 24.5, speedMax: 28.4, description: 'Storm' },
  { speedMin: 28.5, speedMax: 32.6, description: 'Violent storm' },
  { speedMin: 32.7, speedMax: 100, description: 'Hurricane' }
]


