function isToday(year, month, day) {
  if (
    day === today.getDate() &&
    year === today.getFullYear() &&
    month === today.getMonth()
  ) {
    return true;
  } else return false;
}

function findEventsOfTheDay(year, month, day) {
  const formattedDate = formatDate(year, month, day);

  const eventsOfTheDay = Object.entries(sessionStorage)
    .map((event) => [event[0], JSON.parse(event[1])])
    .filter((event) => event[1].date === formattedDate)
    .sort(
      (curEvent, nextEvent) =>
        +nextEvent[1].dateCreated - +curEvent[1].dateCreated
    );

  return eventsOfTheDay;
}

function formatDate(year, month, day) {
  if (month < 10) month = "0" + (month + 1);
  if (day < 10) day = "0" + day;

  return `${year}-${month}-${day}`;
}

function getDaysInMonth(year, month) {
  return 32 - new Date(year, month, 32).getDate();
}

function isTimeValid(startTime, endTime) {
  if (+startTime.replace(":", "") > +endTime.replace(":", "")) return false;
  else return true;
}
