export function getUpcomingWeekdays() {
  const today = new Date();
  const currentDay = today.getDay(); 

  const daysUntilThursday = (4 - currentDay + 7) % 7;
  const daysUntilFriday = (5 - currentDay + 7) % 7;
  const daysUntilSaturday = (6 - currentDay + 7) % 7;

  const nextThursday = new Date(today);
  nextThursday.setDate(today.getDate() + daysUntilThursday);
  nextThursday.setUTCHours(0, 0, 0, 0); 

  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  nextFriday.setUTCHours(0, 0, 0, 0); 

  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + daysUntilSaturday);
  nextSaturday.setUTCHours(0, 0, 0, 0); 

  return {
    nextThursday,
    nextFriday,
    nextSaturday
  };
}
