export const fmt = (val: number, prefix = '₹'): string => {
  const abs = Math.abs(val);
  let str: string;

  if (abs >= 1_000_000) str = (abs / 1_000_000).toFixed(2) + 'M';
  else if (abs >= 1_000) str = (abs / 1_000).toFixed(2) + 'K';
  else str = abs.toFixed(2);

  return `${val < 0 ? '-' : ''}${prefix}${str}`;
};

export const fmtFull = (val: number, prefix = '₹'): string => {
  const abs = Math.abs(val);
  const str = abs.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${val < 0 ? '-' : ''}${prefix}${str}`;
};

export const fmtHolding = (val: number): string => {
  if (Math.abs(val) < 1e-8) return '0';
  if (Math.abs(val) < 0.001) return val.toExponential(2);
  return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
};
