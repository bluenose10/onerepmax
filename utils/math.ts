/**
 * Clamp value between min and max
 */
const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Epley Formula
 * 1RM = W × (1 + R / 30)
 */
export const calculateEpley = (weight: number, reps: number): number =>
  weight * (1 + reps / 30);

/**
 * Brzycki Formula
 * 1RM = W / (1.0278 − 0.0278 × R)
 */
export const calculateBrzycki = (weight: number, reps: number): number =>
  weight / (1.0278 - 0.0278 * reps);

/**
 * Lombardi Formula
 * 1RM = W × R^0.10
 */
export const calculateLombardi = (weight: number, reps: number): number =>
  weight * Math.pow(reps, 0.1);

export interface CalculationResult {
  oneRepMax: number;
  epley: number;
  brzycki: number;
  lombardi: number;
}

/**
 * Master 1RM calculation
 * - Reps clamped to 1–15
 * - Returns all formulas
 * - Uses Epley as headline 1RM
 */
export const calculate1RM = (
  weight: number,
  reps: number
): CalculationResult => {
  if (!Number.isFinite(weight) || weight <= 0) {
    return { oneRepMax: 0, epley: 0, brzycki: 0, lombardi: 0 };
  }

  const safeReps = clamp(reps, 1, 15);

  if (safeReps === 1) {
    return {
      oneRepMax: weight,
      epley: weight,
      brzycki: weight,
      lombardi: weight,
    };
  }

  const epley = calculateEpley(weight, safeReps);
  const brzycki = calculateBrzycki(weight, safeReps);
  const lombardi = calculateLombardi(weight, safeReps);

  return {
    oneRepMax: Math.round(epley * 10) / 10, // headline value
    epley: Math.round(epley * 10) / 10,
    brzycki: Math.round(brzycki * 10) / 10,
    lombardi: Math.round(lombardi * 10) / 10,
  };
};
