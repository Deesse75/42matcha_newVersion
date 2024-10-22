export default function convertDate(insertDate: string): string {
  const newDate = insertDate.split('T')[0];
  const year = newDate.split('-')[0];
  const month = newDate.split('-')[1];
  const day = newDate.split('-')[2];
  return `${day}/${month}/${year}`;
}

// 2024-07-06T17:50:26.000Z
