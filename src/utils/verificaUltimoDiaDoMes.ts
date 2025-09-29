function addMonthsAndHandleLastDay(date: Date, months: number): Date {
  const d = new Date(date);
  const originalDay = d.getDate();

  d.setMonth(d.getMonth() + months);

  if (d.getDate() !== originalDay) {
    d.setDate(0);
  }
  return d;
}

export default addMonthsAndHandleLastDay;