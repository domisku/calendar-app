const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let yearAndMonth = document.getElementById("year-month");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

renderCalendar(currentYear, currentMonth);

const nextMonthButton = document.getElementById("btn-next");
const previousMonthButton = document.getElementById("btn-prev");

nextMonthButton.addEventListener("click", nextMonth);
previousMonthButton.addEventListener("click", previousMonth);

function nextMonth() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  renderCalendar(currentYear, currentMonth);
}

function previousMonth() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar(currentYear, currentMonth);
}

function renderCalendar(year, month) {
  const firstDay = new Date(year, month).getDay();

  const table = document.getElementById("calendar-body");
  table.innerHTML = "";

  yearAndMonth.innerHTML = `${year} ${months[month]}`;

  let day = 1;
  let nextMonthDay = 1;
  const daysInMonth = getDaysInMonth(year, month);
  let lastMonth;
  let lastMonthYear;

  if (month === 0) {
    lastMonth = 11;
    lastMonthYear = year - 1;
  } else {
    lastMonth = month - 1;
    lastMonthYear = year;
  }

  const lastMonthDaysInMonth = getDaysInMonth(lastMonthYear, lastMonth);

  for (let week = 0; week < 6; week++) {
    if (week === 5 && day > getDaysInMonth(year, month)) break;

    let row = document.createElement("div");
    row.classList.add("row");

    for (let weekDay = 0; weekDay < 7; weekDay++) {
      if (week === 0 && weekDay < firstDay - 1) {
        for (let curDay = lastMonthDaysInMonth; curDay >= 23; curDay--) {
          let lastMonthDay = new Date(
            lastMonthYear,
            lastMonth,
            curDay - 1
          ).getDay();
          if (lastMonthDay === weekDay) {
            fillCellData(lastMonthYear, lastMonth, curDay, row, true);
            break;
          }
        }
      } else if (day > daysInMonth) {
        if (month === 11) {
          fillCellData(year + 1, 0, nextMonthDay, row, true);
        } else {
          fillCellData(year, month + 1, nextMonthDay, row, true);
        }
        nextMonthDay++;
      } else {
        fillCellData(year, month, day, row);
        day++;
      }
    }
    table.appendChild(row);
  }
}

function fillCellData(year, month, day, row, isOtherMonth = null) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  const cellText = document.createTextNode(day);
  cell.id = formatDate(year, month, day);
  cell.addEventListener("click", showNewEventForm);

  const cellDiv = document.createElement("div");
  cellDiv.classList.add("cell-div");

  const cellDayDiv = document.createElement("div");
  cellDayDiv.classList.add("cell-day-div");
  if (isOtherMonth) cellDayDiv.classList.add("greyed-out");
  cellDayDiv.appendChild(cellText);

  const cellEventsDiv = document.createElement("div");
  cellEventsDiv.classList.add("cell-events-div");

  let events = findEventsOfTheDay(year, month, day);
  events.forEach((event, index) => {
    if (index > 2) return;

    const cellEventDiv = document.createElement("div");
    cellEventDiv.classList.add("cell-event-div");
    cellEventDiv.classList.add(event[1].type.toLowerCase());
    cellEventDiv.id = String(event[0]);
    cellEventDiv.addEventListener("click", showEventDetails);
    const cellEvent = document.createTextNode(event[1].title);
    cellEventDiv.appendChild(cellEvent);
    cellEventsDiv.appendChild(cellEventDiv);
  });

  cellDiv.appendChild(cellDayDiv);
  cellDiv.appendChild(cellEventsDiv);

  if (events.length > 3) {
    const cellExpandEventsDiv = document.createElement("div");
    cellExpandEventsDiv.classList.add("cell-expand-events-div");

    const cellExpandEvents = document.createElement("div");
    cellExpandEvents.classList.add("cell-expand-events");
    cellExpandEvents.id = `${year}-${month}-${day}`;
    const cellExpandEventsText = document.createTextNode("...");
    cellExpandEvents.addEventListener("click", showAllEvents);
    cellExpandEvents.appendChild(cellExpandEventsText);
    cellExpandEventsDiv.appendChild(cellExpandEvents);
    cellDiv.appendChild(cellExpandEventsDiv);
  }

  cell.appendChild(cellDiv);

  if (isToday(year, month, day)) {
    cell.classList.add("today");
  }

  row.appendChild(cell);
}
