// Utility function to format currency with thousands separator
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// Alternative function if you prefer a custom implementation
export const formatCurrencyCustom = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
