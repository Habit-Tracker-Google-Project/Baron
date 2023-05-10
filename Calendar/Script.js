let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; // sets events array from local storage to a variable

const calendar = document.getElementById('calendar'); // sets the calendar to a var
const newEventModal = document.getElementById('newEventModal'); // gets the newEventModal and puts it into this var
const deleteEventModal = document.getElementById('deleteEventModal'); //var for which event to delete
const backDrop = document.getElementById('modalBackDrop'); // gets the Back Drop and puts it to var
const eventTitleInput = document.getElementById('eventTitleInput'); // gets the event text as a var
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // used to see houw many padding days


function openModal(date) {
  clicked = date; // assigns the date clicked to a var

  const eventForDay = events.find(e => e.date === clicked); //for every event, check if its date is equal to the clicked date

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = "block";
  } else {
    newEventModal.style.display = 'block'; // makes the modal visible if it doesnt exist
  }

  backDrop.display = 'block'; // makes the modal backdrop visible if it doesnt exist
}


function load() {
  const dt = new Date(); // set dt to the date (object)

  if (nav !== 0) { //changes the month if the next or back function are pressed
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth(); // month counts starting from 0
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1); // month by itself means this month, day = 1 means first day
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // day = 0 means the previous day of the first day of the next month

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', { // toLocaldateString formats it into (weekday, month/day/year)
    weekday: 'long', // long = string, numeric = number value
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  // Days boxes

  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); // gets the weekday of dateString and uses indexOf to find its position in the array

  document.getElementById('monthDisplay').innerText =
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`; // makes the month year text on the top left

  calendar.innerHTML = ''; // resets all of the html

  for (let i = 1; i <= paddingDays + daysInMonth; i++) { // creates paddingDays + daysInMonth number of squares on the calendar
    const daySquare = document.createElement('div'); // makes a div and stores it in the var
    daySquare.classList.add('day'); // gives the divs the class: day

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    if (i > paddingDays) { // checks to make a padding Day or an actual day
      daySquare.innerText = i - paddingDays; // get the number of that day to display in the div

      const eventForDay = events.find(e => e.date === dayString); //checks if event is for today

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) { // if there is an event
        const eventDiv = document.createElement('div'); // create the div for the text
        eventDiv.classList.add('event'); //add a class
        eventDiv.innerText = eventForDay.title; // set the text of the div to the event name
        daySquare.appendChild(eventDiv); // put the div into the daySquare div
      }
      daySquare.addEventListener('click', () => openModal(dayString)); //checks if a daySquare is clicked and makes the modal visible
    } else {
      daySquare.classList.add('padding'); // assigns the padding days to a different class so the css recognizes it
      daySquare.style.visibility = 'hidden';
    }

    calendar.appendChild(daySquare); // adds the entire div to the calendar variable from the beginning that is set to the html doc
  }
}

function closeModal() { // makes the modal invisible
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = ''; // deletes the text
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) { //checks if you typed anything using truthy logic
    eventTitleInput.classList.remove('error');
    events.push({ // moves the new event into the events array
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events)); // saves the new events array to local storage
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked); // gets rid of any events that are from the date clicked
  localStorage.setItem('events', JSON.stringify(events)); // updates the local storage version of events
  closeModal();
}

function initButtons() { // adds eventlisteners to the back and next buttons
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load(); // reloads the calendar
  });
  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load(); // reloads the calendar
  });
  document.getElementById('saveButton').addEventListener('click', saveEvent);

  document.getElementById('cancelButton').addEventListener('click', closeModal);

  document.getElementById('deleteButton').addEventListener('click', deleteEvent);

  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();

// I used this tutorial - > https://www.youtube.com/watch?v=m9OSBJaQTlM