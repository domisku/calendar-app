const newEventForm = document.getElementById("new-event-form-control");
newEventForm.addEventListener("submit", addNewEvent);

function addNewEvent(event) {
  event.preventDefault();
  const form = document.getElementById("new-event-form-control");
  const data = Object.fromEntries(new FormData(form).entries());

  const { startTime, endTime } = data;
  if (!isTimeValid(startTime, endTime)) {
    showModalMessage("End time must be later than start time!");
    return;
  }

  data.dateCreated = Date.now();

  sessionStorage.setItem(String(Math.random()), JSON.stringify(data));
  showModalMessage("Event created!");
  setTimeout(() => closeModal(), 1000);
  clearEventForm();
  renderCalendar(currentYear, currentMonth);
}

function clearEventForm() {
  document
    .querySelectorAll("#new-event-form-control label + *")
    .forEach((entry) => {
      if (entry.tagName.toLowerCase() === "select") entry.value = "Meeting";
      else entry.value = "";
    });
}

function clearEventDetails() {
  document
    .querySelectorAll("#event-details span + div")
    .forEach((detail) => (detail.innerText = ""));
}

function showDetails(id) {
  window.event.stopPropagation();

  if (document.querySelector("#modal-event-div:first-of-type")) {
    closeModal();
  }

  resetSidebarMenus();
  const eventDetails = document.getElementById("event-details");
  eventDetails.classList.add("show");

  const event = JSON.parse(sessionStorage.getItem(id));

  document.getElementById("show-title").innerText = event.title;
  document.getElementById("show-date").innerText = event.date;
  document.getElementById("show-start-time").innerText = event.startTime;
  document.getElementById("show-end-time").innerText = event.endTime;
  document.getElementById("show-type").innerText = event.type
    .split("-")
    .join(" ");
  document.getElementById("show-description").innerText = event.description;

  const delButton = document.querySelector("#event-details .del-btn");
  delButton.id = id;
}

function resetSidebarMenus() {
  const newEventForm = document.getElementById("new-event-form");
  const eventDetails = document.getElementById("event-details");
  const rootAddEventDiv = document.getElementById("root-add-event-div");
  eventDetails.classList.remove("show");
  newEventForm.classList.remove("show");
  rootAddEventDiv.classList.remove("show");
}

document
  .getElementById("delete-event-button")
  .addEventListener("click", deleteEvent);

function deleteEvent(event) {
  event.preventDefault();

  const eventDetails = document.getElementById("event-details");
  const rootAddEventDiv = document.getElementById("root-add-event-div");
  eventDetails.classList.remove("show");
  rootAddEventDiv.classList.add("show");

  const delButton = document.querySelector("#event-details .del-btn");
  sessionStorage.removeItem(delButton.id);

  if (
    Object.keys(sessionStorage).length === 1 &&
    sessionStorage.getItem("testDataFilled")
  ) {
    prefillTestData();
  }

  clearEventDetails();
  renderCalendar(currentYear, currentMonth);
  showModalMessage("Event deleted!");
}

const rootAddEventButton = document.getElementById("root-add-event-button");
rootAddEventButton.addEventListener("click", showNewEventForm);

function showNewEventForm(event) {
  resetSidebarMenus();
  const newEventForm = document.getElementById("new-event-form");
  newEventForm.classList.add("show");

  const dateOfTheDay = event.currentTarget.id;
  if (dateOfTheDay) {
    document.getElementById("date").value = dateOfTheDay;
  }
}

function showAllEvents(event) {
  event.stopPropagation();

  showModal();

  const modal = document.getElementById("modal");
  const date = event.target.id;
  const [year, month, day] = date.split("-").map((str) => +str);

  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal-div");
  const modalDate = document.createElement("div");
  const modalDateText = document.createTextNode(
    `${months[month]} ${day}, ${year}`
  );
  modalDate.id = "modal-date";
  modalDate.appendChild(modalDateText);

  const events = findEventsOfTheDay(year, month, day);

  events.forEach((event) => {
    const modalEventDiv = document.createElement("div");
    modalEventDiv.classList.add("modal-event-div");
    modalEventDiv.classList.add(event[1].type.toLowerCase());
    modalEventDiv.id = `modal-${event[0]}`;
    modalEventDiv.addEventListener("click", showModalEventDetails);
    const modalEvent = document.createTextNode(event[1].title);
    modalEventDiv.appendChild(modalEvent);
    modalDiv.appendChild(modalEventDiv);
  });

  modal.appendChild(modalDate);
  modal.appendChild(modalDiv);
}

function showModalEventDetails(event) {
  const eventId = +event.target.id.replace("modal-", "");
  showDetails(eventId);
  closeModal();
}

function showEventDetails(event) {
  const eventId = event.target.id;
  showDetails(eventId);
}

const closeButton = document.querySelectorAll(".close-btn");
closeButton.forEach((element) => element.addEventListener("click", closeForms));

function closeForms(event) {
  event.preventDefault();

  resetSidebarMenus();
  const rootAddEventDiv = document.getElementById("root-add-event-div");
  rootAddEventDiv.classList.add("show");

  if (event.target.id === "close-form") clearEventForm();
}
