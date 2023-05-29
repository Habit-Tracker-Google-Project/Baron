chrome.storage.session.get(null, function(items) {
  const timeTable = document.getElementById("time-table");
  
  // Add table headers
  const tableHeader = document.createElement("tr");
  tableHeader.innerHTML = `
    <th>Websites</th>
    <th>Time(s)</th>
  `;
  timeTable.appendChild(tableHeader);
  
  // Iterate over the entries of the items object
  Object.entries(items).forEach(([key, item]) => {
    const row = document.createElement("tr");
    
    const urlCell = document.createElement("td");
    urlCell.textContent = key;
    
    const countCell = document.createElement("td");
    countCell.textContent = item;
    
    row.appendChild(urlCell);
    row.appendChild(countCell);
    
    timeTable.appendChild(row);
  });
});

document.getElementById("timetracker").addEventListener("click", function() {
  // Hide the To-Do List
  document.querySelector(".todo").style.display = "none";
  
  // Show the Time Tracker
  document.getElementById("splits").style.display = "block";
});

document.getElementById("todolist").addEventListener("click", function() {
  // Hide the Time Tracker
  document.getElementById("splits").style.display = "none";
  
  // Show the To-Do List
  document.querySelector(".todo").style.display = "block";
});

// Hide the Time Tracker initially
document.getElementById("splits").style.display = "none";