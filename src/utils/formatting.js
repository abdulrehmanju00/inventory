// Currency, number, and date formatting utilities

export function formatCurrency(amount, currency = 'PKR') {
  if (amount === null || amount === undefined || isNaN(amount)) return `${currency} 0`;
  const formatted = Math.round(Number(amount)).toLocaleString('en-US');
  return `${currency} ${formatted}`;
}

export function formatNumber(val, decimals = 0) {
  if (val === null || val === undefined || isNaN(val)) return '0';
  if (decimals === 0) {
    return Math.round(Number(val)).toLocaleString('en-US');
  }
  return Number(val).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function formatDateTime(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatUnit(amount, unit) {
  return `${amount} ${unit}`;
}
