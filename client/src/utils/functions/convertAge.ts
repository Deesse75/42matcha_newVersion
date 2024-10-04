export default function convertAge(insertDate: string | null): string {
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
