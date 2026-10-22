/** 210 → "₱210" */
export function formatPrice(pesos: number) {
  return `₱${pesos.toLocaleString('en-PH')}`
}
