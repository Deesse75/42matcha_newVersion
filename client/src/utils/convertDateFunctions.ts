export function convertDate(insertDate: string): string {
  const newDate = insertDate.split('T')[0];
  const year = newDate.split('-')[0];
  const month = newDate.split('-')[1];
  const day = newDate.split('-')[2];
  return `${day}/${month}/${year}`;
}

export function convertAge(insertDate: string | null): string {
  if (!insertDate) return '';
  const year = insertDate.split('-')[0];
  const currentYear = new Date().getFullYear();
  return (currentYear - parseInt(year)).toString();
}

export function legalAge(): string {
  const currentDate = new Date().toISOString().split('T')[0];
  const currentMonth = currentDate.split('T')[0].split('-')[1];
  const currentDay = currentDate.split('T')[0].split('-')[2];
  const legalYear = new Date().getFullYear() - 18;
  const legalDate = `${legalYear}-${currentMonth}-${currentDay}`;
  return legalDate;
}

export function limitAge(): string {
  const currentDate = new Date().toISOString().split('T')[0];
  const currentMonth = currentDate.split('T')[0].split('-')[1];
  const currentDay = currentDate.split('T')[0].split('-')[2];
  const limitYear = new Date().getFullYear() - 120;
  const limitDate = `${limitYear}-${currentMonth}-${currentDay}`;
  return limitDate;
}

// 2024-07-06T17:50:26.000Z
