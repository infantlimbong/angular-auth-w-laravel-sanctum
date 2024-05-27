// thousands-separator.util.ts
export function formatWithThousandsSeparator(value: string | number): string {
    const valueStr = value.toString();
    return valueStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  