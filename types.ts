
export interface CalculationResult {
  oneRepMax: number;
  epley: number;
  brzycki: number;
  lombardi: number;
}

export interface TrainingPercentage {
  percentage: number;
  weight: number;
  reps: number;
  description: string;
}

export enum WeightUnit {
  KG = 'kg',
  LB = 'lb'
}
