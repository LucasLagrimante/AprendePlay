/**
 * Utilitário para vibração em dispositivos mobile
 */

/**
 * Executa um padrão de vibração no dispositivo
 * @param pattern - Número (ms) ou array de valores para padrão (vibra, pausa, vibra...)
 */
export function vibrate(pattern: number | number[] = 50): void {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Vibration API not supported or error:', error);
    }
  }
}

/**
 * Padrões de vibração pré-definidos
 */
export const VIBRATION_PATTERNS = {
  /** Vibração leve de toque */
  tap: 10,

  /** Vibração de sucesso - rápida */
  success: [30, 50, 30],

  /** Vibração de erro - mais longa */
  error: [100, 50, 100, 50, 100],

  /** Vibração de pressão longa */
  longPress: 200,

  /** Vibração dupla */
  double: [50, 100, 50],

  /** Vibração suave tripla */
  triple: [20, 40, 20, 40, 20],
} as const;

/**
 * Para a vibração atual
 */
export function stopVibrate(): void {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(0);
    } catch (error) {
      console.warn('Error stopping vibration:', error);
    }
  }
}
