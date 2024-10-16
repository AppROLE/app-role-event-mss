import { addDays, startOfDay } from "date-fns";

export function getUpcomingWeekdays() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

  let nextThursday, nextFriday, nextSaturday;

  if (dayOfWeek === 5) {
    // Hoje é sexta-feira
    nextFriday = startOfDay(today);
    nextSaturday = startOfDay(addDays(today, 1));
    nextThursday = startOfDay(addDays(today, 6)); // Próxima quinta-feira
  } else if (dayOfWeek === 6) {
    // Hoje é sábado
    nextSaturday = startOfDay(today);
    nextThursday = startOfDay(addDays(today, 5)); // Próxima quinta-feira
    nextFriday = startOfDay(addDays(today, 6)); // Próxima sexta-feira
  } else {
    // Domingo, segunda, terça ou quarta
    nextThursday = startOfDay(addDays(today, (4 - dayOfWeek + 7) % 7)); // Próxima quinta
    nextFriday = startOfDay(addDays(today, (5 - dayOfWeek + 7) % 7)); // Próxima sexta
    nextSaturday = startOfDay(addDays(today, (6 - dayOfWeek + 7) % 7)); // Próximo sábado
  }

  return { nextThursday, nextFriday, nextSaturday };
}



// export function getUpcomingWeekdays() {
//   const today = new Date();
//   const currentDay = today.getDay(); 

//   const daysUntilThursday = (4 - currentDay + 7) % 7;
//   const daysUntilFriday = (5 - currentDay + 7) % 7;
//   const daysUntilSaturday = (6 - currentDay + 7) % 7;

//   const nextThursday = new Date(today);
//   nextThursday.setDate(today.getDate() + daysUntilThursday);
//   nextThursday.setUTCHours(0, 0, 0, 0); 

//   const nextFriday = new Date(today);
//   nextFriday.setDate(today.getDate() + daysUntilFriday);
//   nextFriday.setUTCHours(0, 0, 0, 0); 

//   const nextSaturday = new Date(today);
//   nextSaturday.setDate(today.getDate() + daysUntilSaturday);
//   nextSaturday.setUTCHours(0, 0, 0, 0); 

//   return {
//     nextThursday,
//     nextFriday,
//     nextSaturday
//   };
// }
